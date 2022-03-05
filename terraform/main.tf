variable "region" {
  type = string
}

provider "google" {
  project = "busymap-343221"
  region  = var.region
}
