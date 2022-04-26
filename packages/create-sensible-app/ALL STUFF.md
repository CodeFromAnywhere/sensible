#!/bin/bash

echo "$1"
SITE_NAME=$1
[ -z "$SITE_NAME" ] && echo "Please provide a sitename" && read SITE_NAME

# the line below generates a random password of 32 characters
DB_PASS=$(date +%s | sha256sum | base64 | head -c 32)

# this is ignored, 
# source ./env.sh

GIT_REPO=$GIT_ORG_OR_USERNAME/$SITE_NAME.git

# creating new sensible project
# ./new-sensible-project/logo.sh $SITE_NAME
# ./new-sensible-project/domain.sh $SITE_NAME
# ./new-sensible-project/make-git-repo.sh $GIT_REPO
./assets/init.sh $SITE_NAME #initiates the folder structure
# ./new-sensible-project/ship.sh $GIT_REPO

# start developing:
# Open up VSCode in the correct folder, running expo packager, next.js site, server, and papapackage, so you can start coding.

# Spin up new server
# ./new-server/create.sh
# ./new-server/install.sh

# publish npm packages
# ./publish-npm/publish-npm.sh

# deployment server
# ./deploy-api/create-db.sh $SITE_NAME $DB_PASS
# ./deploy-api/choose-port.sh #todo
# ./deploy-api/deploy-remote.sh
# ./deploy-api/add-dns.sh
# ./deploy-api/set-available.sh
# ./deploy-api/check-success.sh #todo

# deployment frontend
# ./deploy-frontend/publish-expo.sh
# ./deploy-frontend/create-vercel-project.sh
