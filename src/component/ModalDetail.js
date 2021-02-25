import React, { Component } from "react";

import { Input } from "../component/index";

class ModalDetail2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // initMap = () => {
  //   const uluru = { lat: -25.344, lng: 131.036 };
  //   const map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 4,
  //     center: uluru,
  //   });
  //   const marker = new google.maps.Marker({ position: uluru, map: map });
  // };
  render() {
    const closeModal = () => {
      window.$("modalDetail").modal("toggle");
    };
    const {
      data,
      addToCart,
      dataUser,
      category,
      handleChange,
      addProduct,
      dataProduct,
      updateProduct,
    } = this.props;
    if (dataUser.type === "seller") {
      const {
        price,
        product_name,
        description,
        id_category,
        stock_product,
      } = data;
      if (dataProduct.type === "add") {
        return (
          <div
            className="modal fade"
            id="modalDetail"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-xl justify-content-center m-auto">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="container">
                      <div className="mb-3 row">
                        {/* name product */}
                        <label className="col-sm-2 col-form-label">
                          Name Product
                        </label>
                        <Input
                          handleChange={(e) => handleChange(e)}
                          name="product_name"
                          type="input"
                        />
                      </div>

                      <div className="mb-3 row">
                        {/* name product */}
                        <label className="col-sm-2 col-form-label">Price</label>
                        <Input
                          handleChange={(e) => handleChange(e)}
                          type="input"
                          inpType="number"
                          name="price"
                        />
                      </div>
                      <div className="mb-3 row">
                        {/* name product */}
                        <label className="col-sm-2 col-form-label">Stock</label>
                        <Input
                          handleChange={(e) => handleChange(e)}
                          type="input"
                          inpType="number"
                          name="stock_product"
                        />
                      </div>
                      <div className="row mb-3">
                        {/* description */}
                        <label className="col-sm-2 col-form-label">
                          Description
                        </label>
                        <Input
                          name="description"
                          handleChange={(e) => handleChange(e)}
                          type="textArea"
                        />
                      </div>

                      <div className="row mb-3">
                        {/* Category */}
                        <label className="col-sm-2 col-form-label">
                          Category
                        </label>
                        <Input
                          type="select"
                          dataCategory={category}
                          name="id_category"
                          handleChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="row mb-3">
                        {/* Image */}
                        <label className="col-sm-2 col-form-label">Image</label>
                        <Input
                          handleChange={(e) => handleChange(e)}
                          name="image"
                          type="file"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                  {dataUser.type === "seller" && (
                    <button
                      onClick={() => addProduct()}
                      type="button"
                      className="btn btn-success"
                    >
                      Add Product
                    </button>
                  )}
                  <i
                    classname="bi bi-cart-plus"
                    style={{ fontSize: "2rem", color: "cornflowerblue" }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            className="modal fade"
            id="modalDetail"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-xl justify-content-center m-auto">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="container">
                      <div className="mb-3 row">
                        {/* name product */}
                        <label className="col-sm-2 col-form-label">
                          Name Product
                        </label>
                        <Input
                          value={product_name}
                          handleChange={(e) => handleChange(e, true)}
                          name="product_name"
                          type="input"
                        />
                      </div>

                      <div className="mb-3 row">
                        {/* name product */}
                        <label className="col-sm-2 col-form-label">Price</label>
                        <Input
                          value={parseInt(price)}
                          handleChange={(e) => handleChange(e, true)}
                          type="input"
                          inpType="number"
                          name="price"
                        />
                      </div>
                      <div className="mb-3 row">
                        {/* name product */}
                        <label className="col-sm-2 col-form-label">Stock</label>
                        <Input
                          value={parseInt(stock_product)}
                          handleChange={(e) => handleChange(e, true)}
                          type="input"
                          inpType="number"
                          name="stock_product"
                        />
                      </div>
                      <div className="row mb-3">
                        {/* description */}
                        <label className="col-sm-2 col-form-label">
                          Description
                        </label>
                        <Input
                          value={description}
                          name="description"
                          handleChange={(e) => handleChange(e, true)}
                          type="textArea"
                        />
                      </div>

                      <div className="row mb-3">
                        {/* Category */}
                        <label className="col-sm-2 col-form-label">
                          Category
                        </label>
                        <Input
                          value={id_category}
                          type="select"
                          dataCategory={category}
                          name="id_category"
                          handleChange={(e) => handleChange(e, true)}
                        />
                      </div>
                      <div className="row mb-3">
                        {/* Image */}
                        <label className="col-sm-2 col-form-label">Image</label>
                        <Input
                          handleChange={(e) => handleChange(e, true)}
                          name="image"
                          type="file"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                  {dataUser.type === "seller" && (
                    <button
                      onClick={() => updateProduct()}
                      type="button"
                      className="btn btn-success"
                    >
                      Update Product
                    </button>
                  )}
                  <i
                    classname="bi bi-cart-plus"
                    style={{ fontSize: "2rem", color: "cornflowerblue" }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div
          className="modal fade"
          id="modalDetail"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl justify-content-center m-auto">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Detail Product
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="card m-auto" style={{ maxWidth: 540 }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        className="w-100 m-2"
                        src={data.image}
                        alt={data.image}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{data.product_name}</h5>
                        <div className="row">
                          <div className="col-lg-4">
                            <p className="card-text">Description</p>
                          </div>
                          <div className="col-lg-8">{data.description}</div>
                        </div>
                        {/* <div id="map"> </div> */}

                        <p className="card-text">
                          <small className="text-muted">
                            Date Added {data.adding_date}
                          </small>
                        </p>
                        <br />
                        <h6>Stock : {data.stock_product}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => closeModal()}
                >
                  Close
                </button>
                {dataUser.type === "buyer" && (
                  <button
                    onClick={() => addToCart(data)}
                    type="button"
                    className="btn btn-success"
                  >
                    Add To Cart{" "}
                  </button>
                )}
                <i
                  classname="bi bi-cart-plus"
                  style={{ fontSize: "2rem", color: "cornflowerblue" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function ModalDetail({
  data,
  addToCart,
  dataUser,
  category,
  handleChange,
  addProduct,
}) {
  const closeModal = () => {
    window.$("modalDetail").modal("toggle");
  };
  console.log(category);
  if (dataUser.type === "seller") {
    return (
      <div
        className="modal fade"
        id="modalDetail"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl justify-content-center m-auto">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="container">
                  <div className="mb-3 row">
                    {/* name product */}
                    <label className="col-sm-2 col-form-label">
                      Name Product
                    </label>
                    <Input
                      handleChange={(e) => handleChange(e)}
                      name="product_name"
                      type="input"
                    />
                  </div>

                  <div className="mb-3 row">
                    {/* name product */}
                    <label className="col-sm-2 col-form-label">Price</label>
                    <Input
                      handleChange={(e) => handleChange(e)}
                      type="input"
                      inpType="number"
                      name="price"
                    />
                  </div>
                  <div className="row mb-3">
                    {/* description */}
                    <label className="col-sm-2 col-form-label">
                      Description
                    </label>
                    <Input
                      name="description"
                      handleChange={(e) => handleChange(e)}
                      type="textArea"
                    />
                  </div>

                  <div className="row mb-3">
                    {/* Category */}
                    <label className="col-sm-2 col-form-label">Category</label>
                    <Input
                      type="select"
                      dataCategory={category}
                      name="id_category"
                      handleChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="row mb-3">
                    {/* Image */}
                    <label className="col-sm-2 col-form-label">Image</label>
                    <Input
                      handleChange={(e) => handleChange(e)}
                      name="image"
                      type="file"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                type="button"
                onClick={() => closeModal()}
              >
                Close
              </button>
              {dataUser.type === "seller" && (
                <button
                  onClick={() => addProduct()}
                  type="button"
                  className="btn btn-success"
                >
                  Add Product
                </button>
              )}
              <i
                classname="bi bi-cart-plus"
                style={{ fontSize: "2rem", color: "cornflowerblue" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="modal fade"
        id="modalDetail"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl justify-content-center m-auto">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Detail Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="card m-auto" style={{ maxWidth: 540 }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      className="w-100 m-2"
                      src={data.image}
                      alt={data.image}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{data.product_name}</h5>
                      <div className="row">
                        <div className="col-lg-4">
                          <p className="card-text">Description</p>
                        </div>
                        <div className="col-lg-8">-</div>
                      </div>
                      <p className="card-text">
                        <small className="text-muted">
                          Date Added {data.adding_date}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                type="button"
                onClick={() => closeModal()}
              >
                Close
              </button>
              {dataUser.type === "buyer" && (
                <button
                  onClick={() => addToCart(data)}
                  type="button"
                  className="btn btn-success"
                >
                  Add To Cart{" "}
                </button>
              )}
              <i
                classname="bi bi-cart-plus"
                style={{ fontSize: "2rem", color: "cornflowerblue" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalDetail2;
