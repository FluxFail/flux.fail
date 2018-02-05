import React from 'react';
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
}

const fabStyle = {
  position: 'fixed',
  right: '42px',
  bottom: '42px',
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <nav>
        <AppBar
          title="Flux.Fail"
          style={appBarStyle}
          onLeftIconButtonClick={(event) => {
            const newOpen = this.state.open ? false : true;
            this.setState({
              open: newOpen,
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
          />
          <MenuItem
            primaryText="Statistics"
            leftIcon={<Statistics />}
          />
          <Divider />
          <MenuItem
            primaryText="Account"
          />
          <MenuItem
            primaryText="Log out"
          />
          <MenuItem
            primaryText="About Flux.Fail"
          />
        </Drawer>
        <FloatingActionButton style={fabStyle}>
          <ContentAdd />
        </FloatingActionButton>
      </nav>
    );
  }
}

export default Navigation;
