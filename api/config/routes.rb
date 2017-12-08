Rails.application.routes.draw do
  get 'users/ident', to: 'users#show'
  post 'users/create', to: 'users#create'
end
