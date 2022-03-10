'use strict'
const axios = use("axios");
const Customer = use('App/Models/Customer')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customer
 */
class CustomerController {
  /**
   * Show a list of all customer.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({}) {
    const customers = await Customer.all();
    return customers;
  }


  /**
   * Create/save a new customer.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.all()

    const customer = await Customer.create(data)
    return customer;
  }

  /**
   * Display a single customer.
   * GET customer/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {

    const customer = await Customer.findByOrFail('id', params.id);
    return customer;
  }


  /**
   * Update customer details.
   * PUT or PATCH customer/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const customer = await Customer.findByOrFail('id', params.id);
    const data = request.all();
    customer.merge(data);
    await customer.save();

    return customer;
  }

  /**
   * Delete a customer with id.
   * DELETE customer/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const customer = await Customer.findByOrFail('id',params.id)
    await customer.delete();
  }

  async getCustomerAddress({ params, request, response }) {
    const { cep } = params;
    console.log('cep', cep)
    try{
      const options = {
        method: 'GET',
        url: `https://www.cepaberto.com/api/v3/cep`,
        params: {cep},
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token token=81b9492e575a319ce9c39f4fa07c7fb3'
        }
      };

      const result = await axios.request(options);
      console.log('result', result.data)
      return response.send(result.data)
    } catch (e) {
      console.log('erro axios', e);
    } finally {

    }
  }
}

module.exports = CustomerController
