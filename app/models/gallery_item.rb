class GalleryItem < ActiveRecord::Base
  belongs_to :gallery
  has_attached_file :image, :styles => {:iphone_gallery => "320x480>", :iphone_thumb => "75x75#" }
end
