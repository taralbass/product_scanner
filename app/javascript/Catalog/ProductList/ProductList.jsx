import Product from 'Catalog/Product'

import './ProductList.scss'

class ProductList extends React.Component {

  constructor(props) {
    super(props)
  }

  sortedProducts() {
    return this.props.products.sort((a, b) => a.name.localeCompare(b.name))
  }

  render() {
    return (
      <div className="product-list">
        <h3>Existing Products</h3>
        { this.sortedProducts().map((product) => <Product key={product.id} product={product}/>) }
      </div>
    )
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
}

export default ProductList
