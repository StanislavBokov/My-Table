const express = require('express')
const Table = require('../models/table')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
   
    try {
        const table = await Table.find()

        res.status(200).send(table)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

router.post('/add', async (req, res) => {
    try {
        await Table.create({...req.body})

        const table = await Table.find()
        res.status(200).send(table)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

router.put('/edit', async (req, res) => {
   
    try {
        const { _id } = req.body
        await Table.findByIdAndUpdate(_id, req.body, { new: true })
        const table = await Table.find()

        res.status(200).send(table)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

router.delete('/delete', async (req, res) => {
    try {
      const { _id } = req.body

      await Table.findByIdAndRemove({ _id })
      const table = await Table.find()
      res.status(200).send(table)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

module.exports = router