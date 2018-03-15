import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Home from 'material-ui/svg-icons/action/home';
import Statistics from 'material-ui/svg-icons/action/assessment';
import ContentAdd from 'material-ui/svg-icons/content/add';

const appBarStyle = {
  position: 'fixed',
  top: '0px',
};

const drawerStyle = {
  top: '64px',
};

const fabStyle = {
  position: 'fixed',
  right: '24px',
  bottom: '24px',
};

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
    let fab = null;
    if (this.props.allowAddDelay) {
      fab = (
        <FloatingActionButton
          style={fabStyle}
          onClick={this.props.onAddDelay}
        >
          <ContentAdd />
        </FloatingActionButton>
      );
    }
    return (
      <nav>
        <AppBar
          title="Flux.Fail"
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
        {fab}
      </nav>
    );
  }
}

Navigation.defaultProps = {
  allowAddDelay: false,
  user: {},
  view: 'home',
};

Navigation.propTypes = {
  allowAddDelay: PropTypes.bool,
  onAddDelay: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
  }),
  view: PropTypes.string,
};

export default Navigation;
