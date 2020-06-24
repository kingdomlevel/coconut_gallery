class PictureAttachmentHelper
  class << self
    def attach(model,picture)
      base_64_image = picture.gsub!(/^data:.*,/, '')
      decoded_image - Base64.decode64(base_64_image)

      model.picture.attach(
        io: StringIO.new(decoded_image),
        filename: "photo_picture_#{unique_string}.jpeg"
      )
    end

    private def unique_string
      SecureRandom.urlsafe_base64(10)
    end
  end
end
