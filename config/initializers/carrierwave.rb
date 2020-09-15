CarrierWave.configure do |config|
  if Rails.application.credentials.send(Rails.env) != nil

    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:      Rails.application.credentials.send(Rails.env)[:aws_key],
      aws_secret_access_key:  Rails.application.credentials.send(Rails.env)[:aws_secret],
      region:                 Rails.application.credentials.send(Rails.env)[:aws_region]
    }
    config.fog_directory  = Rails.application.credentials.send(Rails.env)[:aws_bucket]
  else
    abort("ABORTED: missing secrets key. contact @kingdomlevel on github for dev access")
  end
end