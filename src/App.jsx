import { useContext, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import './style/App.css';
import './style/reset.css';
import { Context } from './main';

export const App = () => {
  const {store} = useContext(Context);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.cheakAuth();
    }
  }), [];

  return (
    <>
      <Header />
      <Main />
    </>
  )
}
