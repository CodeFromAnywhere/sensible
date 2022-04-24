# init

# 1. makes the folder in current working directory
SITE_NAME=$1
[ -z "$SITE_NAME" ] && echo "Please provide a sitename" && read SITE_NAME

mkdir $SITE_NAME

# 2. copy init template in there
# for all packages and the server app, make sure you get the latest version instead of staring it.
# for app and web we need to ...
# - customly run init to make the folder structure
# - install some opinionated packages, the newest versions
# - clean up the generated files
# - paste some files from template
./web.sh
./app.sh