import React, { useState, useEffect } from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const message = useMessage()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  const {loading, error, request, clearError} = useHttp()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten a Link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorisation</span>
            <div>

              <div className="input-field">
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
              <div className="input-field">
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
          <div className="card-action">
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: 10}}
              onClick={loginHandler}
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
