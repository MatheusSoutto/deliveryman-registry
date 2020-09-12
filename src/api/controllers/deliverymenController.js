const express = require('express');

const Deliveryman = require('../models/deliverymanModel');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { document } = req.body;
  try {
    if (await Deliveryman.findOne({ document }))
      return res.status(400).send({ error: 'Entregador já existe' });
      
    const result = await Deliveryman.create(req.body);

    return res.status(200).send({ result: result, user: req.userId });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Cadastro falhou'});
  }
});

router.get('/document/:document', async (req, res) => {
  const document = req.params.document;
  const deliveryman = await Deliveryman.findOne({ document })
    .exec()
    .then(result => {
      console.log('From database', result);
      if (result) {
        res.status(200).send({ result: result, user: req.userId });
      } 
      else {
        res.status(400).send({ error: 'Entregador não encontrado'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: 'Não foi possível buscar o entregador' });
    });
});

router.get('/name/:name', async (req, res) => {
  const name = req.params.name;
  const deliveryman = await Deliveryman.find({ 
    name: {$regex: new RegExp('.*' + name + '.*', 'i')} 
  }).exec()
    .then(result => {
      if (result) {
        res.status(200).send({ result: result, user: req.userId });
      } 
      else {
        res.status(400).send({ error: 'Entregador não encontrado'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: 'Não foi possível buscar o entregador' });
    });
});

module.exports = app => app.use('/deliverymen', router);