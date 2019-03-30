# Docker apache+php7+php5.4+mysql setup

## Intro
Docker setup for an Apache webserver with PHP (versions 7.1 and 5.4) and MySQL Server

## Configuration
Rename apache/vhosts-sample.json to apache/vhosts.json and edit it to add your own vhosts.

Run docker-compose up to launch the containers.

### Apache Virtual hosts generator
There is a tool to generate apache virtual hosts configuration files for each entry in apache/vhosts.json file. 

The options available are:

 - __name__: The name for the project. It will be prepended to the log filename and configuration filename
 - __document\_root__:  The path to the project relative to _/var/www_.
 - __server\_name__: the domain for the project
 - __php\_host__ (optional): which version of PHP to use. At the moment the only options are `php`or `php5`. Default value is `php` for PHP 7.1
 - __server\_aliases__: array for the server aliases

Run with __node__ ```node apache/vhost-generator.js``` to generate the vhost configuration files.

## Vagrant
To run the docker containers inside a VM you can use __vagrant__ to spin up a VM and run the containers:

Steps: 

- Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- Install [Vagrant](https://www.vagrantup.com/)
- Install vagrant plugin __vbguest__ with ```vagrant plugin install vagrant-vbguest```
- Install vagrant plugin __vagrant-docker-compose__ with ```vagrant plugin install vagrant-docker-compose```
- Run ```vagrant up```

Vagrant will install docker inside the VM and run docker-compose to run the containers.
