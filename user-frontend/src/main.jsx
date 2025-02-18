/* import { StrictMode } from 'react' */
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css'
import AppWrapper from './utils/AppWrapper.jsx'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <AppWrapper>
    <App />
    </AppWrapper>
    </Provider>
  ,
)
