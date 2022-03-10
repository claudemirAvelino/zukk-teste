'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/dashboard', '').middleware(["auth"])
Route.post('/register','AuthController.register').middleware(["auth"])
Route.post('/authenticate','AuthController.authenticate')
Route.get('/get-address/:cep', 'CustomerController.getCustomerAddress')

Route.group(()=>{
  Route.resource("customer","CustomerController").apiOnly()
}).middleware(["auth"])

Route.get('/app',"AppController.index").middleware(["auth"])
