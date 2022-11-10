import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      alternatives: [],
    };
  }

  componentDidMount() {
    const {
      question: { incorrect_answers: incorrect, correct_answer: correct },
    } = this.props;
    const array = [...incorrect, correct];
    this.shuffle(array);
    this.setState({ alternatives: array });
  }

  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  render() {
    const { question } = this.props;
    const { alternatives } = this.state;
    console.log(question);
    return (
      <div>
        <h3 data-testid="question-category">{question.category}</h3>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options">
          {
            alternatives.map((alternative, index) => {
              if (alternative === question.correct_answer) {
                return (
                  <button
                    type="button"
                    data-testid="correct-answer"
                    key={ alternative }
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
