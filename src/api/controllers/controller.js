const express = require('express');

const Deliveryman = require('../models/deliverymanModel');

const router = express.Router();

router.post('/deliverymen', async (req, res) => {
  const { document } = req.body;
  try {
    if (await Deliveryman.findOne({ document }))
      return res.status(400).send({ error: 'Entregador já existe!' });
      
    const deliveryman = await Deliveryman.create(req.body);

    return res.send({ deliveryman });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Cadastro falhou!'});
  }
});

module.exports = app => app.use('/auth', router);