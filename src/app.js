import React, { PropTypes } from "react";
import { render } from "react-dom";
import { IndexRoute, Router, Route, Link, browserHistory } from "react-router";
import request from "superagent";

var _value = {value: null}

const content = document.getElementById("content");

const Header = React.createClass({
  render() {
    return (
      <header>
        <h1>react-router-sample</h1>
      </header>
    );
  }
});

const App = React.createClass({
  style: {
    "textAlign": "center"
  },
  render() {
    return (
      <div style={this.style}>
        <Header />
        <main>
          {this.props.children}
        </main>
     </div>
    );
  }
});

const Enter = React.createClass({
  getInitialState() {
    return _value;
  },
  _setValue(e) {
    _value.value = e.target.value;
    this.setState(_value);
  },
  render() {
    return (
      <div>
        <h2>Enter Page</h2>
        <input type="text" value={this.state.value}
          onBlur={this._setValue}
          onChange={this._setValue}
        />
        <Link to={{pathname: "confirm"}}>
          <button>Confirm</button>
        </Link>
      </div>
    );
  }
});

const Confirm = React.createClass({
  getInitialState() {
    return _value;
  },
  componentWillMount() {
    content.scrollIntoView();
  },
  someHandler() {
    _value.value = "";
    browserHistory.push("/finish");
  },
  _sendValue() {
    request
      .get("./index.html")
      .query({
        value: _value.value,
      })
      .end((err, res) => {
        if (err || !res.ok) {
          console.log("Error");
          return;
        } else {
          if (res.status === 200) {
            this.someHandler();
          }
        }
    });
  },
  render() {
    return (
      <div>
        <h2>Confirm Page</h2>
        <p>{this.state.value}</p>
        <p>{ this.props.params.id }</p>
        <button onClick={this._sendValue}>Send</button>
        <Link to={{pathname: "/"}}>
          <button>Back</button>
        </Link>
      </div>
    );
  }
});

const Finish = React.createClass({
  getInitialState() {
    return _value;
  },
  componentWillMount() {
    content.scrollIntoView();
  },
  render() {
    return (
      <div>
        <h2>Finish Page</h2>
          <Link to={{pathname: "/"}}>
            <button>Top</button>
          </Link>
      </div>
    );
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Enter} />
      <Route path="confirm" component={Confirm} />
      <Route path="finish" component={Finish} />
    </Route>
  </Router>
), content);
