/*
** This file is to provide the Text to Speech service
*/

// TextToSpeech function will call a node server that is gonna call IBM API with a text 
// as parameter and will receive an audio file path
// as return and if something went wrong the game will stop with the previous statement.

async function startGame (text, turns) {
  // This variable can be changed with TextToSpeech return further on (keeping audio file instead of rewriting them)
  var path = './audio_file.wav';

  for (var actualTurn = 0; actualTurn < parseInt(turns); actualTurn++) {
    try {
      path = await TextToSpeech(text);
      console.log(actualTurn + ': new path : ', path);
      text = await SpeechToText(path);
      console.log(actualTurn + ': new text : ', text);
    } catch (e) {
      console.log('error in game', e);
    }
  }
  return (text);
};

async function SpeechToText(path) {
  try {
    let response = await fetch('http://localhost:3000/Stt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      //Request Type
      body: JSON.stringify({path: path})
    });  
      //Success 
      let data = response.json();
      console.log('text : ');
      console.log(data);
      return (data);
  } catch (e) {
    //If response is an error
    //Error 
    alert(e);
    console.log('Something went wrong !');
    console.error(e);
  }
}

async function TextToSpeech(text) {
  try {
    let response = await fetch('http://localhost:3000/Tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      //Request Type
      body: JSON.stringify({txt: text})
    });
    //Success
    let data = response.json();
    console.log('path : ');
    console.log(data);
    return (data);
  } catch (e) {
    //If response is  error
    alert(error);
    console.log('Something went wrong !');
    console.error(error);

  }
}

// To import in GamePage.js
export { startGame as default }