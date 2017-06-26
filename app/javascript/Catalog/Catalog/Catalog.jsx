import NewProductForm from 'Catalog/NewProductForm'
import ProductList from 'Catalog/ProductList'
import FullPageSpinner from 'Catalog/FullPageSpinner'
import ErrorBox from 'Catalog/ErrorBox'

import './Catalog.scss'

class Catalog extends React.Component {

  constructor(props) {
    super(props)
  }

  renderSpinner() {
    return this.props.showSpinner ? (
      <FullPageSpinner/>
    ) : (false)
  }

  renderError() {
    return this.props.error ? (
      <ErrorBox
        onDismiss={this.props.onErrorDismiss}
        message="There was an error! Please try again."
      />
    ) : (false)
  }

  render() {
    return (
      <div className="catalog">
        <h1>Product Catalog</h1>
        <NewProductForm onSubmit={this.props.onProductSubmit}/>
        <ProductList products={this.props.products}/>
        {this.renderSpinner()}
        {this.renderError()}
      </div>
    )
  }
}

Catalog.propTypes = {
  products: PropTypes.array.isRequired,
  showSpinner: PropTypes.bool,
  error: PropTypes.string,
  onProductSubmit: PropTypes.func.isRequired,
  onErrorDismiss: PropTypes.func.isRequired,
}

export default Catalog
