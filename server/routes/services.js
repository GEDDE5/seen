/* eslint-disable */
const express = require('express')
const router  = express.Router()
/* eslint-enable */

router.post(
  '/',
  (req, res) => res.json({ success: true })
)

module.exports = router
