import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { nextQuestion, setScore } from '../redux/actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      alternatives: [],
      checkAnswer: null,
      timer: 0,
      disabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.start();
  }

  start = () => {
    const { questions, count } = this.props;
    const {
      incorrect_answers: incorrect, correct_answer: correct,
    } = questions[count];
    const array = [...incorrect, correct];
    this.shuffle(array);
    this.setState({ alternatives: array });
    this.inittialTimer();
  };

  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  handleScore = () => {
    const { questions, count, dispatch } = this.props;
    const { difficulty } = questions[count];
    const { timer } = this.state;
    const score10 = 10;
    let result = 0;
    if (difficulty === 'easy') {
      const scoreEasy = 1;
      result = score10 + (scoreEasy * timer);
      dispatch(setScore(result));
    } else if (difficulty === 'medium') {
      const scoreMedium = 2;
      result = score10 + (scoreMedium * timer);
      dispatch(setScore(result));
    } else {
      const scoreHard = 3;
      result = score10 + (scoreHard * timer);
      dispatch(setScore(result));
    }
  };

  handleAnswer = ({ target }) => {
    const { questions, count } = this.props;
    const question = questions[count];
    if (target.innerHTML === question.correct_answer) this.handleScore();
    this.setState({ checkAnswer: true, disabled: true });
  };

  startTimer = () => {
    this.setState({ timer: 30 }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }), () => {
          const { timer, checkAnswer } = this.state;
          if (timer <= 0 || checkAnswer) {
            clearInterval(idInterval);
            this.setState({
              disabled: true,
              checkAnswer: true,
              timer: 0,
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
          if (timer <= 0) {
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

  handleNext = async () => {
    const { dispatch, count, questions, name, gravatarEmail, score } = this.props;
    if (count < (questions.length - 1)) {
      this.setState({ checkAnswer: false });
      await dispatch(nextQuestion());

      this.start();
    } else {
      // const string = md5(gravatarEmail).toString();
      const player = {
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
      };
      // const storage = localStorage.getItem('ranking');
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

      ranking.push(player);

      localStorage.setItem('ranking', JSON.stringify(ranking));
      this.setState({ redirect: true });
    }
  };

  render() {
    const { questions, count } = this.props;
    const { alternatives, checkAnswer, timer, disabled, redirect } = this.state;
    const question = questions[count];
    return (
      <div>
        {redirect && <Redirect to="/feedback" />}
        <h3 data-testid="question-category">{question.category}</h3>
        <p data-testid="question-text">{question.question}</p>

        <h3 data-testid="question-timer">{ timer }</h3>

        <div data-testid="answer-options">
          {
            alternatives.map((alternative, index) => (
              <button
                type="button"
                data-testid={
                  (alternative === question.correct_answer)
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
                key={ alternative }
                onClick={ this.handleAnswer }
                disabled={ disabled }
                className={ checkAnswer
                  && `${(alternative === question.correct_answer)
                    ? 'correctAnswer'
                    : 'incorrectAnswer'}` }
              >
                { alternative }
              </button>))
          }
          {(checkAnswer && !timer) && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNext }
            >
              Próxima
            </button>)}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  total: PropTypes.number,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  count: state.game.count,
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Question);
