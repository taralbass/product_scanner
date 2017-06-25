require 'rails_helper'

describe ProductsController do

  let(:parsed_json) { subject; JSON.parse(response.body) }

  describe "#index" do

    let!(:products) { create_list(:product, 2, upc_count: 2) }

    subject { get :index }

    it "should return https success" do
      subject
      expect(response).to have_http_status(:success)
    end

    it "should return expected json" do
      expect(parsed_json["products"].size).to eq(2)
      expect(parsed_json["products"].map { |p| p["id"] }).to match_array(products.map(&:id))
    end

  end

end
