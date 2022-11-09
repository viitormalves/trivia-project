import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  validateBtn = () => {
    const { name, email } = this.state;
    return !(name && email);
  };

  render() {
    const { name, email } = this.state;
    return (
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
        >
          Play
        </button>
      </form>
    );
  }
}

export default connect()(Login);
