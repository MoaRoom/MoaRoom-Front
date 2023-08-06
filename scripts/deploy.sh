#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/MoaRoom-Front"
echo "> FE 배포"
sudo cp -rf /home/ubuntu/deploy-fe/dist/* /var/www/html