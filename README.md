# busymap

## backend steps

1. create dzi of map
2. fill terraform/bm.tfvars with stuff

```
region = ""

bucket_name     = ""
bucket_location = ""

cors_origins = ["http://localhost:3000", ""]
```

3. `terraform apply --var-file "bm.tfvars"`
4. upload dzi to bucket, inside of a folder
5. connect to db. note you have to authorize your network to connect to the gcloud instance.

### db stuff

1. create tables

```sql
create table buildings
(
	id serial,
	name varchar not null,
	coord_x float8 not null,
	coord_y float8 not null
);

create unique index buildings_id_uindex
	on buildings (id);

alter table buildings
	add constraint buildings_pk
		primary key (id);

create table locations
(
	id serial,
	roomName varchar not null,
	"desc" varchar,
);

create unique index locations_id_uindex
	on locations (id);

alter table locations
	add constraint locations_pk
		primary key (id);

create table data
(
	date timestamptz not null,
	value int not null,
	location_id int not null
);
```
