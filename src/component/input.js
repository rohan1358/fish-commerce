import React, { Component } from "react";
import DropdownMaterial from "./DropdownMaterial";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
class Input2 extends Component {
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
    const {
      type,
      placeholder,
      inpType,
      name,
      handleChange,
      dataCategory,
      value,
      Dd,
    } = this.props;
    if (type === "input") {
      return (
        <div className="d-flex col-sm-10">
          <input
            value={value && value}
            onChange={(e) => {
              handleChange && handleChange(e);
            }}
            name={name ? name : "empty"}
            className="form-control form-control-sm"
            type={inpType ? inpType : "text"}
            placeholder={placeholder ? placeholder : "-"}
            aria-label=".form-control-sm example"
          />
          {Dd && (
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
          )}
        </div>
      );
    } else if (type === "textArea") {
      return (
        <div className="col-sm-10">
          <textarea
            value={value && value}
            onChange={(e) => {
              handleChange && handleChange(e);
            }}
            name={name ? name : "empty"}
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      );
    } else if (type === "file") {
      return (
        <div className="col-sm-10">
          <input
            onChange={(e) => {
              handleChange && handleChange(e);
            }}
            name={name ? name : "empty"}
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
          />
        </div>
      );
    } else if (type === "select") {
      return (
        <div className="col-sm-10">
          <select
            value={value && value}
            name={name ? name : "empty"}
            onChange={(e) => {
              handleChange && handleChange(e);
            }}
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
          >
            <option>Select Category</option>
            {dataCategory.map((data, index) => {
              return (
                <option value={data.id} key={index}>
                  {data.category_name}
                </option>
              );
            })}
          </select>
        </div>
      );
    } else {
      return (
        <div className="col-sm-10">
          <h6>please select type input</h6>
        </div>
      );
    }
  }
}

function input({
  type,
  placeholder,
  inpType,
  name,
  handleChange,
  dataCategory,
}) {
  console.log(dataCategory);
  if (type === "input") {
    return (
      <div className="col-sm-10">
        <input
          onChange={(e) => {
            handleChange && handleChange(e);
          }}
          name={name ? name : "empty"}
          className="form-control form-control-sm"
          type={inpType ? inpType : "text"}
          placeholder={placeholder ? placeholder : "-"}
          aria-label=".form-control-sm example"
        />
      </div>
    );
  } else if (type === "textArea") {
    return (
      <div className="col-sm-10">
        <textarea
          onChange={(e) => {
            handleChange && handleChange(e);
          }}
          name={name ? name : "empty"}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
    );
  } else if (type === "file") {
    return (
      <div className="col-sm-10">
        <input
          onChange={(e) => {
            handleChange && handleChange(e);
          }}
          name={name ? name : "empty"}
          className="form-control form-control-sm"
          id="formFileSm"
          type="file"
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="col-sm-10">
        <select
          name={name ? name : "empty"}
          onChange={(e) => {
            handleChange && handleChange(e);
          }}
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option>Select Category</option>
          {dataCategory.map((data, index) => {
            return (
              <option value={data.id} key={index}>
                {data.category_name}
              </option>
            );
          })}
        </select>
      </div>
    );
  } else {
    return (
      <div className="col-sm-10">
        <h6>please select type input</h6>
      </div>
    );
  }
}

export default Input2;
