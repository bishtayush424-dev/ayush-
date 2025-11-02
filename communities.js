const express = require('express');
const router = express.Router();

// Get all communities
router.get('/', (req, res) => {
  const communities = [
    {
      id: 1,
      name: 'CSE 3rd Year - 2024 Batch',
      description: 'Official group for Computer Science 3rd Year students',
      category: 'academics',
      members: 85,
      access: 'public',
      isOfficial: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'NITH Cultural Club',
      description: 'For all cultural activities and events',
      category: 'non_academics',
      members: 234,
      access: 'public',
      isOfficial: true,
      rating: 4.9
    }
  ];
  
  res.json({ communities });
});

// Create community
router.post('/', (req, res) => {
  res.json({ 
    message: 'Community created successfully',
    community: req.body 
  });
});

module.exports = router;