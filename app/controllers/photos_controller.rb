class PhotosController < ApplicationController

  def index
    @photos = Photo.all.reverse()
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
    @photo.picture = PictureAttachmentHelper.convert_data_uri_to_upload(params["photo"]["picture"])
    @photo.save
    redirect_to photos_path
  end

  def drawings
    @drawing = Drawing.new(form_params)
    @drawing.save
    redirect_to root_path
  end

# flag a picture as inappropriate
  def update
    @photo = Photo.find(params[:id])
    @photo.update_attribute(:flagged_innapropriate, true)
    redirect_to root_path
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    redirect_to root_path
  end

  def form_params
    params.require(:photo).permit(:picture, :flagged_innapropriate, :moderated)
  end


  # find photos with no drawings
  def unloved
    @photos = Photo.all.reverse()
  end

end
