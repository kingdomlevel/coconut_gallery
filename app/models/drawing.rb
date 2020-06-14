class Drawing < ApplicationRecord
  mount_uploader :picture, PhotoImageUploader

end
