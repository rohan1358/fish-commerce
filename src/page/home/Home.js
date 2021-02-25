import React, { Component } from "react";
import Cart from "../cart/Cart";
import { Api } from "../../utils/index";
import { DataContext } from "../../utils/index";
import { ModalDetail, Loading, Alert } from "../../component/index";
import ModalMyOrder from "./ModalMyOrder";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetail: {},
      displayDropDown: false,
      product_name: "",
      id_category: "",
      id_user: "",
      stock_product: "",
      image: "",
      description: "",
      price: "",
      type: "",
      search: "",
    };
  }
  componentDidMount() {
    const {
      fetchListProduct,
      addCart,
      dataUser,
      setCategory,
      setMyOrder,
    } = this.context;
    const parseData = JSON.parse(dataUser);
    if (parseData.type === "buyer") {
      Api.get(
        "/product",
        this.state.search ? { search: this.state.search } : {}
      ).then((res) => {
        console.log(res.data);
        fetchListProduct(res.data.data);
      });
      Api.put("/cart", {
        id_user: parseData.id,
      })
        .then((res) => {
          addCart(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      Api.post("/order", {
        id_buyer: parseData.id,
        type: "buyer",
      })
        .then((res) => {
          // console.log(res.data.data);
          setMyOrder(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const body = {
        id_user: parseData.id,
      };
      Api.post("/product/product-seller", body).then((res) => {
        console.log(res.data);
        fetchListProduct(res.data.data === null ? [] : res.data.data);
      });

      Api.post("/order", {
        id_seller: parseData.id,
        type: "seller",
      })
        .then((res) => {
          // console.log(res.data.data);
          addCart(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    Api.get("/category")
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getOrder = () => {
    console.log("get my order");
    const { dataUser, setMyOrder } = this.context;
    const parseData = JSON.parse(dataUser);
    Api.post("/order", {
      id_buyer: parseData.id,
      type: "buyer",
    })
      .then((res) => {
        // console.log(res.data.data);
        setMyOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getCart = () => {
    const { fetchListProduct, addCart, dataUser } = this.context;
    const parseData = JSON.parse(dataUser);

    Api.put("/cart", {
      id_user: parseData.id,
    })
      .then((res) => {
        addCart(res.data.data);
      })
      .catch((err) => {
        console.logo(err);
      });
  };
  getProduct = (e) => {
    console.log(this.state.search);
    const { fetchListProduct, dataUser } = this.context;
    const parseData = JSON.parse(dataUser);
    if (parseData.type === "buyer") {
      Api.get("/product", {
        params: {
          search: e ? e : this.state.search,
        },
      }).then((res) => {
        console.log(res.data);
        fetchListProduct(res.data.data);
      });
    } else {
      const body = {
        id_user: parseData.id,
        search: e ? e : this.state.search,
      };
      Api.post("/product/product-seller", body).then((res) => {
        console.log(res.data);
        fetchListProduct(res.data.data === null ? [] : res.data.data);
      });
    }
  };

  addToCart = (data) => {
    const { fetchListProduct, addCart, dataUser } = this.context;
    const parseData = JSON.parse(dataUser);

    const datas = {
      id_user: parseData.id,
      id_product: data.id,
      quantity: 1,
      id_seller: data.id_user,
      seller: data.username,
    };

    Api.post("/cart/insert", datas)
      .then((res) => {
        Api.put("/cart", {
          id_user: datas.id_user,
        })
          .then((res) => {
            addCart(res.data.data);
          })
          .then(() => {
            window.$("#modalDetail").modal("hide");
            // window.$("body").removeClass("modal-open");
            window.$(".modal-backdrop").remove();

            var documen = document.getElementById("modalDetail");
          })
          .catch((err) => {
            console.logo(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  openModal = () => {
    var documen = document.getElementById("modalDetail");
    setTimeout(() => {
      documen.style.display = "block";
    }, 500);
  };
  formData = (data, name) => {
    const {
      product_name,
      id_category,
      image,
      description,
      price,
      type,
      stock_product,
    } = this.state;
    const { dataDetail } = this.state;
    const { dataUser } = this.context;
    const parseData = JSON.parse(dataUser);
    const formData = new FormData();
    formData.append(
      "product_name",
      type === "add" ? product_name : dataDetail.product_name
    );
    formData.append(
      "id_category",
      type === "add" ? id_category : dataDetail.id_category
    );
    formData.append("id_user", parseData.id);
    formData.append("image", type === "add" ? image : dataDetail.image);
    formData.append(
      "description",
      type === "add" ? description : dataDetail.description
    );
    formData.append("price", type === "add" ? price : dataDetail.price);
    formData.append("id", type === "add" ? "" : dataDetail.id_product);
    formData.append(
      "stock_product",
      type === "add" ? stock_product : dataDetail.id_product
    );

    return formData;
  };
  addProduct = () => {
    Api.post("/product/insert", this.formData())
      .then((res) => {
        this.getProduct();
        window.$("#modalDetail").modal("hide");
        // window.$("body").removeClass("modal-open");
        window.$(".modal-backdrop").remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  updateProduct = () => {
    Api.patch("/product/update", this.formData())
      .then((res) => {
        window.location.reload();
        this.getProduct();
        window.$("#modalDetail").modal("hide");
        // window.$("body").removeClass("modal-open");
        window.$(".modal-backdrop").remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteCart = (id, all) => {
    const { setLoading } = this.context;

    if (all) {
      Api.post(`/cart/delete/all`, id)
        .then((res) => {
          this.getCart();
          Alert({
            title:
              "checkout is successful, please wait for the seller to deliver the product",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Api.post(`/cart/delete/${id}`)
        .then((res) => {
          this.getCart();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  addReduceQuantity = (data, index, addReduce) => {
    const { cart, addCart, dataUser } = this.context;
    const parseData = JSON.parse(dataUser);

    const body = (qty) => {
      return {
        id_user: parseData.id,
        id_product: data.id_product,
        quantity: qty,
        id: data.id,
        seller: data.seller,
      };
    };
    let cart2 = cart;
    if (addReduce === "add") {
      if (data.quantity < data.stock_product) {
        cart2[index] = { ...data, quantity: data.quantity + 1 };
        addCart(cart2);
        Api.patch("/cart/update", body(data.quantity + 1));
      }
    } else if (addReduce === "reduce") {
      if (data.quantity < 2) {
        this.deleteCart(data.id);
      } else {
        addCart(cart2);
        console.log(addReduce, body(data.quantity - 1));
        Api.patch("/cart/update", body(data.quantity - 1));
        cart2[index] = { ...data, quantity: data.quantity - 1 };
      }
    }
  };
  toggleMenu = () => {
    const { displayDropDown } = this.state;
    const { state } = this;
    console.log(displayDropDown);
    this.setState({ ...state, displayDropDown: !displayDropDown });
    setTimeout(() => {
      var element = document.getElementById("btn-menu");
      // element.classList.toggle("show");
      window.$("#btn-menu").toggleClass("show");

      var element2 = document.getElementById("sub-menu");
      window.$("#sub-menu").toggleClass("show");
      //  element2.classList.toggle("show");
    }, 100);
  };
  logout = () => {
    localStorage.clear();
    window.location.reload();

    setTimeout(() => {
      this.props.history.push("/login");
    }, 500);
  };
  handleChange = (e, types) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = type === "file" ? e.target.files[0] : e.target.value;
    if (types) {
      const state = this.state.dataDetail;
      const dataDetail = this.state.dataDetail;
      if (type === "text" || type === "file") {
        this.setState({
          ...state,
          dataDetail: { ...dataDetail, [name]: value },
        });
      } else if (type === "number") {
        this.setState({
          ...state,
          dataDetail: { ...dataDetail, [name]: parseFloat(value) },
        });
      } else {
        this.setState({
          ...state,
          dataDetail: { ...dataDetail, [name]: value },
        });
      }
    } else {
      const { state } = this.setState;

      if (type === "text" || type === "file") {
        this.setState({ ...state, [name]: value });
      } else if (type === "number") {
        this.setState({ ...state, [name]: parseFloat(value) });
      } else {
        this.setState({ ...state, [name]: value });
      }
    }
  };
  checkoutProduct = () => {
    const { cart, setLoading } = this.context;
    setLoading(true);
    Api.post("/order/insert", cart)
      .then((res) => {
        this.deleteCart(cart, true);
        this.getOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  approveReject = (data, status) => {
    const { addCart, dataUser } = this.context;
    const parseData = JSON.parse(dataUser);
    Api.patch("/order/update", { ...data, status, id_user: data.id_buyer })
      .then((res) => {
        Api.post("/order", {
          id_seller: parseData.id,
          type: "seller",
        })
          .then((res) => {
            // console.log(res.data.data);
            addCart(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteOrder = (id) => {
    Api.delete(`/order/delete/${id}`)
      .then((res) => {
        this.getOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const {
      productList,
      cart,
      dataUser,
      category,
      loading,
      myOrder,
    } = this.context;
    const parseData = JSON.parse(dataUser);

    const { dataDetail } = this.state;

    return (
      <React.Fragment>
        <div
          className="container p-3 h-100 rounded rounded-3"
          style={{ minWidth: "950px" }}
        >
          <div className="row h-100" style={{ overflow: "scroll" }}>
            <div className="col-8 p-0 border border-danger">
              <nav className="navbar sticky-top navbar-light bg-light p-0 navbar-shadow">
                <div className="container-fluid">
                  <a className="navbar-brand" href="#">
                    Hello {parseData.username}, Welcome To Fish Commerce
                  </a>

                  <div className="d-flex">
                    <label className="navbar-brand fw-bold bg-success rounded-3 pe-3 ps-3 text-light pt-0 pb-0">
                      <label className="text-uppercase">{parseData.type}</label>
                    </label>
                    <ul
                      className="navbar-nav me-auto  mb-lg-0 position-absolute"
                      style={{ right: "10px" }}
                    >
                      <li className="nav-item dropdown">
                        <button
                          id="btn-menu"
                          onClick={() => this.toggleMenu()}
                          className="btn dropdown-toggle p-0"
                          role="button"
                          data-toggle="dropdown"
                        ></button>
                        {this.state.displayDropDown && (
                          <ul
                            id="sub-menu"
                            className="dropdown-menu position-absolute"
                            aria-labelledby="navbarDropdown"
                          >
                            <li>
                              <a
                                onClick={() => this.logout()}
                                className="dropdown-item"
                                href="#"
                              >
                                Logout
                              </a>
                            </li>
                            {parseData.type === "buyer" && (
                              <li>
                                <button
                                  type="button"
                                  class="btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalMyOrder"
                                >
                                  My Order
                                </button>
                              </li>
                            )}
                          </ul>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="p-2">
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    className="form-control"
                    placeholder="search..."
                    aria-label="search..."
                    aria-describedby="button-addon2"
                    name="search"
                    onKeyPress={(e) => this.getProduct(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      this.getProduct();
                    }}
                    className="btn btn-primary justify-content-center outline-none"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="bi bi-search" />
                  </button>
                </div>

                <div className="row p-2">
                  {productList.length > 0 ? (
                    productList.map((data, index) => {
                      if (
                        parseInt(data.stock_product) > 0 &&
                        parseData.type === "buyer"
                      ) {
                        return (
                          <React.Fragment key={index}>
                            <div
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetail"
                              onClick={() => {
                                this.setState({
                                  ...dataDetail,
                                  dataDetail: data,
                                  type: "edit",
                                });
                                this.openModal();
                              }}
                              className="card col-sm-3 p-0 m-2 card_detail"
                            >
                              <div className="m-2">
                                <img
                                  className="card-img m-auto border border-success rounded"
                                  src={data.image}
                                  alt={data.image}
                                />
                              </div>

                              <div className="card-body">
                                <h5 className="card-title">
                                  Rp.{data.price ? data.price : "0"}
                                </h5>
                                <h6 className="card-title">
                                  {data.product_name}
                                </h6>
                                <p className="card-text text-label">
                                  {data.description ? data.description : "-"}
                                </p>
                              </div>

                              <div className="card-footer text-muted">
                                Date Added : {data.adding_date}
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      } else if (parseData.type === "seller") {
                        return (
                          <React.Fragment key={index}>
                            <div
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetail"
                              onClick={() => {
                                this.setState({
                                  ...dataDetail,
                                  dataDetail: data,
                                  type: "edit",
                                });
                                this.openModal();
                              }}
                              className="card col-sm-3 p-0 m-2 card_detail"
                            >
                              <div className="m-2">
                                <img
                                  className="card-img m-auto border border-success rounded"
                                  src={data.image}
                                  alt={data.image}
                                />
                              </div>

                              <div className="card-body">
                                <h5 className="card-title">
                                  Rp.{data.price ? data.price : "0"}
                                </h5>
                                <h6 className="card-title">
                                  {data.product_name}
                                </h6>
                                <p className="card-text text-label">
                                  {data.description ? data.description : "-"}
                                </p>
                              </div>

                              <div className="card-footer text-muted">
                                Date Added : {data.adding_date}
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      }
                    })
                  ) : (
                    <div className="text-center">
                      <h1>Product Is Empty</h1>
                    </div>
                  )}
                </div>
              </div>
              {parseData.type === "seller" && (
                <div className="btn-add shadow-lg p-1 mb-5 rounded">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#modalDetail"
                    onClick={() => {
                      this.openModal();
                      this.setState({ ...this.state, type: "add" });
                    }}
                    type="button"
                    className="btn btn-success"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
            <div className="col-4 p-0  border border-danger">
              <Cart
                approveReject={(data, status) =>
                  this.approveReject(data, status)
                }
                addReduceQuantity={(data, index, addRedue) =>
                  this.addReduceQuantity(data, index, addRedue)
                }
                deleteCart={(id) => this.deleteCart(id)}
                data={cart}
                dataUser={parseData}
                checkoutProduct={() => this.checkoutProduct()}
              />
            </div>
          </div>
          <ModalDetail
            updateProduct={() => this.updateProduct()}
            addProduct={() => this.addProduct()}
            dataUser={parseData}
            data={dataDetail}
            addToCart={(e) => this.addToCart(e)}
            category={category}
            handleChange={(e, types) => this.handleChange(e, types)}
            dataProduct={this.state}
          />
        </div>
        {loading && <Loading />}
        <ModalMyOrder
          deleteOrder={(id) => this.deleteOrder(id)}
          myOrder={myOrder}
        />
      </React.Fragment>
    );
  }
}

Home.contextType = DataContext;
