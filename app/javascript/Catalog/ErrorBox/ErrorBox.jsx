import './ErrorBox.scss'

const ENTER_KEYCODE = 13
const ESC_KEYCODE = 27

class ErrorBox extends React.Component {

  constructor(props) {
    super(props)

    this.handleDismiss = this.handleDismiss.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp)
    ReactDOM.findDOMNode(this.refs.button).focus();
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp)
  }

  handleKeyUp(e) {
    if (e.keyCode === ESC_KEYCODE) {
      this.handleDismiss()
    }
  }

  handleDismiss() {
    this.props.onDismiss()
  }

  render() {
    return (
      <div className="error-box">
        <div className="popup">
          <div className="close-icon" onClick={this.handleDismiss}>x</div>
          <div className="spacer"/>
          <div className="error-message">{this.props.message}</div>
          <button ref="button" onClick={this.handleDismiss}>OK</button>
        </div>
      </div>
    )
  }
}

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
}

export default ErrorBox
