import React from 'react'
import { StyleSheet, View, Text, Dimensions, Button} from 'react-native'

const appWidth = Dimensions.get('window').width;
const appHeight = Dimensions.get('window').height;

export default class ResultPage extends React.Component {
    constructor(props) {
      super(props)
  
    }
  
    render() {
      return (
        <View style={styles.container}>
            <Text>Welcome in the ResultPage</Text>
            <Button
              title="Go to Home"
              onPress={() => this.props.navigation.navigate('Home')}
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