/**
 * @file
 * Drupal Bootstrap object.
 */

/**
 * All Drupal Bootstrap JavaScript APIs are contained in this namespace.
 *
 * @namespace
 */
(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.bootstrap = {
    settings: drupalSettings.bootstrap || {}
  };

  /**
   * Wraps Drupal.checkPlain() to ensure value passed isn't empty.
   *
   * Encodes special characters in a plain-text string for display as HTML.
   *
   * @param {string} str
   *   The string to be encoded.
   *
   * @return {string}
   *   The encoded string.
   *
   * @ingroup sanitization
   */
  Drupal.bootstrap.checkPlain = function (str) {
    return str && Drupal.checkPlain(str) || '';
  };

  /**
   * Extends a Bootstrap plugin constructor.
   *
   * @param {string} id
   *   A Bootstrap plugin identifier located in $.fn.
   * @param {function} [callback]
   *   A callback to extend the plugin constructor.
   *
   * @return {function|boolean}
   *   The Bootstrap plugin or FALSE if the plugin does not exist.
   */
  Drupal.bootstrap.extendPlugin = function (id, callback) {
    // Immediately return if the plugin does not exist.
    if (!$.fn[id] || !$.fn[id].Constructor) return false;

    // Extend the plugin if a callback was provided.
    if ($.isFunction(callback)) {
      var ret = callback.apply($.fn[id].Constructor, [this.settings]);
      if ($.isPlainObject(ret)) {
        $.extend(true, $.fn[id].Constructor, ret);
      }
    }

    // Add a jQuery UI like option getter/setter method.
    if ($.fn[id].Constructor.prototype.option === void(0)) {
      $.fn[id].Constructor.prototype.option = this.option;
    }

    return $.fn[id].Constructor;
  };

  /**
   * Replaces a Bootstrap jQuery plugin definition.
   *
   * @param {string} id
   *   A Bootstrap plugin identifier located in $.fn.
   * @param {function} [callback]
   *   A callback to replace the jQuery plugin definition. The callback must
   *   return a function that is used to construct a jQuery plugin.
   *
   * @return {function|boolean}
   *   The Bootstrap jQuery plugin definition or FALSE if the plugin does not
   *   exist.
   */
  Drupal.bootstrap.replacePlugin = function (id, callback) {
    // Immediately return if plugin does not exist or not a valid callback.
    if (!$.fn[id] || !$.fn[id].Constructor || !$.isFunction(callback)) return false;
    var constructor = $.fn[id].Constructor;

    var plugin = callback.apply(constructor);
    if ($.isFunction(plugin)) {
      plugin.Constructor = constructor;

      var old = $.fn[id];
      plugin.noConflict = function () {
        $.fn[id] = old;
        return this;
      };
      $.fn[id] = plugin;
    }
  };

  /**
   * Map of supported events by regular expression.
   *
   * @type {Object<Event|MouseEvent|KeyboardEvent|TouchEvent,RegExp>}
   */
  Drupal.bootstrap.eventMap = {
    Event: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    MouseEvent: /^(?:click|dblclick|mouse(?:down|enter|leave|up|over|move|out))$/,
    KeyboardEvent: /^(?:key(?:down|press|up))$/,
    TouchEvent: /^(?:touch(?:start|end|move|cancel))$/
  };

  /**
   * Simulates a native event on an element in the browser.
   *
   * Note: This is a pretty complete modern implementation. If things are quite
   * working the way you intend (in older browsers), you may wish to use the
   * jQuery.simulate plugin. If it's available, this method will defer to it.
   *
   * @see https://github.com/jquery/jquery-simulate
   *
   * @param {HTMLElement} element
   *   A DOM element to dispatch event on.
   * @param {String} type
   *   The type of event to simulate.
   * @param {Object} [options]
   *   An object of options to pass to the event constructor. Typically, if
   *   an event is being proxied, you should just pass the original event
   *   object here. This allows, if the browser supports it, to be a truly
   *   simulated event.
   */
  Drupal.bootstrap.simulate = function (element, type, options) {
    // Defer to the jQuery.simulate plugin, if it's available.
    if (typeof $.simulate === 'function') {
      new $.simulate(element, type, options);
      return;
    }
    var event;
    var ctor;
    for (var name in Drupal.bootstrap.eventMap) {
      if (Drupal.bootstrap.eventMap[name].test(type)) {
        ctor = name;
        break;
      }
    }
    if (!ctor) {
      throw new SyntaxError('Only rudimentary HTMLEvents, KeyboardEvents and MouseEvents are supported: ' + type);
    }
    var opts = {bubbles: true, cancelable: true};
    if (ctor === 'KeyboardEvent' || ctor === 'MouseEvent') {
      $.extend(opts, {ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1});
    }
    if (ctor === 'MouseEvent') {
      $.extend(opts, {button: 0, pointerX: 0, pointerY: 0, view: window});
    }
    if (options) {
      $.extend(opts, options);
    }
    if (typeof window[ctor] === 'function') {
      event = new window[ctor](type, opts);
      element.dispatchEvent(event);
    }
    else if (document.createEvent) {
      event = document.createEvent(ctor);
      event.initEvent(type, opts.bubbles, opts.cancelable);
      element.dispatchEvent(event);
    }
    else if (typeof element.fireEvent === 'function') {
      event = $.extend(document.createEventObject(), opts);
      element.fireEvent('on' + type, event);
    }
    else if (typeof element[type]) {
      element[type]();
    }
  };

  /**
   * Provide jQuery UI like ability to get/set options for Bootstrap plugins.
   *
   * @param {string|object} key
   *   A string value of the option to set, can be dot like to a nested key.
   *   An object of key/value pairs.
   * @param {*} [value]
   *   (optional) A value to set for key.
   *
   * @returns {*}
   *   - Returns nothing if key is an object or both key and value parameters
   *   were provided to set an option.
   *   - Returns the a value for a specific setting if key was provided.
   *   - Returns an object of key/value pairs of all the options if no key or
   *   value parameter was provided.
   *
   * @see https://github.com/jquery/jquery-ui/blob/master/ui/widget.js
   *
   * @todo This isn't fully working since Bootstrap plugins don't allow
   * methods to return values.
   */
  Drupal.bootstrap.option = function (key, value) {
    var options = key;
    var parts, curOption, i;

    // Don't return a reference to the internal hash.
    if (arguments.length === 0) {
      return $.extend({}, this.options);
    }

    // Handle a specific option.
    if (typeof key === "string") {
      // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
      options = {};
      parts = key.split(".");
      key = parts.shift();
      if (parts.length) {
        curOption = options[key] = $.extend({}, this.options[key]);
        for (i = 0; i < parts.length - 1; i++) {
          curOption[parts[i]] = curOption[parts[i]] || {};
          curOption = curOption[parts[i]];
        }
        key = parts.pop();
        if (arguments.length === 1) {
          return curOption[key] === undefined ? null : curOption[key];
        }
        curOption[key] = value;
      }
      else {
        if (arguments.length === 1) {
          return this.options[key] === undefined ? null : this.options[key];
        }
        options[key] = value;
      }
    }

    // Set the new option(s).
    for (key in options) {
      if (!options.hasOwnProperty(key)) continue;
      this.options[key] = options[key];
    }
    return this;
  };

})(window.jQuery, window.Drupal, window.drupalSettings);
;
(function ($, _) {

  /**
   * Class to help modify attributes.
   *
   * @param {object} object
   *   An object to initialize attributes with.
   *
   * @constructor
   */
  var Attributes = function (object) {
    this.data = object && _.isObject(object) && _.clone(object) || {};
  };

  /**
   * Renders the attributes object as a string to inject into an HTML element.
   *
   * @returns {string}
   */
  Attributes.prototype.toString = function () {
    var output = '';
    var name, value;
    var checkPlain = function (str) {
      return str && str.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
    };
    for (name in this.data) {
      if (!this.data.hasOwnProperty(name)) continue;
      value = this.data[name];
      if (_.isFunction(value)) value = value();
      if (_.isObject(value)) value = _.values(value);
      if (_.isArray(value)) value = value.join(' ');
      output += ' ' + checkPlain(name) + '="' + checkPlain(value) + '"';
    }
    return output;
  };

  /**
   * Add class(es) to the array.
   *
   * @param {string|Array} value
   *   An individual class or an array of classes to add.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.addClass = function (value) {
    var classes = this.getClasses();
    value = [].concat(classes, value);
    this.set('class', _.uniq(value));
    return this;
  };

  /**
   * Returns whether the requested attribute exists.
   *
   * @param {string} name
   *   An attribute name to check.
   *
   * @return {boolean}
   *   TRUE or FALSE
   */
  Attributes.prototype.exists = function (name) {
    return this.data[name] !== void(0) && this.data[name] !== null;
  };

  /**
   * Retrieve a specific attribute from the array.
   *
   * @param {string} name
   *   The specific attribute to retrieve.
   * @param {*} defaultValue
   *   (optional) The default value to set if the attribute does not exist.
   *
   * @return {*}
   *   A specific attribute value, passed by reference.
   */
  Attributes.prototype.get = function (name, defaultValue) {
    if (!this.exists(name)) this.data[name] = defaultValue;
    return this.data[name];
  };

  /**
   * Retrieves a cloned copy of the internal attributes data object.
   *
   * @returns {Object}
   */
  Attributes.prototype.getData = function () {
    return _.clone(this.data);
  };

  /**
   * Retrieves classes from the array.
   *
   * @return {Array}
   *   The classes array.
   */
  Attributes.prototype.getClasses = function () {
    var classes = [].concat(this.get('class', []));
    return _.uniq(classes);
  };

  /**
   * Indicates whether a class is present in the array.
   *
   * @param {string|Array} name
   *   The class(es) to search for.
   *
   * @return {boolean}
   *   TRUE or FALSE
   */
  Attributes.prototype.hasClass = function (name) {
    name = [].concat(name);
    var classes = this.getClasses();
    var found = false;
    _.each(name, function (value) { if (_.indexOf(classes, value) !== -1) found = true; });
    return found;
  };

  /**
   * Merges multiple values into the array.
   *
   * @param {object} values
   *   An associative key/value array.
   * @param {boolean} [recursive]
   *   Flag determining whether or not to recursively merge key/value pairs.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.merge = function (values, recursive) {
    values = values instanceof Attributes ? values.getData() : values;
    if (recursive === void(0) || recursive) {
      this.data = $.extend(true, {}, this.data, values);
    }
    else {
      $.extend(this.data, values);
    }
    return this;
  };

  /**
   * Removes an attribute from the array.
   *
   * @param {string} name
   *   The name of the attribute to remove.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.remove = function (name) {
    if (this.exists(name)) delete this.data[name];
    return this;
  };

  /**
   * Removes a class from the attributes array.
   *
   * @param {string|Array} value
   *   An individual class or an array of classes to remove.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.removeClass = function (value) {
    this.set('class', _.without(this.getClasses(), [].concat(value)));
    return this;
  };

  /**
   * Replaces a class in the attributes array.
   *
   * @param {string} oldValue
   *   The old class to remove.
   * @param {string} newValue
   *   The new class. It will not be added if the old class does not exist.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.replaceClass = function (oldValue, newValue) {
    var classes = this.getClasses();
    var i = _.indexOf(oldValue, classes);
    if (i >= 0) {
      classes[i] = newValue;
      this.set('class', classes);
    }
    return this;
  };

  /**
   * Sets an attribute on the array.
   *
   * @param {string} name
   *   The name of the attribute to set.
   * @param {*} value
   *   The value of the attribute to set.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.set = function (name, value) {
    this.data[name] = value;
    return this;
  };

  /**
   * Creates an Attributes instance.
   *
   * @param {object|Attributes} object
   *   An object to initialize attributes with.
   *
   * @returns {Attributes}
   *
   * @global
   *
   * @constructor
   */
  window.Attributes = function (object) {
    return object instanceof Attributes ? object : new Attributes(object);
  };

})(window.jQuery, window._);
;
/**
 * @file
 * Theme hooks for the Drupal Bootstrap base theme.
 */
(function ($, Drupal, Bootstrap) {

  /**
   * Fallback for theming an icon if the Icon API module is not installed.
   */
  if (!Drupal.icon) Drupal.icon = { bundles: {} };
  if (!Drupal.theme.icon || Drupal.theme.prototype.icon) {
    $.extend(Drupal.theme, /** @lends Drupal.theme */ {
      /**
       * Renders an icon.
       *
       * @param {string} bundle
       *   The bundle which the icon belongs to.
       * @param {string} icon
       *   The name of the icon to render.
       * @param {object|Attributes} [attributes]
       *   An object of attributes to also apply to the icon.
       *
       * @returns {string}
       */
      icon: function (bundle, icon, attributes) {
        if (!Drupal.icon.bundles[bundle]) return '';
        attributes = Attributes(attributes).addClass('icon').set('aria-hidden', 'true');
        icon = Drupal.icon.bundles[bundle](icon, attributes);
        return '<span' + attributes + '></span>';
      }
    });
  }

  /**
   * Callback for modifying an icon in the "bootstrap" icon bundle.
   *
   * @param {string} icon
   *   The icon being rendered.
   * @param {Attributes} attributes
   *   Attributes object for the icon.
   */
  Drupal.icon.bundles.bootstrap = function (icon, attributes) {
    attributes.addClass(['glyphicon', 'glyphicon-' + icon]);
  };

  /**
   * Add necessary theming hooks.
   */
  $.extend(Drupal.theme, /** @lends Drupal.theme */ {

    /**
     * Renders a Bootstrap AJAX glyphicon throbber.
     *
     * @returns {string}
     */
    ajaxThrobber: function () {
      return Drupal.theme.bootstrapIcon('refresh', {'class': ['ajax-throbber', 'glyphicon-spin'] });
    },

    /**
     * Renders a button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button. If it contains one of:
     *   - value: The label of the button.
     *   - context: The context type of Bootstrap button, can be one of:
     *     - default
     *     - primary
     *     - success
     *     - info
     *     - warning
     *     - danger
     *     - link
     *
     * @returns {string}
     */
    button: function (attributes) {
      attributes = Attributes(attributes).addClass('btn');
      var context = attributes.get('context', 'default');
      var label = attributes.get('value', '');
      attributes.remove('context').remove('value');
      if (!attributes.hasClass(['btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger', 'btn-link'])) {
        attributes.addClass('btn-' + Bootstrap.checkPlain(context));
      }
      return '<button' + attributes + '>' + label + '</button>';
    },

    /**
     * Alias for "button" theme hook.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    btn: function (attributes) {
      return Drupal.theme('button', attributes);
    },

    /**
     * Renders a button block element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-block': function (attributes) {
      return Drupal.theme('button', Attributes(attributes).addClass('btn-block'));
    },

    /**
     * Renders a large button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-lg': function (attributes) {
      return Drupal.theme('button', Attributes(attributes).addClass('btn-lg'));
    },

    /**
     * Renders a small button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-sm': function (attributes) {
      return Drupal.theme('button', Attributes(attributes).addClass('btn-sm'));
    },

    /**
     * Renders an extra small button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-xs': function (attributes) {
      return Drupal.theme('button', Attributes(attributes).addClass('btn-xs'));
    },

    /**
     * Renders a glyphicon.
     *
     * @param {string} name
     *   The name of the glyphicon.
     * @param {object|Attributes} [attributes]
     *   An object of attributes to apply to the icon.
     *
     * @returns {string}
     */
    bootstrapIcon: function (name, attributes) {
      return Drupal.theme('icon', 'bootstrap', name, attributes);
    }

  });

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/*!
 * jQuery Form Plugin
 * version: 4.2.2
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r),r}:e(jQuery)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).closest("form").ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=r.form;if(i.clk=r,"image"===r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==e('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!e.fn.prop;e.fn.attr2=function(){if(!o)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t,r,n,s){function u(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;a<o;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function c(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){a("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function i(){function t(){try{var e=n(v).readyState;a("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){a("Server abort: ",e," (",e.name,")"),s(L),j&&clearTimeout(j),j=void 0}}var r=p.attr2("target"),i=p.attr2("action"),o=p.attr("enctype")||p.attr("encoding")||"multipart/form-data";w.setAttribute("target",m),l&&!/post/i.test(l)||w.setAttribute("method","POST"),i!==f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||l&&!/post/i.test(l)||p.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(j=setTimeout(function(){T=!0,s(A)},f.timeout));var u=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&(e.isPlainObject(f.extraData[c])&&f.extraData[c].hasOwnProperty("name")&&f.extraData[c].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+f.extraData[c].name+'">',k).val(f.extraData[c].value).appendTo(w)[0]):u.push(e('<input type="hidden" name="'+c+'">',k).val(f.extraData[c]).appendTo(w)[0]));f.iframeTarget||h.appendTo(D),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(e){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",o),r?w.setAttribute("target",r):p.removeAttr("target"),e(u).remove()}}function s(t){if(!x.aborted&&!X){if((O=n(v))||(a("cannot access response document"),t=L),t===A&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t===L&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(O&&O.location.href!==f.iframeSrc||T){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"===f.dataType||O.XMLDocument||e.isXMLDoc(O);if(a("isXml="+o),!o&&window.opera&&(null===O.body||!O.body.innerHTML)&&--C)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=O.body?O.body:O.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=O.XMLDocument?O.XMLDocument:O,o&&(f.dataType="xml"),x.getResponseHeader=function(e){return{"content-type":f.dataType}[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(f.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||f.textarea){var p=O.getElementsByTagName("textarea")[0];if(p)x.responseText=p.value,x.status=Number(p.getAttribute("status"))||x.status,x.statusText=p.getAttribute("statusText")||x.statusText;else if(l){var m=O.getElementsByTagName("pre")[0],g=O.getElementsByTagName("body")[0];m?x.responseText=m.textContent?m.textContent:m.innerText:g&&(x.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!x.responseXML&&x.responseText&&(x.responseXML=q(x.responseText));try{M=N(x,c,f)}catch(e){i="parsererror",x.error=r=e||i}}catch(e){a("error caught: ",e),i="error",x.error=r=e||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(f.success&&f.success.call(f.context,M,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,f])):i&&(void 0===r&&(r=x.statusText),f.error&&f.error.call(f.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,f,r])),d&&e.event.trigger("ajaxComplete",[x,f]),d&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,x,i),X=!0,f.timeout&&clearTimeout(j),setTimeout(function(){f.iframeTarget?h.attr("src",f.iframeSrc):h.remove(),x.responseXML=null},100)}}}var u,c,f,d,m,h,v,x,y,b,T,j,w=p[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;c<g.length;c++)u=e(g[c]),o?u.prop("disabled",!1):u.removeAttr("disabled");(f=e.extend(!0,{},e.ajaxSettings,t)).context=f.context||f,m="jqFormIO"+(new Date).getTime();var k=w.ownerDocument,D=p.closest("body");if(f.iframeTarget?(b=(h=e(f.iframeTarget,k)).attr2("name"))?m=b:h.attr2("name",m):(h=e('<iframe name="'+m+'" src="'+f.iframeSrc+'" />',k)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}h.attr("src",f.iframeSrc),x.error=r,f.error&&f.error.call(f.context,x,r,t),d&&e.event.trigger("ajaxError",[x,f,r]),f.complete&&f.complete.call(f.context,x,r)}},(d=f.global)&&0==e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,f]),f.beforeSend&&!1===f.beforeSend.call(f.context,x,f))return f.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;(y=w.clk)&&(b=y.name)&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"===y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y));var A=1,L=2,F=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&F&&(f.extraData=f.extraData||{},f.extraData[E]=F),f.forceSync?i():setTimeout(i,10);var M,O,X,C=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},_=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i=("xml"===r||!r)&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&(("json"===r||!r)&&n.indexOf("json")>=0?o=_(o):("script"===r||!r)&&n.indexOf("javascript")>=0&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var l,f,d,p=this;"function"==typeof t?t={success:t}:"string"==typeof t||!1===t&&arguments.length>0?(t={url:t,data:r,dataType:n},"function"==typeof s&&(t.success=s)):void 0===t&&(t={}),l=t.method||t.type||this.attr2("method"),(d=(d="string"==typeof(f=t.url||this.attr2("action"))?e.trim(f):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:d,success:e.ajaxSettings.success,type:l||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var h=t.traditional;void 0===h&&(h=e.ajaxSettings.traditional);var v,g=[],x=this.formToArray(t.semantic,g,t.filtering);if(t.data){var y=e.isFunction(t.data)?t.data(x):t.data;t.extraData=y,v=e.param(y,h)}if(t.beforeSubmit&&!1===t.beforeSubmit(x,this,t))return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[x,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=e.param(x,h);v&&(b=b?b+"&"+v:v),"GET"===t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+b,t.data=null):t.data=b;var T=[];if(t.resetForm&&T.push(function(){p.resetForm()}),t.clearForm&&T.push(function(){p.clearForm(t.includeHidden)}),!t.dataType&&t.target){var j=t.success||function(){};T.push(function(r,a,n){var i=arguments,o=t.replaceTarget?"replaceWith":"html";e(t.target)[o](r).each(function(){j.apply(this,i)})})}else t.success&&(e.isArray(t.success)?e.merge(T,t.success):T.push(t.success));if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=T.length;i<o;i++)T[i].apply(n,[e,r,a||p,p])},t.error){var w=t.error;t.error=function(e,r,a){var n=t.context||this;w.apply(n,[e,r,a,p])}}if(t.complete){var S=t.complete;t.complete=function(e,r){var a=t.context||this;S.apply(a,[e,r,p])}}var k=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}).length>0,D="multipart/form-data",A=p.attr("enctype")===D||p.attr("encoding")===D,L=i.fileapi&&i.formdata;a("fileAPI :"+L);var F,E=(k||A)&&!L;!1!==t.iframe&&(t.iframe||E)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){F=c(x)}):F=c(x):F=(k||A)&&L?function(r){for(var a=new FormData,n=0;n<r.length;n++)a.append(r[n].name,r[n].value);if(t.extraData){var i=u(t.extraData);for(n=0;n<i.length;n++)i[n]&&a.append(i[n][0],i[n][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=a,s&&s.call(this,e,r)},e.ajax(o)}(x):e.ajax(t),p.removeData("jqxhr").data("jqxhr",F);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n,i,o,s){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var u={s:this.selector,c:this.context};return!e.isReady&&u.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(u.s,u.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().on("submit.form-plugin",n,t).on("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r,a){var n=[];if(0===this.length)return n;var o,s=this[0],u=this.attr("id"),c=t||void 0===s.elements?s.getElementsByTagName("*"):s.elements;if(c&&(c=e.makeArray(c)),u&&(t||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=e(':input[form="'+u+'"]').get()).length&&(c=(c||[]).concat(o)),!c||!c.length)return n;e.isFunction(a)&&(c=e.map(c,a));var l,f,d,p,m,h,v;for(l=0,h=c.length;l<h;l++)if(m=c[l],(d=m.name)&&!m.disabled)if(t&&s.clk&&"image"===m.type)s.clk===m&&(n.push({name:d,value:e(m).val(),type:m.type}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}));else if((p=e.fieldValue(m,!0))&&p.constructor===Array)for(r&&r.push(m),f=0,v=p.length;f<v;f++)n.push({name:d,value:p[f]});else if(i.fileapi&&"file"===m.type){r&&r.push(m);var g=m.files;if(g.length)for(f=0;f<g.length;f++)n.push({name:d,value:g[f],type:m.type});else n.push({name:d,value:"",type:m.type})}else null!==p&&void 0!==p&&(r&&r.push(m),n.push({name:d,value:p,type:m.type,required:m.required}));if(!t&&s.clk){var x=e(s.clk),y=x[0];(d=y.name)&&!y.disabled&&"image"===y.type&&(n.push({name:d,value:x.val()}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)r.push({name:a,value:n[i]});else null!==n&&void 0!==n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor===Array&&!o.length||(o.constructor===Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,i=t.type,o=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!t.checked||("submit"===i||"image"===i)&&t.form&&t.form.clk!==t||"select"===o&&-1===t.selectedIndex))return null;if("select"===o){var s=t.selectedIndex;if(s<0)return null;for(var u=[],c=t.options,l="select-one"===i,f=l?s+1:c.length,d=l?s:0;d<f;d++){var p=c[d];if(p.selected&&!p.disabled){var m=p.value;if(m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return m;u.push(m)}}return u}return e(t).val().replace(n,"\r\n")},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"===n?this.value="":"checkbox"===a||"radio"===a?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){var t=e(this),r=this.tagName.toLowerCase();switch(r){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var a=t.parents("select");return a.length&&a[0].multiple?"option"===r?this.selected=this.defaultSelected:t.find("option").resetForm():a.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var n=e(t.attr("for")),i=t.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"===r||"radio"===r)this.checked=t;else if("option"===this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"===a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.Views = {};

  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');
    if (pos !== -1) {
      query = query.substring(pos + 1);
    }
    var pair = void 0;
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i].split('=');

      if (pair[0] !== 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
    return args;
  };

  Drupal.Views.parseViewArgs = function (href, viewPath) {
    var returnObj = {};
    var path = Drupal.Views.getPath(href);

    var viewHref = Drupal.url(viewPath).substring(drupalSettings.path.baseUrl.length);

    if (viewHref && path.substring(0, viewHref.length + 1) === viewHref + '/') {
      returnObj.view_args = decodeURIComponent(path.substring(viewHref.length + 1, path.length));
      returnObj.view_path = path;
    }
    return returnObj;
  };

  Drupal.Views.pathPortion = function (href) {
    var protocol = window.location.protocol;
    if (href.substring(0, protocol.length) === protocol) {
      href = href.substring(href.indexOf('/', protocol.length + 2));
    }
    return href;
  };

  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(drupalSettings.path.baseUrl.length, href.length);

    if (href.substring(0, 3) === '?q=') {
      href = href.substring(3, href.length);
    }
    var chars = ['#', '?', '&'];
    for (var i = 0; i < chars.length; i++) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }
    return href;
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ViewsAjaxView = {};
  Drupal.behaviors.ViewsAjaxView.attach = function (context, settings) {
    if (settings && settings.views && settings.views.ajaxViews) {
      var ajaxViews = settings.views.ajaxViews;

      Object.keys(ajaxViews || {}).forEach(function (i) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(ajaxViews[i]);
      });
    }
  };
  Drupal.behaviors.ViewsAjaxView.detach = function (context, settings, trigger) {
    if (trigger === 'unload') {
      if (settings && settings.views && settings.views.ajaxViews) {
        var ajaxViews = settings.views.ajaxViews;

        Object.keys(ajaxViews || {}).forEach(function (i) {
          var selector = '.js-view-dom-id-' + ajaxViews[i].view_dom_id;
          if ($(selector, context).length) {
            delete Drupal.views.instances[i];
            delete settings.views.ajaxViews[i];
          }
        });
      }
    }
  };

  Drupal.views = {};

  Drupal.views.instances = {};

  Drupal.views.ajaxView = function (settings) {
    var selector = '.js-view-dom-id-' + settings.view_dom_id;
    this.$view = $(selector);

    var ajaxPath = drupalSettings.views.ajax_path;

    if (ajaxPath.constructor.toString().indexOf('Array') !== -1) {
      ajaxPath = ajaxPath[0];
    }

    var queryString = window.location.search || '';
    if (queryString !== '') {
      queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
      if (queryString !== '') {
        queryString = (/\?/.test(ajaxPath) ? '&' : '?') + queryString;
      }
    }

    this.element_settings = {
      url: ajaxPath + queryString,
      submit: settings,
      setClick: true,
      event: 'click',
      selector: selector,
      progress: { type: 'fullscreen' }
    };

    this.settings = settings;

    this.$exposed_form = $('form#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
    this.$exposed_form.once('exposed-form').each($.proxy(this.attachExposedFormAjax, this));

    this.$view.filter($.proxy(this.filterNestedViews, this)).once('ajax-pager').each($.proxy(this.attachPagerAjax, this));

    var selfSettings = $.extend({}, this.element_settings, {
      event: 'RefreshView',
      base: this.selector,
      element: this.$view.get(0)
    });
    this.refreshViewAjax = Drupal.ajax(selfSettings);
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];

    $('input[type=submit], input[type=image]', this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function (index) {
      var selfSettings = $.extend({}, that.element_settings, {
        base: $(this).attr('id'),
        element: this
      });
      that.exposedFormAjax[index] = Drupal.ajax(selfSettings);
    });
  };

  Drupal.views.ajaxView.prototype.filterNestedViews = function () {
    return !this.$view.parents('.view').length;
  };

  Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
    this.$view.find('ul.js-pager__items > li > a, th.views-field a, .attachment .views-summary a').each($.proxy(this.attachPagerLinkAjax, this));
  };

  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function (id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr('href');

    $.extend(viewData, this.settings, Drupal.Views.parseQueryString(href), Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

    var selfSettings = $.extend({}, this.element_settings, {
      submit: viewData,
      base: false,
      element: link
    });
    this.pagerAjax = Drupal.ajax(selfSettings);
  };

  Drupal.AjaxCommands.prototype.viewsScrollTop = function (ajax, response) {
    var offset = $(response.selector).offset();

    var scrollTarget = response.selector;
    while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }

    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({ scrollTop: offset.top - 10 }, 500);
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
 * @file
 * Extends core ajax_view.js.
 */

(function ($, Drupal) {
  'use strict';

  /**
   * @method
   */
  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];
    $('button[type=submit], input[type=submit], input[type=image]', this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function (index) {
      var self_settings = $.extend({}, that.element_settings, {
        base: $(this).attr('id'),
        element: this
      });
      that.exposedFormAjax[index] = Drupal.ajax(self_settings);
    });
  };

})(jQuery, Drupal);
;
(function ($, Drupal, debounce) {
  "use strict";

  //surveillance de la barre espace sur la pager : un espace déclenche un click.
  $( "body" ).on( "keypress", ".pager a.button", function( event ) {
    if( event.key == ' ') {
      event.preventDefault;
      $(this).click();
    }
  });


  if($('.pager').attr( "data-drupal-views-infinite-scroll-pager") !== undefined ) {

    //Affectation de focus sur l'élément nouvellement chargé  
    //On utilise $(document).ajaxSuccess() mais une évolution prochaine de "views infine scroll" devrait ajouter un évenement spécifique à la fin du chargement :
    //https://www.drupal.org/project/views_infinite_scroll/issues/3068579
    var focusableElementsList = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
    $(document).ajaxSuccess(function( event, xhr, settings) {
      //si la requete Ajax est liée à InfiniteScroll
      if( xhr.responseJSON[1] && xhr.responseJSON[1].method === 'infiniteScrollInsertView') {
        //sélection du dernier élément chargé
        var lastRow =  $('.views-infinite-scroll-content-wrapper').children().last();
        //première balise "focusable" du dernier élément
        var lastRowFirstFocusable = lastRow.find(focusableElementsList).first();
        //focus sur la balise focusable, si elle n'existe pas, affectation de l'attribut "tabindex='-1'" au bloc
        lastRowFirstFocusable.length > 0 ? lastRowFirstFocusable.focus() : lastRow.attr('tabindex','-1')
        //lastRow.attr('tabindex','-1')
      }
    });
  }


})(jQuery, Drupal, Drupal.debounce);
;
/**
 * @file
 * Bootstrap Popovers.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Popover plugin constructor class.
   */
  Bootstrap.extendPlugin('popover', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.popover_animation,
        html: !!settings.popover_html,
        placement: settings.popover_placement,
        selector: settings.popover_selector,
        trigger: settings.popover_trigger,
        triggerAutoclose: !!settings.popover_trigger_autoclose,
        title: settings.popover_title,
        content: settings.popover_content,
        delay: parseInt(settings.popover_delay, 10),
        container: settings.popover_container
      }
    };
  });

  /**
   * Bootstrap Popovers.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapPopovers = {
    attach: function (context) {

      // Popover autoclose.
      if ($.fn.popover.Constructor.DEFAULTS.triggerAutoclose) {
        var $currentPopover = null;
        $(document)
          .on('show.bs.popover', '[data-toggle=popover]', function () {
            var $trigger = $(this);
            var popover = $trigger.data('bs.popover');

            // Only keep track of clicked triggers that we're manually handling.
            if (popover.options.originalTrigger === 'click') {
              if ($currentPopover && !$currentPopover.is($trigger)) {
                $currentPopover.popover('hide');
              }
              $currentPopover = $trigger;
            }
          })
          .on('click', function (e) {
            var $target = $(e.target);
            var popover = $target.is('[data-toggle=popover]') && $target.data('bs.popover');
            if ($currentPopover && !$target.is('[data-toggle=popover]') && !$target.closest('.popover.in')[0]) {
              $currentPopover.popover('hide');
              $currentPopover = null;
            }
          })
        ;
      }

      var elements = $(context).find('[data-toggle=popover]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.popover.Constructor.DEFAULTS, $element.data());

        // Store the original trigger.
        options.originalTrigger = options.trigger;

        // If the trigger is "click", then we'll handle it manually here.
        if (options.trigger === 'click') {
          options.trigger = 'manual';
        }

        // Retrieve content from a target element.
        var $target = $(options.target || $element.is('a[href^="#"]') && $element.attr('href')).clone();
        if (!options.content && $target[0]) {
          $target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');
          options.content = $target.wrap('<div/>').parent()[options.html ? 'html' : 'text']() || '';
        }

        // Initialize the popover.
        $element.popover(options);

        // Handle clicks manually.
        if (options.originalTrigger === 'click') {
          // To ensure the element is bound multiple times, remove any
          // previously set event handler before adding another one.
          $element
            .off('click.drupal.bootstrap.popover')
            .on('click.drupal.bootstrap.popover', function (e) {
              $(this).popover('toggle');
              e.preventDefault();
              e.stopPropagation();
            })
          ;
        }
      }
    },
    detach: function (context) {
      // Destroy all popovers.
      $(context).find('[data-toggle="popover"]')
        .off('click.drupal.bootstrap.popover')
        .popover('destroy')
      ;
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Bootstrap Tooltips.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Tooltip plugin constructor class.
   */
  Bootstrap.extendPlugin('tooltip', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.tooltip_animation,
        html: !!settings.tooltip_html,
        placement: settings.tooltip_placement,
        selector: settings.tooltip_selector,
        trigger: settings.tooltip_trigger,
        delay: parseInt(settings.tooltip_delay, 10),
        container: settings.tooltip_container
      }
    };
  });

  /**
   * Bootstrap Tooltips.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context) {
      var elements = $(context).find('[data-toggle="tooltip"]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, $element.data());
        $element.tooltip(options);
      }
    },
    detach: function (context) {
      // Destroy all tooltips.
      $(context).find('[data-toggle="tooltip"]').tooltip('destroy');
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/*
 *  Hyphenator 5.2.0(devel) - client side hyphenation for webbrowsers
 *  Copyright (C) 2015  Mathias Nater, Zürich (mathiasnater at gmail dot com)
 *  https://github.com/mnater/Hyphenator
 *
 *  Released under the MIT license
 *  http://mnater.github.io/Hyphenator/LICENSE.txt
 */

