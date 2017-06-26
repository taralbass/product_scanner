class ProductsController < ApplicationController

  def index
    render json: Product.all
  end

  def create
    permitted_params = params.require(:product).permit(:name, upc_codes: []).to_hash

    scenario = CreateProductScenario.new(params: permitted_params)
    scenario.create!

    render json: scenario.product, status: :created
  end

end
