import './NewProductForm.scss'

class NewProductForm extends React.Component {

  constructor(props) {
    super(props)

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleUpcCodeChange = this.handleUpcCodeChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      name: "",
      upcCode: "",
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  handleUpcCodeChange(e) {
    this.setState({ upcCode: e.target.value })
  }

  handleSubmit() {
    this.props.onSubmit({
      name: this.state.name,
      upc_codes: [ this.state.upcCode ],
    })

    this.setState({
      name: "",
      upcCode: "",
    })

    ReactDOM.findDOMNode(this.refs["name-input"]).focus()
  }

  buttonDisabled() {
    return !(this.state.name && this.state.upcCode)
  }

  render() {
    return (
      <div className="new-product-form">
        <div className="name-container">
          <label>New Product Name:</label>
          <input
            className="name-input"
            ref="name-input"
            autoFocus={true}
            type="string"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div className="upc-code-container">
          <label>UPC Code:</label>
          <input
            className="upc-code-input"
            type="string"
            value={this.state.upcCode}
            onChange={this.handleUpcCodeChange}
          />
        </div>
        <div className="button-container">
          <button onClick={this.handleSubmit} disabled={this.buttonDisabled()}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}

NewProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default NewProductForm

