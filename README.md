# busymap

## backend steps

1. create dzi of map
2. fill terraform/bm.tfvars with stuff

```
region = ""

bucket_name     = ""
bucket_location = ""
```

3. `terraform apply --var-file "bm.tfvars"`
4. upload dzi to bucket, inside of a folder
