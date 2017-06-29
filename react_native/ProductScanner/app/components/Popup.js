import 'react-native-globals'
import PropTypes from 'prop-types'

class Popup extends React.Component {

  render() {
    return (
      <View style={[this.props.style.view, styles.view]}>
        {this.props.children}
        <View style={[this.props.style.view, styles.buttonView]}>
          <Button
            onPress={this.props.onDismiss}
            title={this.props.buttonText || "OK"}
          />
        </View>
      </View>
    )
  }

}

Popup.propTypes = {
  style: PropTypes.object.isRequired,
  onDismiss: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginLeft: 60,
    marginRight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonView: {
    marginTop: 30,
    width: '100%',
  },
})

export default Popup
