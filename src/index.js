import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './override.css'
// needed for material-ui events (prevents console errors)
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

render(
  <App />,
  document.getElementById('root')
)
