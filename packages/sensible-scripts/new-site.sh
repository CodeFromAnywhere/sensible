#!/bin/bash
SITE_NAME=$1
[ -z "$SITE_NAME" ] && echo "Please provide a sitename" && read SITE_NAME

DB_PASS=$(date +%s | sha256sum | base64 | head -c 32)

source ./env.sh

GIT_REPO=$GIT_ORG_OR_USERNAME/$SITE_NAME.git

# creating new sensible project (todo)
./new-sensible-project/init.sh $SITE_NAME
./new-sensible-project/logo.sh $SITE_NAME
./new-sensible-project/domain.sh $SITE_NAME
./new-sensible-project/make-git-repo.sh $GIT_REPO
./new-sensible-project/core.sh $SITE_NAME
./new-sensible-project/ui.sh $SITE_NAME
./new-sensible-project/server.sh $SITE_NAME
./new-sensible-project/next.sh $SITE_NAME
./new-sensible-project/expo.sh $SITE_NAME
./new-sensible-project/ship.sh $GIT_REPO

# start developing:
# Open up VSCode in the correct folder, running expo packager, next.js site, server, and papapackage, so you can start coding.

# Spin up new server
# ./new-server/create.sh
# ./new-server/install.sh

# publish npm packages
./publish-npm/publish-npm.sh

# deployment server
./deploy-api/create-db.sh $SITE_NAME $DB_PASS
./deploy-api/choose-port.sh #todo
./deploy-api/deploy-remote.sh
./deploy-api/add-dns.sh
./deploy-api/set-available.sh
./deploy-api/check-success.sh #todo

# deployment frontend
./deploy-frontend/publish-expo.sh
./deploy-frontend/create-vercel-project.sh
