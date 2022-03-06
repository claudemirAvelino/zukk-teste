'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComandaProdutoSchema extends Schema {
  up() {
    this.create('comanda_produto', (table) => {
      table.increments()
      table.integer('qntSaida').notNullable().unsigned()
      table.decimal('valor', 10, 2).notNullable().unsigned()
      table.integer('comanda_id')
        .notNullable()
        .unsigned()
        .references('comandas.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index('comanda_id')
      table.integer('produto_id')
        .notNullable()
        .unsigned()
        .references('produtos.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index('produto_id')
      table.timestamps()
    })
  }

  down() {
    this.drop('comanda_produto')
  }
}

module.exports = ComandaProdutoSchema
