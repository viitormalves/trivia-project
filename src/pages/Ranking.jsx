import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
      <div>
        <h1 data-testid="ranking-title">
          placeholder
        </h1>
        <ol>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img src={ player.picture } alt={ `${player.name} profile` } />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => (history.push('/')) }
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
