class UsersController < ApplicationController
  # GET /users/ident
  def show
    if current_user
      render json: current_user
    end
  end

  # POST /users/create
  def create
    @user = User.new()

    if @user.save
      render json: { user: @user, token: @user.generate_token }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
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
