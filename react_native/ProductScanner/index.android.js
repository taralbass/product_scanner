import 'react-native-globals';

import ProductCheckerContainer from './app/components/ProductCheckerContainer'
import { loadUpcs } from './app/actions/UpcActionCreators'
import store from './app/store/Store'


store.dispatch(loadUpcs())

// reload UPCs every minute to catch any new ones
setInterval(() => {
  store.dispatch(loadUpcs())
}, 60 * 1000)


export default class ProductScanner extends React.Component {
  render() {
    return (
      <View style={[containerStyles.container, commonStyles.view]}>
        <ProductCheckerContainer store={store} style={commonStyles}/>
      </View>
    )
  }
}

const commonStyles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
  },
})

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

AppRegistry.registerComponent('ProductScanner', () => ProductScanner)

