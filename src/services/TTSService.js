/*
** This file is to provide the Text to Speech service
*/

// TextToSpeech function will call IBM API with a text as parameter and will receive an audio file
// as return and if something went wrong the game will stop with the previous statement.

async function TextToSpeech (text) {
    console.log(text);
    fetch('https://www.google.com/', {
    method: 'GET',
    //Request Type
  }).then(response => { console.log(response)})
    .catch(e => console.log(e));

    return (true)
}

// To import in GamePage.js
export { TextToSpeech as default }