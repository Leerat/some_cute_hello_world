import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css'

import Root from 'components/Root/Root'
import configureStore from './store'
const store = configureStore()

render(<Provider store={store}><Root /></Provider>, document.getElementById('root'))
