const questions = {
  1 : { text:"Given the choice of anyone in the world, whom would you want as a dinner guest?"},
  2: { text:"Would you like to be famous? In what way?"},
  3: { text:"Before making a telephone call, do you ever rehearse what you are going to say? Why?"},
  4: { text:"What would constitute a “perfect” day for you?"},
  5: { text:"When did you last sing to yourself? To someone else?"},
  6: { text:"If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?"},
  7: { text:"Do you have a secret hunch about how you will die?"},
  8: { text:"Name three things you and your partner appear to have in common."},
  9: { text:"For what in your life do you feel most grateful?"},
  10: { text:"If you could change anything about the way you were raised, what would it be?"},
  11: { text:"Take four minutes and tell your partner your life story in as much detail as possible."},
  12: { text:"If you could wake up tomorrow having gained any one quality or ability, what would it be?"},
  13: { text:"If a crystal ball could tell you the truth about yourself, your life, the future or anything else, what would you want to know?"},
  14: { text:"Is there something that you’ve dreamed of doing for a long time? Why haven’t you done it?"},
  15: { text:"What is the greatest accomplishment of your life?"},
  16: { text:"What do you value most in a friendship?"},
  17: { text:"What is your most treasured memory?"},
  18: { text:"What is your most terrible memory?"},
  19: { text:"If you knew that in one year you would die suddenly, would you change anything about the way you are now living? Why?"},
  20: { text:"What does friendship mean to you?"},
  21: { text:"What roles do love and affection play in your life?"},
  22: { text:"Alternate sharing something you consider a positive characteristic of your partner: Share a total of five items."},
  23: { text:"How close and warm is your family? Do you feel your childhood was happier than most other people’s?"},
  24: { text:"How do you feel about your relationship with your mother?"},
  25: { text:"Make three true “we” statements each: For instance, “We are both in this room feeling ..: “"},
  26: { text:"Complete this sentence: “I wish I had someone with whom I could share ..: “"},
  27: { text:"If you were going to become a close friend with your partner, please share what would be important for him or her to know."},
  28: { text:"Tell your partner what you like about them; be very honest this time, saying things that you might not say to someone you’ve just met."},
  29: { text:"Share with your partner an embarrassing moment in your life."},
  30: { text:"When did you last cry in front of another person? By yourself?"},
  31: { text:"Tell your partner something that you like about them already."},
  32: { text:"What, if anything, is too serious to be joked about?"},
  33: { text:"If you were to die this evening with no opportunity to communicate with anyone, what would you most regret not having told someone? Why haven’t you told them yet?"},
  34: { text:"Your house, containing everything you own, catches fire: After saving your loved ones and pets, you have time to safely make a final dash to save any one item: What would it be? Why?"},
  35: { text:"Of all the people in your family, whose death would you find most disturbing? Why?"},
  36: { text:"Share a personal problem and ask your partner’s advice on how he or she might handle it. Also, ask your partner to reflect back to you how you seem to be feeling about the problem you have chosen."}
}

module.exports = {
  retrieveQuestion: function(questionId){
    return Promise.resolve(questions[questionId])
  }
}