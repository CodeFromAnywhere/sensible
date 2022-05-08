SITE_NAME=$1
[ -z "$SITE_NAME" ] && echo "Please provide a sitename" && read SITE_NAME
PORT_NO=$2
[ -z "$PORT_NO" ] && echo "Please provide a PORT Number" && read PORT_NO

source ./env.sh

sshpass -p $SSH_PASS ssh $SSH_USER@$SSH_IP 'bash -s' < set-available-linux.sh $SITE_NAME $PORT_NO
