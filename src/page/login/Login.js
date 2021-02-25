import React, { Component } from "react";
import "./style.css";
import { DataContext, Api, withRouter } from "../../utils/index";
import { Alert, Loading } from "../../component/index";
import PropTypes from "prop-types";

class Login extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      typeSwich: "seller",
      typeLbl: "buyer",
    };
  }
  componentDidMount() {
    const { match, location, history } = this.props;
    if (localStorage.getItem("login")) {
      history.push("/");
    }
    const type = localStorage.getItem("type");
    if (type) {
      const parseType = JSON.parse(type);
      console.log({ ...this.state, ...parseType });
      this.setState({ ...this.state, ...parseType });
    }
  }
  loginUser = (e) => {
    const { match, location, history } = this.props;

    e.preventDefault();
    console.log(this.state);
    const { setLoading } = this.context;
    setLoading(true);
    Api.post("/user/login", { ...this.state, type: this.state.typeLbl })
      .then((res) => {
        setLoading(false);

        if (res.data.data) {
          Alert({
            title: "Login Success",
            text: "-",
            icon: "success",
            button: false,
            timer: 1500,
          })
            .then(() => {
              localStorage.setItem("login", JSON.stringify(res.data.data));
            })
            .then(() => {
              // history.push("/");
              window.location.reload();
            });
        } else {
          Alert({
            title: "Login Failed",
            text: "Wrong Username or password",
            icon: "warning",
            button: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handlleCHange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    this.setState({ ...this.state, [name]: val });
  };
  switch = () => {
    const { typeLbl, typeSwich } = this.state;
    this.setState({ ...this.state, typeLbl: typeSwich, typeSwich: typeLbl });
    localStorage.setItem(
      "type",
      JSON.stringify({ typeLbl: typeSwich, typeSwich: typeLbl })
    );
  };
  render() {
    const { loading } = this.context;
    const { typeSwich, typeLbl } = this.state;
    return (
      <div className="rounded-3">
        <form
          className="modal-content  animate"
          onSubmit={(e) => this.loginUser(e)}
        >
          <div
            className="badge bg-primary text-wrap m-1"
            style={{ width: "6rem" }}
          >
            {typeLbl}
          </div>

          <div className="imgcontainers">
            <p class="fs-2">Fish Commerce</p>
          </div>
          <div className="containers">
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              className="name"
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              onChange={(e) => this.handlleCHange(e)}
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="password"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) => this.handlleCHange(e)}
              required
            />
            <div style={{ textAlign: "center" }}>
              <button type="submit" className="btn_login rounded-3">
                Login
              </button>
            </div>

            <label>
              <input type="checkbox" defaultChecked="checked" name="remember" />{" "}
              Remember me
            </label>
          </div>
          <div
            className="containers rounded-3"
            style={{ backgroundColor: "#f1f1f1" }}
          >
            <button
              onClick={() => {
                this.props.history.push("/register");
              }}
              type="button"
              className="btn_login cancelbtn rounded-3"
            >
              Register
            </button>
            <span className="password">
              login as{" "}
              <a
                href=""
                onClick={() => {
                  this.switch();
                }}
              >
                {typeSwich}?
              </a>
            </span>
          </div>
        </form>
        {loading && <Loading />}
      </div>
    );
  }
}
Login.contextType = DataContext;
export default Location = withRouter(Login);
