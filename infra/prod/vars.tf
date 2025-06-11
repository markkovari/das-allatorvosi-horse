variable "do_token" {
  sensitive   = true
  type        = string
  description = "digitalocean token"
}

variable "project_name" {
  default = "prod"
}


