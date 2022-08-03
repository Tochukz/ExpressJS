var express = require('express');
const UserService = require('../services/user-service');
var router = express.Router();


/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await UserService.getUsers();
  return res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const user = await UserService.getUser(id);
  if (!user) {
    return res.status(404).json({message: `User ${id} not found`})
  }
  return res.json(user);
});

router.post('/create', async(req, res, next) => {
  try {
    const data = req.body;
    const user = await UserService.create(data);
    return res.status(201).json(user);
  } catch(err) {
    return res.status(400).json({message: err.toString()})
  }
});

router.put('/update', async(req, res, next) => {
  const data = req.body;
  const user = await UserService.update(data);
  return res.status(201).json(user);
});

router.delete('/delete/:id', async(req, res, next) => {
  await UserService.destroy(req.params.id);
  return res.status(204).json({});
});


module.exports = router;
