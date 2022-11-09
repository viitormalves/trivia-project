import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatarUrl: '',
    };
  }

  async componentDidMount() {
    this.getGravatarImage();
  }

  getGravatarImage = () => {
    const { gravatarEmail } = this.props;
    const string = md5(gravatarEmail).toString();
    this.setState({ gravatarUrl: `https://www.gravatar.com/avatar/${string}` });
  };

  render() {
    const { name, score } = this.props;
    const { gravatarUrl } = this.state;
    return (
      <header>
        <img src={ gravatarUrl } alt={ name } data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <p>
          Score:
          {' '}
          <span data-testid="header-score">{ score }</span>
        </p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
