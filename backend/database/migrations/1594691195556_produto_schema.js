'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.string('descricao',50).notNullable()
      table.integer('quantidade').notNullable().unsigned()
      table.decimal('vrCompra', 10, 2).notNullable().unsigned()
      table.decimal('vrVenda', 10, 2).notNullable().unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema
