import { connect } from 'react-redux'

import Catalog from './Catalog'
import { loadProducts, createProduct, clearErrors } from 'actions/ProductActionCreators'

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    showSpinner: state.productsAreLoading || state.productIsCreating,
    error: state.productsLoadError || state.productCreateError,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onProductSubmit: (params) => {
      dispatch(createProduct(params))
    },
    onErrorDismiss: () => {
      dispatch(clearErrors())
    },
  }
}

const CatalogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)

export default CatalogContainer
