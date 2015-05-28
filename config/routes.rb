Rails.application.routes.draw do

  root 'welcome#index'
  namespace :api do 
    resources :adventures
  end 
end
