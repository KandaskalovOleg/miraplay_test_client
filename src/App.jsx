import { useContext, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import './style/App.css';
import './style/reset.css';
import { Context } from './main';
import { Oval } from 'react-loader-spinner';

export const App = () => {
  const {store} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.cheakAuth();
    }
  }), [];

  return (
    <>
      {store.isLoading ? 
        (
          <div className='loader'>
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )
        :
        ( 
          <>
            <Header />
            <Main />
          </>     
        )
      }
    </>
  )
}
