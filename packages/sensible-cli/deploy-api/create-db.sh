SITE_NAME=$1
[ -z "$SITE_NAME" ] && echo "Please provide a sitename" && read SITE_NAME
DB_PASS=$2
[ -z "$DB_PASS" ] && echo "Please provide a db pass" && read DB_PASS

source ./env.sh
sshpass -p $SSH_PASS ssh $SSH_USER@$SSH_IP 'bash -s' < create-db-linux.sh $SITE_NAME $DB_PASS $ROOT_MYSQL_PASS

echo "DB_DB=${SITE_NAME}db
DB_USER=${SITE_NAME}user
DB_PASSWORD=${DB_PASS}
DB_HOST=${SSH_IP}"