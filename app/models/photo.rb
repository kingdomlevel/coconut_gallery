class Photo < ApplicationRecord
  mount_uploader :picture, PhotoImageUploader
  has_many :drawings
end
