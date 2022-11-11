import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          {(assertions > 2) ? 'Well Done!' : 'Could be better...' }
        </h3>
        <p>
          {'Você acertou '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' perguntas totalizando '}
          <span data-testid="feedback-total-score">{score}</span>
          {' pontos'}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => (history.push('/')) }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => (history.push('/ranking')) }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

export default connect(mapStateToProps)(Feedback);
