const PRODUCT_ACTIONS = {
  LOAD:  {
    STARTING: 'ACTIONS.PRODUCTS.LOAD.STARTING',
    SUCCEEDED: 'ACTIONS.PRODUCTS.LOAD.SUCCEEDED',
    FAILED: 'ACTIONS.PRODUCTS.LOAD.FAILED',
  },

  CREATE:  {
    STARTING: 'ACTIONS.PRODUCT.CREATE.STARTING',
    SUCCEEDED: 'ACTIONS.PRODUCT.CREATE.SUCCEEDED',
    FAILED: 'ACTIONS.PRODUCT.CREATE.FAILED',
  },

  CLEAR_ERRORS: 'ACTIONS.CLEAR_ERRORS',
}

const productsEndpoint = '/products'

function loadProducts() {
  return function(dispatch) {
    dispatch(loadProductsStarting())

    fetch(productsEndpoint)
    .then((response) => {
      if (response.status >= 300) {
        throw new Error("Bad HTTP reponse: " + response.status)
      }
      response.json()
      .then((json) => {
        dispatch(loadProductsSucceeded(json))
      })
      .catch((error) => {
        console.error("JSON Error: ", error.message)
        console.error(error.stack)
        dispatch(loadProductsFailed(error.message))
      })
    })
    .catch((error) => {
      console.error("Error: ", error.message)
      console.error(error.stack)
      console.log(loadProductsFailed(error.message))
      dispatch(loadProductsFailed(error.message))
    })
  }
}

function createProduct(data) {
  const csrfToken = document.getElementsByName("csrf-token")[0].getAttribute("content")

  return function(dispatch) {
    dispatch(createProductStarting())

    fetch(productsEndpoint, {
      method: 'POST',
      body: JSON.stringify({ product: data }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'same-origin'
    })
    .then((response) => {
      if (response.status >= 300) {
        throw new Error("Bad HTTP reponse: " + response.status)
      }
      response.json()
      .then((json) => {
        dispatch(createProductSucceeded(json))
      })
      .catch((error) => {
        console.error("JSON Error: ", error.message)
        console.error(error.stack)
        dispatch(loadProductsFailed(error.message))
      })
    })
    .catch((error) => {
      console.error("Error: ", error.message)
      console.error(error.stack)
      console.log(loadProductsFailed(error.message))
      dispatch(createProductFailed(error.message))
    })
  }
}

function clearErrors() {
  return {
    type: PRODUCT_ACTIONS.CLEAR_ERRORS
  }
}


/* private */

/* load */

function loadProductsStarting() {
  return {
    type: PRODUCT_ACTIONS.LOAD.STARTING,
  }
}

function loadProductsSucceeded(json) {
  return {
    type: PRODUCT_ACTIONS.LOAD.SUCCEEDED,
    products: json.products
  }
}

function loadProductsFailed(error) {
  return {
    type: PRODUCT_ACTIONS.LOAD.FAILED,
    error: error
  }
}

/* create */

function createProductStarting() {
  return {
    type: PRODUCT_ACTIONS.CREATE.STARTING,
  }
}

function createProductSucceeded(json) {
  return {
    type: PRODUCT_ACTIONS.CREATE.SUCCEEDED,
    product: json.product
  }
}

function createProductFailed(error) {
  return {
    type: PRODUCT_ACTIONS.CREATE.FAILED,
    error: error
  }
}


export { PRODUCT_ACTIONS, loadProducts, createProduct, clearErrors }
