#!/bin/bash
set -x
function cache(){
   mkdir -p /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}/
   tar -zcf $1.tar.gz $1/
   cp -rf $1.tar.gz /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}/
}
function pull(){
   mkdir -p $1
   cp -rf /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}/$1.tar.gz $1.tar.gz
   chmod -R 777 $1.tar.gz
   tar -zxf $1.tar.gz
   chmod -R 777 $1
   rm -rf /cache/${CI_PROJECT_NAME}-${CI_PROJECT_ID}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA}
}

function cacheY(){
   tar -zcf $1.tar.gz $1/
   mkdir -p /cache/${CI_PROJECT_NAME}/
   cp -rf $1.tar.gz /cache/${CI_PROJECT_NAME}
}
function pullY(){
   rm -rf $1
   mkdir -p $1
   cp -rf /cache/${CI_PROJECT_NAME}/$1.tar.gz $1.tar.gz
   chmod -R 777 $1.tar.gz
   tar -zxf $1.tar.gz
   chmod -R 777 $1
}

