import 'react-native-globals'
import PropTypes from 'prop-types'

import UpcScanner from './UpcScanner'
import Popup from './Popup'

class ProductChecker extends React.Component {

  constructor(props) {
    super(props)

    this.handleScan = this.handleScan.bind(this)
    this.dismissUpc = this.dismissUpc.bind(this)

    this.state = {
      upc: null
    }
  }

  handleScan(upc) {
    this.setState({ upc: upc })
  }

  dismissUpc() {
    this.setState({ upc: null })
  }

  renderFoundPopup() {
    return (
      <Popup
        style={this.props.style}
        onDismiss={this.dismissUpc}
      >
        <Text style={this.props.style.text}>
          Found: {this.state.upc}
        </Text>
      </Popup>
    )
  }

  renderNotFoundPopup() {
    return (
      <Popup
        style={this.props.style}
        onDismiss={this.dismissUpc}
      >
        <Text style={[this.props.style.text, this.props.style.errorText]}>
          Not Found: {this.state.upc}
        </Text>
      </Popup>
    )
  }

  renderLoadFailedIndicator() {
    return (
      <Text style={[this.props.style.text, this.props.style.errorText]}>
        There was a problem loading the UPC codes: {this.props.upcsLoadError}. Please try again.
      </Text>
    )
  }

  renderLoadingIndicator() {
    return (
      <Text style={this.props.style.text}>
        Loading UPC Codes...
      </Text>
    )
  }

  renderUpcScanner() {
    return (
      <UpcScanner
        style={this.props.style}
        onScan={this.handleScan}
      />
    )
  }

  render() {
    if (this.props.upcsLoadError) {
      return this.renderLoadFailedIndicator()
    }
    else if (Object.keys(this.props.upcHash).length == 0 && this.props.upcsLoading) {
      return this.renderLoadingIndicator()
    }
    else if (this.state.upc) {
      if (this.props.upcHash[this.state.upc]) {
        return this.renderFoundPopup()
      } else {
        return this.renderNotFoundPopup()
      }
    } else {
      return this.renderUpcScanner()
    }
  }
}

ProductChecker.propTypes = {
  upcHash: PropTypes.object.isRequired,
  upcsLoading: PropTypes.bool,
  upcsLoadError: PropTypes.string,
  style: PropTypes.object.isRequired,
}

export default ProductChecker
