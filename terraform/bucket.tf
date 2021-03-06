variable "bucket_name" {
  type = string
}

variable "bucket_location" {
  type = string
}

variable "cors_origins" {
  type = list(string)
}

resource "google_storage_bucket" "maptiles" {
  name          = var.bucket_name
  location      = var.bucket_location
  force_destroy = true

  uniform_bucket_level_access = true

  cors {
    origin          = var.cors_origins
    method          = ["GET"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_binding" "maptiles_policy" {
  bucket = google_storage_bucket.maptiles.name
  role   = "roles/storage.legacyObjectReader"
  members = [
    "allUsers",
  ]
}
