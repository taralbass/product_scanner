class CreateProductScenario

  attr_reader :params, :product

  def initialize(params:)
    @params = params.symbolize_keys
  end

  def create!

    product_params = params.slice(:name)
    upc_codes = params[:upc_codes]

    ActiveRecord::Base.transaction do
      product = Product.create! product_params
      upc_codes.each do |upc_code|
        product.upcs.create! code: upc_code
      end

      @product = product
    end

  end

end
