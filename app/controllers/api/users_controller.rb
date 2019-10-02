class Api::UsersController < ApplicationController
  def current
    render json: current_user.as_json(only: %i(id))
  end
end
