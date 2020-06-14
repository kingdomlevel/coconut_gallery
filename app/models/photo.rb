class Photo < ApplicationRecord
  mount_uploader :picture, PhotoImageUploader
end
