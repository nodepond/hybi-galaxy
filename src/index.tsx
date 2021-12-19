import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from 'styled-components'
import { warm, dark } from './theme/theme'
import { GlobalStyles } from './theme/GlobalStyles/GlobalStyles'

import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

const REACT_APP_SENTRY_URL = process.env.REACT_APP_SENTRY_URL

Sentry.init({
  dsn: REACT_APP_SENTRY_URL,
  integrations: [new Integrations.BrowserTracing()],
	release: "hybi-sentry@0.1.1",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={warm}>
			<>
      <GlobalStyles/>
			<App />
			</>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
