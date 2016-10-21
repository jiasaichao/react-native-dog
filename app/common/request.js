'use strict'
import queryString from 'query-string';
//import _ from 'lodash';
import Mock from 'mockjs';
import {config} from './config';

var request = {}

request.get = function(url, params) {
  if (params) {
    url += '?' + queryString.stringify(params)
  }
//console.log('请求地址',url)
  return fetch(url)
    .then((response) =>{ return response.json()} )
    .then((response) => {
      //console.log('执行到了值',Mock.mock(response)); return Mock.mock(response)
    })
}

request.post = function(url, body) {
  var options = Object.assign({},config.header, {
    body: JSON.stringify(body)
  })

  return fetch(url, options)
    .then((response) => response.json())
    .then((response) => Mock.mock(response))
}
export {request}
