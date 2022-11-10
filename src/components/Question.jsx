import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      alternatives: [],
      checkAnswer: null,
      timer: 0,
      disabled: true,
    };
  }

  componentDidMount() {
    const {
      question: { incorrect_answers: incorrect, correct_answer: correct },
    } = this.props;
    const array = [...incorrect, correct];
    this.shuffle(array);
    this.setState({ alternatives: array });
    this.inittialTimer();
  }

  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  handleAnswer = ({ target }) => {
    const { question } = this.props;
    console.log(target.innerText);
    console.log(question);
    if (target.innerText === question.correct_answer) {
      this.setState({ checkAnswer: true });
    } this.setState({ checkAnswer: true });
  };

  startTimer = () => {
    this.setState({ timer: 3 }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }), () => {
          const { timer } = this.state;
          if (timer === 0) {
            clearInterval(idInterval);
            this.setState({
              disabled: true,
              checkAnswer: true,
            });
          }
        });
      }, second);
    });
  };

  inittialTimer = () => {
    this.setState({ timer: 5 }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }), () => {
          const { timer } = this.state;
          if (timer === 0) {
            clearInterval(idInterval);
            this.setState({
              disabled: false,
            });
            this.startTimer();
          }
        });
      }, second);
    });
  };

  render() {
    const { question } = this.props;
    const { alternatives, checkAnswer, timer, disabled } = this.state;
    console.log(question);
    return (
      <div>
        <h3 data-testid="question-category">{question.category}</h3>
        <p data-testid="question-text">{question.question}</p>

        <h3>{ timer }</h3>

        <div data-testid="answer-options">
          {
            alternatives.map((alternative, index) => {
              if (alternative === question.correct_answer) {
                return (
                  <button
                    type="button"
                    data-testid="correct-answer"
                    key={ alternative }
                    onClick={ this.handleAnswer }
                    disabled={ disabled }
                    className={ checkAnswer && 'correctAnswer' }
                  >
                    { alternative }
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  key={ alternative }
                  onClick={ this.handleAnswer }
                  disabled={ disabled }
                  className={ checkAnswer && 'incorrectAnswer' }
                >
                  {alternative}
                </button>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({}),
}.isRequired;

export default connect()(Question);
