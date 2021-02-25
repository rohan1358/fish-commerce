import React, { Component } from "react";

export default class ModalMyOrder extends Component {
  render() {
    const { myOrder, deleteOrder } = this.props;
    return (
      <div
        className="modal fade"
        id="modalMyOrder"
        tabIndex={-1}
        aria-labelledby="modalMyOrderLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalMyOrderLabel">
                My Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {myOrder.length > 0 ? (
                  myOrder.map((data, index) => {
                    return (
                      <div className="col">
                        <div className="card h-100">
                          <img
                            src={data.image}
                            className="card-img-top"
                            alt={data.image}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{data.product_name}</h5>
                            <p className="card-text">
                              {data.description ? data.description : "-"}
                            </p>
                          </div>
                          <div
                            className={
                              data.status === "proccess"
                                ? "badge bg-primary text-wrap p-1 m-1 position-absolute "
                                : data.status === "accept"
                                ? "badge bg-success text-wrap p-1 m-1 position-absolute "
                                : "badge bg-warning text-wrap p-1 m-1 position-absolute "
                            }
                            style={{ width: "6rem" }}
                          >
                            {data.status}
                          </div>

                          <div className="d-flex justify-content-end m-2">
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteOrder(data.id)}
                            >
                              Delete Order
                            </button>
                          </div>

                          <div className="card-footer bg-info">
                            <small className="text-dark fw-bold">
                              Order Date : {data.date_order}
                            </small>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center w-100">
                    <h3>Order Is EMpty</h3>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
