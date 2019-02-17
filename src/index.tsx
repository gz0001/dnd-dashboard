// Components:
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Service Worker
import registerServiceWorker from './registerServiceWorker'

// Styles:
import '../node_modules/tt-react-ui-2/build/index.css'
import './styles.css'

// Dashboard:
import { Dashboard } from 'components/Dashboard'

// ================================================================================================

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Dashboard} />
    </Switch>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
