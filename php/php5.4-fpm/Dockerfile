FROM php:5.4-fpm

COPY ./sources.list /etc/apt/sources.list

RUN apt-get update && \
    apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng12-dev \
        libgmp-dev \
        libxml2-dev \
        zlib1g-dev \
        libncurses5-dev \
        libldap2-dev \
        libicu-dev \
        libmemcached-dev \
        libcurl4-openssl-dev \
        libssl-dev \
        openssh-client \
        php-pear \
        curl \
        ssmtp \
        mysql-client \
        git \
        subversion \
        wget && \
    rm -rf /var/lib/apt/lists/* && \
    wget https://getcomposer.org/download/1.2.4/composer.phar -O /usr/local/bin/composer && \
    chmod a+rx /usr/local/bin/composer

# https://bugs.php.net/bug.php?id=49876
RUN ln -fs /usr/lib/x86_64-linux-gnu/libldap.so /usr/lib/

RUN apt-get install -y \
        libmemcached-dev \
    && curl -fsSL 'https://github.com/php-memcached-dev/php-memcached/archive/2.2.0.tar.gz' -o memcached.tar.gz \
    && mkdir -p memcached \
    && tar -xf memcached.tar.gz -C memcached --strip-components=1 \
    && rm memcached.tar.gz \
    && ( \
        cd memcached \
        && phpize \
        && ./configure --enable-memcached \
        && make -j$(nproc) \
        && make install \
    ) \
    && rm -r memcached \
    && docker-php-ext-enable memcached

RUN echo "Installing PHP extensions" \
    && docker-php-ext-install iconv mcrypt gd pdo_mysql pcntl zip bcmath simplexml xmlrpc soap ldap mbstring \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-enable iconv mcrypt gd pdo_mysql pcntl zip bcmath simplexml xmlrpc soap ldap mbstring \
    && apt-get autoremove -y \
    && dpkg -la | awk '{print $2}' | grep '\-dev' | xargs apt-get remove -y \
    && apt-get clean all \
    && rm -rvf /var/lib/apt/lists/* \
    && rm -rvf /usr/share/doc /usr/share/man /usr/share/locale \
    && rm -fv /usr/local/etc/php-fpm.d/*.conf \
    && rm -rvf /usr/src/php

# Set timezone
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Madrid /etc/localtime
RUN "date"

COPY ./php.ini /usr/local/etc/php/php.ini

WORKDIR /var/www

CMD ["php-fpm"]