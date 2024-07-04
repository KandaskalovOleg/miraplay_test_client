import { useContext, useEffect } from 'react';
import './games.css';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import { Game } from './../Game/Game';

export const Games = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getGames(1, true, 'SURVIVAL', 9);
  }, []);

  console.log('Games:', store.games);
  console.log('Games List Length:', store.gamesListLength);

  return (
    <div className='games'>
      {store.isAuth ? (
        store.isActivated ? (
          <div>
            <h1>Games List</h1>
              {store.games.map((game) => (
                <Game 
                  key={game._id}
                  game = {game}
                />
              ))}
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
