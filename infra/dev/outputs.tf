output "db_host" {
  value = digitalocean_database_cluster.database.host
}
output "db_uri" {
  sensitive = true
  value     = digitalocean_database_cluster.database.uri
}

output "db_user" {
  value = digitalocean_database_cluster.database.user
}

output "db_password" {
  sensitive = true
  value     = digitalocean_database_cluster.database.password
}

output "db_database" {
  value = digitalocean_database_cluster.database.database
}
