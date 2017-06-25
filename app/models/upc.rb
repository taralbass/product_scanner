class Upc < ApplicationRecord

  belongs_to :product

  validates :code, presence: true, uniqueness: true
  validate :validate_code

  private

  def validate_code
    errors.add(:code, "is not valid") unless UPC.new(code).valid?
  end

end
