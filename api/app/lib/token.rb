require 'jwt'

class Token
  def self.encode(payload)
    payload.merge!(meta)
    JWT.encode(payload, secret_key_base)
  end

  def self.decode(token)
    JWT.decode(token, secret_key_base)
  end

  def self.is_valid?(payload)
    p payload
    (payload['iss'] == meta[:iss]) && !expired?(payload)
  end

  def self.meta
    {
      iss: ENV['APP'],
      iat: Time.now.to_i,
      exp: 7.days.from_now.to_i
    }
  end

  def self.expired?(payload)
    Time.at(payload['exp']) < Time.now
  end

  private

  def self.secret_key_base
    Rails.application.secrets.secret_key_base
  end
end
