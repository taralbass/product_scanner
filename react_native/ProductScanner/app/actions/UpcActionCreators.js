const UPC_ACTIONS = {
  LOAD:  {
    STARTING: 'ACTIONS.UPCS.LOAD.STARTING',
    SUCCEEDED: 'ACTIONS.UPCS.LOAD.SUCCEEDED',
    FAILED: 'ACTIONS.UPCS.LOAD.FAILED',
  },
}

const upcsEndpoint = 'http://192.168.1.5:3000/upcs'

function loadUpcs() {
  return function(dispatch) {
    dispatch(loadUpcsStarting())

    fetch(upcsEndpoint)
    .then((response) => {
      if (response.status >= 300) {
        throw new Error("Bad HTTP reponse: " + response.status)
      }
      response.json()
      .then((json) => {
        if (json["error"]) {
          dispatch(loadUpcsFailed(json.error.message))
        } else {
          dispatch(loadUpcsSucceeded(json))
        }
      })
      .catch((error) => {
        console.error("JSON Error: ", error.message)
        console.error(error.stack)
        dispatch(loadUpcsFailed(error.message))
      })
    })
    .catch((error) => {
      console.error("Error: ", error.message)
      console.error(error.stack)
      console.log(loadUpcsFailed(error.message))
      dispatch(loadUpcsFailed(error.message))
    })
  }
}

/* private */

/* load */

function loadUpcsStarting() {
  return {
    type: UPC_ACTIONS.LOAD.STARTING,
  }
}

function loadUpcsSucceeded(json) {
  return {
    type: UPC_ACTIONS.LOAD.SUCCEEDED,
    upcs: json.upc
  }
}

function loadUpcsFailed(error) {
  return {
    type: UPC_ACTIONS.LOAD.FAILED,
    error: error
  }
}


export { UPC_ACTIONS, loadUpcs }
