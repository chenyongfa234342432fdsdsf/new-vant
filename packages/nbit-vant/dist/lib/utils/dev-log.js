"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devWarning = devWarning;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function () {
    return data;
  };

  return data;
}

var _isDev = require("./is-dev");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
function devWarning(component, message) {
  if (_isDev.isDev) {
    console.warn(`[@nbit/vant: ${component}] ${message}`);
  }
}