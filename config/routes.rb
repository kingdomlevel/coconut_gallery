Rails.application.routes.draw do

  resources :photos do
    resources :drawings
  end
  root to: "photos#index"

end
