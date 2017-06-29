class UpcsController < ApplicationController

  def index
    # just to expose loading indicator for demo
    sleep 1 unless Rails.env.test?

    # manually serialize as the specs for this action do not align with
    # the app-wide approach
    serializations = Upc.includes(:product).all.map do |upc|
      Rails.logger.info upc.inspect
      UpcSerializer.new(upc).as_json
    end

    render json: { upc: serializations }, status: :ok
  end

end
