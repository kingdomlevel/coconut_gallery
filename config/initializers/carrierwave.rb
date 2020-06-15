CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:      Rails.application.credentials.send(Rails.env)[:aws_key],
    aws_secret_access_key:  Rails.application.credentials.send(Rails.env)[:aws_secret],
    region:                 Rails.application.credentials.send(Rails.env)[:aws_region]
  }
  config.fog_directory  = Rails.application.credentials.send(Rails.env)[:aws_bucket]
end