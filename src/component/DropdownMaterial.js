import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default class DropdownMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }
  handleClick = (event) => {
    console.log(event.currentTarget);
    this.setState({ ...this.state, anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ ...this.state, anchorEl: null });
  };
  render() {
    return (
      <React.Fragment>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(e) => this.handleClick(e)}
        >
          Type
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={() => this.handleClose()}
        >
          <MenuItem onClick={() => this.handleClose()}>Kg</MenuItem>
          <MenuItem onClick={() => this.handleClose()}>Ekor</MenuItem>
          <MenuItem onClick={() => this.handleClose()}>Product</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
