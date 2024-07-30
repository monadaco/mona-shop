
# updating dependencies

#TODO: out of scope
# cd ../invoice-service && npm ci 
 npm ci --prefix ../shop-bo
npm ci --prefix ../shop-client
npm ci --prefix ../shop-bo/public
npm ci --prefix ../shop-client/public 
npm ci --prefix ../order-service

# deploying dev resources to aws
terraform init
terraform apply --auto-approve

PRODUCTS_BUCKET_NAME=$(terraform output -raw products_bucket_name)
PRODUCTS_BUCKET_REGION=$(terraform output -raw products_bucket_region)
#TODO: out of scope
# INVOICE_BUCKET_NAME=$(terraform output -raw invoice_bucket_name)
# INVOICE_BUCKET_REGION=$(terraform output -raw invoice_bucket_region)
# INVOICE_TOPIC_ARN=$(terraform output -raw invoice_topic_arn)
DB_URL=$(terraform output -raw db_url)

# update the env file
touch ../order-service/.env
echo "BUCKET_NAME=$PRODUCTS_BUCKET_NAME\nBUCKET_REGION=$PRODUCTS_BUCKET_REGION\nDATABASE_URL=postgres://dbadmin:yourpassword@$DB_URL/shop" > ../order-service/.env

#TODO: out of scop
# touch ../invoice-service/.env
# echo "BUCKET_NAME=$INVOICE_BUCKET_NAME\nBUCKET_REGION=$INVOICE_BUCKET_REGION\nTOPIC_ARN=$INVOICE_TOPIC_ARN\nDATABASE_URL=postgres://dbadmin:yourpassword@$DB_URL/shop" > ../invoice-service/.env

# set up the db services and prepopulate with initial data
npm run setup-dev --prefix ../order-service