import { Outlet } from 'react-router-dom';
import './Main.css';
export const Main = () =>  {

  return (
    <main className='main'>
      <div className='main-wrapper'>
        <Outlet />
      </div>
    </main>
  )
}
