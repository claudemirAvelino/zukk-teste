'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Servico extends Model {

    comandas() {
        return this.belongsToMany('App/Models/Comanda')
    }

}

module.exports = Servico
