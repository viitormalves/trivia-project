import { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    const token = localStorage.getItem('token');
    dispatch(fetchQuestions(token));
  }

  render() {
    return (
      <>
        <Header />
        <h1>Game</h1>
      </>
    );
  }
}

const mapStateToProps = ({ game: { questions, count } }) => ({
  questions,
  count,
});

export default connect(mapStateToProps)(Game);
