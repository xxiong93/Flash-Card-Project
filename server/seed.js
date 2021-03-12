const Collection = require('./models/Collection');
const { Card } = require('./models/Card');
const data = require('./data/collections.json');
const connectDB = require('./config/db');

connectDB();

async function seed() {
  for (let i = 0; i < data.length; i++) {
    let cards = [];
    for (let j = 0; j < data[i].cards.length; j++) {
      cards.push(
        new Card({
          word: data[i].cards[j].word,
          definition: data[i].cards[j].definition,
        })
      );
    }
    const collection = new Collection({
      title: data[i].title,
      cards: cards,
    });
    await collection.save();
  }
  console.log('Complete: Please restart the server with "npm start"');
}

seed();
