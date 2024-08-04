#!/bin/sh
docker build -t kind-registry:5001/order-service:latest ./order-service
docker push kind-registry:5001/order-service:latest

docker build -t kind-registry:5001/shop-client:latest ./shop-client
docker push kind-registry:5001/shop-client:latest

docker build -t kind-registry:5001/shop-bo:latest ./shop-bo
docker push kind-registry:5001/shop-bo:latest