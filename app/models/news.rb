class News < ActiveRecord::Base
belongs_to :news_category

has_many :favorites
has_many :users, :through => :favorites

has_attached_file :news, :styles => { :medium => "300x300>", :thumb => "100x100>", :iphone => "304x186#", :iphone_thumb => "75x75#"}
end
