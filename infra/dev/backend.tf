terraform {

  backend "s3" {
    bucket                      = "terraform-state-das-allatorvosi-horse"
    key                         = "terraform-state/dev/terraform.tfstate"
    region                      = "eu-west-1"
    endpoint                    = "https://terraform-state-das-allatorvosi-horse.fra1.digitaloceanspaces.com"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    force_path_style            = true
  }
}
