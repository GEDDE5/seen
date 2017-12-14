class RoomsController < ApplicationController
  before_action :validate_user

  # GET /rooms/find-by?param=(slug/name)&value=(:slug/:name)
  def show
    slug = params[:slug]

    if @room = Room.find_by(slug: slug)
      if @room.attributes[:private]
        if @room.user_permitted?(@user)
          render json: @room.safe
        else
          res = { errors: ['This room requires a password'] }
          render json: res, status: :unauthorized
        end
      else
        render json: @room.safe
      end
    else
      res = { errors: ['Room does not exist'] }
      render json: res, status: :not_found
    end
  end

  # POST /rooms/auth
  def auth
    room_name, password = room_params.values_at(:name, :password)

    if @room = Room.find_by(name: room_name)
      if @room.attributes[:private]
        unless password
          if @room.user_permitted?(@user)
            render json: @room.safe
          else
            render json: { errors: false }
          end
        else
          if @room.authenticate!(password)
            @user.update_room_permissions!(@room)
            render json: @room.safe
          else
            res = { errors: ['Incorrect password'] }
            render json: res, status: :unauthorized
          end
        end
      else
        render json: @room.safe
      end
    else
      res = { errors: ['Room does not exist'] }
      render json: res, status: :unprocessable_entity
    end
  end

  # POST /rooms
  def create
    room_name, password = room_params.values_at(:name, :password)
    @room = Room.find_by(name: room_name)
    if @room
      res = { errors: ['Room already exists'] }
      render json: res, status: :unprocessable_entity
    else
      unless password
        render json: { errors: false }
      else
        @room = Room.new(room_params)

        if @room.save
          @user.update_room_permissions!(@room)
          render json: @room.safe, status: :created
        else
          res = { errors: @room.flat_errors }
          render json: res, status: :unprocessable_entity
        end
      end
    end
  end

  # DELETE /rooms/1
  def destroy
    @room.destroy
  end

  private
    # Only allow a trusted parameter "white list" through.
    def room_params
      params.require(:room).permit(:name, :password)
    end
end
