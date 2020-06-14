CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'

  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     'AKIATYQVUX7CMNK2YIM2',                        # required unless using use_iam_profile
    aws_secret_access_key: '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',                        # required unless using use_iam_profile

  }
  config.fog_directory  = 'railsagain'                                      # required  config.fog_attributes = { cache_control: "public, max-age=#{365.days.to_i}" } # optional, defaults to {}
end
