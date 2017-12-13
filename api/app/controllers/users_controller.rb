class UsersController < ApplicationController
  before_action :validate_user, except: [:create]

  # GET /users/ident
  def show
    if @user
      render json: @user
    end
  end

  # POST /users/create
  def create
    @user = User.new

    if @user.save
      render json: { data: @user, token: @user.generate_token }, status: :created
    else
      render json: @user.flat_errors, status: :unprocessable_entity
    end
  end

  # GET /users/update-token
  def update_token
    if @user
      render json: { token: @user.generate_token }
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Only allow a trusted parameter "white list" through.
    def user_params
      params.fetch(:user, {})
    end
end
