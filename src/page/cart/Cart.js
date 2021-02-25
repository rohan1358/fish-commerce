import React, { Component } from "react";

export default class Cart extends Component {
  render() {
    const {
      data,
      deleteCart,
      addReduceQuantity,
      dataUser,
      checkoutProduct,
      approveReject,
    } = this.props;
    return (
      <React.Fragment>
        <nav className="navbar sticky-top navbar-light bg-light p-0 text-center justify-content-center align-center navbar-shadow">
          <div className="container-fluid justify-content-center">
            <a className="navbar-brand" href="#">
              {dataUser.type === "buyer" ? "Cart" : "Order"}
            </a>
          </div>
        </nav>
        {Array.isArray(data) ? (
          data.map((data, index) => {
            return (
              <div className="card m-3" style={{ maxWidth: 540 }}>
                <div className="row g-0">
                  <div className="col-md-4 m-auto">
                    <img
                      className="w-100 m-1"
                      src={data.image}
                      alt={data.image}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{data.product_name}</h5>

                      <p className="card-text fw-bold text-success">
                        Rp.{parseFloat(data.price) * parseInt(data.quantity)}
                      </p>
                    </div>
                    <div className="container">
                      {dataUser.type === "buyer" ? (
                        <React.Fragment>
                          <div className="row">
                            <h6 className="ms-4">
                              seller :{" "}
                              <label className="color-success">
                                {data.seller}
                              </label>
                            </h6>
                            <div className="col d-flex justify-content-end ">
                              <button
                                onClick={() =>
                                  addReduceQuantity(data, index, "reduce")
                                }
                                className="btn btn-warning  p-0 w-75"
                              >
                                -
                              </button>
                            </div>

                            {data.quantity}
                            <div className="col">
                              <button
                                onClick={() =>
                                  addReduceQuantity(data, index, "add")
                                }
                                className="btn btn-success  p-0 w-75"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <button
                              onClick={() => {
                                deleteCart(data.id);
                              }}
                              className="btn btn-danger w-50 m-2 ps-3"
                            >
                              Delete
                            </button>
                          </div>
                        </React.Fragment>
                      ) : (
                        <div className="row ms-2">
                          <h6>
                            buyer :{" "}
                            <label className="color-success">
                              {data.username}
                            </label>
                          </h6>
                          <div className="col-4">
                            <label>Quantity</label>
                          </div>

                          <div className="col-8">
                            <label>:</label>

                            <label className="me-3 float-end">
                              {data.quantity}
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {dataUser.type === "seller" && data.status === "reject" ? (
                    <div className="row d-flex justify-content-end m-2">
                      <div
                        className="badge bg-warning text-wrap d-flex justify-content-end float-end"
                        style={{ width: "6rem" }}
                      >
                        the order has been canceled
                      </div>
                    </div>
                  ) : data.status === "accept" ? (
                    <React.Fragment>
                      <div className="row d-flex justify-content-end m-2">
                        <div
                          className="badge bg-success text-wrap d-flex justify-content-end float-end"
                          style={{ width: "6rem" }}
                        >
                          order has been received
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    data.status === "proccess" && (
                      <React.Fragment>
                        <div className="row d-flex justify-content-end">
                          <div className="col d-flex float-end">
                            <button
                              className="btn btn-danger p-0 m-2 w-100 float-end"
                              onClick={() => {
                                approveReject(data, "reject");
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="col d-flex float-end">
                            <button
                              className="btn btn-success p-0 m-2 w-100 float-end"
                              onClick={() => {
                                approveReject(data, "accept");
                              }}
                            >
                              Send Product
                            </button>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="container justify-content-center text-center mt-5">
            <h1>{dataUser.type === "buyer" ? "Cart" : "Order"} Empty</h1>
          </div>
        )}
        {Array.isArray(data) && data.length > 0 && dataUser.type === "buyer" && (
          <button
            className="btn btn-info p-2 m-2 w-25 float-end"
            onClick={() => {
              checkoutProduct("test checkout");
            }}
          >
            Checkout
          </button>
        )}
      </React.Fragment>
    );
  }
}
