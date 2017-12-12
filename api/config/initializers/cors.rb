# Be sure to restart your server when you modify this file.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3000', 'l:3000', 'https://donaldgeddes.ca', 'https://www.donaldgeddes.ca'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
