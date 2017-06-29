class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  rescue_from 'Exception' do |exception|
    Rails.logger.error "ERROR: #{exception.message} #{exception.backtrace.join("\n")}"
    render json: { error: { message: 'Internal Server Error' } }, status: :ok
  end

end
