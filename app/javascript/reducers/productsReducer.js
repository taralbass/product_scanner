import { PRODUCT_ACTIONS } from 'actions/ProductActionCreators'

const productsInitialState = {
  products: [],
  productsAreLoading: false,
  productsLoadError: null,
  productIsCreating: false,
  productCreateError: null,
}


function productsReducer(state=productsInitialState, action) {
  switch(action.type) {
    case PRODUCT_ACTIONS.LOAD.STARTING:
      return Object.assign({}, state,
        {
          productsAreLoading: true,
        }
      )

    case PRODUCT_ACTIONS.LOAD.SUCCEEDED:
      return Object.assign({}, state,
        {
          productsAreLoading: false,
          products: action.products,
          productsLoadError: null,
        }
      )

    case PRODUCT_ACTIONS.LOAD.FAILED:
      return Object.assign({}, state,
        {
          productsAreLoading: false,
          productsLoadError: action.error,
        }
      )

    case PRODUCT_ACTIONS.CREATE.STARTING:
      return Object.assign({}, state,
        {
          productIsCreating: true,
        }
      )

    case PRODUCT_ACTIONS.CREATE.SUCCEEDED:
      return Object.assign({}, state,
        {
          productIsCreating: false,
          products: state.products.concat(action.product),
          productCreateError: null,
        }
      )

    case PRODUCT_ACTIONS.CREATE.FAILED:
      return Object.assign({}, state,
        {
          productIsCreating: false,
          productCreateError: action.error,
        }
      )

    case PRODUCT_ACTIONS.CLEAR_ERRORS: {
      return Object.assign({}, state,
        {
          productsLoadError: null,
          productCreateError: null,
        }
      )
    }

    default:
      return state
  }
}

export { productsReducer }
