CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'

  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     '1234',                        # required unless using use_iam_profile
    aws_secret_access_key: 'abcd',                        # required unless using use_iam_profile

  }
  config.fog_directory  = 'rails'                                      # required  config.fog_attributes = { cache_control: "public, max-age=#{365.days.to_i}" } # optional, defaults to {}
end
