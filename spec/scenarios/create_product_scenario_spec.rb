require 'rails_helper'

describe CreateProductScenario do

  let(:scenario) { CreateProductScenario.new(params: params) }

  describe "#create!" do
    let(:uncommitted_product) { build(:product, upc_count: 2) }
    subject { scenario.create! }

    context "with good parameters" do

      let(:params) {
        {
          name: uncommitted_product.name,
          upc_codes: uncommitted_product.upc_codes
        }
      }

      it "should create product" do
        expect { subject }.to change{ Product.count }.from(0).to(1)
        product = Product.first
        expect(product.name).to eq(uncommitted_product.name)
      end

      it "should create upcs" do
        expect { subject }.to change{ Upc.count }.from(0).to(2)

        product = Product.first
        expect(product.upc_codes).to match_array(uncommitted_product.upc_codes)
      end

      it "exposes created product" do
        subject
        product = Product.first
        expect(scenario.product).to eq(product)
        expect(scenario.product.upc_codes).to eq(uncommitted_product.upc_codes)
      end

    end

    context "with a bad UPC code" do

      let(:params) {
        {
          name: uncommitted_product.name,
          upc_codes: [ "123", "456" ],
        }
      }

      it "should raise exception" do
        expect { subject }.to raise_error(ActiveRecord::RecordInvalid)
      end

      it "should not expose created product" do
        subject rescue nil
        expect(scenario.product).to be nil
      end

      it "should not create incomplete product" do
        expect { subject rescue nil }.to_not change{ Product.count }.from(0)
      end

    end
  end


end
