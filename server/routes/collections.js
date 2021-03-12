const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Collection = require('../models/Collection');
const { Card } = require('../models/Card');

//Collection endpoints
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find();
    return res.send(collections);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection)
      return res
        .status(404)
        .send('The collection with the given id was not found.');
    return res.send(collection);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

router.post('/', async (req, res) => {
  const { error } = validateCollection(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  let collection = new Collection({
    title: req.body.title,
    cards: [],
  });
  try {
    const result = await collection.save();
    return res.send(result);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateCollection(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
      },
      { new: true }
    );
    if (!collection)
      return res
        .status(404)
        .send('The collection with the given id was not found.');
    return res.send(collection);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection)
      return res
        .status(404)
        .send('The collection with the given id was not found.');
    return res.send(collection);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

//Card endpoints
router.get('/:collectionId/cards', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(404)
        .send('The collection with the given id was not found.');
    return res.send(collection.cards);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

router.get('/:collectionId/cards/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(404)
        .send('The collection with the given id was not found.');
    const card = collection.cards.id(req.params.id);
    if (!card)
      return res.status(404).send('The card with the given id was not found.');
    return res.send(card);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

router.post('/:collectionId/cards', async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  try {
    let collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(404)
        .send('The collection with the given id was not found.');
    const card = new Card({
      word: req.body.word,
      definition: req.body.definition,
    });
    collection.cards.push(card);
    collection = await collection.save();
    return res.send(card);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

router.put('/:collectionId/cards/:id', async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(404)
        .send('The collection with the given id was not found.');
    const card = collection.cards.id(req.params.id);
    if (!card)
      return res.status(404).send('The card with the given id was not found.');
    card.word = req.body.word;
    card.definition = req.body.definition;
    await collection.save();
    return res.send(card);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

router.delete('/:collectionId/cards/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(404)
        .send('The collection with the given id was not found.');
    let card = collection.cards.id(req.params.id);
    if (!card)
      return res.status(404).send('The card with the given id was not found.');
    card = await card.remove();
    await collection.save();
    return res.send(card);
  } catch (error) {
    return res.status(400).send(`Database error: ${error}`);
  }
});

function validateCard(card) {
  const schema = Joi.object({
    word: Joi.string().min(1).required(),
    definition: Joi.string().min(1).required(),
  });
  return schema.validate(card);
}

function validateCollection(collection) {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
  });
  return schema.validate(collection);
}

module.exports = router;
