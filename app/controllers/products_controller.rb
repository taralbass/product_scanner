class ProductsController < ApplicationController

  def index
    # this sleep call is just to demo spinner
    sleep 1 unless Rails.env.test?

    render json: Product.includes(:upcs).all, status: :ok
  end

  def create
    # this sleep call is just to demo spinner
    sleep 1 unless Rails.env.test?

    permitted_params = params.require(:product).permit(:name, upc_codes: []).to_hash

    scenario = CreateProductScenario.new(params: permitted_params)
    scenario.create!

    render json: scenario.product, status: :created
  end

end
