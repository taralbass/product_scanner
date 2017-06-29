import 'react-native-globals'
import PropTypes from 'prop-types'
import Camera from 'react-native-camera'

class UpcScanner extends React.Component {

  constructor(props) {
    super(props)
    this.handleBarcodeScan = this.handleBarcodeScan.bind(this)
    this.convertEan13ToUpc = this.convertEan13ToUpc.bind(this)
  }

  convertEan13ToUpc(ean13) {
    return ean13.substring(1, 13)
  }

  handleBarcodeScan(e) {
    this.props.onScan(this.convertEan13ToUpc(e.data))
  }

  render() {
    return (
      <Camera
        style={styles.camera}
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={this.handleBarcodeScan.bind(this)}
        barCodeTypes={['ean13']}
      >
        <Text style={styles.instructions}>[SCAN UPC CODE]</Text>
      </Camera>
    )
  }
}

UpcScanner.propTypes = {
  onScan: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  instructions: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
    fontWeight: 'bold',
  }
})

export default UpcScanner
