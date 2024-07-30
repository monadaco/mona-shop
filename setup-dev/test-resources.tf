provider "aws" {
  region = "eu-central-1"
}

resource "random_id" "app_id" {
  byte_length = 12
}
#TODO: out of scope
# resource "aws_sns_topic" "invoice_topic" {
#   name = "invoice-topic"
# }
#TODO: out of scope
# resource "aws_s3_bucket" "invoice_bucket" {
#   bucket = "invoice-${random_id.app_id.hex}"
#   # acl    = "public-read"
# }

resource "aws_s3_bucket" "products_bucket" {
  bucket = "products-${random_id.app_id.hex}"
  # acl    = "public-read"
}


resource "aws_s3_bucket_policy" "products_bucket_policy" {
  bucket = aws_s3_bucket.products_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.products_bucket.arn}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_public_access_block" "products_bucket_access_block" {
  bucket = aws_s3_bucket.products_bucket.id

  block_public_acls       = false
  block_public_policy     = false

}

resource "aws_s3_object" "image_1" {
  bucket = aws_s3_bucket.products_bucket.bucket
  key    = "image_1.webp"  
  source = "./products/image_1.webp"  
  # acl    = "public-read"  
}

resource "aws_s3_object" "image_2" {
  bucket = aws_s3_bucket.products_bucket.bucket
  key    = "image_2.webp"  
  source = "./products/image_2.webp"  
  # acl    = "public-read"  
}

resource "aws_s3_object" "image_3" {
  bucket = aws_s3_bucket.products_bucket.bucket
  key    = "image_3.webp"  
  source = "./products/image_3.webp"  
  # acl    = "public-read"  
}

resource "aws_s3_object" "image_4" {
  bucket = aws_s3_bucket.products_bucket.bucket
  key    = "image_4.webp"  
  source = "./products/image_4.webp"  
  # acl    = "public-read"  
}


resource "aws_db_instance" "db" {
  allocated_storage       = 20
  storage_type            = "gp2"
  engine                  = "postgres"
  engine_version          = "16.3"
  instance_class          = "db.t3.micro"
  db_name                 = "shop"
  username                = "dbadmin" #TODO: replace with a secret
  password                = "yourpassword" #TODO: replace with a secret
  parameter_group_name    = "default.postgres16"  # Match the engine version
  skip_final_snapshot     = true
  publicly_accessible     = true
   vpc_security_group_ids = [aws_security_group.db_sg.id]
}

resource "aws_security_group" "db_sg" {
  name        = "rds_security_group"
  description = "Allow PostgreSQL inbound traffic"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow traffic from any IP address (for public access)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "products_bucket_name" {
  value = aws_s3_bucket.products_bucket.bucket
}

output "products_bucket_region" {
  value = aws_s3_bucket.products_bucket.region
}

#TODO: out of scope
# output "invoice_bucket_name" {
#   value = aws_s3_bucket.invoice_bucket.bucket
# }
#TODO: out of scope
# output "invoice_bucket_region" {
#   value = aws_s3_bucket.invoice_bucket.region
# }
#TODO: out of scope
# output "invoice_topic_arn" {
#   value = aws_sns_topic.invoice_topic.arn
# }

output "db_url" {
  value = aws_db_instance.db.endpoint
}

