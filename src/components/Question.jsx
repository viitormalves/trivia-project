import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nextQuestion, setScore } from '../redux/actions';

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
    this.start();
  }

  start = () => {
    const { questions, count } = this.props;
    const {
      incorrect_answers: incorrect, correct_answer: correct,
    } = questions[count];
    console.log(questions[count]);
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
    } else if (difficulty === 'hard') {
      const scoreHard = 3;
      result = score10 + (scoreHard * timer);
      dispatch(setScore(result));
    }
  };

  handleAnswer = ({ target }) => {
    const { questions, count } = this.props;
    const question = questions[count];
    console.log(target.innerText);
    console.log(question);
    if (target.innerText === question.correct_answer) {
      this.setState({ checkAnswer: true, disabled: true });
      this.handleScore();
    } this.setState({ checkAnswer: true, disabled: true });
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
    const { dispatch, count, questions } = this.props;
    if (count <= (questions.length - 1)) {
      this.setState({ checkAnswer: false });
      await dispatch(nextQuestion());

      this.start();
    } else {
      // history.push('/feedback');
    }
  };

  render() {
    const { questions, count } = this.props;
    const { alternatives, checkAnswer, timer, disabled } = this.state;
    const question = questions[count];
    console.log(question);
    return (
      <div>
        <h3 data-testid="question-category">{question.category}</h3>
        <p data-testid="question-text">{question.question}</p>

        <h3>{ timer }</h3>

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
          {checkAnswer && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNext }
            >
              Next
            </button>)}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  total: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  count: state.game.count,
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Question);
