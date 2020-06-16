class DrawingsController < ApplicationController



  def index
    @drawings = Drawing.all
  end

  def show
    @drawing = Drawing.find(params[:id])
  end

  def new
    byebug
    @photo = Photo.find(params[:photo_id])
    @drawing = Drawing.new
    nil
  end

  def create

    @drawing = Drawing.new(form_params)
    @drawing.save
    redirect_to root_path
  end

  def form_params
    params.require(:drawing).permit(:picture, :flagged_innapropriate, :moderated, :photo_id)
  end
end
