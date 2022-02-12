const {Router} = require('express');
const User = require('../models/User');
const Group = require('../models/Group');
const mongoose = require('mongoose');

const router = Router();

router.post('/', async (req, res) => {
  try{
    const username = typeof(req.body.username) == 'string' ? req.body.username : req.body.username[0];
    const ids = req.body.groups.map(id => mongoose.Types.ObjectId(id));
    const groups = await Group.find({_id: {$in: ids}});
    const userForm = {...req.body, username: username, groups: groups};
    const newUser = new User(userForm);
    newUser.save();
  return res.status(201);
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

router.get('/', async (req, res) => {
  try{
    const users = await User.find();
    return res.json(users);
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

router.get('/:id', async (req, res) => {
  try{
    const user = await User.findOne({_id: req.params.id});
    return res.status(201);
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
})

router.post('/edit/:id', async (req, res) => {
  try {
    const username = typeof(req.body.username) == 'string' ? req.body.username : req.body.username[0];
    const ids = req.body.groups.map(id => mongoose.Types.ObjectId(id));
    const groups = await Group.find({_id: {$in: ids}});
    const editedForm = {...req.body, username: username, groups: groups};
    const editedUser = await User.findOneAndUpdate({ _id: req.params.id }, {$set: {...editedForm}}, {new: false});
  return res.status(201);
  } catch(error) {
    return res.status(500).json({Error: error.message});
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const info = await User.deleteOne({ _id: req.params.id });
    return res.status(201);
  } catch (error) {
    return res.status(500).json({Error: error.message});
  }
});

module.exports = router;