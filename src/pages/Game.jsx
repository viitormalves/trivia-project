import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';
import Question from '../components/Question';

class Game extends Component {
  async componentDidMount() {
    const { dispatch, history } = this.props;
    const token = localStorage.getItem('token');
    await dispatch(fetchQuestions(token));
    const { valid } = this.props;
    if (!valid) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { questions } = this.props;
    return (
      <>
        <Header />
        {
          questions.length && (
            <Question />)
        }
      </>
    );
  }
}

const mapStateToProps = ({ game: { questions, count, valid } }) => ({
  questions,
  count,
  valid,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  count: PropTypes.number,
  questions: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default connect(mapStateToProps)(Game);
