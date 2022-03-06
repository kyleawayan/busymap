resource "google_sql_database_instance" "database" {
  name             = "bm-db"
  database_version = "POSTGRES_14"
  region           = "us-west1"

  settings {
    # Second-generation instance tiers are based on the machine
    # type. See argument reference below.
    tier = "db-f1-micro"
  }
}
