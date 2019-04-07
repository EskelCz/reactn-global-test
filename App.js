import React, { Component, setGlobal } from 'reactn'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// Init global state
setGlobal({ toasts: [] })

// Toast component to show
function Toast (props) {
  return <Text style={styles.toast}>{props.text}</Text>
}

// Singleton that can be imported anywhere
class ToastAPI {
  showToast (text) {
    setGlobal(global => ({
      toasts: global.toasts.concat([{ text: 'Some toast' }])
    }))
  }
}
export const Toasts = new ToastAPI()

// Wrapper for component rendering
export default class App extends Component {
  render () {
    const renderToasts = this.global.toasts.map((item, i) => { return (<Toast key={i} text={item.text} />) })
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { Toasts.showToast() }}><Text>Show toast</Text></TouchableOpacity>
        {renderToasts}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  toast: { backgroundColor: '#DDD', padding: 10, margin: 10 }
})
