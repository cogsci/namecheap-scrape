'use strict';

var Nightmare = require('nightmare');


new Nightmare()
  .goto('https://www.namecheap.com/domains/registration/results.aspx?domain=homelesshippo')
    .wait('#popular-tab.loaded')
    .evaluate(function () {
      // debug(document.querySelectorAll('.register .domain-name'));
      var availItems = document.querySelectorAll('.register .domain-name');

      var res = [];

      for (var i = 0, len = availItems.length; i < len; i++) {
        res.push(availItems[i].innerText);
      }

      return res;
    }, function (items) {
      if (!items.length) {
        return console.log('No available domains');
      }

      items.forEach(function(item) {
        console.log(item);
      });
    })
    .run(function (err, nightmare) {
      if (err) return console.log(err);
      console.log('Done!');
    });
