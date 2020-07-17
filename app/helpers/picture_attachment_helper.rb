module PictureAttachmentHelper
  class << self

    # # p sure the below will be un-used methods as we are now decoding using methods below
    # def attach(model,picture)
    #   base_64_image = picture.gsub!(/^data:.*,/, '')
    #   decoded_image - Base64.decode64(base_64_image)

    #   model.picture.attach(
    #     io: StringIO.new(decoded_image),
    #     filename: "photo_picture_#{unique_string}.jpeg"
    #   )
    # end
    #
    # private def unique_string
    #   SecureRandom.urlsafe_base64(10)
    # end


    # # below methods from here https://www.ajibanda.com/2015/02/cropping-image-in-ruby-rails-via-carrierwave-and-cropbox.html
    # Split up a data uri
    def split_base64(uri_str)
      if uri_str.match(%r{^data:(.*?);(.*?),(.*)$})
        uri = Hash.new
        uri[:type] = $1 # "image/png"
        uri[:encoder] = $2 # "base64"
        uri[:data] = $3 # data string
        uri[:extension] = $1.split('/')[1] # "png"
        return uri
      else
        return nil
      end
    end
    
    # Convert data uri to uploaded file. Expects object hash, eg: params[:post]
    def convert_data_uri_to_upload(data_uri)
      if !data_uri.blank?
        image_data = split_base64(data_uri)
        image_data_string = image_data[:data]
        image_data_binary = Base64.decode64(image_data_string)
    
        temp_img_file = Tempfile.new("data_uri-upload")
        temp_img_file.binmode
        temp_img_file << image_data_binary
        temp_img_file.rewind
    
        img_params = {:filename => "data-uri-img.#{image_data[:extension]}", :type => image_data[:type], :tempfile => temp_img_file}
        uploaded_file = ActionDispatch::Http::UploadedFile.new(img_params)
    
        return uploaded_file
      end
    
      return nil
    end
  end
end