import React from 'react'
import { StyleSheet, View, Text, Dimensions, Button, TextInput } from 'react-native'

// Get Dimensions for styles it'll adapt on any device

const appWidth = Dimensions.get('window').width;
const appHeight = Dimensions.get('window').height;

// HomePage will host the TextInput that will be taken as the first sentence (sent to TextToSpeech
// later on) then it'll be sent to GamePage. Press "Let is Play" when you're ready to play.

export default class HomePage extends React.Component {
    constructor(props) {
      super(props)
      /* Set a default value for the game text */
      this.state = { text: 'This developer is awesome !', turns: '1' }
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Word of mouth game</Text>
          <View style={styles.container}>
                <Text style={styles.orderText}>Insert your Text here</Text>
                <TextInput
                  placeholder='This developer is awesome !'
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  multiline={true}
                />
                <TextInput  
                  placeholder='Turns'
                  style={styles.TextInputStyle}  
                  keyboardType={'numeric'}
                  onChangeText={(text)=> this.onChanged(text)}
                  value={this.state.turns}
                  maxLength={2}
                />
                <Button
                  title='Let it Play'
                  onPress={() => {
                    if (this.state.text.length && this.state.turns.length)
                      this.props.navigation.navigate('Game', {text: this.state.text, turns: this.state.turns})
                    else
                      alert('You must set up turns and text')
                    }}
                />
          </View>
        </View>
      )
    }

    onChanged(text){
      let newText = '';
      let numbers = '0123456789';
  
      for (var i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
          }
          else {
              // your call back function
              alert('Please enter numbers only');
          }
      }
      this.setState({ turns: newText });
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputText: {
      height: 100,
      width: 200,
      borderRadius: 20,
      padding: 4,
      fontFamily: 'Futura',
      borderColor: 'gray',
      borderWidth: 1
    },
    title: {
      marginTop: 50,
      fontSize: 20,
      fontFamily: 'Cochin'
    },
    TextInputStyle: {  
      height: 40,
      width: 50,
      textAlign: 'center',  
      borderRadius: 10,  
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 10,
      marginTop: 10
    },
    orderText: {
      fontFamily: 'Cochin',
      textDecorationLine: 'underline',
      marginBottom: 10
    }
});