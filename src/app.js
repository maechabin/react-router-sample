import React, { PropTypes } from "react";
import { render } from "react-dom";
import { Router, Route, Link, browserHistory } from 'react-router'
import request from "superagent";

const Enter = React.createClass({
  getInitialState() {
    return {value: null};
  },
  render() {
    return (
      <div>
        <h2>入力ページ</h2>
        <input type="text" />
        <Link to="confirm">
          <button>確認する</button>
        </Link>
      </div>
    );
  }
});

const Confirm = React.createClass({
  render() {
    return (
      <div>
        <h2>確認ページ</h2>
        <p>{}</p>
        <button>送信する</button>
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
