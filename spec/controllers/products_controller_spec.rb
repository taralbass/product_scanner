require 'rails_helper'

describe ProductsController do

  let(:parsed_json) { subject; JSON.parse(response.body) }

  describe "#index" do

    let!(:products) { create_list(:product, 2, upc_count: 2) }

    subject { get :index }

    it "should return https success" do
      subject
      expect(response).to have_http_status(:ok)
    end

    it "should return expected json" do
      expect(parsed_json["products"].size).to eq(2)
      expect(parsed_json["products"].map { |p| p["id"] }).to match_array(products.map(&:id))
    end

  end

  describe "#create" do

    let(:uncommitted_product) { build(:product, upc_count: 2) }

    subject { post :create, params: { product: params } }

    context "with valid parameters" do

      let(:params) do
        {
          name: uncommitted_product.name,
          upc_codes: uncommitted_product.upcs.map(&:code)
        }
      end

      it "should return http success" do
        subject
        expect(response).to have_http_status(:created)
      end

      it "creates product and upcs" do
        expect { subject }.to change { Product.count }.from(0).to(1)
        product = Product.first
        expect(product.name).to eq(uncommitted_product.name)
        expect(product.upc_codes).to match_array(uncommitted_product.upc_codes)
      end

      it "renders product json" do
        expect(parsed_json["product"]["name"]).to eq(uncommitted_product.name)
        expect(parsed_json["product"]["upc_codes"]).to match_array(uncommitted_product.upc_codes)
      end

    end

    context "with invalid parameters" do

      let(:params) do
        {
          name: uncommitted_product.name,
          upc_codes: [ "123" ]
        }
      end

      it "should return http ok" do
        subject
        expect(response).to have_http_status(:ok)
      end

      it "should provide error in json" do
        expect(parsed_json["error"]["message"]).to match(/Internal Server Error/)
      end


      it "should not create a product" do
        expect { subject }.to_not change { Product.count }.from(0)
      end

    end

  end

end
