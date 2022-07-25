const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/table', require('./table.routes'))

module.exports = router