"use strict";

function main() {
  console.log( "> main()" );

  fetch( "/gencaptoken" )
    .then( res => res.json() )
    .then( gotCapabilityToken );

  console.log( "< main()" );
}

function gotCapabilityToken( token ) {
  console.log( token );
  Twilio.Device.setup( token );
  Twilio.Device.ready( twilioReady );
}

function twilioReady( twilioDevice ) {
  window.twilioDevice = twilioDevice;

  console.log( "Twilio device ready" );
}

