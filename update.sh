#!/bin/bash
cd /home/ubuntu/covid19-data
git pull
node generate-mss-yaml
yarn build
git add .
git commit -m "Update data (daily job)"
git push
