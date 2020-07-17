class Drawing < ApplicationRecord
  mount_uploader :picture, PhotoImageUploader
  belongs_to :photo
end
