import React from 'react'
import { StyleSheet, View, Text, Dimensions, Button} from 'react-native'

const appWidth = Dimensions.get('window').width;
const appHeight = Dimensions.get('window').height;

export default class HomePage extends React.Component {
    constructor(props) {
      super(props)
  
    }
  
    render() {
      return (
        <View style={styles.container}>
            <Text>Welcome in the HomePage</Text>
            <Button
              title="Go to Game"
              onPress={() => this.props.navigation.navigate('Game')}
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