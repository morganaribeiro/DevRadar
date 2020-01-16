const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();

// Query: req.query
// Route: req.params
// Body : req.body


routes.get('/devs', DevController.index)
routes.post('/devs', DevController.create)
routes.put('/devs/:github', DevController.update)
routes.delete('/devs/:github', DevController.destroy)

routes.get('/search', SearchController.index);

module.exports = routes;