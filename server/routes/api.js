const express = require('express')

const router = new express.Router()

router.get('/dashboard', (req, res) => {
  console.log('dashboard GET')
  res.status(200).json({
    message: "You're authorized to see this secret message."
  })
})

module.exports = router
