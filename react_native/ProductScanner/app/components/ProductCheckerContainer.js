import 'react-native-globals'

import { connect } from 'react-redux'

import ProductChecker from './ProductChecker'
import { loadUpcs } from '../actions/UpcActionCreators'
import { getUpcHash } from '../selectors/UpcSelectors'

const mapStateToProps = (state, ownProps) => {
  return {
    upcHash: getUpcHash(state),
    upcsLoading: state.upcsAreLoading,
    upcsLoadError: state.upcsLoadError,
  }
}

const ProductCheckerContainer = connect(
  mapStateToProps
)(ProductChecker)

export default ProductCheckerContainer

