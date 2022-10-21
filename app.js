const account_sid = 'xx'
const auth_token = 'xx'
const client = require('twilio')(account_sid, auth_token)
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express')
const urlencoded = require('body-parser').urlencoded
const app = express()
const port = 3000

app.use(urlencoded({ extended: false }));
app.all('/', (request, response) =>{
  response.type('xml')
  const twiml = new VoiceResponse()
  const gather = twiml.gather({
      input: 'speech',
      action: '/handle-user-input',
      language: 'en-GB',
      speechModel: 'numbers_and_commands',
      hints: 'yes, no',
      speechTimeout: 'auto'
    });
    gather.say('Cloudbox provides you reliable hosting solutions, if interested say yes');
  response.send(twiml.toString())
})

app.all('/handle-user-input', (request, response) => { 
  /**
   * Handles the user input gathered in the voice-ivr Function
   */
  // eslint-disable-next-line consistent-return
  response.type('xml')
  const UserInput = request.body.SpeechResult;
  const twiml = new VoiceResponse();
  if (!UserInput) {
    twiml.say('Sorry something went wrong. Please call again');
  }
  else if(UserInput.toLowerCase().includes('yes')){
    twiml.say('We will note down your information thanks')
  }
  else if(UserInput.toLowerCase().includes('no')){
    twiml.say('Thank you for the time')
  }else{
    twiml.say("I didn't understand that")
  }
  response.send(twiml.toString())
})

client.calls.create({
    to: 'xx',
    from: 'xx',
    url: 'https://83e2-2405-201-c004-48b8-556c-cafc-a53a-48cd.ngrok.io'
})

.then(call => console.log(call.sid));
app.listen(port, () => {
    console.log(`app listening at ${port}`);
})





