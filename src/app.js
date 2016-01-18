import React, { PropTypes } from "react";
import { render } from "react-dom";
import { Router, Route, Link, browserHistory } from "react-router"
import request from "superagent";

var _value = {value: null}

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
        <h2>入力ページ</h2>
        <input type="text" value={this.state.value}
          onBlur={this._setValue}
          onChange={this._setValue}
        />
        <Link to="confirm">
          <button>確認する</button>
        </Link>
      </div>
    );
  }
});

const Confirm = React.createClass({
  getInitialState() {
    return _value;
  },
  someHandler() {
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
        <h2>確認ページ</h2>
        <p>{this.state.value}</p>
        <button onClick={this._sendValue}>送信する</button>
        <Link to="/">
          <button>戻る</button>
        </Link>
      </div>
    );
  }
});

const Finish = React.createClass({
  render() {
    return (
      <div>
        <h2>完了ページ</h2>
      </div>
    );
  }
});

render((
  <Router history={browserHistory}>
    <Router path="/" component={Enter} />
    <Router path="confirm" component={Confirm} />
    <Router path="finish" component={Finish} />
  </Router>
), document.getElementById("content"));
