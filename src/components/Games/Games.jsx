import { useContext } from 'react';
import './games.css';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';

export const Games = observer(() => {
  const { store } = useContext(Context);

  return (
    <div className='games'>
      {store.isAuth ? (
        store.isActivated ? (
          <div>
            акаунт активований
          </div>
        ) : (
          <p>Активуйте акаунт, щоб отримати дані про ігри</p>
        )
      ) : (
        <p>Авторизуйтесь, щоб мати доступ до ігор</p>
      )}
    </div>
  );
});
