import { UPC_ACTIONS } from '../actions/UpcActionCreators'

const upcsInitialState = {
  upcs: [],
  upcsAreLoading: false,
  upcsLoadError: null,
}


function upcsReducer(state=upcsInitialState, action) {
  switch(action.type) {
    case UPC_ACTIONS.LOAD.STARTING:
      return Object.assign({}, state,
        {
          upcsAreLoading: true,
        }
      )

    case UPC_ACTIONS.LOAD.SUCCEEDED:
      return Object.assign({}, state,
        {
          upcsAreLoading: false,
          upcs: action.upcs,
          upcsLoadError: null,
        }
      )

    case UPC_ACTIONS.LOAD.FAILED:
      return Object.assign({}, state,
        {
          upcsAreLoading: false,
          upcsLoadError: action.error,
        }
      )

    default:
      return state
  }
}

export { upcsReducer }
