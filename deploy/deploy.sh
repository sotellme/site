#!/bin/bash

aws s3 sync ../frontend s3://sotellme.ca/ --exclude '.git' --exclude '.gitignore' --delete
