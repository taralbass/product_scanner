require 'rails_helper'

describe UpcsController do

  let(:parsed_json) { subject; JSON.parse(response.body) }

  describe "#index" do

    let!(:upcs) { create_list(:upc, 2) }

    subject { get :index }

    it "should return https success" do
      subject
      expect(response).to have_http_status(:ok)
    end

    it "should return expected json" do
      expect(parsed_json["upc"].size).to eq(2)
      expect(parsed_json["upc"].map { |u| u["upc"] }).to match_array(upcs.map(&:code))
    end

  end

end
