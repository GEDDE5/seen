class ApplicationController < ActionController::API
  def current_user
    if header = request.headers['Authorization']
      if token = header.split[1]
        begin
          token = Token.decode(token).first
        rescue
          res = { errors: ['Error decoding token'] }
          render json: res, status: :unprocessable_entity and return
        end
        if Token.is_valid? token
          User.find(token['sub'])
        else
          res = {
            errors:
              [
                'Unable to verify validity of token',
                'Token is either malformed or expired'
              ]
          }
          render json: res, status: :unprocessable_entity and return
        end
      else
        res = { errors: ['Missing data in authorization header'] }
        render json: res, status: :unprocessable_entity and return
      end
    else
      res = { errors: ['Unable to identify authorization header'] }
      render json: res, status: :bad_request and return
    end
  end

  def current_room
    permitted_params = ['id', 'slug', 'name']
    param, value = params.values_at(:param, :value)
    if param && value
      if permitted_params.include? param
        if room = Room.send("find_by_#{param}", value)
          room
        else
          res = { errors: ["Unable to find room by #{param} (#{value})"] }
          render json: res, status: :not_found and return
        end
      else
        res = { errors: ['Invalid find-by parameter'] }
        render json: res, status: :bad_request and return
      end
    else
      res = { errors: ['Unable to find param and/or value'] }
      render json: res, status: :bad_request and return
    end
  end
end
