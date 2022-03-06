'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
class Produto extends Model {
    comandas() {
        return this.hasMany('App/Models/Comanda')
    }
}
module.exports = Produto
