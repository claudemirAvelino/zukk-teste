'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('CPF', 11).notNullable().unique()
      table.string('nome', 150).notNullable()
      table.date('dtNasc').notNullable()
      table.date('dtDesligado')
      table.integer('sexo').notNullable() //0- masculino ,1- Feminino
      table.integer('status').notNullable().defaultTo(1) // 0 - desativado , 1 - ativo
      table.string('login', 30).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.bigInteger('cel').notNullable()
      table.integer('CEP').notNullable()
      table.string('rua', 60).notNullable()
      table.integer('numCasa').notNullable()
      table.string('bairro', 60).notNullable()
      table.string('cidade', 60).notNullable()
      table.string('UF', 60).notNullable()
      table.integer('role').notNullable() //  0 - User , 1-Admin
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
