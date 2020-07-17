Rails.application.routes.draw do

get "pages/about"

  resources :photos do
    resources :drawings
  end
  root to: "pages#home"

end
