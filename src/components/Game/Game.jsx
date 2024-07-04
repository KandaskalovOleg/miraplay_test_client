/* eslint-disable react/prop-types */
import './game.css';

export const Game = ({ game }) => {
  const { commonGameName, gameDescription, gameImage, genre, inTop } = game;

  return (
    <div className="game">
      <h2>{commonGameName}</h2>
      <img src={gameImage} alt={commonGameName} />
      <p>{gameDescription}</p>
      <p>Genre: {genre}</p>
      <p>{inTop ? 'In Top' : 'Not In Top'}</p>
    </div>
  );
};