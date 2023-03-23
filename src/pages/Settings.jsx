import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Settings.css';

class Settings extends Component {
  goToLogin = () => {
    const { history } = this.props;
    history.push('./');
  };

  render() {
    return (
      <div className="container-settings">
        <h1 data-testid="settings-title">Configurações</h1>
        <button
          type="button"
          onClick={ () => localStorage.setItem('ranking', JSON.stringify('')) }
          className="button-login"
        >
          Apagar Ranking
        </button>
        <button
          type="button"
          onClick={ () => this.goToLogin() }
          className="button-login"
        >
          Voltar
        </button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Settings;
