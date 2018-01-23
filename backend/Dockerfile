FROM stesie/v8js:latest

RUN useradd -ms /bin/bash app && usermod -aG sudo app

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    php7.0-xml php7.0-mbstring php7.0-intl php7.0-mysql php7.0-sqlite curl \
    php-xdebug php-curl php7.0-zip

RUN echo "xdebug.remote_enable=on" >> /etc/php/7.0/cli/conf.d/20-xdebug.ini &&\
    echo "xdebug.remote_autostart=on" >> /etc/php/7.0/cli/conf.d/20-xdebug.ini &&\
    echo "xdebug.remote_port=9000" >> /etc/php/7.0/cli/conf.d/20-xdebug.ini &&\
    echo "xdebug.max_nesting_level=1024" >> /etc/php/7.0/cli/conf.d/20-xdebug.ini &&\
    echo "xdebug.remote_host=\"172.17.0.1\"" >> /etc/php/7.0/cli/conf.d/20-xdebug.ini

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" &&\
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer &&\
    php -r "unlink('composer-setup.php');"
