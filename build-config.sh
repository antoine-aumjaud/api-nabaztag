#!/bin/sh
if [ ! -d dist ] 
then mkdir dist
fi

NAME=$(cat package.json | grep name | awk -F: '{ print $2 }' | sed 's/[ \",]//g')
VERSION=$(cat package.json | grep version | awk -F: '{ print $2 }' | sed 's/[ \",]//g')
BUILD_DATE=$(date +'%F %H:%M:%S')

sed    -e "s/{NAME}/$NAME/" src/conf-common.json > dist/conf-common.json
sed -i -e "s/{VERSION}/$VERSION/"                  dist/conf-common.json
sed -i -e "s/{BUILD_DATE}/$BUILD_DATE/"            dist/conf-common.json

cp -r src/conf dist