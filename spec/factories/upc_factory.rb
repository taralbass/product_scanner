FactoryGirl.define do

  factory :upc do

    product
    code { UPC.complete(FFaker.numerify("###########")) }

  end

end
