'use strict'

const User = use('App/Models/User')

class AuthController {

  async register({request}) {
    const data = request.all()
    const user = await User.create(data)
    return user

  }


  async authenticate({request, response, auth}) {
    const {login, password} = request.all();
    const token = await auth.attempt(login, password)
    return response.json(token);
  }
}


module.exports = AuthController
