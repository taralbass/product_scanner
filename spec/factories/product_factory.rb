FactoryGirl.define do

  factory :product do
 
    transient do
      upc_count { 0 }
    end

    name { FFaker::Product.product }
 
    after(:build) do |product, evaluator|
      product.upcs = build_list(:upc, evaluator.upc_count, product: product)
    end

  end

end
