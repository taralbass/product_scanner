class Product < ApplicationRecord

  has_many :upcs

  validates :name, presence: true

end
