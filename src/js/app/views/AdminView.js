/**
 * hyperion remote
 * MIT License
 */

define(['lib/stapes'], function (Stapes) {
  'use strict';

  return Stapes.subclass(/** @lends AdminView.prototype */{
      /**
       * @class AdminView
       * @constructs
       */
      constructor: function () {
          this.bindEventHandlers();
      },

      /**
       * @private
       */
      bindEventHandlers: function () {
          // window.addM
          window.addClickHandler(document.querySelector('#admin ul'), function (event) {
              event.target.classList.add('selected');
              setTimeout(function() {
                  event.target.classList.remove('selected');
              }, 200);

              this.emit('adminSelected', event.target.dataset.id);
          }.bind(this));
      },

      /**
       * Clear the list
       */
      clear: function () {
          document.querySelector('#admin ul').innerHTML = '';
          document.querySelector('#admin .info').classList.add('hidden');
      },

      /**
       * Fill the list
       * @param {object} commands - Object containing commands information
       */
      fillList: function (commands) {
          var dom, el, i;

          dom = document.createDocumentFragment();

          for (i = 0; i < commands.length; i++) {
              el = document.createElement('li');
              el.innerHTML = commands[i].name;
              el.dataset.id = commands[i].path;
              dom.appendChild(el);
          }

          document.querySelector('#admin ul').appendChild(dom);

          if (commands.length === 0) {
              document.querySelector('#admin .info').classList.remove('hidden');
          }
      }
  });
});