class PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end

  def show
    @photo = Photo.find(params[:id])
  end

  # get the new photo form
  #  renders views/photos/new.html
  def new
    @photo = Photo.new
  end

  #  handle new photo from form
  def create
    @photo = Photo.new(form_params)
    @photo.save
    redirect_to root_path
  end

  def drawings
    @drawing = Drawing.new(form_params)
    @drawing.save
    redirect_to root_path
  end

  def form_params
    params.require(:photo).permit(:picture, :flagged_innapropriate, :moderated)
  end

end
