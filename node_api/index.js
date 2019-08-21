var TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
var fs = require('fs');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
 
const speechToText = new SpeechToTextV1({
  iam_apikey: '7xtmw52UuHc4mkEh09hUSubqJqVwaPLactd4Ul_v1Pm2',
  url: 'https://gateway-lon.watsonplatform.net/speech-to-text/api',
  headers: {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});

var textToSpeech = new TextToSpeechV1({
	iam_apikey: 'CiGlUo2z0vc9dMaU8Dew3-KVB-mO9a5d3RNhGjBBStEl',
	url: 'https://gateway-lon.watsonplatform.net/text-to-speech/api'
    });
 
// Recognize text in an audio file located in 'path' variable, then send transcribed text in response
// (wav audio file) can be changed to keep files and display / listen to them further on

async function Stt (path) {
    var params = {
        audio: fs.createReadStream(path),
        content_type: 'audio/wav',
        word_confidence: true
    };
    console.log('Calling STT API : ', path);
    try {
        let response = await speechToText.recognize(params)
        let maps = response.results; // Get the results
        console.log('JSON result:\n');
        console.log(JSON.stringify(maps));
        let transcribedText = maps.map(function(text) {
            let firstText = text.alternatives.shift();
          console.log('text =' + firstText.transcript);
          return (firstText.transcript);
        });
        return (transcribedText.shift());
    } catch (e) {
      console.log('this is error:', e);
      return (undefined);
    }
};

// Synthesize speech, correct the wav header, then save to disk
// (wav header requires a file length, but this is unknown until after the header is already generated and sent)
// Actually don't need try/catch and async stuff because path doesn't change so it is return as hardcode value

async function Tts (txt) {
    var params = {
        text: txt,
        // voice: 'fr-FR_ReneeVoice', // Optional voice
        accept: 'audio/wav'
    };

    try {
        let response = await textToSpeech.synthesize(params)
        let file = await fs.createWriteStream('audio_file.wav')
        response.pipe(file);
        var end = new Promise(function(resolve, reject) {
            response.on('end', () => resolve(response.read()));
            file.on('error', reject); // or something like that. might need to close response
        });
        let wait = await end;
        console.log('audio.wav written with a corrected wav header');
        return ('./audio_file.wav');
    } catch(e) {
        console.log(e);
        return (undefined);
    }
};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/Tts', async (req, res) => {
    try {
        let response = await Tts(req.body.txt || './audio_file.wav');
        console.log('Sending response (TTS): ');
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log('error happened (TTS):', e);
        res.status(500).send('Something broke!');

    }
});

app.post('/Stt', async (req, res) => {
    // if (req.body.path) {
        try {
            let response = await Stt('./audio_file.wav');
            if (response) {
                console.log('Sending response (STT): ');
                console.log(response);
                res.json(response);
            } else {
                res.status(500).send('Something broke!');
            }
        } catch (e) {
            console.log('error happened (STT):', e);
            res.status(500).send('Something broke !')
        }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port : ' + port + '...'));

