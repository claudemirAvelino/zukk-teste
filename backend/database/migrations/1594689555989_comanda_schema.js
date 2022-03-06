'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComandaSchema extends Schema {
  up() {
    this.create('comandas', (table) => {
      table.increments()
      table.decimal('totalServ', 10, 2).notNullable()
      table.decimal('totalProd', 10, 2).notNullable()
      table.decimal('desconto', 10, 2).notNullable()
      table.integer('status').notNullable().defaultTo(0) // 0-não finalizada , 1- finalizada
      table.integer('tipoPag') // 0 - dinheiro , 1- Credito, 2-Debito,3-PicPay
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('NO ACTION')
      table.timestamps()
    })
  }

  down() {
    this.drop('comandas')
  }
}

module.exports = ComandaSchema
