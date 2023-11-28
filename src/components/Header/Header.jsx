import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { observer } from "mobx-react-lite"
import { Context } from '../../main';

export const Header = observer(() => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('login');
  const {store} = useContext(Context);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const switchToLogin = () => {
    setActiveComponent('login');
  };

  const switchToRegistration = () => {
    setActiveComponent('registration');
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const isDrawerContent = event.target.closest('.drawer-content');
      const isDrawerButton = event.target.closest('.authorization-button');

      if (!isDrawerContent && !isDrawerButton) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <header className='header'>
      <div className='navigation'>
        <div className='navigation-wrapper'>
          <Link to='/' className="logo">
            <img src="/logo.png" alt="" />
          </Link>

          <nav className='nav'>
            <Link to="games" className='nav-link'>Ігри</Link>
          </nav>

          <div>{store.isAuth ? 
              (`Користувач авторизований ${store.user.email}`) 
              : 
              (
                <div className='authorization'>
                  <button className='authorization-button' onClick={toggleDrawer}>
                    <svg viewBox="0 0 24 24" width="20px" height="20px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <circle cx="12" cy="6" r="4" fill="#ffffff"></circle>
                        <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="#ffffff"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
      {drawerOpen && (
        <div className='drawer-wrapper'>
          <div className='drawer-content'>
            <div className='authorization-block'>
              <nav className='authorization-navigation'>
                <button 
                  onClick={switchToLogin} 
                  className={`switch-button ${activeComponent === 'login' ? 'active' : ''}`}
                >
                  Вхід
                </button>
                <button 
                  onClick={switchToRegistration} 
                  className={`switch-button ${activeComponent === 'registration' ? 'active' : ''}`}
                >
                  Реєстрація
                </button>
                <button className='close-button' onClick={toggleDrawer}>✖</button>
              </nav>
              <div className='active-component'>
                {activeComponent === 'login' && (
                  <div className='active-component-animation'>
                    <Login />
                  </div>
                )}
                {activeComponent === 'registration' && (
                  <div className='active-component-animation'>
                    <Registration />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});
