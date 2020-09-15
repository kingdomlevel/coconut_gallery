# Coconut Gallery

Web app that requests camera access, uploads a photo, and prompts the user to draw other photos using HTML canvas.

Written in Ruby on Rails w storage on S3.

![coconut gallery screenshot](https://i.imgur.com/0mgtmda.png)

## How to install
Running the application requires a secret key to access AWS S3 credentials - [get in touch](mailto:niall@shamgate.co) if you want access!

### Pre-requisites:
* Ruby on Rails ([great guide here!](http://installrails.com/)):
* **[ImageMagick](https://imagemagick.org/script/index.php)** for re-sizing: `brew install imagemagick`

### Steps:
* clone the repo: `git clone git@github.com:kingdomlevel/coconut_gallery.git`
* move to project directory: `cd coconut_gallery`
* install all the gems from Gemfile: `bundle install`
* run DB migrations: `rails db:migrate`
* start the server: `rails server`

Any problems at all just [reach out](mailto:niall@shamgate.co)