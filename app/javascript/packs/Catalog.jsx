// these are exposed via expose-loader but need to be included
// to be part of bundle
import 'react'
import 'react-dom'
import 'prop-types'

import CatalogContainer from 'Catalog'
import store from 'store/Store'
import { loadProducts } from 'actions/ProductActionCreators'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CatalogContainer store={store}/>,
    document.body.appendChild(document.createElement('div')),
  )
})

store.dispatch(loadProducts())
