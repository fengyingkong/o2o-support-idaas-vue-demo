#!/bin/bash
set -e

# find /etc/nginx/ -name 'nginx.conf' | xargs sed -i "s nodeconfig $NODECONFIG_URL  g"
find /etc/nginx/ -name 'nginx.conf' | xargs sed -i "s http://o2o-support-dev.o2o-support-idaas-vue-demo.devgw.yonghui.cn/ $NODECONFIG_URL  g"
# find /etc/nginx/ -name 'nginx.conf'

exec "$@"
