require 'rails_helper'

describe Upc do

  context "#validate_code" do

    let(:upc) { build(:upc, code: code) }
    subject { upc.valid? }

    context "valid code" do

      let(:code) { build(:upc).code }

      it { is_expected.to be true }

      it "should have no errors" do
        subject
        expect(upc.errors).to be_empty
      end

    end

    context "invalid code" do

      let(:code) { "123" }

      it { is_expected.to be false }

      it "should have an error on upc" do
        subject
        expect(upc.errors[:code].size).to eq(1)
        expect(upc.errors[:code].first).to match(/not valid/)
      end

    end

  end

end
