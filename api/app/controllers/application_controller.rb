class ApplicationController < ActionController::API
  def validate_user
    if header = request.headers['Authorization']
      if token = header.split[1]
        begin
          token = Token.decode(token).first
        rescue
          res = { errors: ['Error decoding token'] }
          render json: res, status: :unprocessable_entity and return
        end
        if Token.is_valid? token
          @user = User.find(token['sub'])
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
end
