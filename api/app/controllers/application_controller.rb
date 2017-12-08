class ApplicationController < ActionController::API
  def current_user
    if header
      token = header.split[1]
      if token
        begin
          token = Token.decode(token).first
        rescue
          render json: { errors: ['Error decoding Token'] }, status: :unprocessable_entity
          return
        end
        if Token.is_valid? token
          User.find(token['sub'])
        else
          render json: {
              errors: [
                'Unable to verify validty of token',
                'Token may have expired or been tampered with'
              ]
            }, status: :unprocessable_entity
          return
        end
      else
        render json: { errors: ['Error decoding Token'] }, status: :unprocessable_entity
        return
      end
    else
      render json: { errors: ['Unable to identify authorization header'] }, status: :bad_request
      return
    end
  end

  def header
    request.headers['Authorization']
  end
end
