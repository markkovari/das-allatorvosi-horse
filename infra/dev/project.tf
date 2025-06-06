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


resource "digitalocean_app" "frontend" {
  project_id = digitalocean_project.project_dev.id
  spec {
    name   = "frontend"
    region = "fra"

    static_site {
      name          = "frontend-site"
      build_command = "pnpm run build --filter frontend"
      output_dir    = "./apps/frontend/dist"

      github {
        repo   = "markkovari/das-allatorvosi-horse"
        branch = "main"
      }
    }
  }
}
