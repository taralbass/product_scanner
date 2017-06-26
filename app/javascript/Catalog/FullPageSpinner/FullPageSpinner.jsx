import { Circle } from 'better-react-spinkit'

import './FullPageSpinner.scss'

class FullPageSpinner extends React.Component {

  render() {
    return (
      <div className="full-page-spinner">
        <div className="spinner">
          <Circle color='blue' size={150}/>
        </div>
      </div>
    )
  }

}

export default FullPageSpinner
