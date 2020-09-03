class AdminController < ApplicationController

  def index
    @photos = Photo.all.reverse()
  end
  
end
