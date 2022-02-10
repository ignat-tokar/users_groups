const {Router} = require('express');
const Group = require('../models/Group');

const router = Router();

router.post('/', async (req, res) => {
  try {

    let {name, description} = req.body;
    name = name[0];
    description = description[0];
    const group = new Group({
      name, description
    });

    group.save();

    return res.status(200).json({ message: 'Данные успешно сохранены' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();

    return res.json(groups);
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const name = typeof(req.body.name) == 'string' ? req.body.name : req.body.name[0];
    const description = typeof(req.body.description) == 'string' ? req.body.description : req.body.description[0];

    const groupForEdit = {...req.body, name: name, description: description};
    const edited = await Group.findOneAndUpdate({ _id: req.params.id }, {$set: {...groupForEdit}}, {new: false});
    return res.status(201);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const group = await Group.deleteOne({ _id: req.params.id })
    return res.status(201);
  } catch(e) {
    console.log(e);
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

module.exports = router;