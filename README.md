# git clone

clone this repo with "git clone https://github.com/Minami189/LawBot.git" on cmd on any directory you want

move the backend folder inside the lawbot folder you just pulled to xampp/htdocs


# Ollama

install ollama https://ollama.com/ and run the exe and proceed

after installing, it will automatically open ollama, go to settings and press sign in

after signing in, choose to connect it

open cmd as administartor

type in "ollama pull llama3.1" and hit enter then wait for it to finish

after that finishes, type in "ollama pull gpt-oss:120b-cloud" and hit enter


# Composer

go to https://getcomposer.org/download/ and install composer by clicking on Composer-Setup.exe

If it asks an option to "add this php to your path" make sure that "add this php to your path" is checked before continuing

after installing composer open cmd as administrator 

inside cmd enter in cd [the directory of the backend folder]

type composer update, wait for it to finish

type composer install and hit enter (composer require) wait for it to finish



# Backend Setup

start and open xampp 

open MySQL config and press my.ini

change the max_allowed_packet under key_buffer to max_allowed_packet=50M and save

open apache config and press php.ini and ctrl+f find the ;extension=zip

remove the semicolon at the beginning of extension=zip and save



# Starting Up

go open the lawbot folder that you pulled

create a command prompt terminal 

type in cd lawbot in your created terminal

type npm install and hit enter wait for it to finish

on xampp start both apache and MySQL

create a database named lawbotdb in the php myadmin and import lawbotdb(1) inside the empty database 

type npm run dev and hit enter

get the link and paste it on google
