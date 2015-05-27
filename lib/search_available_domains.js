'use strict';

var Nightmare = require('nightmare');
var url = require('url');
var _ = require('lodash');

var NAMECHEAP_URL_OBJ = url.parse('https://www.namecheap.com/domains/registration/results.aspx');

module.exports = function(domain, cb) {
  if (!domain) {
    throw new Error('Must pass a domain');
  }

  if (!(typeof cb === 'function')) {
    throw new Error('Must pass a callback');
  }

  var urlObj = Object.create(NAMECHEAP_URL_OBJ);

  urlObj.query = {
    domain: domain
  };

  var searchUrl = url.format(urlObj);

  return new Nightmare()
    .goto(searchUrl)
      .wait('#popular-tab.loaded')
      .evaluate(function () {
        var availItems = document.querySelectorAll('.register .domain-name');

        var res = [];

        for (var i = 0, len = availItems.length; i < len; i++) {
          res.push(availItems[i].innerText);
        }

        return res;
      }, function (items) {
        items = _.compact(items);

        if (!items.length) {
          console.log('No available domains for %s', domain);
        } else {
          console.log('Found %d available domains for %s', items.length, domain);
        }

        cb(null, items);
      })
      .run(function (err, nightmare) {
        if (err) return console.log(err);
      });
};
