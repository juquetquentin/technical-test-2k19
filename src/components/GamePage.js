import React from 'react'
import { StyleSheet, View, Text, Dimensions, Button} from 'react-native'
import startGame from '../services/TTSService'

const appWidth = Dimensions.get('window').width;
const appHeight = Dimensions.get('window').height;

export default class GamePage extends React.Component {
    constructor(props) {
      super(props)

      /* Get the text from HomePage or set a default value in case it doesn't work */
      const { navigation } = this.props;
      const text = navigation.getParam('text', 'This developer is awesome !');
      const turns = navigation.getParam('turns', '3');
      this.state = {text: text, turns: turns, endText: 'Error'};
    }

    async componentDidMount() {
      let endText = await startGame(this.state.text, this.state.turns);
      if (endText) {
        this.setState({ endText: endText});
        this.props.navigation.navigate('Result', {endText: this.state.endText});  
      } else {
        alert('An error has occured during game');
      }
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Game is Playing :</Text>
          <Text style={styles.title}>Typed sentence :</Text>
          <Text style={styles.firstText}>{this.state.text}</Text>
          <View style={styles.container}>
            <Button
              title='Go to Result'
              onPress={() => this.props.navigation.navigate('Result')}
             />
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
      marginTop: 50,
      fontSize: 20,
      fontFamily: 'Cochin'
    },
    firstText: {
      marginTop: 30
    }
});