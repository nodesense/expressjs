
```
root folder
	package.json
	src
		server.js - http-server/express app listen, import app from './app/index'
		app
			index.js [no listen code, unit test, we don't actual server to run]
				contain the express app

				const orderRoutes = require('./routes/order.routes')
				app.use(orderRoutes)
				app.use(menuRoutes)
 
				module.exports = app

			config
				set of files specific to configuration db, cache, etc, middlewares


			models
				Order.js / mongoose ORM
				Customer.js / postgresql ORM classes


			
			services
				interface with db
				get/save/update etc/ listing object/restaurent, order etc from db


				const restaurentService = {
					getOrder: async (id) => {
						try {
						  const order = Order.findById(id)
						  return order
						}catch(err) {
							throw err; // wrap to make it easy
						}
					}
				}

				module.exports = restaurentService

			controllers
				no routes here, means no app/router.get, or post here

				order.controller.js

				module.exports = {
					getOrder: es5/es6, async function(req, res) {
						try {
							const order = await  	restaurentService.getOrder(req.params.id)
							if (order) {
								res.json(order)
							}
							else {
								res.status(404).json({message: 'document not found'})
							}
						catch(ex) {
							res.status(500).json ({message: "error message"})
						}
					}
				}	

			routes
				order.routes.js

						const orderController = require('./order.controller')
						const router = express.Router()
						router.get('/orders/:id', orderController.getOrder)

						module.exports = router

```
