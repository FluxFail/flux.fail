import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Home from 'material-ui/svg-icons/action/home';
import Statistics from 'material-ui/svg-icons/action/assessment';

const appBarStyle = {
  position: 'fixed',
  top: '0px',
};

const drawerStyle = {
  top: '64px',
};

const logoAppBarStyle = {
  height: '40%',
  marginBottom: '9px',
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onNavigate(target) {
    this.setState({
      open: false,
    });
    this.props.onNavigate(target);
  }

  onLogout(target) {
    this.setState({
      open: false,
    });
    this.props.onLogout();
  }

  render() {
    return (
      <nav>
        <AppBar
          title={<img src="/img/Logo.svg" style={logoAppBarStyle}/>}
          style={appBarStyle}
          onLeftIconButtonClick={(event) => {
            this.setState({
              open: !this.state.open,
            });
          }}
        />
        <Drawer
          open={this.state.open}
          containerStyle={drawerStyle}
        >
          <MenuItem
            primaryText="Home"
            leftIcon={<Home />}
            onClick={() => this.onNavigate('home')}
            disabled={this.props.view === 'home'}
          />
          <MenuItem
            primaryText="Statistics"
            leftIcon={<Statistics />}
            onClick={() => this.onNavigate('stats')}
            disabled={this.props.view === 'stats' || !this.props.user.token}
          />
          <Divider />
          <MenuItem
            primaryText="Log out"
            onClick={() => this.onLogout()}
            disabled={!this.props.user.token}
          />
          <MenuItem
            primaryText="About Flux.Fail"
            onClick={() => this.onNavigate('about')}
            disabled={this.props.view === 'about'}
          />
        </Drawer>
      </nav>
    );
  }
}

Navigation.defaultProps = {
  user: {},
  view: 'home',
};

Navigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
  }),
  view: PropTypes.string,
};

export default Navigation;
