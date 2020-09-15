# Coconut Gallery

Web app that requests camera access, uploads a photo, and prompts the user to draw other photos using HTML canvas.

Written in Ruby on Rails w storage on S3.

![coconut gallery screenshot](https://i.imgur.com/0mgtmda.png)

## How to install
Assuming you already have Ruby on Rails installed ([or maybe you don't?](http://installrails.com/)):

* clone the repo: `git clone git@github.com:kingdomlevel/coconut_gallery.git`
* move to project directory: `cd coconut_gallery`
* install all the gems from Gemfile: `bundle install`
* run DB migrations: `rails db:migrate`
* start the server: `rails server`