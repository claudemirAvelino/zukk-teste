'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComandaServicoSchema extends Schema {
  up() {
    this.create('comanda_servico', (table) => {
      table.increments()
      table.decimal('valor', 10, 2).notNullable().unsigned()
      table.integer('comanda_id')
        .notNullable()
        .unsigned()
        .references('comandas.id')
        .onDelete('no action')
        .onUpdate('no action')
        .index('comanda_id')
      table.integer('servico_id')
        .notNullable()
        .unsigned()
        .references('servicos.id')
        .onDelete('no action')
        .onUpdate('no action')
        .index('servico_id')
      table.timestamps()
    })
  }

  down() {
    this.drop('comanda_servicos')
  }
}

module.exports = ComandaServicoSchema
