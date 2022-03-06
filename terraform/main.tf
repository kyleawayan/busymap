variable "region" {
  type = string
}

variable "project_id" {
  type = string
}

provider "google" {
  project = var.project_id
  region  = var.region
}
