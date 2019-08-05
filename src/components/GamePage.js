import React from 'react'
import { StyleSheet, View, Text, Dimensions, Button} from 'react-native'

const appWidth = Dimensions.get('window').width;
const appHeight = Dimensions.get('window').height;

export default class GamePage extends React.Component {
    constructor(props) {
      super(props)
  
    }
  
    render() {
      return (
        <View style={styles.container}>
            <Text>Welcome in the GamePage</Text>
            <Button
              title="Go to Result"
              onPress={() => this.props.navigation.navigate('Result')}
             />
        </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});