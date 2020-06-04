#!/bin/bash
git pull
./fetch.sh
node generate-mss-yaml
node generate-ccs-yaml
yarn build
git add .
git commit -m "Update data (daily job)"
git push
./deploy.sh
