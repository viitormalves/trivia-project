import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/Ranking.css';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const storage = localStorage.getItem('ranking');
    const ranking = storage ? JSON.parse(storage) : [];

    if (ranking.length) ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    const { history } = this.props;
    return (
      <div className="ranking-container">
        <div className="ranking-data">
          <h1 data-testid="ranking-title">
            Ranking
          </h1>
          <ol>
            {ranking.map((player, index) => (
              <li key={ index }>
                <div>
                  <img src={ player.picture } alt={ `${player.name} profile` } />
                  <span data-testid={ `player-name-${index}` }>{player.name}</span>
                </div>
                <span
                  data-testid={ `player-score-${index}` }
                  className="points"
                >
                  {player.score}
                  {' '}
                  points
                </span>
              </li>
            ))}
          </ol>
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => (history.push('/')) }
          className="ranking-button"
        >
          Jogar Novamente
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
