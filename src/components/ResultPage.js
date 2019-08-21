import React from 'react'
import { StyleSheet, View, Text, Dimensions, Button} from 'react-native'

const appWidth = Dimensions.get('window').width;
const appHeight = Dimensions.get('window').height;

export default class ResultPage extends React.Component {
    constructor(props) {
      super(props)

      const { navigation } = this.props;

      const text = navigation.getParam('endText', 'Error while tryin to get final text');
      this.state = {endText: text};

    }
  
    render() {
      return (
        <View style={styles.container}>
            <Text>Welcome in the ResultPage</Text>
            <Button
              title="Go to Home"
              onPress={() => this.props.navigation.navigate('Home')}
             />
             <Text>{this.state.endText}</Text>
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