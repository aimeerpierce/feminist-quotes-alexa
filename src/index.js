/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.  It's intended to be used at an MLH Localhost
 * Workshop.
 *
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/mlh/mlh-localhost-hacking-with-alexa
 **/

'use strict';

// TODO: replace with facts about yourself
const FACTS = [
  "I am too intelligent, too demanding, and too resourceful for anyone to be able to take charge of me entirely. No one knows me or loves me completely. I have only myself. ― Simone de Beauvoir",
  "Human rights are women’s rights, and women’s rights are human rights. Let us not forget that among those rights are the right to speak freely – and the right to be heard. - Hillary Clinton",
  "I’m a feminist. I’ve been a female for a long time now. It’d be stupid not to be on my own side. -Maya Angelou",
  "Make sure you have your own life before becoming someone’s wife. - Beyonce"
];

//object passed to alexa
//handles various actions
var handlers = {
  'LaunchRequest': function () { this.emit('GetFact'); }, //happens when skill opens "hey alexa..."
  'GetNewFactIntent': function () { this.emit('GetFact'); }, //Runs once you're already inside skill
  'GetFact': function() {
    // Randomly select a fact from the array
    const factIndex = Math.floor(Math.random() * FACTS.length);
    const randomFact = FACTS[factIndex];

    // Create speech output
    const speechOutput = "Here's your quote: " + randomFact;
    this.emit(':tellWithCard', speechOutput, "Aimee Facts", randomFact);
  },
	'AMAZON.HelpIntent': function () {
	    const speechOutput = this.t('HELP_MESSAGE');
	    const reprompt = this.t('HELP_MESSAGE');
	    this.emit(':ask', speechOutput, reprompt);
	},
	'AMAZON.CancelIntent': function () {
	    this.emit(':tell', this.t('STOP_MESSAGE'));
	},
	'AMAZON.StopIntent': function () {
	    this.emit(':tell', this.t('STOP_MESSAGE'));
	}
};

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
