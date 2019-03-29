FROM httpd:2.4.33-alpine
RUN apk update; \
    apk upgrade;
# Copy apache vhost file to proxy php requests to php-fpm container
COPY sites-available /usr/local/apache2/conf/sites-available
RUN echo "Include /usr/local/apache2/conf/sites-available/*.conf" \
    >> /usr/local/apache2/conf/httpd.conf
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

RUN echo $'LoadModule deflate_module /usr/local/apache2/modules/mod_deflate.so \n\
	LoadModule proxy_module /usr/local/apache2/modules/mod_proxy.so \n\
	LoadModule proxy_fcgi_module /usr/local/apache2/modules/mod_proxy_fcgi.so' \
	  >> /usr/local/apache2/conf/httpd.conf


RUN mkdir -p /var/log/apache2
RUN chmod -R 777 /var/log/apache2

CMD ["httpd","-D", "FOREGROUND"]