Rails.application.routes.draw do
  namespace :api do
    get 'pages/index'
    get 'pages/show'
  end
  namespace :api do
    post 'user/token' => 'user_token#create'
    get 'users/current'
    resources :pages, only: %i(index, show)
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
