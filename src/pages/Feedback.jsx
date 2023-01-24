import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../css/Feedback.css';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <div className="feedback-data">
          <h3
            data-testid="feedback-text"
            className={ (assertions > 2) ? 'h3-green' : 'h3-red' }
          >
            {(assertions > 2) ? 'Well Done!' : 'Could be better...' }
          </h3>
          <p>
            {'You got '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' questions right totaling '}
            <span data-testid="feedback-total-score">{score}</span>
            {' points'}
          </p>
        </div>
        <div className="div-button">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => (history.push('/')) }
            className="play-again-button"
          >
            PLAY AGAIN
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => (history.push('/ranking')) }
            className="show-ranking-button"
          >
            SHOW RANKING
          </button>
        </div>
      </>
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
