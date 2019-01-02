Rails.application.routes.draw do
  root 'application#home'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/auth/facebook/callback' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  resources :customers
  resources :customers, only: [:show] do
    resources :rentals, only: [:index]
  end
  get '/signup' => 'customers#new'
  post '/signup' => 'customers#create'

  post '/rentals', to: 'rentals#create'
  get '/rentals/:id', to: 'rentals#update'

  resources :movies, only: [:index]
  resources :movies, only: [:show] do
    get '/famous_quotes/new', to: 'famous_quotes#new'
    post '/famous_quotes', to: 'famous_quotes#create'
  end

  get '/famous_quotes/:id', to: 'famous_quotes#show'
  get '/customers/:id', to: 'customers#show'



end
