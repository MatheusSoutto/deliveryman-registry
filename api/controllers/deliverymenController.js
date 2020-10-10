const express = require('express');

const Deliveryman = require('../models/deliverymanModel');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { document } = req.body;
  try {
    // Confere existência pelo documento 
    if (await Deliveryman.findOne({ document }))
      return res.status(400).send({ error: 'Entregador já existe' });

    const result = await Deliveryman.create(req.body);

    return res.status(200).send({ result: result, user: req.userId });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Cadastro falhou' });
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
        res.status(400).send({ error: 'Entregador não encontrado' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: 'Não foi possível buscar o entregador' });
    });
});

router.get('/name/:name', async (req, res) => {
  const name = req.params.name;

  if (name.length < 3)
    res.status(400).send({ error: 'Palavra de busca menor que 3' });

  const deliveryman = await Deliveryman.find({
    name: { $regex: new RegExp('.*' + name + '.*', 'i') }
  }).exec()
    .then(result => {
      if (result) {
        res.status(200).send({ result: result, user: req.userId });
      }
      else {
        res.status(400).send({ error: 'Entregador não encontrado' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: 'Não foi possível buscar o entregador' });
    });
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const deliveryman = {
    name: req.body.name,
    document: req.body.document,
    plate: req.body.plate,
    company: req.body.company,
    visited: req.body.visited,
    photo: req.body.photo,
    updatedAt: new Date()
  }
  await Deliveryman.findByIdAndUpdate(id, { $set: deliveryman }).exec()
    .then(result => {
      return res.status(200).send({
        message: 'Entregador atualizado',
        result: result,
        user: req.userId
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: 'Atualização falhou' });
    });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  Deliveryman.deleteOne({ _id: id }).exec()
    .then(result => {
      return res.status(200).send({
        message: 'Entregador removido',
        id: id,
        user: req.userId
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: 'Remoção falhou' });
    });
});

module.exports = app => app.use('/api/deliverymen', router);