var Hyphenator;Hyphenator=(function(window){'use strict';var contextWindow=window;var supportedLangs=(function(){var r={},o=function(code,file,script,prompt){r[code]={'file':file,'script':script,'prompt':prompt};};o('be','be.js',1,'Мова гэтага сайта не можа быць вызначаны аўтаматычна. Калі ласка пакажыце мову:');o('ca','ca.js',0,'');o('cs','cs.js',0,'Jazyk této internetové stránky nebyl automaticky rozpoznán. Určete prosím její jazyk:');o('cu','cu.js',1,'Ꙗ҆зы́къ сегѡ̀ са́йта не мо́жетъ ѡ҆предѣле́нъ бы́ти. Прошꙋ́ тѧ ᲂу҆каза́ти ꙗ҆зы́къ:');o('da','da.js',0,'Denne websides sprog kunne ikke bestemmes. Angiv venligst sprog:');o('bn','bn.js',4,'');o('de','de.js',0,'Die Sprache dieser Webseite konnte nicht automatisch bestimmt werden. Bitte Sprache angeben:');o('el','el-monoton.js',6,'');o('el-monoton','el-monoton.js',6,'');o('el-polyton','el-polyton.js',6,'');o('en','en-us.js',0,'The language of this website could not be determined automatically. Please indicate the main language:');o('en-gb','en-gb.js',0,'The language of this website could not be determined automatically. Please indicate the main language:');o('en-us','en-us.js',0,'The language of this website could not be determined automatically. Please indicate the main language:');o('eo','eo.js',0,'La lingvo de ĉi tiu retpaĝo ne rekoneblas aŭtomate. Bonvolu indiki ĝian ĉeflingvon:');o('es','es.js',0,'El idioma del sitio no pudo determinarse autom%E1ticamente. Por favor, indique el idioma principal:');o('et','et.js',0,'Veebilehe keele tuvastamine ebaõnnestus, palun valige kasutatud keel:');o('fi','fi.js',0,'Sivun kielt%E4 ei tunnistettu automaattisesti. M%E4%E4rit%E4 sivun p%E4%E4kieli:');o('fr','fr.js',0,'La langue de ce site n%u2019a pas pu %EAtre d%E9termin%E9e automatiquement. Veuillez indiquer une langue, s.v.p.%A0:');o('ga','ga.js',0,'Níorbh fhéidir teanga an tsuímh a fháil go huathoibríoch. Cuir isteach príomhtheanga an tsuímh:');o('grc','grc.js',6,'');o('gu','gu.js',7,'');o('hi','hi.js',5,'');o('hu','hu.js',0,'A weboldal nyelvét nem sikerült automatikusan megállapítani. Kérem adja meg a nyelvet:');o('hy','hy.js',3,'Չհաջողվեց հայտնաբերել այս կայքի լեզուն։ Խնդրում ենք նշեք հիմնական լեզուն՝');o('it','it.js',0,'Lingua del sito sconosciuta. Indicare una lingua, per favore:');o('kn','kn.js',8,'ಜಾಲ ತಾಣದ ಭಾಷೆಯನ್ನು ನಿರ್ಧರಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮುಖ್ಯ ಭಾಷೆಯನ್ನು ಸೂಚಿಸಿ:');o('la','la.js',0,'');o('lt','lt.js',0,'Nepavyko automatiškai nustatyti šios svetainės kalbos. Prašome įvesti kalbą:');o('lv','lv.js',0,'Šīs lapas valodu nevarēja noteikt automātiski. Lūdzu norādiet pamata valodu:');o('ml','ml.js',10,'ഈ വെ%u0D2C%u0D4D%u200Cസൈറ്റിന്റെ ഭാഷ കണ്ടുപിടിയ്ക്കാ%u0D28%u0D4D%u200D കഴിഞ്ഞില്ല. ഭാഷ ഏതാണെന്നു തിരഞ്ഞെടുക്കുക:');o('nb','nb-no.js',0,'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');o('no','nb-no.js',0,'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');o('nb-no','nb-no.js',0,'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');o('nl','nl.js',0,'De taal van deze website kan niet automatisch worden bepaald. Geef de hoofdtaal op:');o('or','or.js',11,'');o('pa','pa.js',13,'');o('pl','pl.js',0,'Języka tej strony nie można ustalić automatycznie. Proszę wskazać język:');o('pt','pt.js',0,'A língua deste site não pôde ser determinada automaticamente. Por favor indique a língua principal:');o('ru','ru.js',1,'Язык этого сайта не может быть определен автоматически. Пожалуйста укажите язык:');o('sk','sk.js',0,'');o('sl','sl.js',0,'Jezika te spletne strani ni bilo mogoče samodejno določiti. Prosim navedite jezik:');o('sr-cyrl','sr-cyrl.js',1,'Језик овог сајта није детектован аутоматски. Молим вас наведите језик:');o('sr-latn','sr-latn.js',0,'Jezika te spletne strani ni bilo mogoče samodejno določiti. Prosim navedite jezik:');o('sv','sv.js',0,'Spr%E5ket p%E5 den h%E4r webbplatsen kunde inte avg%F6ras automatiskt. V%E4nligen ange:');o('ta','ta.js',14,'');o('te','te.js',15,'');o('tr','tr.js',0,'Bu web sitesinin dili otomatik olarak tespit edilememiştir. Lütfen dökümanın dilini seçiniz%A0:');o('uk','uk.js',1,'Мова цього веб-сайту не може бути визначена автоматично. Будь ласка, вкажіть головну мову:');o('ro','ro.js',0,'Limba acestui sit nu a putut fi determinată automat. Alege limba principală:');return r;}());var locality=(function getLocality(){var r={isBookmarklet:false,basePath:"//mnater.github.io/Hyphenator/",isLocal:false};var fullPath;function getBasePath(path){return path.substring(0,path.lastIndexOf("/")+1);}function findCurrentScript(){var scripts=contextWindow.document.getElementsByTagName('script');var num=scripts.length-1;var currScript;var src;while(num>=0){currScript=scripts[num];if(currScript.hasAttribute("src")&&currScript.src.indexOf("Hyphenator")!==-1){src=currScript.src;break;}num-=1;}return src;}if(!!document.currentScript){fullPath=document.currentScript.src;}else{fullPath=findCurrentScript();}r.basePath=getBasePath(fullPath);if(fullPath.indexOf("bm=true")!==-1){r.isBookmarklet=true;}if(window.location.href.indexOf(r.basePath)!==-1){r.isLocal=true;}return r;}());var basePath=locality.basePath;var isLocal=locality.isLocal;var documentLoaded=false;var persistentConfig=false;var doFrames=false;var dontHyphenate={'video':true,'audio':true,'script':true,'code':true,'pre':true,'img':true,'br':true,'samp':true,'kbd':true,'var':true,'abbr':true,'acronym':true,'sub':true,'sup':true,'button':true,'option':true,'label':true,'textarea':true,'input':true,'math':true,'svg':true,'style':true};var enableCache=true;var storageType='local';var storage;var enableReducedPatternSet=false;var enableRemoteLoading=true;var displayToggleBox=false;var onError=function(e){window.alert("Hyphenator.js says:\n\nAn Error occurred:\n"+e.message);};var onWarning=function(e){window.console.log(e.message);};function createElem(tagname,context){context=context||contextWindow;var el;if(window.document.createElementNS){el=context.document.createElementNS('http://www.w3.org/1999/xhtml',tagname);}else if(window.document.createElement){el=context.document.createElement(tagname);}return el;}function forEachKey(o,f){var k;if(Object.hasOwnProperty("keys")){Object.keys(o).forEach(f);}else{for(k in o){if(o.hasOwnProperty(k)){f(k);}}}}var css3=false;function css3_gethsupport(){var support=false,supportedBrowserLangs={},property='',checkLangSupport,createLangSupportChecker=function(prefix){var testStrings=['aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz','абвгдеёжзийклмнопрстуфхцчшщъыьэюя','أبتثجحخدذرزسشصضطظعغفقكلمنهوي','աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ','ঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ','ँंःअआइईउऊऋऌएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसहऽािीुूृॄेैोौ्॒॑ॠॡॢॣ','αβγδεζηθικλμνξοπρσςτυφχψω','બહઅઆઇઈઉઊઋૠએઐઓઔાિીુૂૃૄૢૣેૈોૌકખગઘઙચછજઝઞટઠડઢણતથદધનપફસભમયરલળવશષ','ಂಃಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹಽಾಿೀುೂೃೄೆೇೈೊೋೌ್ೕೖೞೠೡ','ກຂຄງຈຊຍດຕຖທນບປຜຝພຟມຢຣລວສຫອຮະັາິີຶືຸູົຼເແໂໃໄ່້໊໋ໜໝ','ംഃഅആഇഈഉഊഋഌഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരറലളഴവശഷസഹാിീുൂൃെേൈൊോൌ്ൗൠൡൺൻർൽൾൿ','ଁଂଃଅଆଇଈଉଊଋଌଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହାିୀୁୂୃେୈୋୌ୍ୗୠୡ','أبتثجحخدذرزسشصضطظعغفقكلمنهوي','ਁਂਃਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਲ਼ਵਸ਼ਸਹਾਿੀੁੂੇੈੋੌ੍ੰੱ','ஃஅஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரறலளழவஷஸஹாிீுூெேைொோௌ்ௗ','ఁంఃఅఆఇఈఉఊఋఌఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహాిీుూృౄెేైొోౌ్ౕౖౠౡ'],f=function(lang){var shadow,computedHeight,bdy,r=false;if(supportedBrowserLangs.hasOwnProperty(lang)){r=supportedBrowserLangs[lang];}else if(supportedLangs.hasOwnProperty(lang)){bdy=window.document.getElementsByTagName('body')[0];shadow=createElem('div',window);shadow.id='Hyphenator_LanguageChecker';shadow.style.width='5em';shadow.style.padding='0';shadow.style.border='none';shadow.style[prefix]='auto';shadow.style.hyphens='auto';shadow.style.fontSize='12px';shadow.style.lineHeight='12px';shadow.style.wordWrap='normal';shadow.style.wordBreak='normal';shadow.style.visibility='hidden';shadow.lang=lang;shadow.style['-webkit-locale']="'"+lang+"'";shadow.innerHTML=testStrings[supportedLangs[lang].script];bdy.appendChild(shadow);computedHeight=shadow.offsetHeight;bdy.removeChild(shadow);r=!!(computedHeight>12);supportedBrowserLangs[lang]=r;}else{r=false;}return r;};return f;},s;if(window.getComputedStyle){s=window.getComputedStyle(window.document.getElementsByTagName('body')[0],null);if(s.hyphens!==undefined){support=true;property='hyphens';checkLangSupport=createLangSupportChecker('hyphens');}else if(s['-webkit-hyphens']!==undefined){support=true;property='-webkit-hyphens';checkLangSupport=createLangSupportChecker('-webkit-hyphens');}else if(s.MozHyphens!==undefined){support=true;property='-moz-hyphens';checkLangSupport=createLangSupportChecker('MozHyphens');}else if(s['-ms-hyphens']!==undefined){support=true;property='-ms-hyphens';checkLangSupport=createLangSupportChecker('-ms-hyphens');}}return{support:support,property:property,supportedBrowserLangs:supportedBrowserLangs,checkLangSupport:checkLangSupport};}var css3_h9n;var hyphenateClass='hyphenate';var urlHyphenateClass='urlhyphenate';var classPrefix='Hyphenator'+Math.round(Math.random()*1000);var hideClass=classPrefix+'hide';var hideClassRegExp=new RegExp("\\s?\\b"+hideClass+"\\b","g");var unhideClass=classPrefix+'unhide';var unhideClassRegExp=new RegExp("\\s?\\b"+unhideClass+"\\b","g");var css3hyphenateClass=classPrefix+'css3hyphenate';var css3hyphenateClassHandle;var dontHyphenateClass='donthyphenate';var min=6;var leftmin=0;var rightmin=0;var compound="auto";var orphanControl=1;var isBookmarklet=locality.isBookmarklet;var mainLanguage=null;var defaultLanguage='';var elements=(function(){var makeElement=function(element){return{element:element,hyphenated:false,treated:false};},makeElementCollection=function(){var counters=[0,0],list={},add=function(el,lang){var elo=makeElement(el);if(!list.hasOwnProperty(lang)){list[lang]=[];}list[lang].push(elo);counters[0]+=1;return elo;},each=function(fn){forEachKey(list,function(k){if(fn.length===2){fn(k,list[k]);}else{fn(list[k]);}});};return{counters:counters,list:list,add:add,each:each};};return makeElementCollection();}());var exceptions={};var docLanguages={};var url='(?:\\w*:\/\/)?(?:(?:\\w*:)?(?:\\w*)@)?(?:(?:(?:[\\d]{1,3}\\.){3}(?:[\\d]{1,3}))|(?:(?:www\\.|[a-zA-Z]\\.)?[a-zA-Z0-9\\-\\.]+\\.(?:[a-z]{2,})))(?::\\d*)?(?:\/[\\w#!:\\.?\\+=&%@!\\-]*)*';var mail='[\\w-\\.]+@[\\w\\.]+';var zeroWidthSpace=(function(){var zws,ua=window.navigator.userAgent.toLowerCase();zws=String.fromCharCode(8203);if(ua.indexOf('msie 6')!==-1){zws='';}if(ua.indexOf('opera')!==-1&&ua.indexOf('version/10.00')!==-1){zws='';}return zws;}());var onBeforeWordHyphenation=function(word){return word;};var onAfterWordHyphenation=function(word){return word;};var onHyphenationDone=function(context){return context;};var selectorFunction=false;function flattenNodeList(nl){var parentElements=[],i=1,j=0,isParent=true;parentElements.push(nl[0]);while(i<nl.length){while(j<parentElements.length){if(parentElements[j].contains(nl[i])){isParent=false;break;}j+=1;}if(isParent){parentElements.push(nl[i]);}isParent=true;i+=1;}return parentElements;}function mySelectorFunction(hyphenateClass){var tmp,el=[],i=0;if(window.document.getElementsByClassName){el=contextWindow.document.getElementsByClassName(hyphenateClass);}else if(window.document.querySelectorAll){el=contextWindow.document.querySelectorAll('.'+hyphenateClass);}else{tmp=contextWindow.document.getElementsByTagName('*');while(i<tmp.length){if(tmp[i].className.indexOf(hyphenateClass)!==-1&&tmp[i].className.indexOf(dontHyphenateClass)===-1){el.push(tmp[i]);}i+=1;}}return el;}function selectElements(){var elems;if(selectorFunction){elems=selectorFunction();}else{elems=mySelectorFunction(hyphenateClass);}if(elems.length!==0){elems=flattenNodeList(elems);}return elems;}var intermediateState='hidden';var unhide='wait';var CSSEditors=[];function makeCSSEdit(w){w=w||window;var doc=w.document,sheet=(function(){var i=0,l=doc.styleSheets.length,s,element,r=false;while(i<l){s=doc.styleSheets[i];try{if(!!s.cssRules){r=s;break;}}catch(ignore){}i+=1;}if(r===false){element=doc.createElement('style');element.type='text/css';doc.getElementsByTagName('head')[0].appendChild(element);r=doc.styleSheets[doc.styleSheets.length-1];}return r;}()),changes=[],findRule=function(sel){var s,rule,sheets=w.document.styleSheets,rules,i=0,j=0,r=false;while(i<sheets.length){s=sheets[i];try{if(!!s.cssRules){rules=s.cssRules;}else if(!!s.rules){rules=s.rules;}}catch(ignore){}if(!!rules&&!!rules.length){while(j<rules.length){rule=rules[j];if(rule.selectorText===sel){r={index:j,rule:rule};}j+=1;}}i+=1;}return r;},addRule=function(sel,rulesStr){var i,r;if(!!sheet.insertRule){if(!!sheet.cssRules){i=sheet.cssRules.length;}else{i=0;}r=sheet.insertRule(sel+'{'+rulesStr+'}',i);}else if(!!sheet.addRule){if(!!sheet.rules){i=sheet.rules.length;}else{i=0;}sheet.addRule(sel,rulesStr,i);r=i;}return r;},removeRule=function(sheet,index){if(sheet.deleteRule){sheet.deleteRule(index);}else{sheet.removeRule(index);}};return{setRule:function(sel,rulesString){var i,existingRule,cssText;existingRule=findRule(sel);if(!!existingRule){if(!!existingRule.rule.cssText){cssText=existingRule.rule.cssText;}else{cssText=existingRule.rule.style.cssText.toLowerCase();}if(cssText!==sel+' { '+rulesString+' }'){if(cssText.indexOf(rulesString)!==-1){existingRule.rule.style.visibility='';}i=addRule(sel,rulesString);changes.push({sheet:sheet,index:i});}}else{i=addRule(sel,rulesString);changes.push({sheet:sheet,index:i});}},clearChanges:function(){var change=changes.pop();while(!!change){removeRule(change.sheet,change.index);change=changes.pop();}}};}var hyphen=String.fromCharCode(173);var urlhyphen=zeroWidthSpace;function hyphenateURL(url){var tmp=url.replace(/([:\/.?#&\-_,;!@]+)/gi,'$&'+urlhyphen),parts=tmp.split(urlhyphen),i=0;while(i<parts.length){if(parts[i].length>(2*min)){parts[i]=parts[i].replace(/(\w{3})(\w)/gi,"$1"+urlhyphen+"$2");}i+=1;}if(parts[parts.length-1]===""){parts.pop();}return parts.join(urlhyphen);}var safeCopy=true;var zeroTimeOut=(function(){if(window.postMessage&&window.addEventListener){return(function(){var timeouts=[],msg="Hyphenator_zeroTimeOut_message",setZeroTimeOut=function(fn){timeouts.push(fn);window.postMessage(msg,"*");},handleMessage=function(event){if(event.source===window&&event.data===msg){event.stopPropagation();if(timeouts.length>0){timeouts.shift()();}}};window.addEventListener("message",handleMessage,true);return setZeroTimeOut;}());}return function(fn){window.setTimeout(fn,0);};}());var hyphRunFor={};function runWhenLoaded(w,f){var toplevel,add=window.document.addEventListener?'addEventListener':'attachEvent',rem=window.document.addEventListener?'removeEventListener':'detachEvent',pre=window.document.addEventListener?'':'on';function init(context){if(hyphRunFor[context.location.href]){onWarning(new Error("Warning: multiple execution of Hyphenator.run() – This may slow down the script!"));}contextWindow=context||window;f();hyphRunFor[contextWindow.location.href]=true;}function doScrollCheck(){try{w.document.documentElement.doScroll("left");}catch(ignore){window.setTimeout(doScrollCheck,1);return;}if(!hyphRunFor[w.location.href]){documentLoaded=true;init(w);}}function doOnEvent(e){var i=0,fl,haveAccess;if(!!e&&e.type==='readystatechange'&&w.document.readyState!=='interactive'&&w.document.readyState!=='complete'){return;}w.document[rem](pre+'DOMContentLoaded',doOnEvent,false);w.document[rem](pre+'readystatechange',doOnEvent,false);fl=w.frames.length;if(fl===0||!doFrames){w[rem](pre+'load',doOnEvent,false);documentLoaded=true;init(w);}else if(doFrames&&fl>0){if(!!e&&e.type==='load'){w[rem](pre+'load',doOnEvent,false);while(i<fl){haveAccess=undefined;try{haveAccess=w.frames[i].document.toString();}catch(ignore){haveAccess=undefined;}if(!!haveAccess){runWhenLoaded(w.frames[i],f);}i+=1;}init(w);}}}if(documentLoaded||w.document.readyState==='complete'){documentLoaded=true;doOnEvent({type:'load'});}else{w.document[add](pre+'DOMContentLoaded',doOnEvent,false);w.document[add](pre+'readystatechange',doOnEvent,false);w[add](pre+'load',doOnEvent,false);toplevel=false;try{toplevel=!window.frameElement;}catch(ignore){}if(toplevel&&w.document.documentElement.doScroll){doScrollCheck();}}}function getLang(el,fallback){try{return!!el.getAttribute('lang')?el.getAttribute('lang').toLowerCase():!!el.getAttribute('xml:lang')?el.getAttribute('xml:lang').toLowerCase():el.tagName.toLowerCase()!=='html'?getLang(el.parentNode,fallback):fallback?mainLanguage:null;}catch(ignore){}}function autoSetMainLanguage(w){w=w||contextWindow;var el=w.document.getElementsByTagName('html')[0],m=w.document.getElementsByTagName('meta'),i=0,getLangFromUser=function(){var ml,text='',dH=300,dW=450,dX=Math.floor((w.outerWidth-dW)/2)+window.screenX,dY=Math.floor((w.outerHeight-dH)/2)+window.screenY,ul='',languageHint;if(!!window.showModalDialog&&(w.location.href.indexOf(basePath)!==-1)){ml=window.showModalDialog(basePath+'modalLangDialog.html',supportedLangs,"dialogWidth: "+dW+"px; dialogHeight: "+dH+"px; dialogtop: "+dY+"; dialogleft: "+dX+"; center: on; resizable: off; scroll: off;");}else{languageHint=(function(){var r='';forEachKey(supportedLangs,function(k){r+=k+', ';});r=r.substring(0,r.length-2);return r;}());ul=window.navigator.language||window.navigator.userLanguage;ul=ul.substring(0,2);if(!!supportedLangs[ul]&&supportedLangs[ul].prompt!==''){text=supportedLangs[ul].prompt;}else{text=supportedLangs.en.prompt;}text+=' (ISO 639-1)\n\n'+languageHint;ml=window.prompt(window.unescape(text),ul).toLowerCase();}return ml;};mainLanguage=getLang(el,false);if(!mainLanguage){while(i<m.length){if(!!m[i].getAttribute('http-equiv')&&(m[i].getAttribute('http-equiv').toLowerCase()==='content-language')){mainLanguage=m[i].getAttribute('content').toLowerCase();}if(!!m[i].getAttribute('name')&&(m[i].getAttribute('name').toLowerCase()==='dc.language')){mainLanguage=m[i].getAttribute('content').toLowerCase();}if(!!m[i].getAttribute('name')&&(m[i].getAttribute('name').toLowerCase()==='language')){mainLanguage=m[i].getAttribute('content').toLowerCase();}i+=1;}}if(!mainLanguage&&doFrames&&(!!contextWindow.frameElement)){autoSetMainLanguage(window.parent);}if(!mainLanguage&&defaultLanguage!==''){mainLanguage=defaultLanguage;}if(!mainLanguage){mainLanguage=getLangFromUser();}el.lang=mainLanguage;}function gatherDocumentInfos(){var elToProcess,urlhyphenEls,tmp,i=0;function process(el,pLang,isChild){var n,j=0,hyphenate=true,eLang,useCSS3=function(){css3hyphenateClassHandle=makeCSSEdit(contextWindow);css3hyphenateClassHandle.setRule('.'+css3hyphenateClass,css3_h9n.property+': auto;');css3hyphenateClassHandle.setRule('.'+dontHyphenateClass,css3_h9n.property+': manual;');if((eLang!==pLang)&&css3_h9n.property.indexOf('webkit')!==-1){css3hyphenateClassHandle.setRule('.'+css3hyphenateClass,'-webkit-locale : '+eLang+';');}el.className=el.className+' '+css3hyphenateClass;},useHyphenator=function(){if(isBookmarklet&&eLang!==mainLanguage){return;}if(supportedLangs.hasOwnProperty(eLang)){docLanguages[eLang]=true;}else{if(supportedLangs.hasOwnProperty(eLang.split('-')[0])){eLang=eLang.split('-')[0];docLanguages[eLang]=true;}else if(!isBookmarklet){hyphenate=false;onError(new Error('Language "'+eLang+'" is not yet supported.'));}}if(hyphenate){if(intermediateState==='hidden'){el.className=el.className+' '+hideClass;}elements.add(el,eLang);}};isChild=isChild||false;if(el.lang&&typeof el.lang==='string'){eLang=el.lang.toLowerCase();}else if(!!pLang&&pLang!==''){eLang=pLang.toLowerCase();}else{eLang=getLang(el,true);}if(!isChild){if(css3&&css3_h9n.support&&!!css3_h9n.checkLangSupport(eLang)){useCSS3();}else{useHyphenator();}}else{if(eLang!==pLang){if(css3&&css3_h9n.support&&!!css3_h9n.checkLangSupport(eLang)){useCSS3();}else{useHyphenator();}}else{if(!css3||!css3_h9n.support||!css3_h9n.checkLangSupport(eLang)){useHyphenator();}}}n=el.childNodes[j];while(!!n){if(n.nodeType===1&&!dontHyphenate[n.nodeName.toLowerCase()]&&n.className.indexOf(dontHyphenateClass)===-1&&n.className.indexOf(urlHyphenateClass)===-1&&!elToProcess[n]){process(n,eLang,true);}j+=1;n=el.childNodes[j];}}function processUrlStyled(el){var n,j=0;n=el.childNodes[j];while(!!n){if(n.nodeType===1&&!dontHyphenate[n.nodeName.toLowerCase()]&&n.className.indexOf(dontHyphenateClass)===-1&&n.className.indexOf(hyphenateClass)===-1&&!urlhyphenEls[n]){processUrlStyled(n);}else if(n.nodeType===3){n.data=hyphenateURL(n.data);}j+=1;n=el.childNodes[j];}}if(css3){css3_h9n=css3_gethsupport();}if(isBookmarklet){elToProcess=contextWindow.document.getElementsByTagName('body')[0];process(elToProcess,mainLanguage,false);}else{if(!css3&&intermediateState==='hidden'){CSSEditors.push(makeCSSEdit(contextWindow));CSSEditors[CSSEditors.length-1].setRule('.'+hyphenateClass,'visibility: hidden;');CSSEditors[CSSEditors.length-1].setRule('.'+hideClass,'visibility: hidden;');CSSEditors[CSSEditors.length-1].setRule('.'+unhideClass,'visibility: visible;');}elToProcess=selectElements();tmp=elToProcess[i];while(!!tmp){process(tmp,'',false);i+=1;tmp=elToProcess[i];}urlhyphenEls=mySelectorFunction(urlHyphenateClass);i=0;tmp=urlhyphenEls[i];while(!!tmp){processUrlStyled(tmp);i+=1;tmp=urlhyphenEls[i];}}if(elements.counters[0]===0){i=0;while(i<CSSEditors.length){CSSEditors[i].clearChanges();i+=1;}onHyphenationDone(contextWindow.location.href);}}function makeCharMap(){var int2code=[],code2int={},add=function(newValue){if(!code2int[newValue]){int2code.push(newValue);code2int[newValue]=int2code.length-1;}};return{int2code:int2code,code2int:code2int,add:add};}function makeValueStore(len){var indexes=(function(){var arr;if(Object.prototype.hasOwnProperty.call(window,"Uint32Array")){arr=new window.Uint32Array(3);arr[0]=1;arr[1]=1;arr[2]=1;}else{arr=[1,1,1];}return arr;}()),keys=(function(){var i,r;if(Object.prototype.hasOwnProperty.call(window,"Uint8Array")){return new window.Uint8Array(len);}r=[];r.length=len;i=r.length-1;while(i>=0){r[i]=0;i-=1;}return r;}()),add=function(p){keys[indexes[1]]=p;indexes[2]=indexes[1];indexes[1]+=1;},add0=function(){indexes[1]+=1;},finalize=function(){var start=indexes[0];keys[indexes[2]+1]=255;indexes[0]=indexes[2]+2;indexes[1]=indexes[0];return start;};return{keys:keys,add:add,add0:add0,finalize:finalize};}function convertPatternsToArray(lo){var trieNextEmptyRow=0,i,charMapc2i,valueStore,indexedTrie,trieRowLength,extract=function(patternSizeInt,patterns){var charPos=0,charCode=0,mappedCharCode=0,rowStart=0,nextRowStart=0,prevWasDigit=false;while(charPos<patterns.length){charCode=patterns.charCodeAt(charPos);if((charPos+1)%patternSizeInt!==0){if(charCode<=57&&charCode>=49){valueStore.add(charCode-48);prevWasDigit=true;}else{if(!prevWasDigit){valueStore.add0();}prevWasDigit=false;if(nextRowStart===-1){nextRowStart=trieNextEmptyRow+trieRowLength;trieNextEmptyRow=nextRowStart;indexedTrie[rowStart+mappedCharCode*2]=nextRowStart;}mappedCharCode=charMapc2i[charCode];rowStart=nextRowStart;nextRowStart=indexedTrie[rowStart+mappedCharCode*2];if(nextRowStart===0){indexedTrie[rowStart+mappedCharCode*2]=-1;nextRowStart=-1;}}}else{if(charCode<=57&&charCode>=49){valueStore.add(charCode-48);indexedTrie[rowStart+mappedCharCode*2+1]=valueStore.finalize();}else{if(!prevWasDigit){valueStore.add0();}valueStore.add0();if(nextRowStart===-1){nextRowStart=trieNextEmptyRow+trieRowLength;trieNextEmptyRow=nextRowStart;indexedTrie[rowStart+mappedCharCode*2]=nextRowStart;}mappedCharCode=charMapc2i[charCode];rowStart=nextRowStart;if(indexedTrie[rowStart+mappedCharCode*2]===0){indexedTrie[rowStart+mappedCharCode*2]=-1;}indexedTrie[rowStart+mappedCharCode*2+1]=valueStore.finalize();}rowStart=0;nextRowStart=0;prevWasDigit=false;}charPos+=1;}};lo.charMap=makeCharMap();i=0;while(i<lo.patternChars.length){lo.charMap.add(lo.patternChars.charCodeAt(i));i+=1;}charMapc2i=lo.charMap.code2int;valueStore=makeValueStore(lo.valueStoreLength);lo.valueStore=valueStore;if(Object.prototype.hasOwnProperty.call(window,"Int32Array")){lo.indexedTrie=new window.Int32Array(lo.patternArrayLength*2);}else{lo.indexedTrie=[];lo.indexedTrie.length=lo.patternArrayLength*2;i=lo.indexedTrie.length-1;while(i>=0){lo.indexedTrie[i]=0;i-=1;}}indexedTrie=lo.indexedTrie;trieRowLength=lo.charMap.int2code.length*2;forEachKey(lo.patterns,function(i){extract(parseInt(i,10),lo.patterns[i]);});}function recreatePattern(pattern,nodePoints){var r=[],c=pattern.split(''),i=0;while(i<=c.length){if(nodePoints[i]&&nodePoints[i]!==0){r.push(nodePoints[i]);}if(c[i]){r.push(c[i]);}i+=1;}return r.join('');}function convertExceptionsToObject(exc){var w=exc.split(', '),r={},i=0,l=w.length,key;while(i<l){key=w[i].replace(/-/g,'');if(!r.hasOwnProperty(key)){r[key]=w[i];}i+=1;}return r;}function loadPatterns(lang,cb){var location,xhr,head,script,done=false;if(supportedLangs.hasOwnProperty(lang)&&!Hyphenator.languages[lang]){location=basePath+'patterns/'+supportedLangs[lang].file;}else{return;}if(isLocal&&!isBookmarklet){xhr=null;try{xhr=new window.XMLHttpRequest();}catch(ignore){try{xhr=new window.ActiveXObject("Microsoft.XMLHTTP");}catch(ignore){try{xhr=new window.ActiveXObject("Msxml2.XMLHTTP");}catch(ignore){xhr=null;}}}if(xhr){xhr.open('HEAD',location,true);xhr.setRequestHeader('Cache-Control','no-cache');xhr.onreadystatechange=function(){if(xhr.readyState===2){if(xhr.status>=400){onError(new Error('Could not load\n'+location));delete docLanguages[lang];return;}xhr.abort();}};xhr.send(null);}}if(createElem){head=window.document.getElementsByTagName('head').item(0);script=createElem('script',window);script.src=location;script.type='text/javascript';script.charset='utf8';script.onreadystatechange=function(){if(!done&&(!script.readyState||script.readyState==="loaded"||script.readyState==="complete")){done=true;cb();script.onreadystatechange=null;script.onload=null;if(head&&script.parentNode){head.removeChild(script);}}};script.onload=script.onreadystatechange;head.appendChild(script);}}function createWordRegExp(lang){var lo=Hyphenator.languages[lang],wrd="";if(String.prototype.normalize){wrd='[\\w'+lo.specialChars+lo.specialChars.normalize("NFD")+hyphen+String.fromCharCode(8204)+'-]{'+min+',}(?!:\\/\\/)';}else{wrd='[\\w'+lo.specialChars+hyphen+String.fromCharCode(8204)+'-]{'+min+',}(?!:\\/\\/)';}return wrd;}function prepareLanguagesObj(lang){var lo=Hyphenator.languages[lang];if(!lo.prepared){if(enableCache){lo.cache={};}if(enableReducedPatternSet){lo.redPatSet={};}if(leftmin>lo.leftmin){lo.leftmin=leftmin;}if(rightmin>lo.rightmin){lo.rightmin=rightmin;}if(lo.hasOwnProperty('exceptions')){Hyphenator.addExceptions(lang,lo.exceptions);delete lo.exceptions;}if(exceptions.hasOwnProperty('global')){if(exceptions.hasOwnProperty(lang)){exceptions[lang]+=', '+exceptions.global;}else{exceptions[lang]=exceptions.global;}}if(exceptions.hasOwnProperty(lang)){lo.exceptions=convertExceptionsToObject(exceptions[lang]);delete exceptions[lang];}else{lo.exceptions={};}convertPatternsToArray(lo);lo.genRegExp=new RegExp('('+createWordRegExp(lang)+')|('+url+')|('+mail+')','gi');lo.prepared=true;}}function prepare(callback){var tmp1;function languagesLoaded(){forEachKey(docLanguages,function(l){if(Hyphenator.languages.hasOwnProperty(l)){delete docLanguages[l];if(!!storage){storage.setItem(l,window.JSON.stringify(Hyphenator.languages[l]));}prepareLanguagesObj(l);callback(l);}});}if(!enableRemoteLoading){forEachKey(Hyphenator.languages,function(lang){prepareLanguagesObj(lang);});callback('*');return;}forEachKey(docLanguages,function(lang){if(!!storage&&storage.test(lang)){Hyphenator.languages[lang]=window.JSON.parse(storage.getItem(lang));prepareLanguagesObj(lang);if(exceptions.hasOwnProperty('global')){tmp1=convertExceptionsToObject(exceptions.global);forEachKey(tmp1,function(tmp2){Hyphenator.languages[lang].exceptions[tmp2]=tmp1[tmp2];});}if(exceptions.hasOwnProperty(lang)){tmp1=convertExceptionsToObject(exceptions[lang]);forEachKey(tmp1,function(tmp2){Hyphenator.languages[lang].exceptions[tmp2]=tmp1[tmp2];});delete exceptions[lang];}Hyphenator.languages[lang].genRegExp=new RegExp('('+createWordRegExp(lang)+')|('+url+')|('+mail+')','gi');if(enableCache){if(!Hyphenator.languages[lang].cache){Hyphenator.languages[lang].cache={};}}delete docLanguages[lang];callback(lang);}else{loadPatterns(lang,languagesLoaded);}});languagesLoaded();}var toggleBox=function(){var bdy,myTextNode,text=(Hyphenator.doHyphenation?'Hy-phen-a-tion':'Hyphenation'),myBox=contextWindow.document.getElementById('HyphenatorToggleBox');if(!!myBox){myBox.firstChild.data=text;}else{bdy=contextWindow.document.getElementsByTagName('body')[0];myBox=createElem('div',contextWindow);myBox.setAttribute('id','HyphenatorToggleBox');myBox.setAttribute('class',dontHyphenateClass);myTextNode=contextWindow.document.createTextNode(text);myBox.appendChild(myTextNode);myBox.onclick=Hyphenator.toggleHyphenation;myBox.style.position='absolute';myBox.style.top='0px';myBox.style.right='0px';myBox.style.zIndex='1000';myBox.style.margin='0';myBox.style.backgroundColor='#AAAAAA';myBox.style.color='#FFFFFF';myBox.style.font='6pt Arial';myBox.style.letterSpacing='0.2em';myBox.style.padding='3px';myBox.style.cursor='pointer';myBox.style.WebkitBorderBottomLeftRadius='4px';myBox.style.MozBorderRadiusBottomleft='4px';myBox.style.borderBottomLeftRadius='4px';bdy.appendChild(myBox);}};function doCharSubst(loCharSubst,w){var r=w;forEachKey(loCharSubst,function(subst){r=r.replace(new RegExp(subst,'g'),loCharSubst[subst]);});return r;}var wwAsMappedCharCodeStore=(function(){if(Object.prototype.hasOwnProperty.call(window,"Int32Array")){return new window.Int32Array(64);}return[];}());var wwhpStore=(function(){var r;if(Object.prototype.hasOwnProperty.call(window,"Uint8Array")){r=new window.Uint8Array(64);}else{r=[];}return r;}());function hyphenateCompound(lo,lang,word){var hw,parts,i=0;switch(compound){case"auto":parts=word.split('-');while(i<parts.length){if(parts[i].length>=min){parts[i]=hyphenateWord(lo,lang,parts[i]);}i+=1;}hw=parts.join('-');break;case"all":parts=word.split('-');while(i<parts.length){if(parts[i].length>=min){parts[i]=hyphenateWord(lo,lang,parts[i]);}i+=1;}hw=parts.join('-'+zeroWidthSpace);break;case"hyphen":hw=word.replace('-','-'+zeroWidthSpace);break;default:onError(new Error('Hyphenator.settings: compound setting "'+compound+'" not known.'));}return hw;}function hyphenateWord(lo,lang,word){var pattern="",ww,wwlen,wwhp=wwhpStore,pstart=0,plen,hp,hpc,wordLength=word.length,hw='',charMap=lo.charMap.code2int,charCode,mappedCharCode,row=0,link=0,value=0,values,indexedTrie=lo.indexedTrie,valueStore=lo.valueStore.keys,wwAsMappedCharCode=wwAsMappedCharCodeStore;word=onBeforeWordHyphenation(word,lang);if(word===''){hw='';}else if(enableCache&&lo.cache&&lo.cache.hasOwnProperty(word)){hw=lo.cache[word];}else if(word.indexOf(hyphen)!==-1){hw=word;}else if(lo.exceptions.hasOwnProperty(word)){hw=lo.exceptions[word].replace(/-/g,hyphen);}else if(word.indexOf('-')!==-1){hw=hyphenateCompound(lo,lang,word);}else{ww=word.toLowerCase();if(String.prototype.normalize){ww=ww.normalize("NFC");}if(lo.hasOwnProperty("charSubstitution")){ww=doCharSubst(lo.charSubstitution,ww);}if(word.indexOf("'")!==-1){ww=ww.replace(/'/g,"’");}ww='_'+ww+'_';wwlen=ww.length;while(pstart<wwlen){wwhp[pstart]=0;charCode=ww.charCodeAt(pstart);wwAsMappedCharCode[pstart]=charMap.hasOwnProperty(charCode)?charMap[charCode]:-1;pstart+=1;}pstart=0;while(pstart<wwlen){row=0;pattern='';plen=pstart;while(plen<wwlen){mappedCharCode=wwAsMappedCharCode[plen];if(mappedCharCode===-1){break;}if(enableReducedPatternSet){pattern+=ww.charAt(plen);}link=indexedTrie[row+mappedCharCode*2];value=indexedTrie[row+mappedCharCode*2+1];if(value>0){hpc=0;hp=valueStore[value+hpc];while(hp!==255){if(hp>wwhp[pstart+hpc]){wwhp[pstart+hpc]=hp;}hpc+=1;hp=valueStore[value+hpc];}if(enableReducedPatternSet){if(!lo.redPatSet){lo.redPatSet={};}if(valueStore.subarray){values=valueStore.subarray(value,value+hpc);}else{values=valueStore.slice(value,value+hpc);}lo.redPatSet[pattern]=recreatePattern(pattern,values);}}if(link>0){row=link;}else{break;}plen+=1;}pstart+=1;}hp=0;while(hp<wordLength){if(hp>=lo.leftmin&&hp<=(wordLength-lo.rightmin)&&(wwhp[hp+1]%2)!==0){hw+=hyphen+word.charAt(hp);}else{hw+=word.charAt(hp);}hp+=1;}}hw=onAfterWordHyphenation(hw,lang);if(enableCache){lo.cache[word]=hw;}return hw;}function removeHyphenationFromElement(el){var h,u,i=0,n;if(".\\+*?[^]$(){}=!<>|:-".indexOf(hyphen)!==-1){h="\\"+hyphen;}else{h=hyphen;}if(".\\+*?[^]$(){}=!<>|:-".indexOf(urlhyphen)!==-1){u="\\"+urlhyphen;}else{u=urlhyphen;}n=el.childNodes[i];while(!!n){if(n.nodeType===3){n.data=n.data.replace(new RegExp(h,'g'),'');n.data=n.data.replace(new RegExp(u,'g'),'');}else if(n.nodeType===1){removeHyphenationFromElement(n);}i+=1;n=el.childNodes[i];}}var copy=(function(){var makeCopy=function(){var oncopyHandler=function(e){e=e||window.event;var shadow,selection,range,rangeShadow,restore,target=e.target||e.srcElement,currDoc=target.ownerDocument,bdy=currDoc.getElementsByTagName('body')[0],targetWindow=currDoc.defaultView||currDoc.parentWindow;if(target.tagName&&dontHyphenate[target.tagName.toLowerCase()]){return;}shadow=currDoc.createElement('div');shadow.style.color=window.getComputedStyle?targetWindow.getComputedStyle(bdy,null).backgroundColor:'#FFFFFF';shadow.style.fontSize='0px';bdy.appendChild(shadow);if(!!window.getSelection){e.stopPropagation();selection=targetWindow.getSelection();range=selection.getRangeAt(0);shadow.appendChild(range.cloneContents());removeHyphenationFromElement(shadow);selection.selectAllChildren(shadow);restore=function(){shadow.parentNode.removeChild(shadow);selection.removeAllRanges();selection.addRange(range);};}else{e.cancelBubble=true;selection=targetWindow.document.selection;range=selection.createRange();shadow.innerHTML=range.htmlText;removeHyphenationFromElement(shadow);rangeShadow=bdy.createTextRange();rangeShadow.moveToElementText(shadow);rangeShadow.select();restore=function(){shadow.parentNode.removeChild(shadow);if(range.text!==""){range.select();}};}zeroTimeOut(restore);},removeOnCopy=function(el){var body=el.ownerDocument.getElementsByTagName('body')[0];if(!body){return;}el=el||body;if(window.removeEventListener){el.removeEventListener("copy",oncopyHandler,true);}else{el.detachEvent("oncopy",oncopyHandler);}},registerOnCopy=function(el){var body=el.ownerDocument.getElementsByTagName('body')[0];if(!body){return;}el=el||body;if(window.addEventListener){el.addEventListener("copy",oncopyHandler,true);}else{el.attachEvent("oncopy",oncopyHandler);}};return{oncopyHandler:oncopyHandler,removeOnCopy:removeOnCopy,registerOnCopy:registerOnCopy};};return(safeCopy?makeCopy():false);}());function checkIfAllDone(){var allDone=true,i=0,doclist={};elements.each(function(ellist){var j=0,l=ellist.length;while(j<l){allDone=allDone&&ellist[j].hyphenated;if(!doclist.hasOwnProperty(ellist[j].element.baseURI)){doclist[ellist[j].element.ownerDocument.location.href]=true;}doclist[ellist[j].element.ownerDocument.location.href]=doclist[ellist[j].element.ownerDocument.location.href]&&ellist[j].hyphenated;j+=1;}});if(allDone){if(intermediateState==='hidden'&&unhide==='progressive'){elements.each(function(ellist){var j=0,l=ellist.length,el;while(j<l){el=ellist[j].element;el.className=el.className.replace(unhideClassRegExp,'');if(el.className===''){el.removeAttribute('class');}j+=1;}});}while(i<CSSEditors.length){CSSEditors[i].clearChanges();i+=1;}forEachKey(doclist,function(doc){onHyphenationDone(doc);});if(!!storage&&storage.deferred.length>0){i=0;while(i<storage.deferred.length){storage.deferred[i].call();i+=1;}storage.deferred=[];}}}function controlOrphans(ignore,leadingWhiteSpace,lastWord,trailingWhiteSpace){var h=hyphen;if(".\\+*?[^]$(){}=!<>|:-".indexOf(hyphen)!==-1){h="\\"+hyphen;}else{h=hyphen;}if(orphanControl===3&&leadingWhiteSpace===" "){leadingWhiteSpace=String.fromCharCode(160);}return leadingWhiteSpace+lastWord.replace(new RegExp(h+"|"+zeroWidthSpace,'g'),'')+trailingWhiteSpace;}function hyphenateElement(lang,elo){var el=elo.element,hyphenate,n,i,lo;if(Hyphenator.languages.hasOwnProperty(lang)&&Hyphenator.doHyphenation){lo=Hyphenator.languages[lang];hyphenate=function(match,word,url,mail){var r;if(!!url||!!mail){r=hyphenateURL(match);}else{r=hyphenateWord(lo,lang,word);}return r;};if(safeCopy&&(el.tagName.toLowerCase()!=='body')){copy.registerOnCopy(el);}i=0;n=el.childNodes[i];while(!!n){if(n.nodeType===3&&(/\S/).test(n.data)&&n.data.length>=min){n.data=n.data.replace(lo.genRegExp,hyphenate);if(orphanControl!==1){n.data=n.data.replace(/(\u0020*)(\S+)(\s*)$/,controlOrphans);}}i+=1;n=el.childNodes[i];}}if(intermediateState==='hidden'&&unhide==='wait'){el.className=el.className.replace(hideClassRegExp,'');if(el.className===''){el.removeAttribute('class');}}if(intermediateState==='hidden'&&unhide==='progressive'){el.className=el.className.replace(hideClassRegExp,' '+unhideClass);}elo.hyphenated=true;elements.counters[1]+=1;if(elements.counters[0]<=elements.counters[1]){checkIfAllDone();}}function hyphenateLanguageElements(lang){var i=0,l;if(lang==='*'){elements.each(function(lang,ellist){var j=0,le=ellist.length;while(j<le){hyphenateElement(lang,ellist[j]);j+=1;}});}else{if(elements.list.hasOwnProperty(lang)){l=elements.list[lang].length;while(i<l){hyphenateElement(lang,elements.list[lang][i]);i+=1;}}}}function removeHyphenationFromDocument(){elements.each(function(ellist){var i=0,l=ellist.length;while(i<l){removeHyphenationFromElement(ellist[i].element);if(safeCopy){copy.removeOnCopy(ellist[i].element);}ellist[i].hyphenated=false;i+=1;}});}function createStorage(){var s;function makeStorage(s){var store=s,prefix='Hyphenator_'+Hyphenator.version+'_',deferred=[],test=function(name){var val=store.getItem(prefix+name);return!!val;},getItem=function(name){return store.getItem(prefix+name);},setItem=function(name,value){try{store.setItem(prefix+name,value);}catch(e){onError(e);}};return{deferred:deferred,test:test,getItem:getItem,setItem:setItem};}try{if(storageType!=='none'&&window.JSON!==undefined&&window.localStorage!==undefined&&window.sessionStorage!==undefined&&window.JSON.stringify!==undefined&&window.JSON.parse!==undefined){switch(storageType){case'session':s=window.sessionStorage;break;case'local':s=window.localStorage;break;default:s=undefined;}s.setItem('storageTest','1');s.removeItem('storageTest');}}catch(ignore){s=undefined;}if(s){storage=makeStorage(s);}else{storage=undefined;}}function storeConfiguration(){if(!storage){return;}var settings={'STORED':true,'classname':hyphenateClass,'urlclassname':urlHyphenateClass,'donthyphenateclassname':dontHyphenateClass,'minwordlength':min,'hyphenchar':hyphen,'urlhyphenchar':urlhyphen,'togglebox':toggleBox,'displaytogglebox':displayToggleBox,'remoteloading':enableRemoteLoading,'enablecache':enableCache,'enablereducedpatternset':enableReducedPatternSet,'onhyphenationdonecallback':onHyphenationDone,'onerrorhandler':onError,'onwarninghandler':onWarning,'intermediatestate':intermediateState,'selectorfunction':selectorFunction||mySelectorFunction,'safecopy':safeCopy,'doframes':doFrames,'storagetype':storageType,'orphancontrol':orphanControl,'dohyphenation':Hyphenator.doHyphenation,'persistentconfig':persistentConfig,'defaultlanguage':defaultLanguage,'useCSS3hyphenation':css3,'unhide':unhide,'onbeforewordhyphenation':onBeforeWordHyphenation,'onafterwordhyphenation':onAfterWordHyphenation,'leftmin':leftmin,'rightmin':rightmin,'compound':compound};storage.setItem('config',window.JSON.stringify(settings));}function restoreConfiguration(){var settings;if(storage.test('config')){settings=window.JSON.parse(storage.getItem('config'));Hyphenator.config(settings);}}var version='5.2.0(devel)';var doHyphenation=true;var languages={};function config(obj){var assert=function(name,type){var r,t;t=typeof obj[name];if(t===type){r=true;}else{onError(new Error('Config onError: '+name+' must be of type '+type));r=false;}return r;};if(obj.hasOwnProperty('storagetype')){if(assert('storagetype','string')){storageType=obj.storagetype;}if(!storage){createStorage();}}if(!obj.hasOwnProperty('STORED')&&storage&&obj.hasOwnProperty('persistentconfig')&&obj.persistentconfig===true){restoreConfiguration();}forEachKey(obj,function(key){switch(key){case'STORED':break;case'classname':if(assert('classname','string')){hyphenateClass=obj[key];}break;case'urlclassname':if(assert('urlclassname','string')){urlHyphenateClass=obj[key];}break;case'donthyphenateclassname':if(assert('donthyphenateclassname','string')){dontHyphenateClass=obj[key];}break;case'minwordlength':if(assert('minwordlength','number')){min=obj[key];}break;case'hyphenchar':if(assert('hyphenchar','string')){if(obj.hyphenchar==='&shy;'){obj.hyphenchar=String.fromCharCode(173);}hyphen=obj[key];}break;case'urlhyphenchar':if(obj.hasOwnProperty('urlhyphenchar')){if(assert('urlhyphenchar','string')){urlhyphen=obj[key];}}break;case'togglebox':if(assert('togglebox','function')){toggleBox=obj[key];}break;case'displaytogglebox':if(assert('displaytogglebox','boolean')){displayToggleBox=obj[key];}break;case'remoteloading':if(assert('remoteloading','boolean')){enableRemoteLoading=obj[key];}break;case'enablecache':if(assert('enablecache','boolean')){enableCache=obj[key];}break;case'enablereducedpatternset':if(assert('enablereducedpatternset','boolean')){enableReducedPatternSet=obj[key];}break;case'onhyphenationdonecallback':if(assert('onhyphenationdonecallback','function')){onHyphenationDone=obj[key];}break;case'onerrorhandler':if(assert('onerrorhandler','function')){onError=obj[key];}break;case'onwarninghandler':if(assert('onwarninghandler','function')){onWarning=obj[key];}break;case'intermediatestate':if(assert('intermediatestate','string')){intermediateState=obj[key];}break;case'selectorfunction':if(assert('selectorfunction','function')){selectorFunction=obj[key];}break;case'safecopy':if(assert('safecopy','boolean')){safeCopy=obj[key];}break;case'doframes':if(assert('doframes','boolean')){doFrames=obj[key];}break;case'storagetype':if(assert('storagetype','string')){storageType=obj[key];}break;case'orphancontrol':if(assert('orphancontrol','number')){orphanControl=obj[key];}break;case'dohyphenation':if(assert('dohyphenation','boolean')){Hyphenator.doHyphenation=obj[key];}break;case'persistentconfig':if(assert('persistentconfig','boolean')){persistentConfig=obj[key];}break;case'defaultlanguage':if(assert('defaultlanguage','string')){defaultLanguage=obj[key];}break;case'useCSS3hyphenation':if(assert('useCSS3hyphenation','boolean')){css3=obj[key];}break;case'unhide':if(assert('unhide','string')){unhide=obj[key];}break;case'onbeforewordhyphenation':if(assert('onbeforewordhyphenation','function')){onBeforeWordHyphenation=obj[key];}break;case'onafterwordhyphenation':if(assert('onafterwordhyphenation','function')){onAfterWordHyphenation=obj[key];}break;case'leftmin':if(assert('leftmin','number')){leftmin=obj[key];}break;case'rightmin':if(assert('rightmin','number')){rightmin=obj[key];}break;case'compound':if(assert('compound','string')){compound=obj[key];}break;default:onError(new Error('Hyphenator.config: property '+key+' not known.'));}});if(storage&&persistentConfig){storeConfiguration();}}function run(){var process=function(){try{if(contextWindow.document.getElementsByTagName('frameset').length>0){return;}autoSetMainLanguage(undefined);gatherDocumentInfos();if(displayToggleBox){toggleBox();}prepare(hyphenateLanguageElements);}catch(e){onError(e);}};if(!storage){createStorage();}runWhenLoaded(window,process);}function addExceptions(lang,words){if(lang===''){lang='global';}if(exceptions.hasOwnProperty(lang)){exceptions[lang]+=", "+words;}else{exceptions[lang]=words;}}function hyphenate(target,lang){var turnout,n,i,lo;lo=Hyphenator.languages[lang];if(Hyphenator.languages.hasOwnProperty(lang)){if(!lo.prepared){prepareLanguagesObj(lang);}turnout=function(match,word,url,mail){var r;if(!!url||!!mail){r=hyphenateURL(match);}else{r=hyphenateWord(lo,lang,word);}return r;};if(typeof target==='object'&&!(typeof target==='string'||target.constructor===String)){i=0;n=target.childNodes[i];while(!!n){if(n.nodeType===3&&(/\S/).test(n.data)&&n.data.length>=min){n.data=n.data.replace(lo.genRegExp,turnout);}else if(n.nodeType===1){if(n.lang!==''){Hyphenator.hyphenate(n,n.lang);}else{Hyphenator.hyphenate(n,lang);}}i+=1;n=target.childNodes[i];}}else if(typeof target==='string'||target.constructor===String){return target.replace(lo.genRegExp,turnout);}}else{onError(new Error('Language "'+lang+'" is not loaded.'));}}function getRedPatternSet(lang){return Hyphenator.languages[lang].redPatSet;}function getConfigFromURI(){var loc=null,re={},jsArray=contextWindow.document.getElementsByTagName('script'),i=0,j=0,l=jsArray.length,s,gp,option;while(i<l){if(!!jsArray[i].getAttribute('src')){loc=jsArray[i].getAttribute('src');}if(loc&&(loc.indexOf('Hyphenator.js?')!==-1)){s=loc.indexOf('Hyphenator.js?');gp=loc.substring(s+14).split('&');while(j<gp.length){option=gp[j].split('=');if(option[0]!=='bm'){if(option[1]==='true'){option[1]=true;}else if(option[1]==='false'){option[1]=false;}else if(isFinite(option[1])){option[1]=parseInt(option[1],10);}if(option[0]==='togglebox'||option[0]==='onhyphenationdonecallback'||option[0]==='onerrorhandler'||option[0]==='selectorfunction'||option[0]==='onbeforewordhyphenation'||option[0]==='onafterwordhyphenation'){option[1]=new Function('',option[1]);}re[option[0]]=option[1];}j+=1;}break;}i+=1;}return re;}function toggleHyphenation(){if(Hyphenator.doHyphenation){if(!!css3hyphenateClassHandle){css3hyphenateClassHandle.setRule('.'+css3hyphenateClass,css3_h9n.property+': none;');}removeHyphenationFromDocument();Hyphenator.doHyphenation=false;storeConfiguration();if(displayToggleBox){toggleBox();}}else{if(!!css3hyphenateClassHandle){css3hyphenateClassHandle.setRule('.'+css3hyphenateClass,css3_h9n.property+': auto;');}Hyphenator.doHyphenation=true;hyphenateLanguageElements('*');storeConfiguration();if(displayToggleBox){toggleBox();}}}return{version:version,doHyphenation:doHyphenation,languages:languages,config:config,run:run,addExceptions:addExceptions,hyphenate:hyphenate,getRedPatternSet:getRedPatternSet,isBookmarklet:isBookmarklet,getConfigFromURI:getConfigFromURI,toggleHyphenation:toggleHyphenation};}(window));if(Hyphenator.isBookmarklet){Hyphenator.config({displaytogglebox:true,intermediatestate:'visible',storagetype:'local',doframes:true,useCSS3hyphenation:true});Hyphenator.config(Hyphenator.getConfigFromURI());Hyphenator.run();}Hyphenator.languages['fr']={leftmin:3,rightmin:3,specialChars:"àâçèéêëîïôûüœæ’'",patterns:{2:"1ç1j1q",3:"1gè’â41zu1zo1zi1zè1zé1ze1za’y4_y41wu1wo1wi1we1wa1vy1vû1vu1vô1vo1vî1vi1vê1vè1vé1ve1vâ1va’û4_û4’u4_u41ba1bâ1ty1be1bé1bè1bê1tû1tu1tô1bi1bî1to1tî1ti1tê1tè1té1te1tà1tâ1ta1bo1bô1sy1sû1su1sœ1bu1bû1by2’21ca1câ1sô1ce1cé1cè1cê1so1sî1si1sê1sè1sé1se1sâ1sa1ry1rû1ru1rô1ro1rî1ri1rê1rè1ré1re1râ1ra’a41py1pû1pu1pô1po1pî1pi1pê1pè1pé1pe1pâ1pa_ô41ci1cî’ô4’o4_o41nyn1x1nû1nu1nœ1nô1no1nî1ni1nê1nè1né1ne1nâ1co1cô1na1my1mû1mu1mœ1mô1mo1mî1mi1cœ1mê1mè1mé1me1mâ1ma1ly1lû1lu1lô1lo1lî1li1lê1lè1cu1cû1cy1lé1d’1da1dâ1le1là1de1dé1dè1dê1lâ1la1ky1kû1ku1kô1ko1kî1ki1kê1kè1ké1ke1kâ1ka2jk_a4’î4_î4’i4_i41hy1hû1hu1hô1ho1hî1hi1hê1hè1hé1he1hâ1ha1gy1gû1gu1gô1go1gî1gi1gê_â41gé1ge1gâ1ga1fy1di1dî1fû1fu1fô1fo’e41fî1fi1fê1fè1do1dô1fé1fe1fâ1fa’è41du1dû1dy_è4’é4_é4’ê4_ê4_e41zy",4:"1f2lab2h2ckg2ckp2cksd1s22ckb4ck_1c2k2chw4ze_4ne_2ckt1c2lad2hm1s22cht2chsch2r2chp4pe_1t2r1p2h_ph44ph_ph2l2phnph2r2phs1d2r2pht2chn4fe_2chm1p2l1p2r4me_1w2rch2l2chg1c2r2chb4ch_1f2r4le_4re_4de_f1s21k2r4we_1r2h_kh44kh_1k2h4ke_1c2h_ch44ge_4je_4se_1v2r_sh41s2h4ve_4sh_2shm2shr2shs4ce_il2l1b2r4be_1b2l4he_4te__th41t2h4th_g1s21g2r2thl1g2l2thm2thnth2r1g2n2ths2ckf",5:"2ck3h4rhe_4kes_4wes_4res_4cke_éd2hi4vre_4jes_4tre_4zes_4ges_4des_i1oxy4gle_d1d2h_cul44gne_4fre_o1d2l_sch44nes_4les_4gre_1s2ch_réu24sch_4the_1g2hy4gue_2schs4cle_1g2ho1g2hi1g2he4ses_4tes_1g2ha4ves_4she_4che_4cre_4ces_t1t2l4hes_l1s2t4bes_4ble__con4xil3lco1ap4que_vil3l4fle_co1arco1exco1enco1auco1axco1ef4pes_co1é2per3h4mes__pe4r4bre_4pre_4phe_1p2né4ple__dé2smil3llil3lhil3l4dre_cil3lgil3l4fes_",6:"’in1o2rcil4l4phre_4dres_l3lioni1algi2fent_émil4l4phle_rmil4l4ples_4phes_1p2neuextra14pres_y1asthpé2nul2xent__mé2sa2pent_y1algi4chre_1m2nès4bres_1p2tèr1p2tér4chle_’en1o24fles_oxy1a2avil4l_en1o24ques_uvil4lco1a2d4bles__in1a2’in1a21s2por_cons4_bi1u2’as2ta_in1e2’in1e2_in1é2’in1é21s2lov1s2lavco1acq2cent__as2ta_co1o24ches_hémi1é_in2er’in2er2s3homo1ioni_in1i2’in1i22went_4shes__ré1a2_ré1é2_ré1e2_ré2el_in1o2ucil4lco1accu2s3tr_ré2er_ré2èr4cles_2vent__ré1i22sent_2tent_2gent__ré1o24gues__re1s24sche_4thes_’en1a2e2s3ch4gres_1s2cop2lent__en1a22nent__in1u2’in1u24gnes_4cres_wa2g3n4fres_4tres_4gles_1octet_dé1o2_dé1io4thre__bi1au2jent__dé1a22zent_4vres_2dent_4ckes_4rhes__dy2s3sub1s22kent_2rent_2bent_3d2hal",7:"a2g3nos3d2houdé3rent__dé3s2t_dé3s2pé3dent_2r3heur2r3hydri1s2tat2frent_io1a2ctla2w3re’in2u3l_in2u3l2crent_’in2uit_in2uit1s2caph1s2clér_ré2ussi2s3ché_re2s3t_re2s3s4sches_é3cent__seu2le’in2ond_in2ond’in2i3t_in2i3t’in2i3q_ré2aux_in2i3q2shent__di1alduni1a2x’in2ept2flent__in2eptuni1o2v2brent_co2nurb2chent_2quent_1s2perm1s2phèr_ma2c3kuevil4l1s2phér1s2piel1s2tein1s2tigm4chles_1s2tock1s2tyle1p2sych_pro1é2_ma2r1x_stil3lpusil3libril3lcyril3l_pré1s2thril3l_mé3san_pré1u2_mé2s1i_pré1o2_pré1i2piril3lpupil3lâ2ment__pré1e2_pré1é2_pré2au_pré1a22prent_2vrent_supero2_di1e2npoly1u2è2ment_poly1s2poly1o2poly1i2poly1è2poly1é2poly1e2poly1a2supe4r1capil3l2plent_armil5lsemil4lmil4letvacil4l_di2s3h3ph2tis2dlent_a2s3tro4phres_l2ment_i1è2drei1arthr2drent_4phles_supers2ô2ment_extra2i2phent_su3r2ah_su2r3hextra2chypo1u21alcool_per1u2_per1o2_per1i2_per1é2hypo1s2_per1a2hypo1o2hypo1i2hypo1é2_pen2tahypo1e2hypo1a2y1s2tome2s3cophyperu2hype4r1hypers2hypero21m2némohyperi21m2nési4chres_a1è2drehyperé2hypere2hypera2’oua1ou_oua1ouo1s2tomo1s2timo1s2tato1s2tasomni1s2tung2s3_dé3s2c2blent__bio1a2télé1e2télé1i22clent_télé1s22guent_1é2nerg2grent_2trent__dé2s1œ2t3heuro1è2dre2gnent_2glent_4thres__bi1a2t1é2drie_bi1a2c_i2g3nin3s2at_’i2g3ni2ckent__i2g3né’ab3réa’i2g3né_ab3réa_per1e2",8:"_ma2l1ap_dy2s1u2_dy2s1o2_dy2s1i2n3s2ats__dy2s1a2distil3l1é2lectrinstil3l1s2trophe2n1i2vro2b3long1s2tomos_ae3s4ch’ae3s4ch_eu2r1a2ombud2s3’eu2r1a2_mono1s2_mono1u2o1s2téro_mono1o2eu1s2tato1s2tradfritil3la2l1algi_mono1i2_mono1é2_ovi1s2c’ovi1s2c_mono1e2_mono1a2co1assocpaléo1é2boutil3l1s2piros_ré2i3fi_pa2n1ischevil4l1s2patiaca3ou3t2_di1a2cé_para1s2_pa2r3héco1assur_su2b1é2tu2ment_su2ment__su2b1in_su2b3lupapil3lire3pent_’inte4r3_su2b1urab3sent__su2b1a2di2s3cophu2ment_fu2ment__intera2au2ment_as2ment_or2ment_’intera2_intere2pé1r2é2q_péri1os_péri1s2ja3cent__anti1a2_péri1u2’anti1a2er2ment__anti1e2ac3cent_ar2ment_to2ment_’intere2ré3gent_papil3leom2ment_’anti1e2photo1s2_anti1é2_interé2’anti1é2_anti1s2’anti1s23ph2talé’interé2ri2ment__interi2’interi2mi2ment_apo2s3tri2s3chio_pluri1ai2s3chia_intero2’intero2_inte4r3po1astre_interu2’interu2_inters2ai2ment_’inters2papil3la_tri1o2n_su2r1a2_pon2tet_pos2t3h_dés2a3mes3cent__pos2t3r_post1s2_tri1a2tta2ment__tri1a2nra2ment_is3cent__su2r1e2_tri1a2cfa2ment_da2ment__su3r2et_su2r1é2_mé2s1es_mé2g1oh_su2r1of_su2r1ox_re3s4ty_re3s4tu_ma2l1oc’a2g3nat_dé2s1é2_ma2l1entachy1a2_pud1d2ltchin3t2_re3s4trtran2s3p_bi2s1a2tran2s3hhémo1p2té3quent__a2g3nat_dé2s1i2télé1o2bo2g3nosiradio1a2télé1o2ppu2g3nacru3lent__sta2g3nre3lent__ré2a3le_di1a2mi",9:"_ré2a3lit_dé3s2o3lthermo1s2_dé3s2ist_dé3s2i3rmit3tent_éni3tent__do3lent__ré2a3lisopu3lent__pa3tent__re2s3cap_la3tent__co2o3lie_re2s3cou_re2s3cri_ma2g3num_re2s3pir_dé3s2i3dco2g3nititran2s1a2tran2s1o2_dé3s2exu_re3s4tab_re3s4tag_dé3s2ert_re3s4tat_re3s4tén_re3s4tér_re3s4tim_re3s4tip_re3s4toc_re3s4toptran2s1u2_no2n1obs_ma2l1a2v_ma2l1int_prou3d2hpro2s3tativa3lent__ta3lent__rétro1a2_pro1s2cé_ma2l1o2dcci3dent__pa3rent__su2r1int_su2r1inf_su2r1i2mtor3rent_cur3rent__mé2s1u2stri3dent__dé3s2orm_su3r2ell_ar3dent__su3r2eaupru3dent__pré2a3lacla2ment__su3r2a3t_pos2t1o2_pos2t1inqua2ment_ter3gent_ser3gent_rai3ment_abî2ment_éci2ment_’ar3gent__ar3gent_rin3gent_tan3gent_éli2ment_ani2ment_’apo2s3ta_apo2s3tavélo1s2kivol2t1amp_dé3s2orp_dé2s1u2n_péri2s3ssesqui1a2’ana3s4trfir2ment_écu2ment_ser3pent_pré3sent_’ar3pent__ar3pent_’in1s2tab_in1s2tab’in2o3cul_in2o3culplu2ment_bou2ment_’in2exora_in2exora_su2b3linbru2ment__su3b2é3r_milli1am’in2effab_in2effab’in2augur_di1a2cid_in2augur_pa2n1opt’in2a3nit_in2a3nit1informat_ana3s4trvanil3lis_di1a2tom_su3b2altvanil3linstéréo1s2_pa2n1a2fo1s2tratuépi2s3cop_ci2s1alp1s2tructu1é2lément1é2driquepapil3lomllu2ment_",10:"1s2tandardimmi3nent__émi3nent_imma3nent_réma3nent_épi3s4cope_in2i3miti’in2i3miti_res3sent_moye2n1â2gréti3cent__dé3s2a3crmon2t3réalinno3cent__mono1ï2dé_pa2n1a2méimpu3dent__pa2n1a2ra_amino1a2c’amino1a2c_pa2n1o2phinci3dent__ser3ment_appa3rent_déca3dent__dacryo1a2_dé3s2astr_re4s5trin_dé3s2é3gr_péri2s3ta_sar3ment__dé3s2oufr_re3s4tandchro2ment__com3ment__re2s3quil_re2s3pons_gem2ment__re2s3pect_re2s3ciso_dé3s2i3gn_dé3s2i3ligram2ment__dé3s2invo_re2s3cisitran3s2act’anti2enneindo3lent__sou3vent_indi3gent_dili3gent_flam2ment_impo3tent_inso3lent_esti2ment_’on3guent__on3guent_inti2ment__dé3s2o3défécu3lent_veni2ment_reli2ment_vidi2ment_chlo2r3é2tpu2g3nablechlo2r3a2cryth2ment_o2g3nomonicarê2ment__méta1s2ta_ma2l1aisé_macro1s2célo3quent_tran3s2ats_anti2enne",11:"_contre1s2cperti3nent_conti3nent__ma2l1a2dro_in2é3lucta_psycho1a2n_dé3s2o3pil’in2é3luctaperma3nent__in2é3narratesta3ment__su2b3liminrésur3gent_’in2é3narraimmis4cent__pro2g3nathchien3dent_sporu4lent_dissi3dent_corpu3lent_archi1é2pissubli2ment_indul3gent_confi3dent__syn2g3nathtrucu3lent_détri3ment_nutri3ment_succu3lent_turbu3lent__pa2r1a2che_pa2r1a2chèfichu3ment_entre3gent_conni3vent_mécon3tent_compé3tent__re4s5trict_dé3s2i3nen_re2s3plend1a2nesthésislalo2ment__dé3s2ensib_re4s5trein_phalan3s2tabsti3nent_",12:"polyva3lent_équiva4lent_monova3lent_amalga2ment_omnipo3tent__ma2l1a2dreséquipo3tent__dé3s2a3tellproémi3nent_contin3gent_munifi3cent__ma2g3nicideo1s2trictionsurémi3nent_préémi3nent__bai2se3main",13:"acquies4cent_intelli3gent_tempéra3ment_transpa3rent__ma2g3nificatantifer3ment_",14:"privatdo3cent_diaphrag2ment_privatdo3zent_ventripo3tent__contre3maître",15:"grandilo3quent_",16:"_chè2vre3feuille"},patternChars:"_abcdefghijklmnopqrstuvwxyzàâçèéêîïôûœ’",patternArrayLength:79410,valueStoreLength:5134};Hyphenator.config({useCSS3hyphenation:true});Hyphenator.run();;
/**
 * @file better_exposed_filters.js
 *
 * Provides some client-side functionality for the Better Exposed Filters module
 */
(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.betterExposedFilters = {
    attach: function(context, settings) {
      // Add highlight class to checked checkboxes for better theming
      $('.bef-tree input[type=checkbox], .bef-checkboxes input[type=checkbox]')
        // Highlight newly selected checkboxes
        .change(function() {
          _bef_highlight(this, context);
        })
        .filter(':checked').closest('.form-item', context).addClass('highlight')
      ;
    }
  };

  /*
   * Helper functions
   */

  /**
   * Adds/Removes the highlight class from the form-item div as appropriate
   */
  function _bef_highlight(elem, context) {
    $elem = $(elem, context);
    $elem.attr('checked')
      ? $elem.closest('.form-item', context).addClass('highlight')
      : $elem.closest('.form-item', context).removeClass('highlight');
  }

}) (jQuery, Drupal, drupalSettings);
;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return function(){function b(a,b,c){return[parseFloat(a[0])*(l.test(a[0])?b/100:1),parseFloat(a[1])*(l.test(a[1])?c/100:1)]}function c(b,c){return parseInt(a.css(b,c),10)||0}function d(b){var c=b[0];return 9===c.nodeType?{width:b.width(),height:b.height(),offset:{top:0,left:0}}:a.isWindow(c)?{width:b.width(),height:b.height(),offset:{top:b.scrollTop(),left:b.scrollLeft()}}:c.preventDefault?{width:0,height:0,offset:{top:c.pageY,left:c.pageX}}:{width:b.outerWidth(),height:b.outerHeight(),offset:b.offset()}}var e,f=Math.max,g=Math.abs,h=/left|center|right/,i=/top|center|bottom/,j=/[\+\-]\d+(\.[\d]+)?%?/,k=/^\w+/,l=/%$/,m=a.fn.position;a.position={scrollbarWidth:function(){if(void 0!==e)return e;var b,c,d=a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),f=d.children()[0];return a("body").append(d),b=f.offsetWidth,d.css("overflow","scroll"),c=f.offsetWidth,b===c&&(c=d[0].clientWidth),d.remove(),e=b-c},getScrollInfo:function(b){var c=b.isWindow||b.isDocument?"":b.element.css("overflow-x"),d=b.isWindow||b.isDocument?"":b.element.css("overflow-y"),e="scroll"===c||"auto"===c&&b.width<b.element[0].scrollWidth,f="scroll"===d||"auto"===d&&b.height<b.element[0].scrollHeight;return{width:f?a.position.scrollbarWidth():0,height:e?a.position.scrollbarWidth():0}},getWithinInfo:function(b){var c=a(b||window),d=a.isWindow(c[0]),e=!!c[0]&&9===c[0].nodeType,f=!d&&!e;return{element:c,isWindow:d,isDocument:e,offset:f?a(b).offset():{left:0,top:0},scrollLeft:c.scrollLeft(),scrollTop:c.scrollTop(),width:c.outerWidth(),height:c.outerHeight()}}},a.fn.position=function(e){if(!e||!e.of)return m.apply(this,arguments);e=a.extend({},e);var l,n,o,p,q,r,s=a(e.of),t=a.position.getWithinInfo(e.within),u=a.position.getScrollInfo(t),v=(e.collision||"flip").split(" "),w={};return r=d(s),s[0].preventDefault&&(e.at="left top"),n=r.width,o=r.height,p=r.offset,q=a.extend({},p),a.each(["my","at"],function(){var a,b,c=(e[this]||"").split(" ");1===c.length&&(c=h.test(c[0])?c.concat(["center"]):i.test(c[0])?["center"].concat(c):["center","center"]),c[0]=h.test(c[0])?c[0]:"center",c[1]=i.test(c[1])?c[1]:"center",a=j.exec(c[0]),b=j.exec(c[1]),w[this]=[a?a[0]:0,b?b[0]:0],e[this]=[k.exec(c[0])[0],k.exec(c[1])[0]]}),1===v.length&&(v[1]=v[0]),"right"===e.at[0]?q.left+=n:"center"===e.at[0]&&(q.left+=n/2),"bottom"===e.at[1]?q.top+=o:"center"===e.at[1]&&(q.top+=o/2),l=b(w.at,n,o),q.left+=l[0],q.top+=l[1],this.each(function(){var d,h,i=a(this),j=i.outerWidth(),k=i.outerHeight(),m=c(this,"marginLeft"),r=c(this,"marginTop"),x=j+m+c(this,"marginRight")+u.width,y=k+r+c(this,"marginBottom")+u.height,z=a.extend({},q),A=b(w.my,i.outerWidth(),i.outerHeight());"right"===e.my[0]?z.left-=j:"center"===e.my[0]&&(z.left-=j/2),"bottom"===e.my[1]?z.top-=k:"center"===e.my[1]&&(z.top-=k/2),z.left+=A[0],z.top+=A[1],d={marginLeft:m,marginTop:r},a.each(["left","top"],function(b,c){a.ui.position[v[b]]&&a.ui.position[v[b]][c](z,{targetWidth:n,targetHeight:o,elemWidth:j,elemHeight:k,collisionPosition:d,collisionWidth:x,collisionHeight:y,offset:[l[0]+A[0],l[1]+A[1]],my:e.my,at:e.at,within:t,elem:i})}),e.using&&(h=function(a){var b=p.left-z.left,c=b+n-j,d=p.top-z.top,h=d+o-k,l={target:{element:s,left:p.left,top:p.top,width:n,height:o},element:{element:i,left:z.left,top:z.top,width:j,height:k},horizontal:c<0?"left":b>0?"right":"center",vertical:h<0?"top":d>0?"bottom":"middle"};n<j&&g(b+c)<n&&(l.horizontal="center"),o<k&&g(d+h)<o&&(l.vertical="middle"),f(g(b),g(c))>f(g(d),g(h))?l.important="horizontal":l.important="vertical",e.using.call(this,a,l)}),i.offset(a.extend(z,{using:h}))})},a.ui.position={fit:{left:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollLeft:d.offset.left,g=d.width,h=a.left-b.collisionPosition.marginLeft,i=e-h,j=h+b.collisionWidth-g-e;b.collisionWidth>g?i>0&&j<=0?(c=a.left+i+b.collisionWidth-g-e,a.left+=i-c):j>0&&i<=0?a.left=e:i>j?a.left=e+g-b.collisionWidth:a.left=e:i>0?a.left+=i:j>0?a.left-=j:a.left=f(a.left-h,a.left)},top:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollTop:d.offset.top,g=b.within.height,h=a.top-b.collisionPosition.marginTop,i=e-h,j=h+b.collisionHeight-g-e;b.collisionHeight>g?i>0&&j<=0?(c=a.top+i+b.collisionHeight-g-e,a.top+=i-c):j>0&&i<=0?a.top=e:i>j?a.top=e+g-b.collisionHeight:a.top=e:i>0?a.top+=i:j>0?a.top-=j:a.top=f(a.top-h,a.top)}},flip:{left:function(a,b){var c,d,e=b.within,f=e.offset.left+e.scrollLeft,h=e.width,i=e.isWindow?e.scrollLeft:e.offset.left,j=a.left-b.collisionPosition.marginLeft,k=j-i,l=j+b.collisionWidth-h-i,m="left"===b.my[0]?-b.elemWidth:"right"===b.my[0]?b.elemWidth:0,n="left"===b.at[0]?b.targetWidth:"right"===b.at[0]?-b.targetWidth:0,o=-2*b.offset[0];k<0?(c=a.left+m+n+o+b.collisionWidth-h-f,(c<0||c<g(k))&&(a.left+=m+n+o)):l>0&&(d=a.left-b.collisionPosition.marginLeft+m+n+o-i,(d>0||g(d)<l)&&(a.left+=m+n+o))},top:function(a,b){var c,d,e=b.within,f=e.offset.top+e.scrollTop,h=e.height,i=e.isWindow?e.scrollTop:e.offset.top,j=a.top-b.collisionPosition.marginTop,k=j-i,l=j+b.collisionHeight-h-i,m="top"===b.my[1],n=m?-b.elemHeight:"bottom"===b.my[1]?b.elemHeight:0,o="top"===b.at[1]?b.targetHeight:"bottom"===b.at[1]?-b.targetHeight:0,p=-2*b.offset[1];k<0?(d=a.top+n+o+p+b.collisionHeight-h-f,(d<0||d<g(k))&&(a.top+=n+o+p)):l>0&&(c=a.top-b.collisionPosition.marginTop+n+o+p-i,(c>0||g(c)<l)&&(a.top+=n+o+p))}},flipfit:{left:function(){a.ui.position.flip.left.apply(this,arguments),a.ui.position.fit.left.apply(this,arguments)},top:function(){a.ui.position.flip.top.apply(this,arguments),a.ui.position.fit.top.apply(this,arguments)}}}}(),a.ui.position});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../safe-active-element","../unique-id","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(a){a.preventDefault()},"click .ui-menu-item":function(b){var c=a(b.target),d=a(a.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&c.not(".ui-state-disabled").length&&(this.select(b),b.isPropagationStopped()||(this.mouseHandled=!0),c.has(".ui-menu").length?this.expand(b):!this.element.is(":focus")&&d.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(b){if(!this.previousFilter){var c=a(b.target).closest(".ui-menu-item"),d=a(b.currentTarget);c[0]===d[0]&&(this._removeClass(d.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(b,d))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(a,b){var c=this.active||this.element.find(this.options.items).eq(0);b||this.focus(a,c)},blur:function(b){this._delay(function(){var c=!a.contains(this.element[0],a.ui.safeActiveElement(this.document[0]));c&&this.collapseAll(b)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(a){this._closeOnDocumentClick(a)&&this.collapseAll(a),this.mouseHandled=!1}})},_destroy:function(){var b=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),c=b.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),c.children().each(function(){var b=a(this);b.data("ui-menu-submenu-caret")&&b.remove()})},_keydown:function(b){var c,d,e,f,g=!0;switch(b.keyCode){case a.ui.keyCode.PAGE_UP:this.previousPage(b);break;case a.ui.keyCode.PAGE_DOWN:this.nextPage(b);break;case a.ui.keyCode.HOME:this._move("first","first",b);break;case a.ui.keyCode.END:this._move("last","last",b);break;case a.ui.keyCode.UP:this.previous(b);break;case a.ui.keyCode.DOWN:this.next(b);break;case a.ui.keyCode.LEFT:this.collapse(b);break;case a.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(b);break;case a.ui.keyCode.ENTER:case a.ui.keyCode.SPACE:this._activate(b);break;case a.ui.keyCode.ESCAPE:this.collapse(b);break;default:g=!1,d=this.previousFilter||"",f=!1,e=b.keyCode>=96&&b.keyCode<=105?(b.keyCode-96).toString():String.fromCharCode(b.keyCode),clearTimeout(this.filterTimer),e===d?f=!0:e=d+e,c=this._filterMenuItems(e),c=f&&c.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):c,c.length||(e=String.fromCharCode(b.keyCode),c=this._filterMenuItems(e)),c.length?(this.focus(b,c),this.previousFilter=e,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}g&&b.preventDefault()},_activate:function(a){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(a):this.select(a))},refresh:function(){var b,c,d,e,f,g=this,h=this.options.icons.submenu,i=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),d=i.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var b=a(this),c=b.prev(),d=a("<span>").data("ui-menu-submenu-caret",!0);g._addClass(d,"ui-menu-icon","ui-icon "+h),c.attr("aria-haspopup","true").prepend(d),b.attr("aria-labelledby",c.attr("id"))}),this._addClass(d,"ui-menu","ui-widget ui-widget-content ui-front"),b=i.add(this.element),c=b.find(this.options.items),c.not(".ui-menu-item").each(function(){var b=a(this);g._isDivider(b)&&g._addClass(b,"ui-menu-divider","ui-widget-content")}),e=c.not(".ui-menu-item, .ui-menu-divider"),f=e.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(e,"ui-menu-item")._addClass(f,"ui-menu-item-wrapper"),c.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!a.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(a,b){if("icons"===a){var c=this.element.find(".ui-menu-icon");this._removeClass(c,null,this.options.icons.submenu)._addClass(c,null,b.submenu)}this._super(a,b)},_setOptionDisabled:function(a){this._super(a),this.element.attr("aria-disabled",String(a)),this._toggleClass(null,"ui-state-disabled",!!a)},focus:function(a,b){var c,d,e;this.blur(a,a&&"focus"===a.type),this._scrollIntoView(b),this.active=b.first(),d=this.active.children(".ui-menu-item-wrapper"),this._addClass(d,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",d.attr("id")),e=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(e,null,"ui-state-active"),a&&"keydown"===a.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),c=b.children(".ui-menu"),c.length&&a&&/^mouse/.test(a.type)&&this._startOpening(c),this.activeMenu=b.parent(),this._trigger("focus",a,{item:b})},_scrollIntoView:function(b){var c,d,e,f,g,h;this._hasScroll()&&(c=parseFloat(a.css(this.activeMenu[0],"borderTopWidth"))||0,d=parseFloat(a.css(this.activeMenu[0],"paddingTop"))||0,e=b.offset().top-this.activeMenu.offset().top-c-d,f=this.activeMenu.scrollTop(),g=this.activeMenu.height(),h=b.outerHeight(),e<0?this.activeMenu.scrollTop(f+e):e+h>g&&this.activeMenu.scrollTop(f+e-g+h))},blur:function(a,b){b||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",a,{item:this.active}),this.active=null)},_startOpening:function(a){clearTimeout(this.timer),"true"===a.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(a)},this.delay))},_open:function(b){var c=a.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden","true"),b.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(c)},collapseAll:function(b,c){clearTimeout(this.timer),this.timer=this._delay(function(){var d=c?this.element:a(b&&b.target).closest(this.element.find(".ui-menu"));d.length||(d=this.element),this._close(d),this.blur(b),this._removeClass(d.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=d},this.delay)},_close:function(a){a||(a=this.active?this.active.parent():this.element),a.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(b){return!a(b.target).closest(".ui-menu").length},_isDivider:function(a){return!/[^\-\u2014\u2013\s]/.test(a.text())},collapse:function(a){var b=this.active&&this.active.parent().closest(".ui-menu-item",this.element);b&&b.length&&(this._close(),this.focus(a,b))},expand:function(a){var b=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();b&&b.length&&(this._open(b.parent()),this._delay(function(){this.focus(a,b)}))},next:function(a){this._move("next","first",a)},previous:function(a){this._move("prev","last",a)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(a,b,c){var d;this.active&&(d="first"===a||"last"===a?this.active["first"===a?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[a+"All"](".ui-menu-item").eq(0)),d&&d.length&&this.active||(d=this.activeMenu.find(this.options.items)[b]()),this.focus(c,d)},nextPage:function(b){var c,d,e;return this.active?void(this.isLastItem()||(this._hasScroll()?(d=this.active.offset().top,e=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return c=a(this),c.offset().top-d-e<0}),this.focus(b,c)):this.focus(b,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))):void this.next(b)},previousPage:function(b){var c,d,e;return this.active?void(this.isFirstItem()||(this._hasScroll()?(d=this.active.offset().top,e=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return c=a(this),c.offset().top-d+e>0}),this.focus(b,c)):this.focus(b,this.activeMenu.find(this.options.items).first()))):void this.next(b)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(b){this.active=this.active||a(b.target).closest(".ui-menu-item");var c={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(b,!0),this._trigger("select",b,c)},_filterMenuItems:function(b){var c=b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),d=new RegExp("^"+c,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return d.test(a.trim(a(this).children(".ui-menu-item-wrapper").text()))})}})});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./menu","../keycode","../position","../safe-active-element","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var b,c,d,e=this.element[0].nodeName.toLowerCase(),f="textarea"===e,g="input"===e;this.isMultiLine=f||!g&&this._isContentEditable(this.element),this.valueMethod=this.element[f||g?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(e){if(this.element.prop("readOnly"))return b=!0,d=!0,void(c=!0);b=!1,d=!1,c=!1;var f=a.ui.keyCode;switch(e.keyCode){case f.PAGE_UP:b=!0,this._move("previousPage",e);break;case f.PAGE_DOWN:b=!0,this._move("nextPage",e);break;case f.UP:b=!0,this._keyEvent("previous",e);break;case f.DOWN:b=!0,this._keyEvent("next",e);break;case f.ENTER:this.menu.active&&(b=!0,e.preventDefault(),this.menu.select(e));break;case f.TAB:this.menu.active&&this.menu.select(e);break;case f.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(e),e.preventDefault());break;default:c=!0,this._searchTimeout(e)}},keypress:function(d){if(b)return b=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||d.preventDefault());if(!c){var e=a.ui.keyCode;switch(d.keyCode){case e.PAGE_UP:this._move("previousPage",d);break;case e.PAGE_DOWN:this._move("nextPage",d);break;case e.UP:this._keyEvent("previous",d);break;case e.DOWN:this._keyEvent("next",d)}}},input:function(a){return d?(d=!1,void a.preventDefault()):void this._searchTimeout(a)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(a){return this.cancelBlur?void delete this.cancelBlur:(clearTimeout(this.searching),this.close(a),void this._change(a))}}),this._initSource(),this.menu=a("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(b){b.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==a.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(b,c){var d,e;return this.isNewMenu&&(this.isNewMenu=!1,b.originalEvent&&/^mouse/.test(b.originalEvent.type))?(this.menu.blur(),void this.document.one("mousemove",function(){a(b.target).trigger(b.originalEvent)})):(e=c.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",b,{item:e})&&b.originalEvent&&/^key/.test(b.originalEvent.type)&&this._value(e.value),d=c.item.attr("aria-label")||e.value,void(d&&a.trim(d).length&&(this.liveRegion.children().hide(),a("<div>").text(d).appendTo(this.liveRegion))))},menuselect:function(b,c){var d=c.item.data("ui-autocomplete-item"),e=this.previous;this.element[0]!==a.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=e,this._delay(function(){this.previous=e,this.selectedItem=d})),!1!==this._trigger("select",b,{item:d})&&this._value(d.value),this.term=this._value(),this.close(b),this.selectedItem=d}}),this.liveRegion=a("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(a,b){this._super(a,b),"source"===a&&this._initSource(),"appendTo"===a&&this.menu.element.appendTo(this._appendTo()),"disabled"===a&&b&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(b){var c=this.menu.element[0];return b.target===this.element[0]||b.target===c||a.contains(c,b.target)},_closeOnClickOutside:function(a){this._isEventTargetInWidget(a)||this.close()},_appendTo:function(){var b=this.options.appendTo;return b&&(b=b.jquery||b.nodeType?a(b):this.document.find(b).eq(0)),b&&b[0]||(b=this.element.closest(".ui-front, dialog")),b.length||(b=this.document[0].body),b},_initSource:function(){var b,c,d=this;a.isArray(this.options.source)?(b=this.options.source,this.source=function(c,d){d(a.ui.autocomplete.filter(b,c.term))}):"string"==typeof this.options.source?(c=this.options.source,this.source=function(b,e){d.xhr&&d.xhr.abort(),d.xhr=a.ajax({url:c,data:b,dataType:"json",success:function(a){e(a)},error:function(){e([])}})}):this.source=this.options.source},_searchTimeout:function(a){clearTimeout(this.searching),this.searching=this._delay(function(){var b=this.term===this._value(),c=this.menu.element.is(":visible"),d=a.altKey||a.ctrlKey||a.metaKey||a.shiftKey;b&&(!b||c||d)||(this.selectedItem=null,this.search(null,a))},this.options.delay)},search:function(a,b){return a=null!=a?a:this._value(),this.term=this._value(),a.length<this.options.minLength?this.close(b):this._trigger("search",b)!==!1?this._search(a):void 0},_search:function(a){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:a},this._response())},_response:function(){var b=++this.requestIndex;return a.proxy(function(a){b===this.requestIndex&&this.__response(a),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(a){a&&(a=this._normalize(a)),this._trigger("response",null,{content:a}),!this.options.disabled&&a&&a.length&&!this.cancelSearch?(this._suggest(a),this._trigger("open")):this._close()},close:function(a){this.cancelSearch=!0,this._close(a)},_close:function(a){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",a))},_change:function(a){this.previous!==this._value()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){return b.length&&b[0].label&&b[0].value?b:a.map(b,function(b){return"string"==typeof b?{label:b,value:b}:a.extend({},b,{label:b.label||b.value,value:b.value||b.label})})},_suggest:function(b){var c=this.menu.element.empty();this._renderMenu(c,b),this.isNewMenu=!0,this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItemData(b,c)})},_renderItemData:function(a,b){return this._renderItem(a,b).data("ui-autocomplete-item",b)},_renderItem:function(b,c){return a("<li>").append(a("<div>").text(c.label)).appendTo(b)},_move:function(a,b){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(a)||this.menu.isLastItem()&&/^next/.test(a)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[a](b):void this.search(null,b)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(a,b){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(a,b),b.preventDefault())},_isContentEditable:function(a){if(!a.length)return!1;var b=a.prop("contentEditable");return"inherit"===b?this._isContentEditable(a.parent()):"true"===b}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}}),a.widget("ui.autocomplete",a.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(a){return a+(a>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(b){var c;this._superApply(arguments),this.options.disabled||this.cancelSearch||(c=b&&b.length?this.options.messages.results(b.length):this.options.messages.noResults,this.liveRegion.children().hide(),a("<div>").text(c).appendTo(this.liveRegion))}}),a.ui.autocomplete});;
/**
 * @file
 * Extends autocomplete based on jQuery UI.
 *
 * @todo Remove once jQuery UI is no longer used?
 */

(function ($, Drupal) {
  'use strict';

  // Ensure the input element has a "change" event triggered. This is important
  // so that summaries in vertical tabs can be updated properly.
  // @see Drupal.behaviors.formUpdated
  $(document).on('autocompleteselect', '.form-autocomplete', function (e) {
    $(e.target).trigger('change.formUpdated');
  });

  // Extend ui.autocomplete widget so it triggers the glyphicon throbber.
  $.widget('ui.autocomplete', $.ui.autocomplete, {
    _search: function (value) {
      this.pending++;
      Drupal.Ajax.prototype.glyphiconStart(this.element);
      this.cancelSearch = false;
      this.source({term: value}, this._response());
    },
    _response: function () {
      var index = ++this.requestIndex;
      return $.proxy(function (content) {
        if (index === this.requestIndex) this.__response(content);
        this.pending--;
        if (!this.pending) Drupal.Ajax.prototype.glyphiconStop(this.element);
      }, this);
    }
  });

})(jQuery, Drupal);
;
/**
 * @file
 * Expands the behaviour of the default autocompletion.
 */

(function ($) {

    Drupal.autocomplete.options.minLength = 3;
    var oldSelect = Drupal.autocomplete.options.select;
    // Override the "select" option of the jQueryUI auto-complete to
    // add the functionality to submit the form if the auto_submit class
    // is present.
    Drupal.autocomplete.options.select = function (event, ui) {
        oldSelect.call(this, event, ui);
        if ($(this).hasClass('auto_submit')) {
            $("#edit-submit-recherche-globale", this.form).trigger('click');
        }
    };

})(jQuery);;
//-- AT Ergonomics A-B-C 3.3.2 -- Copyright 2015 AT INTERNET, All Rights Reserved.
//-- (to be used with AT Tag 4.6.1 or later)
var scriptOnClickZone=2,xtautoredir=true,xtczv='3.3.2',xtdtmp=0,xtdt2=new Date(),xtel=new xtE(xtdt2.getTime()),xtn=navigator,un=undefined,nu=null,cZ='xtcz',oC='onclick',cL='xtclib',cT='xtcltype',dT='xtdztype',tR=true,fA=false,isI=(/MSIE/.test(xtn.userAgent))?tR:fA,isOP=(/Opera/.test(xtn.userAgent))?tR:fA,isS=(/Safari/.test(xtn.userAgent))?tR:fA,isM=(xtn.appVersion.indexOf('Mac',0)>=0)?tR:fA,xtobj=new Array(),xtcz=new Array(),typcz=new Array(),sizex=new Array(),sizey=new Array(),posx=new Array(),posy=new Array(),larg=0,haut=0,xt_valdz=nu,hit=fA,fO=fA,xt_valsv=nu;
var timecz=new Array(),timerefcz=new Array(),timercz=new Array(),xttime=typeof(window['xttimez'])!='undefined'?window['xttimez']:10,xtczdom;
function xtP(oEl,inTYPE){if(typeof(oEl.offsetParent)!=un){var sType='oEl.offset'+inTYPE;for(var iVal=0;oEl;oEl=oEl.offsetParent){iVal+=eval(sType)}return iVal}else{if(inTYPE=='Left')return oEl.x;if(inTYPE=='Top')return oEl.y}return-1}
function xtSx(xl){var szx=(xtnN(xl)=='AREA')?xtAs(xl).w:xl.offsetWidth;if((szx==nu)||(szx==un)||(szx=='')){if(xl.style.width!=nu)szx=xl.style.width;else szx=0}if(isS&&isM&&(xtnN(xl)=='TR')&&(xl.firstChild!=nu)&&(xl.lastChild!=nu))szx=xl.lastChild.offsetLeft+xl.lastChild.offsetWidth-xl.firstChild.offsetLeft;if((szx==nu)||(szx==un)||(szx=='')){szx=0}return parseInt(szx,10)}
function xtSy(xl){var szy=(xtnN(xl)=='AREA')?xtAs(xl).h:xl.offsetHeight;if((szy==nu)||(szy==un)||(szy=='')){if(xl.style.height!=nu)szy=xl.style.height;else szy=0}if(isS&&isM&&(xtnN(xl)=='TR')&&(xl.firstChild!=nu)&&(xl.lastChild!=nu))szy=xl.lastChild.offsetTop+xl.lastChild.offsetHeight-xl.firstChild.offsetTop;if((szy==nu)||(szy==un)||(szy=='')){szy=0}return parseInt(szy,10)}
function xtPx(xl){var psx=(xtnN(xl)=='AREA')?xtAp(xl).x:xtP(xl,'Left');return parseInt(psx,10)}
function xtPy(xl){var psy=(xtnN(xl)=='AREA')?xtAp(xl).y:xtP(xl,'Top');if(isS&&isM&&(xtnN(xl)=='TR')&&(xl.firstChild!=nu))psy+=xl.firstChild.offsetTop;return parseInt(psy,10)}
function xtAs(xl){var rect=xtAb(xl),width=rect.right-rect.left,height=rect.bottom-rect.top;return{w:width,h:height}}
function xtAb(xl){if(xl['rectDefined'])return{left:xl.rLeft,top:xl.rTop,right:xl.rRight,bottom:xl.rBottom};if(!xl.shape)xl.shape='rect';var coords=xl.coords.split(','),result;if(xl.shape.toLowerCase()=='rectangle'||xl.shape.toLowerCase()=='rect'){result={left:parseInt(coords[0]),top:parseInt(coords[1]),right:parseInt(coords[2]),bottom:parseInt(coords[3])}}if(xl.shape.toLowerCase()=='circle'||xl.shape.toLowerCase()=='circ'){result={left:parseInt(coords[0])-parseInt(coords[2]),top:parseInt(coords[1])-parseInt(coords[2]),right:parseInt(coords[0])+parseInt(coords[2]),bottom:parseInt(coords[1])+parseInt(coords[2])}}if(xl.shape.toLowerCase()=='polygon'||xl.shape.toLowerCase()=='poly'){var l_ex,t_ex,r_ex,b_ex;for(var i=0;i<coords.length;i+=2){var co=parseInt(coords[i]);if(l_ex==un||co<l_ex)l_ex=co;if(r_ex==un||co>r_ex)r_ex=co}for(var i=1;i<coords.length;i+=2){var co=parseInt(coords[i]);if(t_ex==un||co<t_ex)t_ex=co;if(b_ex==un||co>b_ex)b_ex=co}result={left:l_ex,top:t_ex,right:r_ex,bottom:b_ex}}xl.rectDefined=tR;xl.rLeft=result.left;xl.rRight=result.right;xl.rTop=result.top;xl.rBottom=result.bottom;return result}
function xtAp(area,target){var map=xtpN(area);if(!map.dstElement){if(!target){target=xd}var elts=target.getElementsByTagName('*');if(elts['toArray'])elts=elts.toArray();for(var i=0;i<elts.length;i++){var xl=elts[i];if(xl.useMap){if(xl.useMap.replace('#','')==map.name)break}xl=nu}map.dstElement=xl}if(map.dstElement){var basePx=xtP(map.dstElement,'Left'),basePy=xtP(map.dstElement,'Top'),rect=xtAb(area);return{x:(basePx+rect.left),y:(basePy+rect.top)}}else{return{x:-1,y:-1}}}
function xtNodesload(){if(xw.xt8!=0){xw.xtczdom=xw.xtLogDom?xw.xtLogDom:'.xiti.com/hit.xiti';var desc=xd.getElementsByTagName('*');for(var i=0;i<desc.length;i++){if(xtL(desc[i]))xtel.xttab.push(desc[i]);if(xtLDz(desc[i]))xtobj.push(desc[i])}for(var j=0;j<xtel.xttab.length;j++){if(xtel.xttab[j].nodeName=='OBJECT'||xtel.xttab[j].nodeName=='EMBED'){if(xd.addEventListener)xtel.xttab[j].addEventListener('mousedown',xtR,fA);else if(xd.attachEvent)xtel.xttab[j].attachEvent('onmousedown',xtR)}else{if(xd.addEventListener)xtel.xttab[j].addEventListener('click',xtR,fA);else if(xd.attachEvent)xtel.xttab[j].attachEvent('onclick',xtR)}}for(var l=0;l<xtobj.length;l++){xtcz[l]=xtG(xtobj[l],cZ);if((xtG(xtobj[l],dT)!=nu)&&(xtG(xtobj[l],dT)!=un))typcz[l]=xtG(xtobj[l],dT);else typcz[l]='0';sizex[l]=xtSx(xtobj[l]);sizey[l]=xtSy(xtobj[l]);posx[l]=xtPx(xtobj[l]);posy[l]=xtPy(xtobj[l]);timecz[xtcz[l]]=0;timerefcz[xtcz[l]]=0;timercz[xtcz[l]]=nu}xtReload();if(xw.addEventListener){xw.addEventListener('scroll',xtReload,fA);xw.addEventListener('resize',xtReload,fA);xw.addEventListener('focus',xtReload,fA);xw.addEventListener('blur',xtCTimer,fA)}else if(xw.attachEvent){xw.attachEvent('onscroll',xtReload);xw.attachEvent('onresize',xtReload)}if(xd.addEventListener){xd.addEventListener('mousemove',xtRefresh,fA);xd.addEventListener('keydown',xtRefresh,fA)}else if(xd.attachEvent){xd.attachEvent('onfocusin',xtReload);xd.attachEvent('onfocusout',xtCTimer);xd.attachEvent('onmousemove',xtRefresh);xd.attachEvent('onkeydown',xtRefresh)}}}
function xtRefresh(){for(var m=0;m<xtobj.length;m++){timerefcz[xtcz[m]]=0}}
function xtReload(){larg=xtcW();haut=xtcH();xtAffDz();xtAffSv()}
function xtCTimer(){for(var m=0;m<xtobj.length;m++){if(timercz[xtcz[m]]!=nu){xw.clearInterval(timercz[xtcz[m]]);timercz[xtcz[m]]=nu;timerefcz[xtcz[m]]=0}}}
function xtTime(i){if(timercz[xtcz[i]]!=nu){timecz[xtcz[i]]+=1;timerefcz[xtcz[i]]+=1;if((timerefcz[xtcz[i]]%xttime)==0){xw.clearInterval(timercz[xtcz[i]]);timercz[xtcz[i]]=nu;timerefcz[xtcz[i]]=0;if(xd.addEventListener){xd.addEventListener('mousemove',xtAffDz,fA);xd.addEventListener('keydown',xtAffDz,fA)}else if(xd.attachEvent){xd.attachEvent('onmousemove',xtAffDz);xd.attachEvent('onkeydown',xtAffDz)}}}}
function xtAffDz(){if(xd.removeEventListener){xd.removeEventListener('mousemove',xtAffDz,fA);xd.removeEventListener('keydown',xtAffDz,fA)}else if(xd.detachEvent){xd.detachEvent('onmousemove',xtAffDz);xd.detachEvent('onkeydown',xtAffDz)}for(var m=0;m<xtobj.length;m++){var scTop=xtsT(),scLeft=xtsL();var p=0,pX=0,pY=0;if((posy[m]>=scTop)&&((posy[m]+sizey[m])<=(scTop+haut)))pY=100;else if(((posy[m]<scTop)&&((posy[m]+sizey[m])<=(scTop)))||(posy[m]>=(scTop+haut)))pY=0;else if((posy[m]<=scTop)&&((posy[m]+sizey[m])>=(scTop+haut)))pY=(haut/sizey[m])*100;else if(posy[m]<scTop)pY=((posy[m]+sizey[m]-scTop)/sizey[m])*100;else if((posy[m]+sizey[m])>(scTop+haut))pY=((scTop+haut-posy[m])/sizey[m])*100;if((posx[m]>=scLeft)&&((posx[m]+sizex[m])<=(scLeft+larg)))pX=100;else if(((posx[m]<scLeft)&&((posx[m]+sizey[m])<=(scLeft)))||(posx[m]>=(scLeft+larg)))pX=0;else if((posx[m]<=scLeft)&&((posx[m]+sizex[m])>=(scLeft+larg)))pX=(larg/sizex[m])*100;else if(posx[m]<scLeft)pX=((posx[m]+sizex[m]-scLeft)/sizex[m])*100;else if((posx[m]+sizex[m])>(scLeft+larg))pX=((scLeft+larg-posx[m])/sizex[m])*100;var Ly=(pY*sizey[m])/100,Lx=(pX*sizex[m])/100,areaA=Lx*Ly,areaT=sizex[m]*sizey[m];p=Math.round((areaA/areaT)*100);if(timercz[xtcz[m]]!=nu){xw.clearInterval(timercz[xtcz[m]]);timercz[xtcz[m]]=nu;timerefcz[xtcz[m]]=0}if(p>0){timercz[xtcz[m]]=xw.setInterval("xtTime("+m+");",1000)}xtCDz(xtcz[m],p,(p==0)?0:1,typcz[m])}}
function xtAffSv(){var lY=xtdH(),scTop=xtsT(),pY=Math.round((scTop+haut)/lY*100);pY=(pY>100)?100:pY;pY=(pY<0)?0:pY;if(scTop==0)fO=tR;if(fO)xtCSv(pY)}
function xtLDz(xl){var xlel=['DIV','TABLE','TR','TD','UL','LI','ARTICLE','FOOTER','ASIDE','HEADER','NAV','SECTION'],xeln=xtnN(xl);for(var i=0;i<xlel.length;i++){if((xeln==xlel[i])&&(xl.nodeType==1)&&(xtG(xl,cZ)!=nu)&&(xtG(xl,cZ)!=un)){var xelp=xtpN(xl);while(xelp){if((xelp.nodeType==1)&&(xtG(xelp,cZ)!=nu)&&(xtG(xelp,cZ)!=un))return fA;xelp=xtpN(xelp)}return tR}}return fA}
function xtEx2(xat){var r=new RegExp('&s2=','gi');if(r.test(xat.toString())){xat=xat.replace(r,'')}return xat}
function xtEx(xext){var valext=['.aac','.ace','.ape','.art','.avi','.bak','.bat','.bin','.bmp','.bsp','.cab','.ccd','.cda','.chm','.clp','.css','.csv','.cue','dic','dll','.doc','.dot','.exe','.fla','.flac','.gif','.gz','.hlp','.ico','.img','.iso','.jpeg','.jpg','.js','.lnk','.m2a','.m2v','.m3u','.mdb','.mdf','.mds','.mid','.midi','.mkv','.mod','.mov','.mp2','.mp3','.mp4','.mpc','.mpg','.mpeg','.msi','.nfo','.nrg','.obd','.ocx','.ogg','.old','.ogm','.pdf','.png','.pps','.ppt','.psd','.psp','.rar','.raw','.reg','.rm','.ram','.rtf','.swf','.tar','.tga','.tgz','.theme','.tif','.tiff','.tmp','.torrent','.ttf','.txt','.url','.vbs','.vob','.wab','.wav','.wdb','.wks','.wml','.wma','.wmv','.wpf','.xls','.xml','.zip','.7z'];for(var i=0;i<valext.length;i++){if(xext==valext[i])return tR}return fA}
function xtTr(xl){var xut=['BODY','HTML'];for(var i=0;i<xut.length;i++){if(xl.tagName==xut[i])return fA}return tR}
function xtEv(evt){var e_out,ie_var='srcElement',moz_var='target';evt[moz_var]?e_out=evt[moz_var]:e_out=evt[ie_var];return(e_out)}
function xtBdEv(evt){var e_out=(xw.event)?(xw.event.button==2):(evt.which==3);return(e_out)}
function xtCSv(p){var lY=xtdH(),percWin=Math.round((haut/lY)*100),nP=0,oldp=0;if(xt_valsv!=nu){oldp=parseInt(xt_valsv,10);if((p>oldp)&&(p<(oldp+percWin)))xt_valsv=p}else{xt_valsv=p}}
function xtV(xat){var r=/xt_med\(\s*.?C/i,r2=/xt_click\(\s*this\s*\,\s*.?C/i;return(r.test(xat.toString())||r2.test(xat.toString())||(xw.xtczcustomtag?xw.xtczcustomtag.isPresent(xat):false))}
function xtExT(xat){var page='',pageclz='',type='',section=-1,custom=(typeof xw.xtczcustomtag!='undefined')?xw.xtczcustomtag.getCustomTag(xat):null;if(!custom){var idx=(xat.indexOf('xt_med')>=0)?0:1,IdxSt=(idx==0)?xat.indexOf('xt_med'):xat.indexOf('xt_click'),start=xat.indexOf('(',IdxSt),stop=xat.indexOf(')',IdxSt),content=xtSub(xat,start+1,stop),tmp=start;while(content.indexOf('(')>0){tmp=stop+1;stop=xat.indexOf(')',stop+1);content=xtSub(xat,tmp+1,stop)}content=xtSub(xat,start+1,stop);xatab=content.split(/\,/);try{section=(xatab[idx+1])?String(eval(xatab[idx+1])):''}catch(e){section=(xatab[idx+1]||'')}try{page=(xatab[idx+2])?String(eval(xatab[idx+2])):''}catch(e){page=(xatab[idx+2]||'')}try{type=(xatab[idx+3])?String(eval(xatab[idx+3])):''}catch(e){type=(xatab[idx+3]||'')}}else{type=custom.typ||'';page=custom.lab||'';section=custom.sec||''}pageclz=page.replace(/(::)/g,'/');return{typ:type,pag:page,pagcl:pageclz,sec:section}}
function xtIdxOf(tab,v,n){n=(n==nu)?0:n;var m=tab.length;for(var i=n;i<m;i++)if(tab[i]==v)return i;return-1}
function xtT(xl){if(xl.innerHTML){var xtx=xl.innerHTML,r=new RegExp('<script[^>]*>','gi');if(r.test(xtx.toString()))return fA;xtx=(xtx.toString()).replace(/<\/?[^>]+>/gi,'');var regex=new RegExp('(&nbsp;)','g');xtx=(xtx.toString()).replace(regex,'');xtx=xtEn(xtx);var regex2=new RegExp('(%C2%A0)','g');xtx=(xtx.toString()).replace(regex2,'');try{xtx=xtDe(xtx)}catch(e){}xtx=(xtx.toString()).replace(/[\s]/gm,'');if((xtx.length==0)||(xtx==un)||(xtx==nu))return fA;return xtx}return fA}
function xtE(st){this.xttab=new Array();this.xst=st;this.xc=0;this.yc=0;this.sx=0;this.sy=0;this.px=0;this.py=0;this.xr=0;this.yr=0;this.bf='';this.af='';this.curr='';this.cliccz='';this.dest='';this.s=0;this.pcz='';this.s2cz='';this.t=0;this.idmod=0;this.p='';this.s2='';this.idpage=-1}
function xtH(){var d2=new Date();return(d2.getTime()-xtel.xst)}
function xtC(e){if(!e){if(xw.event){e=xw.event}else{return{x:-1,y:-1}}}var xc=-1,yc=-1;if(typeof(e.pageX)=='number'){xc=e.pageX;yc=e.pageY}else if(typeof(e.clientX)=='number'){xc=e.clientX;yc=e.clientY;var bad=(xw.xtn.userAgent.indexOf('Opera')+1)||(xw.ScriptEngine&&ScriptEngine().indexOf('InScript')+1)||(xtn.vendor=='KDE');if(!bad){if(xd.body&&(xd.body.scrollLeft||xd.body.scrollTop)){xc+=xd.body.scrollLeft;yc+=xd.body.scrollTop}else if(xd.documentElement&&(xd.documentElement.scrollLeft||xd.documentElement.scrollTop)){xc+=xd.documentElement.scrollLeft;yc+=xd.documentElement.scrollTop}}}else{return{x:-1,y:-1}}return{x:xc,y:yc}}
function xtExD(url){var u=url.replace(/((http)|(https)):\/\//g,''),p=u.indexOf('/');p=(p!=-1)?p:u.length;u=xtSub(u,0,p);return u}
function xtCt(xl,a){var xclict='',xext='',xurld='',target='',check='',xdoms=(xw.xt1!=nu&&xw.xt1!='')?xtSub(xw.xt1,8,xw.xt1.length):xd.domain,xdomd='',isAction=!1,curUrl=window.location.href,cleanUrl=curUrl.substring(0,(curUrl.indexOf('#')>0?curUrl.indexOf('#'):curUrl.length));if(xl){if((xtnN(xl)=='INPUT')&&(xl.type=='submit')){try{xurld=xtG(xl.form,'action').toString()}catch(e){}xext=xtSub(xurld,xurld.lastIndexOf('.'),xurld.length);xdomd=xtExD(xurld);if(xl.form&&xl.form.getAttribute('data-xtredir'))check=(xl.form.getAttribute('data-xtredir'));}if((xtnN(xl)!='IMG')&&xl.href){xurld=(xl.href).toString();if(xurld.indexOf('#')>0&&xurld.substring(0,xurld.indexOf('#'))==cleanUrl)isAction=!0;if(xl.getAttribute('target'))target=(xl.getAttribute('target')).toString();if(xl.getAttribute('data-xtredir'))check=(xl.getAttribute('data-xtredir'));xext=xtSub(xurld,xurld.lastIndexOf('.'),xurld.length);xdomd=xtExD(xurld)}else{var xlp=xtpN(xl);while(xlp&&xtnN(xlp)!='BODY'){if(xlp.href){xurld=(xlp.href).toString();if(xurld.indexOf('#')>0&&xurld.substring(0,xurld.indexOf('#'))==cleanUrl)isAction=!0;xext=xtSub(xurld,xurld.lastIndexOf('.'),xurld.length);xdomd=xtExD(xurld);if(xlp.getAttribute('target'))target=(xlp.getAttribute('target')).toString();if(xlp.getAttribute('data-xtredir'))check=(xlp.getAttribute('data-xtredir'));break}xlp=xtpN(xlp)}}}if(xtEx(xext))xclict='T';else if((xdomd!='')&&(xdomd.indexOf(xdoms,0)<0)&&(xdomd!=xtSub(xdoms,1,xdoms.length)))xclict='S';else if(isAction){xclict='A'}else{xclict='N'}if(!a){if(xurld.length>255)xurld=xtSub(xurld,0,255);var ch=xurld;if(ch.charAt(ch.length-1)=='/')ch=xtSub(ch,0,ch.length-1);var pos=ch.lastIndexOf('/?',ch.length);if(pos>=0)ch=ch.replace('/?','?');xurld=ch;try{if((xtDe(xurld)!=nu)&&(xtDe(xurld)!=un))xurld=xtDe(xurld)}catch(e){}}return{typ:xclict,url:xurld,tgt:target,ck:check}}
function xtL(xl){var xlel=['INPUT','SELECT','IFRAME','OBJECT','AREA','BUTTON'],xeln=xtnN(xl);if((xeln=='EMBED')&&(xtnN(xtpN(xl)))!='OBJECT'){return tR}if((xeln=='DIV')&&(xtG(xl,cL))){return tR}if((xeln=='SPAN')&&(xtG(xl,oC))){return tR}if((xeln=='SELECT')&&((xtG(xl,'onchange')==nu)||(xtG(xl,'onchange')==un)||(xtG(xl,'onchange')==''))){return fA}if((xeln=='INPUT')&&(xl.type!='submit')&&(xl.type!='image')&&(xl.type!='button')){return fA}if((xeln=='BUTTON')&&(xl.type!='submit')){return fA}if(xeln=='IMG'){var xlp=xtpN(xl);var xtTr=fA;while(xlp){if(xtnN(xlp)=='A'){xtTr=tR;if((((xtG(xlp,oC)!=nu)&&(xtG(xlp,oC)!=un)&&(xtG(xlp,oC)!=''))||((xtG(xlp,'href')!=nu)&&(xtG(xlp,'href')!=un)&&(xtG(xlp,'href')!='')))){return tR}}xlp=xtpN(xlp)}if((xtG(xl,oC)!=nu)&&(xtG(xl,oC)!=un)&&(xtG(xl,oC)!='')&&!xtTr)return tR}if((xeln=='A')&&(((xtG(xl,oC)!=nu)&&(xtG(xl,oC)!=un)&&(xtG(xl,oC)!=''))||((xtG(xl,'href')!=nu)&&(xtG(xl,'href')!=un)&&(xtG(xl,'href')!='')))){var xlp=xtpN(xl);while(xlp){if(((xtnN(xlp)=='DIV')&&(xtG(xlp,cL)))||((xtnN(xlp)=='SPAN')&&(xtG(xlp,oC))))return fA;xlp=xtpN(xlp)}var xtImg=fA,xtTxt=fA;if(xl.childNodes){var xtChild=xl.childNodes,j=0;while(j<xtChild.length&&!(xtImg&&xtTxt)){if(xtnN(xtChild[j])=='IMG'){xtImg=tR}else{xtTxt=tR}j++}}if(xtImg&&xtTxt)return tR;else if(xtImg)return fA;else return tR}for(var i=0;i<xlel.length;i++){if(xeln==xlel[i])return tR}return fA}
function xtLCz(xl){var xlel=['DIV','TABLE','TR','TD','UL','LI','ARTICLE','FOOTER','ASIDE','HEADER','NAV','SECTION'],xeln=xtnN(xl);for(var i=0;i<xlel.length;i++){if((xeln==xlel[i])&&(xl.nodeType==1)&&(xtG(xl,cZ)!=nu)&&(xtG(xl,cZ)!=un)){return tR}}return fA}
function xtNa(xl){if(xl&&!xtL(xl)){var xlp=xtpN(xl);while(xlp){if(xtL(xlp)){xl=xlp;break}xlp=xtpN(xlp)}}var obj=null,xid='',xtmedat='',xtmedp='',xtmeds='',type='',xurld='',xtTr=fA;if(xl){if((xtnN(xl)=='A')&&(xl.childNodes)){var xtChild=xl.childNodes,j=0;while((j<xtChild.length)&&!xtTr){if((xtChild[j].nodeType==1)&&!xtL(xtChild[j])&&(xtG(xtChild[j],cL))){xid=cL+xtG(xtChild[j],cL);xtTr=tR}j++}}if(!xtTr){if(xtG(xl,oC)&&xtV(xtG(xl,oC)))xid=xtG(xl,oC);else if(xl.href&&xtV(xl.href)){xid=xl.href;try{if((xtDe(xid)!=nu)&&(xtDe(xid)!=un))xid=xtDe(xid)}catch(e){}}else if(xtG(xl,cL))xid=cL+xtG(xl,cL);else if(xtT(xl))xid=xtT(xl);else if(xl.id)xid=xl.id;else if(xl.name)xid=xl.name;else if(xl.title)xid=xl.title;else if(xl.value)xid=xl.value;else if(xl.href){var ch=xl.href.toString();if(ch.charAt(ch.length-1)=='/')ch=xtSub(ch,0,ch.length-1);var pos=ch.lastIndexOf('/?',ch.length);if(pos>=0)ch=ch.replace('/?','?');xid=ch;try{if((xtDe(xid)!=nu)&&(xtDe(xid)!=un))xid=xtDe(xid)}catch(e){}}else if(xl.src){var ch=xl.src.toString();if(ch.charAt(ch.length-1)=='/')ch=xtSub(ch,0,ch.length-1);var pos=ch.lastIndexOf('/?',ch.length);if(pos>=0)ch=ch.replace('/?','?');xid=ch;try{if((xtDe(xid)!=nu)&&(xtDe(xid)!=un))xid=xtDe(xid)}catch(e){}}else{var xlp=xtpN(xl);while(xlp&&xtnN(xlp)!='BODY'){if(xtG(xlp,oC)&&xtV(xtG(xlp,oC))){xid=xtG(xlp,oC);break}else if(xlp.href&&xtV(xlp.href)){xid=xlp.href;try{if((xtDe(xid)!=nu)&&(xtDe(xid)!=un))xid=xtDe(xid)}catch(e){}break}else if(xtG(xl,cL)){xid=cL+xtG(xl,cL);break}else if(xtT(xlp)){xid=xtT(xlp);break}else if(xlp.id){xid=xlp.id;break}else if(xlp.name){xid=xlp.name;break}else if(xlp.title){xid=xlp.title;break}else if(xlp.value){xid=xlp.value;break}else if(xlp.href){var ch=xlp.href.toString();if(ch.charAt(ch.length-1)=='/')ch=xtSub(ch,0,ch.length-1);var pos=ch.lastIndexOf('/?',ch.length);if(pos>=0)ch=ch.replace('/?','?');xid=ch;try{if((xtDe(xid)!=nu)&&(xtDe(xid)!=un))xid=xtDe(xid)}catch(e){}break}else if(xlp.src){var ch=xlp.src.toString();if(ch.charAt(ch.length-1)=='/')ch=xtSub(ch,0,ch.length-1);var pos=ch.lastIndexOf('/?',ch.length);if(pos>=0)ch=ch.replace('/?','?');xid=ch;try{if((xtDe(xid)!=nu)&&(xtDe(xid)!=un))xid=xtDe(xid)}catch(e){}break}xlp=xtpN(xlp)}}}xid=(xid.toString()).replace(/[\s]/gm,'');if(xtV(xid)){obj=xtExT(xid);type=obj.typ;xtmedp=obj.pag;xtmeds=obj.sec;if(xtG(xl,cL))xid=cL+xtG(xl,cL);else xid=obj.pagcl}else{var xlp=xtpN(xl);while(xlp&&(xtnN(xlp)!='BODY')){if(xtG(xlp,oC)&&xtV(xtG(xlp,oC))){xtmedat=xtG(xlp,oC);xtmedat=(xtmedat.toString()).replace(/[\s]/gm,'');obj=xtExT(xtmedat);type=obj.typ;xtmedp=obj.pag;xtmeds=obj.sec;break}else if(xlp.href&&xtV(xlp.href)){xtmedat=xlp.href;try{if((xtDe(xtmedat)!=nu)&&(xtDe(xtmedat)!=un))xtmedat=xtDe(xtmedat)}catch(e){}xtmedat=(xtmedat.toString()).replace(/[\s]/gm,'');obj=xtExT(xtmedat);type=obj.typ;xtmedp=obj.pag;xtmeds=obj.sec;break}xlp=xtpN(xlp)}}if(type==''){if(xtG(xl,cT)!=nu){type=xtG(xl,cT)}else{var xlp=xtpN(xl);while(xlp&&(xtnN(xlp)!='BODY')){if(xtG(xlp,cT)!=nu){type=xtG(xlp,cT);break}xlp=xtpN(xlp)}}}if(type=='')type=xtCt(xl).typ;xurld=xtCt(xl).url;if(xtmedp==''){xtmedp=(xid.indexOf(cL,0)>=0)?xtExTc(xid):xid;if(xtmeds=='')xtmeds=xtEx2(xw.xt9)}var regex=new RegExp('(&)|[?]','g');xtmedp=(xtmedp.toString()).replace(regex,'_');if(xtmeds=='')xtmeds='0';var r=new RegExp('(::)','g');xid=(xid.toString()).replace(r,'/');var k=0,xlp=xtpN(xl);while(xlp&&(xtnN(xlp)!='BODY')){if(xtLCz(xlp)&&(k<2)){xid=xtG(xlp,cZ)+'::'+xid;k+=1}xlp=xtpN(xlp)}}xid=xtSub(xid,0,255);xtmedp=xtSub(xtmedp,0,255);return{id:xid,pag:xtmedp,sec:xtmeds,typ:type,url:xurld}}
function xtExTc(xid){var r=new RegExp(cL,'gi');xid=xid.replace(r,'');return xid}
function xtR(e){xtel.t=Math.round(xtH()/1000);if(xtdtmp!=0&&(xtel.t-xtdtmp<1))return;xtdtmp=xtel.t;if(!e)e=xw.event;if(xtBdEv(e))return;var obj=null,xel=xtEv(e);if(xtTr(xel)){if(xtnN(xel)=='OPTION'){var xelp=xtpN(xel);while(xelp){xel=xelp;if(xtnN(xel)=='SELECT')break;xelp=xtpN(xelp)}}xtel.s=xw.xt8;xtel.pcz=xw.xtp;xtel.s2cz=xtEx2(xw.xt9);xtel.idmod=typeof(xw['xtidmod'])!='undefined'?xw['xtidmod']:0;obj=xtNa(xel);xtel.curr=obj.id;xtel.cliccz=obj.typ;xtel.dest=obj.url;xtel.p=obj.pag;xtel.s2=obj.sec;xtel.p=((xtel.p!='')&&(xtel.cliccz!='F'))?'&pmed='+xtEn(xtel.p):'';xtel.s2=((xtel.s2!='')&&(xtel.cliccz!='F'))?'&s2med='+xtEn(xtel.s2):'';if(xtel.cliccz=='F'){xtel.cliccz=xtCt(xl).typ}xtel.sx=xtSx(xel);xtel.sy=xtSy(xel);xtel.px=xtPx(xel);xtel.py=xtPy(xel);xtel.idpage=(xw.xtidpg!=nu)?xw.xtidpg:-1;if((xtel.px==-1)&&(xtel.py==-1))return;var tmpelt=xtEv(e);xtel.xc=((xtnN(tmpelt)=='OPTION')&&!isOP)?xtC(e).x+xtel.px:xtC(e).x;xtel.yc=xtC(e).y;if((xtel.xc==-1)&&(xtel.yc==-1))return;if(xd.compatMode=='BackCompat'&&isI){xtel.xc-=2;xtel.yc-=2}xtel.xr=(xtel.xc-xtel.px)/xtel.sx;xtel.yr=(xtel.yc-xtel.py)/xtel.sy;if((0<xtel.sx)&&(xtel.sx<=40))xtel.xr=0.5;if((40<xtel.sx)&&(xtel.sx<=250))xtel.xr=(Math.round(xtel.xr*10))/10;if(250<xtel.sx)xtel.xr=(Math.round(xtel.xr*100))/100;if((0<xtel.sy)&&(xtel.sy<=40))xtel.yr=0.5;if((40<xtel.sy)&&(xtel.sy<=250))xtel.yr=(Math.round(xtel.yr*10))/10;if(250<xtel.sy)xtel.yr=(Math.round(xtel.yr*100))/100;if(xtel.xr<0)xtel.xr=0;if(xtel.yr<0)xtel.yr=0;if(xtel.xr>1)xtel.xr=1;if(xtel.yr>1)xtel.yr=1;if((xtel.curr).indexOf(cL,0)<0){var idx=xtIdxOf(xtel.xttab,xel);var xelp=xtpN(xel);while((idx==-1)&&xelp){idx=xtIdxOf(xtel.xttab,xelp);xelp=xtpN(xelp)}xtel.bf=xtNa(xtel.xttab[idx-1]).id;xtel.af=xtNa(xtel.xttab[idx+1]).id;xtel.bf=((xtel.bf).indexOf(cL,0)>=0)?xtExTc(xtel.bf):xtel.bf;xtel.af=((xtel.af).indexOf(cL,0)>=0)?xtExTc(xtel.af):xtel.af}else{xtel.curr=xtExTc(xtel.curr);xtel.bf='';xtel.af='';xtel.dest=''}var name='';if((xtnN(xel)=='EMBED')&&isOP&&(xtpN(xel)!=nu)&&(xtpN(xel)!=un))name=xtpN(xel).name;else name=xel.name;if((name!=nu)&&(name!=un)&&((name).indexOf(cT)>=0))xtel.cliccz=name.replace(cT,'');var type=xtCt(xel).typ;var hitn=fA;if((xtel.cliccz=='N')&&(type!='N'))hitn=tR;var regex=new RegExp('(&)|[?]','g');xtel.curr=(xtel.curr.toString()).replace(regex,'_');xtel.bf=(xtel.bf.toString()).replace(regex,'_');xtel.af=(xtel.af.toString()).replace(regex,'_');xtel.dest=(xtel.dest.toString()).replace(regex,'_');var res='&xtczv='+xtczv+'&idmod='+xtel.idmod+'&current='+xtEn(xtel.curr)+'&before='+xtEn(xtel.bf)+'&after='+xtEn(xtel.af)+'&cliccz='+xtel.cliccz+'&dest='+xtEn(xtel.dest)+'&posx='+xtel.xr+'&posy='+xtel.yr+'&time='+xtel.t+xtel.p+xtel.s2;var dz='&dz=';if(xt_valdz!=nu){var reg1=new RegExp('XTL','gi'),reg2=new RegExp('[|]{2}','gi'),tabL=new Array();tabL=xt_valdz.split(reg1);for(var i=0;i<tabL.length;i++){if((tabL[i].length>0)&&(parseInt(tabL[i].split(reg2)[1],10)>0)){dz+=tabL[i].split(reg2)[0]+',';dz+=tabL[i].split(reg2)[1]+',';dz+=tabL[i].split(reg2)[2]+',';dz+=tabL[i].split(reg2)[4]+',';dz+=timecz[tabL[i].split(reg2)[0]]+'|'}}}var redir=xtCt(xel,1),redir_url=redir.url,redir_tgt=redir.tgt,redir_ok=!1,redir_chck=redir.ck;if(xtautoredir&&e.type=='click'&&redir_chck!='no'&&redir_url.indexOf('http')==0&&redir_tgt!='_blank'&&!e.defaultPrevented&&xtel.cliccz=='S'){e.preventDefault();redir_ok=1}if(((scriptOnClickZone==2)&&(xtel.cliccz!='N'))||(hitn==tR)){var hitdz='';if(xtel.cliccz=='S'){hit=tR;hitdz='&pv='+xt_valsv+dz}xtHit(xtsd+xw.xtczdom+'?s='+xtel.s+'&pcz='+xtEn(xtel.pcz)+'&s2cz='+xtEn(xtel.s2cz)+((typeof(xt40)!='undefined')?'&idclient='+xt40:''),res+hitdz,1,1,xtel.idpage);if(redir_ok){var time=typeof xw.xttredir!='undefined'?xw.xttredir:500;if(xel.form){xtSubmit(xel.form,time);}else{xtRedir(redir_url,redir_tgt,time)}}}else if((scriptOnClickZone!=2)&&(xtel.cliccz=='S')){hit=tR;xtHit(xtsd+xw.xtczdom+'?s='+xtel.s+'&pcz='+xtEn(xtel.pcz)+'&s2cz='+xtEn(xtel.s2cz)+'&idmod='+xtel.idmod+'&xtczv='+xtczv+((typeof(xt40)!='undefined')?'&idclient='+xt40:''),'&pv='+xt_valsv+dz,1,1,xtel.idpage);if(redir_ok){var time=typeof xw.xttredir!='undefined'?xw.xttredir:500;if(xel.form){xtSubmit(xel.form,time);}else{xtRedir(redir_url,redir_tgt,time)}}}else if(xtel.cliccz=='N'){hit=tR;xtCzW(encodeURIComponent('&idpcz='+xtel.idpage+res+dz+'&pv='+xt_valsv).replace(/-/g,"%at1%").replace(/_/g,"%at2%").replace(/\./g,"%at3%").replace(/!/g,"%at4%").replace(/~/g,"%at5%").replace(/\*/g,"%at6%").replace(/'/g,"%at7%").replace(/\(/g,"%at8%").replace(/\)/g,"%at9%"));}}}
function xtRedir(url,tgt,time){var a='.location.href="';switch(tgt){case'_self':setTimeout('self'+a+url+'"',time);break;case'_top':setTimeout('top'+a+url+'"',time);break;case'_parent':setTimeout('parent'+a+url+'"',time);break;case'':setTimeout('self'+a+url+'"',time);break;default:setTimeout('self'+a+url+'"',time);break}}
function xtSubmit(obj,time){setTimeout(function(){obj.submit();},time);}
function xtCDz(name,p,nbf,typcz){var nbFv=nbf,nP=0,valP=0,trv=fA,reg1=new RegExp('XTL','gi'),reg2=new RegExp('[|]{2}','gi'),valC='';if(xt_valdz!=nu){var tabL=new Array();tabL=xt_valdz.split(reg1);for(var i=0;i<tabL.length;i++){if(tabL[i].length>0){nP=parseInt(tabL[i].split(reg2)[1],10);nbFv=parseInt(tabL[i].split(reg2)[2],10);valP=parseInt(tabL[i].split(reg2)[3],10);if((valP==0)&&(parseInt(p,10)>0)&&(nP!=parseInt(p,10))){try{xt_areaDisplayed(tabL[i].split(reg2)[0])}catch(e){}}if(name==tabL[i].split(reg2)[0]){trv=tR;if(parseInt(p,10)>parseInt(tabL[i].split(reg2)[1],10)){nP=parseInt(p,10);nbFv=1;valP=parseInt(p,10);}else if((parseInt(p,10)==parseInt(tabL[i].split(reg2)[1],10))&&(parseInt(tabL[i].split(reg2)[3],10)<parseInt(p,10))){nbFv=parseInt(tabL[i].split(reg2)[2],10)+1;valP=parseInt(p,10)}else if(parseInt(p,10)<parseInt(tabL[i].split(reg2)[1],10))valP=parseInt(p,10)}valC+=tabL[i].split(reg2)[0]+'||'+nP+'||'+nbFv+'||'+valP+'||'+tabL[i].split(reg2)[4]+'XTL'}}if(!trv)valC+=name+'||'+p+'||'+nbf+'||'+p+'||'+typcz+'XTL'}else{valC=name+'||'+p+'||'+nbf+'||'+p+'||'+typcz+'XTL'}xt_valdz=valC;}
function xtCzW(v){var xtcznb=new Date();xtcznb.setTime(xtcznb.getTime()+45000);xd.cookie='xtvalCZ='+v+';expires='+xtcznb.toGMTString()+' ;path=/'+xw.xt1}
function xtdH(){var off=xd.documentElement?parseInt(xd.documentElement.offsetHeight,10):0,sc=xd.documentElement?parseInt(xd.documentElement.scrollHeight,10):0,boff=xd.body?parseInt(xd.body.offsetHeight,10):0,bsc=xd.body?parseInt(xd.body.scrollHeight,10):0;return xtMax(xtMax(off,boff),xtMax(sc,bsc))}
function xtcW(){var val=xtfR(xw.innerWidth?parseInt(xw.innerWidth,10):0,xd.documentElement?parseInt(xd.documentElement.clientWidth,10):0),val2=xd.body?parseInt(xd.body.clientWidth,10):0;return((val==0)?val2:val)}
function xtcH(){var val=xtfR(xw.innerHeight?parseInt(xw.innerHeight,10):0,xd.documentElement?parseInt(xd.documentElement.clientHeight,10):0),val2=xd.body?parseInt(xd.body.clientHeight,10):0;return((val==0)?val2:val)}
function xtsL(){var pag=xw.pageXOffset?parseInt(xw.pageXOffset,10):0,sl=xd.documentElement?parseInt(xd.documentElement.scrollLeft,10):0,bsl=xd.body?parseInt(xd.body.scrollLeft,10):0;return xtMax(xtMax(pag,sl),bsl)}
function xtsT(){var pag=xw.pageYOffset?parseInt(xw.pageYOffset,10):0,st=xd.documentElement?parseInt(xd.documentElement.scrollTop,10):0,bst=xd.body?parseInt(xd.body.scrollTop,10):0;return xtMax(xtMax(pag,st),bst)}
function xtHit(str1,str2,nt,ntg,idpcz){var xt_imgc=new Image(),lim=1500,mh='&mh='+nt+'-'+ntg+'-'+idpcz;if(str2.length>lim){var reg=new RegExp('[|]','gi'),tab=str2.split(reg),hit='',l=tab[0].length,i=0;while((l<lim)&&(i<tab.length)){hit+=tab[i]+'|';if(i<tab.length-1)l+=(tab[i+1].length)+1;i+=1}ntg=(ntg==1)?Math.ceil(str2.length/lim):ntg;mh='&mh='+nt+'-'+ntg+'-'+idpcz;if(hit!=''){xt_imgc.src=str1+'&idpcz='+idpcz+mh+hit;xt_imgc.onload=function(){xt_imgc.onload=null}}else{xt_imgc.src=str1+'&idpcz='+idpcz+mh+str2.substring(0,lim)+'&mherr=1';xt_imgc.onload=function(){xt_imgc.onload=null};return}str2='&dz=';for(var j=i;j<tab.length;j++){str2+=tab[j]+((j==(tab.length-1))?'':'|')}xtHit(str1,str2,nt+1,ntg,idpcz)}else if(str2.length>4){xt_imgc.src=(nt==1)?str1+'&idpcz='+idpcz+str2:str1+'&idpcz='+idpcz+mh+str2;xt_imgc.onload=function(){xt_imgc.onload=null}}}
function xtG(o,a){var att=null;try{att=o.getAttribute(a)}catch(e){}return(att==null)?null:(((a==cZ)&&(att.length>255))?xtSub(att,0,255):att)}
function xtfR(w,d){var n_result=w?w:0;if(d&&(!n_result||(n_result>d)))n_result=d;return n_result}
function xtEn(v){return encodeURIComponent(v)}
function xtDe(v){return decodeURIComponent(v)}
function xtnN(o){return o.nodeName}
function xtpN(o){return o.parentNode}
function xtSub(o,d,f){return o.substring(d,f)}
function xtMax(a,b){return((a>b)?a:b)};
/***@licence*Copyright2015ATInternet,AllRightsReserved.*ATInternetTag4.7.0*/window.Xtconf={xt1:'.sante.fr',xtLogDom:'.xiti.com/hit.xiti',xtfirst:false,xt2:'1',xt3:365,xt4sec:'20',xt4rss:'20',xt4epr:'20',xt4erec:'20',xt4adi:'20',xt4adc:'20',xt4al:'20',xtsds:'https://logs1407',xtsd:'http://logc407',xtsts:0,xtsite:function(x){return x},xtscript:'',xtpreview:false,xtnocookies:false,xtcode:'',xt46:'1',xt50:'1',xt48:'',xt54:false,xt58:false,xtdocl:false,xttredir:500,xtkwv:'xtmc',xtkwp:'xtnp',idcExp:397,idcType:'fixed',weboAccountId:0,tvTracking:{active:false,url:'',duration:30,priority:1,lifetime:30,domain:null,path:null,retention:5}};
window.ATInternet=window.ATInternet||{};
window.ATInternet.Utils=new function(){var b=this;b.getCookie=function(b){return b=(b=RegExp("(?:^| )"+b+"=([^;]+)").exec(document.cookie)||null)&&1<b.length?b[1]:null};b.setCookie=function(b,p,g,c,l){var q=new Date;q.setTime(q.getTime()+1E3*g);g="expires="+q.toGMTString();document.cookie=b+"="+p+";"+g+";path="+(l?l:"/")+";domain="+(c?c:"")};b.serialJSON=function(k,p){var g=typeof k;if("object"!==g||null===k)return"string"===g&&(k=p?encodeURIComponent('"'+k+'"'):'"'+k+'"'),String(k);var c,l,q=[],
    u=k&&k.constructor===Array;for(c in k)k.hasOwnProperty(c)&&(l=k[c],g=typeof l,"function"!==g&&("string"===g?l=p?encodeURIComponent('"'+l.replace(/[^\\]"/g,'\\"')+'"'):'"'+l.replace(/[^\\]"/g,'\\"')+'"':"object"===g&&null!==l&&(l=b.serialJSON(l,p)),q.push((u?"":p?encodeURIComponent('"'+c+'":'):'"'+c+'":')+String(l))));return(u?"[":"{")+String(q)+(u?"]":"}")};b.parseJSON=function(b){return null===b?b:"string"===typeof b?(new Function("return "+b))():!1}};
window.Xtcore=function(){function b(d){return"undefined"!==typeof d}function k(d){return ATInternet.Utils.serialJSON(d,!0)}function p(d){return d.replace(/%3C/g,"<").replace(/%3E/g,">").replace(/[<>]/g,"")}function g(d,a,j,e,f){a=0===f?a:encodeURIComponent(a);A||(r.cookie=d+"="+a+";expires="+j.toGMTString()+";path=/"+e)}function c(d,m,j){var e;try{e=$.location.href}catch(f){e=a.location.href}m=null===m||!b(m)?p(e.toLowerCase().replace(/%3d/g,"=")):m;if(0<m.indexOf(d+"=")){m=m.substr(1);d=m.substr(m.indexOf(d+
    "="));if(2!=j){if(1!=j)try{d=decodeURIComponent(d)}catch(g){d=unescape(d)}if(m=d.match(/(\[[^\]]*\])/g)){e="";for(var c=0,T=m.length;c<T;c++)e=m[c].substring(1,m[c].length-1),d=d.replace(e,encodeURIComponent(e))}}m=d.indexOf("#");e=d.search(/&.[^&]+=/gi);e=-1==e?-1==m?d.length:m:0<m&&m<e?m:e;return 1==j?decodeURIComponent(d.substring(d.indexOf("=")+1,e)):2==j?d.substring(d.indexOf("=")+1,e):d.substring(d.indexOf("=")+1,e).replace("&","%26")}return null}function l(d,a,j,e){if((0===xa||3==xa||"C"!=
    d)&&"P"!=d)cb&&"0"==v&&"F"==d?(B=B.replace("&p="+c("p",B,2),""),B=B.replace("&s2="+c("s2",B),""),AT_hit.isPreviewOrPrerendering()||AT_hit.sendTag(d,null,null,a),cb=!1):AT_hit.sendTag(d,a);null!==j&&(b(j)&&"M"!=d)&&(""===e||null===e?r.location=j:window.open(j,"xfen","").focus())}function q(d){d-=100*Math.floor(d/100);return 10>d?"0"+d:d}function u(d){return Math.floor(Math.random()*Math.pow(10,d))}var D=this;D.sentHits=[];var h=Xtconf.xt1,aa=Xtconf.xtscript,n=window.xtLogDom=Xtconf.xtLogDom,z=Xtconf.xtpreview,
    db=Xtconf.xtfirst,A=Xtconf.xtnocookies,eb=Xtconf.xtcode,v=Xtconf.xt46,M=Xtconf.xt50,H=Xtconf.xt48,s=Xtconf.xt54,L=Xtconf.xt58,C=Xtconf.xtdocl,ba=Xtconf.xt2,yb=Xtconf.xt3;window.xttredir=Xtconf.xttredir;var fb=Xtconf.xtkwv,gb=Xtconf.xtkwp,ya=[],I=[];I.sec=Xtconf.xt4sec;I.rss=Xtconf.xt4rss;I.epr=Xtconf.xt4epr;I.erec=Xtconf.xt4erec;I.adi=Xtconf.xt4adi;I.adc=Xtconf.xt4adc;I.al=Xtconf.xt4al;I.es=Xtconf.xt4epr;I.ad=Xtconf.xt4adi;var za=[],cb=!0,U=!1,Aa=null,a=window.xw=window,r=window.xd=document,x=navigator,
    zb=window.xtv=a.xtczv?"4.7.0-"+a.xtczv:"4.7.0",h=window.xt1=a.xtdmc?";domain="+a.xtdmc:""!==h?";domain="+h:"",$=a.xtnv?a.xtnv:r,Ab=window.xt7=a.xtsdi?a.xtsdi:a.xtsd?a.xtsd+n:("https:"===r.location.protocol?Xtconf.xtsds:Xtconf.xtsd)+n,ia=a.xtsts?a.xtsts:Xtconf.xtsts,ja="";if(s){var Ba="";try{Ba=$.location.href}catch(Yb){Ba=a.location.href}var Bb=/#.*/,Ca=null;try{Ca=Ba.match(Bb)[0]}catch(Zb){Ca=null}ja=(ja=Ca)?"&sta="+encodeURIComponent(p(ja)):""}var hb=a.xtcustom?k(a.xtcustom):"",N=
    window.xt8=a.xtsite?a.xtsite:0,Cb=window.xt9=a.xtn2?"&s2="+a.xtn2:"",Db=window.xt8b=(0===N?"":"s="+N)+(0===ia?"":0===N?"sts="+ia:"&sts="+ia),ka=window.xtp=a.xtpage?a.xtpage:"",ib=a.xto_force?a.xto_force.toLowerCase():null,O="redirect"===N,Eb=a.xtdi?"&di="+a.xtdi:"",Fb=a.xtidp?"&idpays="+a.xtidp:"",Gb=a.xtidprov?"&idprov="+a.xtidprov:"",w=a.xtparam?a.xtparam:"",v=a.xtnopage&&"1"===a.xtnopage?"0":v,M=a.xtergo&&"0"===a.xtergo?"0":M,xa=a.scriptOnClickZone&&"1"===M?a.scriptOnClickZone:0,Hb=""!==eb?"&code="+
eb:"",Da=[],la=[],ca=[],ma=[],Ea=[],R=[];window.xt44=a.xtprod_load?"&pdtl="+a.xtprod_load:"";a.addEventListener?a.addEventListener("unload",function(){},!1):a.attachEvent&&a.attachEvent("onunload",function(){});r.addEventListener?(r.addEventListener("keydown",function(){U=!0},!1),r.addEventListener("keyup",function(){U=!1},!1)):r.attachEvent&&(r.attachEvent("onkeydown",function(){U=!0}),r.attachEvent("onkeyup",function(){U=!1}));var Ib=a.roimt&&0>w.indexOf("&roimt",0)?"&roimt="+a.roimt:"",Jb=0>w.indexOf("&mc=",
    0)?a.xtmc?"&mc="+a.xtmc:c(fb)?"&mc="+c(fb):c("xtmc")?"&mc="+c("xtmc"):"":"",Kb=c("xtcr")?"&mcrg="+c("xtcr"):"",Lb=a.xtac&&0>w.indexOf("&ac=",0)?"&ac="+a.xtac:"",Mb=a.xtat&&0>w.indexOf("&at=",0)?"&at="+a.xtat:"",jb=a.xtan&&0>w.indexOf("&an=",0)?"&an="+a.xtan:"",Nb=0>w.indexOf("&np=",0)?a.xtnp?"&np="+a.xtnp:c(gb)?"&np="+c(gb):c("xtnp")?"&np="+c("xtnp"):"":"",Ob=a.xtprm&&0>w.indexOf("&x",0)?a.xtprm:"",w=w+(Ib+Jb+Kb+Lb+(""!==jb?jb:Mb)+Nb+Ob+ja),Fa="";try{Fa=top.document.referrer}catch($b){try{Fa=$.referrer}catch(ac){}}var na=
    screen,P=window.xt21=new Date,kb=P.getTime()/36E5,t=window.xtf1=function(d,a){if(A)return null;a=null!==a&&b(a)?a:"0";var j=RegExp("(?:^| )"+d+"=([^;]+)").exec(r.cookie)||null;if(j&&(j=p(j[1]),"1"!=a))try{j=decodeURIComponent(j)}catch(e){j=unescape(j)}return j};window.xt_addchain=function(d,a){var j=a?a:"abmv",e=!ya[j]?0:ya[j];e++;w+="&"+j+""+e+"="+d;ya[j]=e};"function"===typeof xt_adch&&xt_adch();window.wck=g;window.xtf3=c;window.xt_mvt=function(d,a,j,e,f){if(e)for(var b=1;b<e.length+1;b++)j+="&"+
    (f?f:"abmv")+b+"="+e[b-1];l("","&p="+d+"&s2="+a+"&abmvc="+j+"&type=mvt")};window.xt_med=function(d,a,j,e,f,g,c,T){e="F"==d&&(null===e||!b(e))?c?"&stc="+k(c):"":"M"==d?"&a="+e+"&m1="+f+"&m2="+g+"&m3="+c+"&m4="+T:"&clic="+e+(c?"&stc="+k(c):"");l(d,"&s2="+a+"&p="+j+e,f,g)};if(db=window.xtfirst=-1!=x.userAgent.indexOf("Safari")&&0>x.userAgent.indexOf("Chrome")||-1!=x.userAgent.indexOf("iPhone")||-1!=x.userAgent.indexOf("iPod")||-1!=x.userAgent.indexOf("iPad")||db||a.xtidc||A){var oa=a.xtidc,Ga=t("xtidc"),
    V="",V=oa?oa:Ga?Ga:(new Date).getTime()+""+u(7);if("relative"==Xtconf.idcType||oa||!Ga&&!oa){var Ha=new Date;Ha.setTime(Ha.getTime()+864E5*Xtconf.idcExp);g("xtidc",V,Ha,h,1)}var lb=t("xtidc"),V=V+(!a.xtidc&&(null===lb||lb!=V)?"-NO":"")}window.xt_ad=function(d,m,j,e){l("AT","&atc="+d+"&type=AT&patc="+a.xtpage+"&s2atc="+a.xtn2+(e?"&stc="+k(e):""),m,j)};window.xt_adi=function(d,a,j){l("AT","&ati="+d+"&type=AT",a,j)};window.xt_adc=function(d,m,j,e,f){l("AT","&atc="+m+"&type=AT&patc="+a.xtpage+"&s2atc="+
    a.xtn2+(f?"&stc="+k(f):""));return AT_click.do_navig(d,j,e?"_blank":null,!0)};window.xt_click=function(d,a,j,e,f,c,g,T){f=("F"==a&&(null===f||!b(f))?"":"&clic="+f)+(T?"&stc="+k(T):"");l(a,"&s2="+j+"&p="+e+f);return AT_click.do_navig(d,c,g?"_blank":null,!0)};window.xt_form=function(d,a,j,e,f,c,g){f=("F"==a&&(null===f||!b(f))?"":"&clic="+f)+(g?"&stc="+k(g):"");l(a,"&s2="+j+"&p="+e+f);return AT_click.do_submit(d,!0,c)};window.xt_rm=function(d,m,j,e,f,b,g,c,k,q,n,h,z,p){l(d,"&p="+j+"&s2="+m+"&type="+
    d+"&a="+e+"&m5="+n+"&m6="+h+(null!==f&&"0"!=f?"&"+f:"")+(null!==g&&"pause"!=e&&"stop"!=e?"&m1="+g+"&"+c+"&m3="+k+"&m4="+q+"&m7="+z+"&m8="+p+"&prich="+a.xtpage+"&s2rich="+a.xtn2:"")+(null!==b&&"0"!=b&&null!==g?"&rfsh="+b:""));f=new Date;if(null!==b&&"0"!=b&&("play"==e||"play&buf=1"==e||"refresh"==e)){R[d]&&18E5<f.getTime()-R[d]&&(ca[d]=0);if(("play"==e||"play&buf=1"==e)&&!ca[d])ca[d]=f.getTime()/1E3,ma[d]=parseInt(g),e=Math.floor(b),e=1500<e?1500:5>e?5:e,Da[d]=e,la[d]=e,R[d]=!1;else if("refresh"==
    e&&("live"==h||!ma[d]||300<ma[d]&&2>100*Da[d]/ma[d]))e=R[d]?Ea[d]:f.getTime()/1E3-ca[d],5>100*la[d]/(e+30)&&(la[d]=5*((e+30)/100)),R[d]&&(R[d]=!1,ca[d]=f.getTime()/1E3-Ea[d]),Ea[d]=e;za[d]=a.setTimeout("xt_rm('"+d+"','"+m+"','"+j+"','refresh','0','"+b+"',null,'"+c+"','"+k+"','"+q+"','"+n+"','"+h+"')",1E3*la[d])}else if(("pause"==e||"stop"==e)&&null!==za)a.clearTimeout(za[d]),"stop"==e?Da[d]=0:R[d]=f.getTime()};var Ia=window.xtidpg=q(P.getHours())+""+q(P.getMinutes())+""+q(P.getSeconds())+""+u(7),
    y=0,mb=0;window.xt16="";window.xt_addProduct=function(d,m,j,e,f,b){y++;a.xt16+="&pdt"+y+"=";a.xt16+=d?d+"::":"";a.xt16+=m?m:"";a.xt16+=j?"&qte"+y+"="+j:"";a.xt16+=e?"&mt"+y+"="+e:"";a.xt16+=f?"&dsc"+y+"="+f:"";a.xt16+=b?"&pcode"+y+"="+b:""};window.xt_rd=u;window.xt_addProduct_v2=function(d,m,j,e,f,b,g,c,k){y++;a.xt16+="&pdt"+y+"=";a.xt16+=d?d+"::":"";a.xt16+=m?m:"";a.xt16+=j?"&qte"+y+"="+j:"";a.xt16+=e?"&mt"+y+"="+e:"";a.xt16+=f?"&mtht"+y+"="+f:"";a.xt16+=b?"&dsc"+y+"="+b:"";a.xt16+=g?"&dscht"+y+
"="+g:"";a.xt16+=k?"&roimt"+y+"="+k:"";a.xt16+=c?"&pcode"+y+"="+c:""};window.xt_addProduct_load=function(d,m,j){m&&(mb++,a.xt44+=1==mb?"&pdtl=":"|",a.xt44+=d?d+"::":"",a.xt44+=m,a.xt44+=j?";"+j:"")};"function"==typeof xt_cart?xt_cart():a.xt16="";window.xt_ParseUrl=function(d,a,j){AT_hit.sendTag(j?"F":"old",a)};window.xt_ParseUrl3=function(d,a,j,e,f){AT_hit.sendTag("&ati="==f?"AT":"PDT",a,null,"&type="+("&ati="==f?"AT":"PDT"))};window.AT_click={id:0,objs:[],elem:function(d,a,j,e,f,g,c,q){var n={};
    n.urlDest=f;n.type=d;n.n2=a;n.label=j;n.typeClick=e;n.target=g;n.submit=!1!==f;n.redir=!b(c)?!0:c;n.xtcust=b(q)?"&stc="+k(q):"";return n},addListener:function(d,a,j){window.addEventListener?d.addEventListener(a,j,!1):window.attachEvent&&d.attachEvent("on"+a,j)},tag:function(a,m,j,e,f,b,g,c,n){if(a&&"function"==typeof a.setAttribute)this.addElem(a,m,j,e,f,b,g,c,n);else if("object"==typeof a)for(var k in a)a.hasOwnProperty(k)&&"function"==typeof a[k].setAttribute&&this.addElem(a[k],m,j,e,f,b,g,c,n)},
    addElem:function(a,m,b,e,f,g,c,k,n){this.id++;a.setAttribute("data-xtclickid",this.id);this.objs[this.id]=this.elem(m,b,e,f,g,c,k,n);"FORM"!=a.nodeName?this.addListener(a,"click",this.on_click_submit):this.addListener(a,"submit",this.on_click_submit)},on_click_submit:function(a){try{var m=a.target||a.srcElement,b=m.getAttribute("data-xtclickid"),e={},f="",g=a.defaultPrevented,c=window.AT_click;if(!b)for(var k=m.parentNode;k;){if(k.getAttribute("data-xtclickid")){b=k.getAttribute("data-xtclickid");
        break}k=k.parentNode}b&&(e=c.objs[b],"AT"!=e.type?f+="&p="+e.label+("C"==e.type?"&clic="+e.typeClick:""):"AT"==e.type&&(f+="&type=AT&atc="+e.label),f+=e.xtcust,l(e.type,"&s2="+e.n2+f),!g&&e.redir&&(a.preventDefault(),"FORM"!=m.nodeName?c.do_navig(m,e.urlDest,e.target):c.do_submit(m,null,e.submit)))}catch(n){}},do_navig:function(d,b,j,e){var f=null;if("A"!=d.nodeName)for(var c=d.parentNode;c;){if("A"==c.nodeName){f=c;break}c=c.parentNode}else f=d;if(f){if(f.target=j||d.target||"_self",f.href=b||d.href||
            f.href,!e||e&&!U)if(d=f.href.split('"').join('\\"'),0>f.href.indexOf("mailto:"))if("_self"==f.target.toLowerCase()){if(setTimeout('self.location.href="'+d+'"',a.xttredir),e)return!1}else if("_top"==f.target.toLowerCase()){if(setTimeout('top.location.href="'+d+'"',a.xttredir),e)return!1}else if("_parent"==f.target.toLowerCase()){if(setTimeout('parent.location.href="'+d+'"',a.xttredir),e)return!1}else return!0;else if(setTimeout('AT_click.mail_to("'+d+'");',a.xttredir),e)return!1}else if(b||d.href)if(b=
            b?b:d.href,0>b.indexOf("mailto:"))if("_blank"==j)setTimeout('(xw.open("'+b.split('"').join('\\"')+'","_blank")).focus();',1);else{if(setTimeout('self.location.href="'+b.split('"').join('\\"')+'"',a.xttredir),e)return!1}else if(setTimeout('AT_click.mail_to("'+b.split('"').join('\\"')+'");',a.xttredir),e)return!1;if(e)return U=!1,!0},do_submit:function(a,b,c){if(c&&(setTimeout(function(){a.submit()},500),b&&c))return!1},mail_to:function(a){window.location=a}};window.AT_hit={first:!0,referrer:("acc_dir"==
c("xtref")?"":null!==c("xtref")?c("xtref"):"acc_dir"==t("xtref")?"":t("xtref")||Fa.replace(/[<>]/g,"")||"").replace(/[<>]/g,"").substring(0,1600),parse:function(a,b,j,e){var f=[""];if(1600>=b.length)f[0]=b;else{a=AT_hit.first&&"F"==a?Ia:Ia.substring(0,6)+u(8);var g="",k="",n,q={};n=[];var h=0;0<=b.indexOf("&ref=")&&(g=b.substring(b.indexOf("&ref=")),b=b.replace(g,""));if(e)for(var z in e)if(e.hasOwnProperty(z)&&0<=b.indexOf("&"+z+"=")&&1600<(k=c(z,b,2)).length)b=b.replace("&"+z+"="+k,""),n=RegExp("["+
    e[z]+"]","gi"),q[z]=k.replace(/&/g,"%26").split(n);n=RegExp("["+j+"]","gi");n=b.split(n);for(var l in n)n.hasOwnProperty(l)&&(1600>=f[h].length+n[l].length+1?f[h]+=""!==n[l]?"&"+n[l]:"":(f.push(""),h++,f[h]=1600>n[l].length?f[h]+(""!==n[l]?"&"+n[l]:""):f[h]+("&mherr=1&"+n[l].substring(0,1600))));for(var p in q)if(q.hasOwnProperty(p)){b="&"+p+"=";j=!1;z=q[p].length;for(l=0;l<z;l++)1600>=f[h].length+q[p][l].length+1?(j||(f[h]+=b,j=!0),f[h]+=""!==q[p][l]?q[p][l]+("stc"===p&&z-1===l?"":e[p]):""):(f.push(b),
    j=!0,h++,f[h]=1600>q[p][l].length?f[h]+(""!==q[p][l]?q[p][l]+("stc"===p&&z-1===l?"":e[p]):""):f[h]+("mherr=1"+e[p]))}g&&(1600>=f[h].length+g.length||(f.push(""),h++),f[h]+=g);for(e=0;e<f.length;e++)f[e]="&mh="+(e+1)+"-"+f.length+"-"+a+f[e]}return f},sendTag:function(d,b,c,e){"undefined"!=typeof window.ATTagTvTracking&&ATTagTvTracking.update();"undefined"!=typeof window.ATTagWebo&&ATTagWebo.update();var f=[];c=c||Pb+Db;c+=a.xtfirst?"&idclient="+V:"";d=d||"F";b=b||B;b+=(e?e:"")+"&vtag="+zb+AT_hit.localHour()+
    AT_hit.resolution()+"&rn="+(new Date).getTime();AT_hit.first&&"F"==d&&(b+=hb&&0>b.indexOf("&stc=")?"&stc="+hb:"",b+="&ref="+AT_hit.referrer.replace(/&/g,"$"));"C"===d&&(b+="&pclick="+a.xtpage+"&s2click="+(a.xtn2?a.xtn2:""));f=AT_hit.parse(d,b,"&",{ati:",",atc:",",pdtl:"|",stc:",",dz:"|"});for(b=0;b<f.length;b++)AT_hit.loadImage(c+f[b]);AT_hit.first&&("F"==d&&""!==aa)&&AT_hit.loadFile("script",aa,!0,"text/javascript");"F"==d&&(AT_hit.first=!1)},loadImage:function(a){var b=new Image;b.src=a;D.sentHits instanceof
Array&&D.sentHits.push(a);b.onload=function(){b.onload=null}},loadFile:function(a,b,c,e,f){a=document.createElement(a);a.type=e;a.async=c;a.src=b;(f||document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]||document.getElementsByTagName("script")[0].parentNode).insertBefore(a,null)},localHour:function(a){a=a?a:new Date;return"&hl="+a.getHours()+"x"+a.getMinutes()+"x"+a.getSeconds()},resolution:function(){if(4<=parseFloat(x.appVersion))try{var a;a="undefined"!==typeof window.devicePixelRatio?
    window.devicePixelRatio:1;return"&r="+na.width*a+"x"+na.height*a+"x"+na.pixelDepth+"x"+na.colorDepth}catch(b){}return""},prerenderDisplaying:function(){AT_hit.first&&(AT_hit.sendTag("F"),""!==xt44&&AT_hit.sendTag("PDT",xt44,null,"&type=PDT&p="+ka+(a.xt_pageID?"&pid="+a.xt_pageID+"&pchap="+(a.xt_chap||"")+"&pidt="+(a.xt_pageDate||""):"")))},isPreviewOrPrerendering:function(){return window.navigator&&"preview"===window.navigator.loadPurpose&&-1!=x.userAgent.indexOf("Safari")&&0>x.userAgent.indexOf("Chrome")?
    (z&&(AT_hit.sendTag("F",null,null,"&pvw=1"),""!==xt44&&AT_hit.sendTag("PDT",xt44,null,"&type=PDT&p="+ka+(a.xt_pageID?"&pid="+a.xt_pageID+"&pchap="+(a.xt_chap||"")+"&pidt="+(a.xt_pageDate||""):""))),!0):"prerender"==r.webkitVisibilityState?(r.addEventListener("webkitvisibilitychange",AT_hit.prerenderDisplaying,!1),!0):!1}};if(0!==N||0!==ia||O){var da="";if(""!==H){da=t("xtvid");da||(Aa=da=P.getTime()+""+u(6));var Ja=new Date;Ja.setMinutes(Ja.getMinutes()+30);g("xtvid",da,Ja,"",1)}window.xtvid=da;var nb=
        Xtconf.xtsite("xtor"),Ka=Xtconf.xtsite("xtdate"),ob=Xtconf.xtsite("xtocl"),La=Xtconf.xtsite("xtan"),Ma=Xtconf.xtsite("xtat"),ea=Xtconf.xtsite("xtant"),S=c("xtor"),Na=c("xtdt"),E=c("xtan"),F=c("xtat"),Oa=c("an",w),Pa=c("at",w),pb=c("ac",w),qb=t(ob),Qa=t("xtgo"),Ra=t("xtord"),rb=t("xtvrn"),fa=null!==qb?qb:"$",Qb="0"===Qa?Ra:null,Sa=null!==Qa?Qa:"0",pa=null!==rb?rb:"$",sb=P.getTime()/6E4,ga=null!==Na&&(c("xts")==N||O)?30>sb-Na&&0<=sb-Na?"2":"1":Sa,Rb="1"==Sa?"&pgt="+Ra:"1"==ga&&null!==S?"&pgt="+S:"",
    W=null!==ib?ib:null!==S&&"0"==ga?S:!O?Qb:null,W=0>fa.indexOf("$"+W+"$")||"$"==fa?W:null,K="0"==ga?W:"2"==Sa?Ra:"2"==ga?S:null,X,Ta;null!==K?(Ta=K.substring(0,K.indexOf("-")),X=I[Ta]):X="1";if(null===X||!b(X))X=I.ad;null===E&&!O&&(E=t("xtanrd"));null===F&&!O&&(F=t("xtatrd"));var tb=t(La),ub=t(Ma),qa=t(ea),J=new Date,G=window.xt29=new Date,Ua=new Date;O?J.setTime(J.getTime()+3E4):J.setTime(J.getTime()+864E5*X);Ua.setTime(Ua.getTime()+18E5);G.setTime(G.getTime()+864E5*yb);var Va=null!==E?E.indexOf("-"):
    0,Wa=null!==F?F.indexOf("-"):0,vb=null!==Oa?"":null!==E&&0<Va?"&ac="+E.substring(0,Va)+"&ant=0&an="+E.substring(Va+1,E.length):null!==tb?"&anc="+tb+"&anct="+qa:"",Sb=null!==Pa?"":null!==F&&0<Wa?"&ac="+F.substring(0,Wa)+"&ant=0&at="+F.substring(Wa+1,F.length):null!==ub?"&attc="+ub+"&anct="+qa:"",Q=0>pa.indexOf("$"+N+"$")?"&vrn=1":"",Tb=null!==c("xtatc")&&null===c("atc",w)?"&atc="+c("xtatc"):"";""!==Q&&g("xtvrn",141>pa.length?pa+N+"$":pa.substring(0,141),G,h,0);Q+=null===W?"":"&xto="+W;Q+=(""!==vb?
        vb:Sb)+Rb+Tb;null!==Oa?(g(La,pb+"-"+Oa,G,h,1),g(ea,"1",G,h,1)):null!==E&&"1"!=qa&&(g(La,E,G,h,1),g(ea,"0",G,h,1));null!==Pa?(g(Ma,pb+"-"+Pa,G,h,1),g(ea,"1",G,h,1)):null!==F&&"1"!=qa&&(g(Ma,F,G,h,1),g(ea,"0",G,h,1));var Xa=t(nb),ha=t(Ka),ha=(/[a-zA-Z]/.test(ha)?(new Date(ha)).getTime()/36E5:parseFloat(t(Ka)))||(new Date).getTime()/36E5,Ub=0<=Math.floor(kb-ha)?Math.floor(kb-ha):0,Q=Q+(null===Xa?"":"&xtor="+Xa+"&roinbh="+Ub);if(O)g("xtgo",ga,J,h,1),null!==S&&g("xtord",S,J,h,1),null!==E&&g("xtanrd",E,
    J,h,1),null!==F&&g("xtatrd",F,J,h,1),g("xtref",AT_hit.referrer?AT_hit.referrer.replace(/&/g,"$"):"acc_dir",J,h,0),a.xtloc&&($.location=a.xtloc);else{null!==K&&(0>fa.indexOf("$"+encodeURIComponent(K)+"$")||"$"==fa)&&g(ob,fa+K+"$",Ua,h,1);var ra=x.appName+" "+x.appVersion,Y=ra.indexOf("MSIE"),Z;0<=Y?(Z=parseInt(ra.substr(Y+5)),Y=!0):(Z=parseFloat(x.appVersion),Y=!1);var Vb=0<=ra.indexOf("Netscape"),Wb=0<=ra.indexOf("Mac"),Ya=0<=x.userAgent.indexOf("Opera"),sa="",wb="",Za="",$a="";if(Y&&5<=Z&&!Wb&&!Ya&&
    !O)try{r.body.addBehavior("#default#clientCaps"),sa="&cn="+r.body.connectionType,sa+="&ul="+r.body.UserLanguage,r.body.addBehavior("#default#homePage"),wb=r.body.isHomePage(location.href)?"&hm=1":"&hm=0",$a="&re="+r.body.offsetWidth+"x"+r.body.offsetHeight}catch(bc){}else 5<=Z&&($a="&re="+a.innerWidth+"x"+a.innerHeight);Vb&&4<=Z||Ya?Za="&lng="+x.language:Y&&(4<=Z&&!Ya)&&(Za="&lng="+x.userLanguage);g("xtord","",P,h,1);if(null!==K&&(null===Xa||"1"==ba))g(nb,K,J,h,1),g(Ka,P.getTime()/36E5,J,h,1);var Xb=
    C?"&docl="+encodeURIComponent($.location.href.replace(/&/g,"#ec#")):"",B=Cb+"&p="+ka+Eb+Fb+Gb+Q+Xb+Hb+w+sa+wb+Za+"&idp="+Ia,ab=t("xtvalCZ",1);if(null!==ab){var B=B+decodeURIComponent(ab.replace(/%at1%/g,"-").replace(/%at2%/g,"_").replace(/%at3%/g,".").replace(/%at4%/g,"!").replace(/%at5%/g,"~").replace(/%at6%/g,"*").replace(/%at7%/g,"'").replace(/%at8%/g,"(").replace(/%at9%/g,")")).replace("&c=","&current=").replace("&b=","&before=").replace("&a=","&after="),bb=new Date;bb.setTime(bb.getTime()-36E5);
    g("xtvalCZ",ab,bb,h,1)}var Pb=window.Xt_id=Ab+"?",ta=t("xtide");if(null!==K)switch(Ta.toLowerCase()){case "erec":case "epr":case "es":var ua=null;try{var va=K.match(/(\[[^\]]*\])|([^\-]+)|(-)/g),xb=0,wa;for(wa in va)"-"==va[wa]&&xb++,5==xb&&"-"!=va[wa]&&(ua=va[wa])}catch(cc){ua=null}null!==ua&&(ta=ua,g("xtide",ta,G,"",1))}B+="&jv="+(x.javaEnabled()?"1":"0")+$a+xt16+(null!==ta?"&ide="+ta:"");Aa&&(B+="&lnk="+H+"&vid="+Aa);"0"!=v&&!AT_hit.isPreviewOrPrerendering()&&(AT_hit.sendTag("F"),""!==xt44&&AT_hit.sendTag("PDT",
    xt44,null,"&type=PDT&p="+ka+(a.xt_pageID?"&pid="+a.xt_pageID+"&pchap="+(a.xt_chap||"")+"&pidt="+(a.xt_pageDate||""):"")))}}0<xa&&"function"==typeof xtNodesload&&(L?a.addEventListener?a.addEventListener("load",xtNodesload,!1):a.attachEvent&&a.attachEvent("onload",xtNodesload):xtNodesload())};
window.ATWebo=function(){var b=this,k=("https:"==document.location.protocol?"https://":"http://")+"aimfr.solution.weborama.fr/fcgi-bin/dispatch.fcgi?g.wr=1&a.A=la",p={},g={},c=!1,l=!1;b.init=function(c){p=c;k+="&a.si="+p.weboAccountId+"&a.cb=ATTagWebo.callback&_="+Math.random();c=null;p.xtnocookies?(b.initInfoWebo(),g.info.message="xtnocookies",b.setXtcore()):(c=ATInternet.Utils.getCookie("atwebo"))?(g=ATInternet.Utils.parseJSON(c),b.setXtcore()):(b.initInfoWebo(),b.run())};b.update=function(){var b=
    ATInternet.Utils.getCookie("atwebo");b&&ATInternet.Utils.setCookie("atwebo",b,1800,p.xt1)};b.run=function(){var c=document.createElement("script");c.type="text/javascript";c.async=!0;c.src=k;c.onerror=b.setScriptError;(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]||document.getElementsByTagName("script")[0].parentNode).insertBefore(c,null);setTimeout(b.setTimeoutError,500)};b.initInfoWebo=function(){g.info={version:"1.0.0",accountid:p.weboAccountId,message:"",
    error:[]}};b.setDataWebo=function(b){g.data={accountid:p.weboAccountId,code:b}};b.setCookieWebo=function(){var b=ATInternet.Utils.serialJSON(g);ATInternet.Utils.setCookie("atwebo",b,1800,p.xt1);ATInternet.Utils.getCookie("atwebo")||(g.info.error.push("cookieError"),g={info:g.info})};b.setXtcore=function(){c||(window.xtcustom=window.xtcustom||{},window.xtcustom.wbo=g,window.attag=new Xtcore,c=!0)};b.setScriptError=function(){g.info.error.push("noScript");b.setCookieWebo();b.setXtcore()};b.setTimeoutError=
    function(){l=!0;c||(g.info.error.push("timeout"),b.setCookieWebo(),b.setXtcore())};b.callback=function(c){l||("string"===typeof c?0!==c.length?b.setDataWebo(c):g.info.message="noAction":g.info.error.push("codeError"),b.setCookieWebo(),b.setXtcore())}};
window.ATTvTracking=function(){var b={},k={},p={},g=!1,c=!1,l="",q="";this.init=function(n){b=n;k.info={version:"1.3.0",message:"",error:[]};l=b.tvTracking.domain?b.tvTracking.domain:b.xt1;q=b.tvTracking.path?b.tvTracking.path:"/";if(b.xtnocookies)k.info.message="xtnocookies",D();else if(ATInternet.Utils.getCookie("xttvt"))k.info.message="sessionAlreadyActive",u(),D();else if(b.tvTracking.url&&"string"===typeof b.tvTracking.url){var h;h=document.createElement("script");h.type="text/javascript";h.src=
    b.tvTracking.url;h.async=!1;h.defer=!1;h.onload=h.onreadystatechange=function(b){b=b||window.event;if("load"===b.type||/loaded|complete/.test(h.readyState)&&(!document.documentMode||9>document.documentMode))h.onload=h.onreadystatechange=h.onerror=null,c||(u(),D())};h.onerror=function(){h.onload=h.onreadystatechange=h.onerror=null;c||(k.info.error.push("noScript"),u(),D())};n=document.head||document.getElementsByTagName("head")[0];n.insertBefore(h,n.lastChild);setTimeout(function(){g||(k.info.error.push("timeout"),
    c=!0,u(),D())},500)}else k.info.message="noURLSet",u(),D()};this.update=function(){var c=ATInternet.Utils.getCookie("xttvt");c&&ATInternet.Utils.setCookie("xttvt",c,60*b.tvTracking.duration,l,q)};var u=function(){var c=window.tvtrackingcustom,g="",u=!1,A=ATInternet.Utils.getCookie("xttvtr"),D=ATInternet.Utils.getCookie("xttvt"),v="";if("undefined"!==typeof c&&"undefined"!==typeof c.channel&&"undefined"!==c.channel){var M=c.time,H;if(M&&"string"===typeof M){H=Date;var s;var L=/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/.exec(M)||
    [];if(L[1]){s=L[1].split(/\D/);for(var C=0;C<s.length;C++)s[C]=parseInt(s[C],10)||0;s[1]-=1;s=new Date(Date.UTC.apply(Date,s));s.getDate()?L[5]&&(C=60*parseInt(L[5],10),L[6]&&(C+=parseInt(L[6],10)),"+"===L[4]&&(C*=-1),C&&s.setUTCMinutes(s.getUTCMinutes()+C)):s=NaN}else s=NaN;H=new H(s);s=new Date;H=s>=H&&s-H<=6E4*b.tvTracking.retention}else H=!1;H?u=!0:k.info.error.push("timeError");k.info.message=M}else"undefined"===typeof c?k.info.error.push("noData"):"undefined"===typeof c.channel?k.info.error.push("noChannel"):
"undefined"===c.channel&&(k.info.message="channelUndefined");null!==A&&0>A.indexOf(":")&&(ATInternet.Utils.setCookie("xttvtr","",-1,l,q),A=null);if(null===D){if(u)for(var ba in c)c.hasOwnProperty(ba)&&(v+=ba+":"+encodeURIComponent(c[ba])+"#");0===b.tvTracking.priority?null!==A?(h("direct",v),h("remanent",A),g=A):(c=v,h("direct",c),aa(c)):(null!==A&&(h("remanent",A),g=A),c=v,h("direct",c),aa(c))}else g=ATInternet.Utils.getCookie("xttvt").split("##"),v=g[0],g=g[1],h("direct",v),h("remanent",g),v+="#";
    ATInternet.Utils.setCookie("xttvt",(v?v:"#")+"#"+g,60*b.tvTracking.duration,l,q);ATInternet.Utils.getCookie("xttvt")?("undefined"!==typeof p.direct&&(k.direct=p.direct),"undefined"!==typeof p.remanent&&(k.remanent=p.remanent)):k.info.error.push("cookieError")},D=function(){window.xtcustom=window.xtcustom||{};window.xtcustom.TvTracking=k;window.Xtconf.weboAccountId?(window.ATTagWebo=new ATWebo,ATTagWebo.init(window.Xtconf)):window.attag=new Xtcore;g=!0},h=function(b,c){if(""!==c){var g=c.split("#"),
    h;p[b]={};for(var k=0;k<g.length;k++)h=g[k].split(":"),""!==h[0]&&(p[b][h[0]]=decodeURIComponent(h[1]))}},aa=function(c){c&&ATInternet.Utils.setCookie("xttvtr",c,86400*b.tvTracking.lifetime,l,q)}};window.Xtconf.tvTracking&&window.Xtconf.tvTracking.active?(window.ATTagTvTracking=new ATTvTracking,ATTagTvTracking.init(window.Xtconf)):window.Xtconf.weboAccountId?(window.ATTagWebo=new ATWebo,ATTagWebo.init(window.Xtconf)):window.attag=new Xtcore;
;
(function ($) {
    $(document).ready(function () {
        var element = $('a.button[rel="next"]').get(0);
        if (element) {
            if (element.removeEventListener) element.removeEventListener('click', xtR, fA);
            else if (element.detachEvent) element.detachEvent('onclick', xtR);
        }
    });
})(jQuery);;
