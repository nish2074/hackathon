const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "2109b465",
  apiSecret: "OAL115z4MzpuNeKg"
})



const from = "Vonage APIs"
const to = "919604886245"

async function sendSMS(to,text) {
  await vonage.sms.send({ to, from,text  })
    .then(resp => {
      console.log('✅ Message sent successfully');
      console.log(resp);
    })
    .catch(err => {
      console.log('❌ There was an error sending the message.');
      console.error(err);
    });
}
module.exports = sendSMS;
