class Product < ApplicationRecord

  has_many :upcs

  validates :name, presence: true

  def upc_codes
    upcs.map(&:code)
  end

end
