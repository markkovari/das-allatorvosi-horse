resource "digitalocean_project" "project_dev" {
  name        = "dev"
  is_default  = false
  environment = "Development"
}

resource "digitalocean_database_postgresql_config" "db_config" {
  cluster_id = digitalocean_database_cluster.database.id
  timezone   = "UTC"
}

resource "digitalocean_database_cluster" "database" {
  name       = "das-allaorvosi-horse-database"
  engine     = "pg"
  version    = "17"
  size       = "db-s-1vcpu-1gb"
  region     = "fra1"
  node_count = 1
  project_id = digitalocean_project.project_dev.id
}


resource "digitalocean_app" "app" {
  project_id = digitalocean_project.project_dev.id
  spec {
    name   = "app"
    region = "fra"

    static_site {
      name          = "frontend"
      build_command = "pnpm run build --filter frontend"
      output_dir    = "./apps/frontend/dist"

      github {
        repo   = "markkovari/das-allatorvosi-horse"
        branch = "main"
      }
    }
    ingress {
      rule {
        match {
          path {
            prefix = "/"
          }
        }
        component {
          name = "frontend"
        }
      }
      rule {
        match {
          path {
            prefix = "/api"
          }
        }
        component {
          name = "backend"
        }
      }
    }
    service {
      name          = "backend"
      build_command = "pnpm run build --filter backend"
      run_command   = "node ./apps/backend/dist/index.js"
      github {
        repo   = "markkovari/das-allatorvosi-horse"
        branch = "main"
      }
      env {
        key   = "YES"
        value = "NO"
      }
    }
  }
}
