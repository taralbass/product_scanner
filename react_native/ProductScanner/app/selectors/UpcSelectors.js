import { createSelector } from 'reselect'

const getUpcs = (state) => state.upcs

const getUpcHash = createSelector(
  [getUpcs],
  (upcs) => upcs.reduce((hash, upc) => { hash[upc.upc] = true; return hash }, {})
)

export { getUpcHash }
