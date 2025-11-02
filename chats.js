const express = require('express');
const router = express.Router();

// Get chat messages
router.get('/messages/:roomId', (req, res) => {
  const messages = [
    {
      id: 1,
      sender: 'User 1',
      content: 'Hello everyone!',
      timestamp: new Date().toISOString(),
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Hi there!',
      timestamp: new Date().toISOString(),
      isOwn: true
    }
  ];
  
  res.json({ messages });
});

// Send message
router.post('/messages', (req, res) => {
  res.json({ 
    message: 'Message sent successfully',
    messageData: req.body 
  });
});

module.exports = router;