class DrawingsController < ApplicationController



  # def index
  #   @drawings = Photo.find(params[:photo_id]).drawings
  # end

  def show
    @drawing = Drawing.find(params[:id])
  end

  def new
    @photo = Photo.find(params[:photo_id])
    @drawing = Drawing.new
    nil
  end

  # POST: handle new drawing from form
  def create
    @drawing = Drawing.new(form_params)
    @drawing.save
    redirect_to root_path
  end

  def form_params
    params.require(:drawing).permit(:picture, :flagged_innapropriate, :moderated, :photo_id)
  end
end
