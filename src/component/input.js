import React, { Component } from "react";

class Input2 extends Component {
  render() {
    const {
      type,
      placeholder,
      inpType,
      name,
      handleChange,
      dataCategory,
      value,
    } = this.props;
    if (type === "input") {
      return (
        <div className="col-sm-10">
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
