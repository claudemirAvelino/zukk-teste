'use strict'


const Comanda = use('App/Models/Comanda')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comandas
 */
class ComandaController {
  /**
   * Show a list of all comandas.
   * GET comandas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {


  }



  /**
   * Create/save a new comanda.
   * POST comandas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const { produtos, qntSaida, valorProd, servicos, ...data } = request.post()
    const comanda = await Comanda.create(data);

   

    if (produtos && produtos.length > 0) {

      await Promise.all(produtos.map(async produto => {
        await comanda.produtos().attach(produto, (row) => {
          if (row.comanda_id === comanda.id) {
            console.log('produto promise', produto)

            console.log('row', row)
            console.log('row qnt', row.qntSaida)
            console.log('row valor', row.valor)
            row.qntSaida = qntSaida[produto - 1]
            row.valor = valorProd[produto - 1]

          }
        })


      }))
      await comanda.load('produtos')
    }
    return comanda;






  }
  // if (servicos && servicos.length > 0) {
  //   await comanda.servicos().attach(servicos,(row)=>{

  //     row.valor = servicos.valor
  //   })
  //   await comanda.load('servicos')

  // }





  /**
   * Display a single comanda.
   * GET comandas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }



  /**
   * Update comanda details.
   * PUT or PATCH comandas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a comanda with id.
   * DELETE comandas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ComandaController
