SITE_NAME=$1
DB_PASS=$2
ROOT_MYSQL_PASS=$3
COMMAND="CREATE DATABASE ${SITE_NAME}db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; create user ${SITE_NAME}user identified by '$DB_PASS'; GRANT ALL PRIVILEGES ON ${SITE_NAME}db.* TO '${SITE_NAME}user'@'%'; FLUSH PRIVILEGES;"
mysql --user="root" --password="${ROOT_MYSQL_PASS}" -e "$COMMAND"