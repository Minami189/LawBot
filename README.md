# git clone

clone this repo with "git clone https://github.com/Minami189/LawBot.git" on cmd on any directory you want

inside the  folder you just pulled you will find a folder named "backend"

move or copy that folder to xampp/htdocs


# Ollama

install ollama https://ollama.com/ and run the exe and proceed

after installing, it will automatically open ollama, go to settings and press sign in

after signing in, choose to connect it

open cmd as administartor

type in "ollama pull llama3.1" and hit enter then wait for it to finish

after that finishes, type in "ollama pull gpt-oss:120b-cloud" and hit enter


# Composer

go to https://getcomposer.org/download/ and install composer by clicking on Composer-Setup.exe

after the .exe installs, run it and continue to install it

If it asks an option to "add this php to your path" make sure that "add this php to your path" is checked before continuing

proceed to installing

after installing composer close previous command prompts, then open cmd as administrator 

inside cmd enter in cd [the directory of inside the backend folder you moved to htdocs from earlier]

type "composer update" and hit enter, wait for it to finish

type "composer install" and hit enter wait for it to finish



# Backend Setup

start and open xampp 

open MySQL config and press my.ini

change the max_allowed_packet under key_buffer to max_allowed_packet=50M and save

open apache config and press php.ini and ctrl+f find the ;extension=zip

remove the semicolon at the beginning of extension=zip and save



# Starting Up

on xampp start both apache and MySQL

create a database named lawbotdb in the php myadmin 

inside the backend folder you will find a file named lawbotdb(1), import that inside the lawbotdb

go open the lawbot folder that you pulled in vscode

create a command prompt terminal 

type in cd lawbot in your created terminal

type npm install and hit enter wait for it to finish

type npm run dev and hit enter

make sure the link it gives is localhost:5173 (if it shows something else, close other terminals running an instance of the website)

get the link and paste it on google
