# makes the folder in /Developer
SITE_NAME=$1
[ -z "$SITE_NAME" ] && echo "Please provide a sitename" && read SITE_NAME

cd $DEVELOPER_HOME
mkdir $SITE_NAME
