class RoomsController < ApplicationController
  # GET /rooms/find-by?param=(slug/name)&value=(:slug/:name)
  def show
    if current_user && current_room
      if current_room.user_permitted?(current_user)
        render json: current_room.safe
      else
        res = { errors: ['This room requires a password'] }
        render json: response, status: :unauthorized
      end
    end
  end

  # POST /rooms/:id/auth
  def auth
    if current_user
      id = params[:id]
      password = room_params[:password]
      if id && password
        if @room = Room.find_by(id: id)
          if @room.attributes[:private]
            if @room.authenticate!(password)
              current_user.update_room_permissions!(@room)
              render json: @room.safe
            else
              res = { errors: ['Incorrect password'] }
              render json: res, status: :unauthorized
            end
          else
            render json: @room.safe
          end
        else
          res = { errors: ['Unable to find room'] }
          render json: res, status: :not_found
        end
      else
        res = { errors: ['Missing required params (id, password)'] }
        render json: res, status: :bad_request
      end
    end
  end

  # POST /rooms
  def create
    @room = Room.new(room_params)

    if @room.save
      current_user.update_room_permissions!(@room)
      render json: @room.safe, status: :created
    else
      res = { errors: @room.flat_errors }
      render json: res, status: :unprocessable_entity
    end
  end

  # DELETE /rooms/1
  def destroy
    @room.destroy
  end

  private
    # Only allow a trusted parameter "white list" through.
    def room_params
      params.require(:room).permit(:id, :name, :password)
    end
end
