class DrawingsController < ApplicationController
  def index
    @drawings = Photo.all
  end

  def show
    @drawing = Photo.find(params[:id])
  end

  def new
    @drawing = Photo.new
  end

  def create
    @drawing = Photo.new(form_params)
    @drawing.save
    redirect_to root_path
  end

  def form_params
    params.require(:drawing).permit(:picture, :flagged_innapropriate, :moderated, :photo)
  end
end
