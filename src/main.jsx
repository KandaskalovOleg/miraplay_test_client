import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { Root } from './Root.jsx';
import Store from './store/store';

const store = new Store();

export const Context = createContext({
  store,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider value={{
      store
    }}>
      <Root />
    </Context.Provider>
  </React.StrictMode>,
)
