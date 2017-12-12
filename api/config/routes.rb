Rails.application.routes.draw do
  post 'users', to: 'users#create'
  get 'users/ident', to: 'users#show'
  get 'users/update-token', to: 'users#update_token'

  get 'rooms/find-by', to: 'rooms#show'
  post 'rooms', to: 'rooms#create'
  post 'rooms/:id/auth', to: 'rooms#auth'
end
