module DrawingsHelper
  def create
    @drawing = Drawing.new(form_params)
    @drawing.save
    redirect_to root_path
  end
end
