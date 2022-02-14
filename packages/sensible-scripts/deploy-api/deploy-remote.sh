#!/bin/bash

source ./env.sh

SITE_NAME=$1
[ -z "$SITE_NAME" ] && echo "Please provide a sitename" && read SITE_NAME
[ -z "$PORT_NO" ] && echo "Please provide a port number" && read PORT_NO

sshpass -p $SSH_PASS ssh $SSH_USER@$SSH_IP 'bash -s' < deploy-remote-linux.sh $SITE_NAME $PORT_NO $DB_PASS $SERVER_PATH
