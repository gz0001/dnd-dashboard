// Components:
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'babel-polyfill'

// Service Worker
import registerServiceWorker from './registerServiceWorker'

// Styles:
import '../node_modules/tt-react-ui-2/build/index.css'
import './styles.css'

import { Box } from 'tt-react-ui-2';

const Hello = () => <Box>Hello world</Box>

// ================================================================================================

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Hello} />
    </Switch>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
