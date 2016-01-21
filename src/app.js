import React, { PropTypes } from "react";
import { render } from "react-dom";
import { IndexRoute, Router, Route, Link, browserHistory } from "react-router";
import request from "superagent";

var _value = {value: null}

const App = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
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
        <Link to="confirm">
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
    let element = document.getElementById("main");
    element.scrollIntoView();
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
      <div ref="aaa">
        <h2>Confirm Page</h2>
        <p>{this.state.value}</p>
        <button onClick={this._sendValue}>Send</button>
        <Link to="/">
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
  render() {
    return (
      <div>
        <h2>Finish Page</h2>
          <Link to="/">
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
), document.getElementById("content"));
