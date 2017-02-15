import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './override.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

render(
  <App />,
  document.getElementById('root')
)
