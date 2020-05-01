const router = require('express').Router()

module.exports = (model) => {
  //grabbing all items (you can query for specific things too)
  router.get('/', async (req, res, next) => {
    try {
      const results = await model.find(req.query).exec()
      return res.status(200).send(results)
    } catch(err) {
      return next(err)
    }
  })
  //grab one item by id
  router.get('/:id', async (req, res, next) => {
    try{
      const result = await model.findById(req.params.id).exec()
      return res.status(200).send(result)
    } catch(err) { 
      return next(err)
    }
  })
  //insert one item
  router.post('/', async (req, res, next) => {
    try{
      const instance = new model(req.body)
      await instance.save()
      return res.status(200).send(instance)
    } catch(err) {
      return next(err)
    }
  })
  //update one item and it returns the updated object
  router.put('/:id', async (req, res, next) => {
    try{
      const instance = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
      return res.status(200).send(instance)
    } catch(err) {
      return next(err)
    }
  })
  //deletes an item based on id
  router.delete('/:id', async (req, res, next) => {
    try{
      await model.deleteOne({ _id: req.params.id })
      return res.status(200).send({ deleted: 1 })
    } catch(err) {
      return next(err)
    }
  })

  return router
}