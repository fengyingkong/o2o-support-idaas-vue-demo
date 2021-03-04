FROM registry.cn-hangzhou.aliyuncs.com/choerodon-tools/frontbase:0.7.0


ENV NODECONFIG_URL 1
#ENV PRO_API_HOST api.kfitwork.yonghui.cn
#ENV PRO_REGION _CHO_SH
RUN echo "Asia/shanghai" > /etc/timezone;
ADD dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY nginx/init.sh /usr/share/nginx/html
RUN chmod 777 /usr/share/nginx/html/init.sh
ENTRYPOINT ["/usr/share/nginx/html/init.sh"]


CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80