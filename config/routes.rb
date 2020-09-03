Rails.application.routes.draw do

get "pages/about"
get "photos/unloved", to: "photos#unloved"


  resources :photos do
    resources :drawings
  end
  root to: "pages#home"

  resources :admin 

end
