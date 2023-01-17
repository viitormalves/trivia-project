import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser, clearQuestions, clearScore } from '../redux/actions';
import '../css/Login.css';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  fetchToken = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const link = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(link);
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    dispatch(createUser(name, email));
    dispatch(clearQuestions());
    dispatch(clearScore());
    history.push('/game');
  };

  validateBtn = () => {
    const { name, email } = this.state;
    return !(name && email);
  };

  goToSettings = () => {
    const { history } = this.props;
    history.push('./settings');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div className="login">
        <img src={ logo } alt="logo-trivia" className="logo" />
        <form>
          <input
            type="text"
            name="name"
            placeholder="Qual seu nome"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="email"
            placeholder="Qual seu email do gravatar"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.validateBtn() }
            onClick={ this.fetchToken }
            className="button-login"
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.goToSettings }
            className="button-login"
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
