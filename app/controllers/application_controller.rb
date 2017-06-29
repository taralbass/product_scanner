class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  rescue_from 'Exception' do |exception|
    render json: { error: { message: 'Internal Server Error' } }, status: :ok
  end

end
