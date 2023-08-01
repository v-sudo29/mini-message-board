require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const Message = require('../models/message')

const router = express.Router();

// Connect to MongoDB
const uri = process.env.MONGODB_URI
mongoose.connect(uri)

// Get messages from DB
const getMessages = async () => {
  const messages = await Message.find({})
  return messages
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  const messagesArr = await getMessages()
  console.log(messagesArr)

  res.render('index', { 
    title: 'Mini Messageboard',
    messages: messagesArr
  });
});

/* GET new message form. */
router.get('/new', function(req, res, next) {
  res.render('form', {
    title: 'New Message'
  })
})

/* POST new message form */
router.post('/new', async function(req, res, next) {
  const messageText = req.body.messageText
  const messageUser = req.body.messageUser

  async function updateDb() {
    const message = new Message({
      message: messageText,
      user: messageUser
    })
    await message.save()
    console.log('user saved!')
  }
  await updateDb()
  res.redirect('/')
})
module.exports = router;
