import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { observer } from "mobx-react-lite"
import { Context } from '../../main';
import Logo from '../../assets/logo.png';

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
            <img src={Logo} alt="logo" />
          </Link>

          <nav className='nav'>
            <Link to="games" className='nav-link'>Ігри</Link>
          </nav>

          {store.isAuth ? 
            (
              <div className='exit'>
                <button 
                  className='exit-button' 
                  onClick={() => store.logout()}
                  disabled={store.isLoading}
                >
                  <svg viewBox="0 0 24 24" width="20px" height="20px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M9 4.5H8C5.64298 4.5 4.46447 4.5 3.73223 5.23223C3 5.96447 3 7.14298 3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5H9" stroke="#ffffff" strokeWidth="1.5"></path> <path d="M9 6.4764C9 4.18259 9 3.03569 9.70725 2.4087C10.4145 1.78171 11.4955 1.97026 13.6576 2.34736L15.9864 2.75354C18.3809 3.17118 19.5781 3.37999 20.2891 4.25826C21 5.13652 21 6.40672 21 8.94711V15.0529C21 17.5933 21 18.8635 20.2891 19.7417C19.5781 20.62 18.3809 20.8288 15.9864 21.2465L13.6576 21.6526C11.4955 22.0297 10.4145 22.2183 9.70725 21.5913C9 20.9643 9 19.8174 9 17.5236V6.4764Z" stroke="#ffffff" strokeWidth="1.5"></path> <path opacity="0.5" d="M12 11V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </button>
              </div>
            ) 
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
                    <Login toggleDrawer={toggleDrawer}/>
                  </div>
                )}
                {activeComponent === 'registration' && (
                  <div className='active-component-animation'>
                    <Registration toggleDrawer={toggleDrawer}/>
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
