import React, { useState } from 'react'

import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '', password: ''
  })
  const {loading, error, request} = useHttp()

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = () => {
    try {
      const data = request('/api/auth/register', 'POST', {...form})
      console.log('data', data)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten a Link</h1>
        <div class="card blue darken-1">
          <div class="card-content white-text">
            <span class="card-title">Authorisation</span>
            <div>

              <div class="input-field">
                <input 
                  placeholder="Email:" 
                  id="email" 
                  type="email"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label for="email">Email</label>
              </div>
              <div class="input-field">
                <input 
                  placeholder="Password:" 
                  id="password" 
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label for="password">Password</label>
              </div>

            </div>
          </div>
          <div class="card-action">
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: 10}}
              disabled={loading}
            >
              Login
            </button>
            <button 
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
