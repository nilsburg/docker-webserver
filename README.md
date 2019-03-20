# Docker apache+php7+php5.4+mysql setup

##Intro
Docker setup for a Apache webserver with PHP (versions 7.1 and 5.4) and MySQL Server

## Configuration
Rename apache/vhosts-sample.json to apache/vhosts.json and edit it to add your own vhosts.
Run with __node__ ```node apache/vhost-generator.js``` to generate the vhost conf files.

Run docker-compose up to launch the containers.