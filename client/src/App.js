import React from 'react'
import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'

import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'

function App() {
  const {login, logout, token, userId} = useAuth
  const routes = useRoutes(false)

  return (
    <Router>
      <div className="container">
        {routes}
      </div>
    </Router>
  );
}

export default App;
