import './Product.scss'

class Product extends React.Component {

  constructor(props) {
    super(props)
  }

  renderUpcCode(upcCode) {
    return (
      <span className="upc-code" key={upcCode}>{upcCode}</span>
    )
  }

  render() {
    return (
      <div className="product">
        <span className="name">{this.props.product.name}</span>
        {this.props.product.upc_codes.map((upc_code) => this.renderUpcCode(upc_code))}
      </div>
    )
  }

}

Product.propTypes = {
  product: PropTypes.object.isRequired,
}

export default Product
