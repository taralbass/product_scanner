require 'rails_helper'

describe Product do

  describe "#upc_codes" do

    let!(:product) { create(:product) }
    let!(:upc1) { create(:upc, product: product) }
    let!(:upc2) { create(:upc, product: product) }

    subject { product.reload.upc_codes }

    it "returns array of UPC codes" do

      expect(subject).to match_array([ upc1.code, upc2.code ])
    end

  end

end
