/**
 * State-based routing for AngularJS
 * @version v0.2.13
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports)***REMOVED***
  module.exports = 'ui.router';
***REMOVED***

(function (window, angular, undefined) ***REMOVED***
/*jshint globalstrict:true*/
/*global angular:false*/
'use strict';

var isDefined = angular.isDefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy;

function inherit(parent, extra) ***REMOVED***
  return extend(new (extend(function() ***REMOVED******REMOVED***, ***REMOVED*** prototype: parent ***REMOVED***))(), extra);
***REMOVED***

function merge(dst) ***REMOVED***
  forEach(arguments, function(obj) ***REMOVED***
    if (obj !== dst) ***REMOVED***
      forEach(obj, function(value, key) ***REMOVED***
        if (!dst.hasOwnProperty(key)) dst[key] = value;
  ***REMOVED***);
***REMOVED***
***REMOVED***);
  return dst;
***REMOVED***

/**
 * Finds the common ancestor path between two states.
 *
 * @param ***REMOVED***Object***REMOVED*** first The first state.
 * @param ***REMOVED***Object***REMOVED*** second The second state.
 * @return ***REMOVED***Array***REMOVED*** Returns an array of state names in descending order, not including the root.
 */
function ancestors(first, second) ***REMOVED***
  var path = [];

  for (var n in first.path) ***REMOVED***
    if (first.path[n] !== second.path[n]) break;
    path.push(first.path[n]);
***REMOVED***
  return path;
***REMOVED***

/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param ***REMOVED***Object***REMOVED*** object A JavaScript object.
 * @return ***REMOVED***Array***REMOVED*** Returns the keys of the object as an array.
 */
function objectKeys(object) ***REMOVED***
  if (Object.keys) ***REMOVED***
    return Object.keys(object);
***REMOVED***
  var result = [];

  angular.forEach(object, function(val, key) ***REMOVED***
    result.push(key);
***REMOVED***);
  return result;
***REMOVED***

/**
 * IE8-safe wrapper for `Array.prototype.indexOf()`.
 *
 * @param ***REMOVED***Array***REMOVED*** array A JavaScript array.
 * @param ***REMOVED*******REMOVED*** value A value to search the array for.
 * @return ***REMOVED***Number***REMOVED*** Returns the array index value of `value`, or `-1` if not present.
 */
function indexOf(array, value) ***REMOVED***
  if (Array.prototype.indexOf) ***REMOVED***
    return array.indexOf(value, Number(arguments[2]) || 0);
***REMOVED***
  var len = array.length >>> 0, from = Number(arguments[2]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);

  if (from < 0) from += len;

  for (; from < len; from++) ***REMOVED***
    if (from in array && array[from] === value) return from;
***REMOVED***
  return -1;
***REMOVED***

/**
 * Merges a set of parameters with all parameters inherited between the common parents of the
 * current state and a given destination state.
 *
 * @param ***REMOVED***Object***REMOVED*** currentParams The value of the current state parameters ($stateParams).
 * @param ***REMOVED***Object***REMOVED*** newParams The set of parameters which will be composited with inherited params.
 * @param ***REMOVED***Object***REMOVED*** $current Internal definition of object representing the current state.
 * @param ***REMOVED***Object***REMOVED*** $to Internal definition of object representing state to transition to.
 */
function inheritParams(currentParams, newParams, $current, $to) ***REMOVED***
  var parents = ancestors($current, $to), parentParams, inherited = ***REMOVED******REMOVED***, inheritList = [];

  for (var i in parents) ***REMOVED***
    if (!parents[i].params) continue;
    parentParams = objectKeys(parents[i].params);
    if (!parentParams.length) continue;

    for (var j in parentParams) ***REMOVED***
      if (indexOf(inheritList, parentParams[j]) >= 0) continue;
      inheritList.push(parentParams[j]);
      inherited[parentParams[j]] = currentParams[parentParams[j]];
***REMOVED***
***REMOVED***
  return extend(***REMOVED******REMOVED***, inherited, newParams);
***REMOVED***

/**
 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
 *
 * @param ***REMOVED***Object***REMOVED*** a The first object.
 * @param ***REMOVED***Object***REMOVED*** b The second object.
 * @param ***REMOVED***Array***REMOVED*** keys The list of keys within each object to compare. If the list is empty or not specified,
 *                     it defaults to the list of keys in `a`.
 * @return ***REMOVED***Boolean***REMOVED*** Returns `true` if the keys match, otherwise `false`.
 */
function equalForKeys(a, b, keys) ***REMOVED***
  if (!keys) ***REMOVED***
    keys = [];
    for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
***REMOVED***

  for (var i=0; i<keys.length; i++) ***REMOVED***
    var k = keys[i];
    if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
***REMOVED***
  return true;
***REMOVED***

/**
 * Returns the subset of an object, based on a list of keys.
 *
 * @param ***REMOVED***Array***REMOVED*** keys
 * @param ***REMOVED***Object***REMOVED*** values
 * @return ***REMOVED***Boolean***REMOVED*** Returns a subset of `values`.
 */
function filterByKeys(keys, values) ***REMOVED***
  var filtered = ***REMOVED******REMOVED***;

  forEach(keys, function (name) ***REMOVED***
    filtered[name] = values[name];
***REMOVED***);
  return filtered;
***REMOVED***

// like _.indexBy
// when you know that your index values will be unique, or you want last-one-in to win
function indexBy(array, propName) ***REMOVED***
  var result = ***REMOVED******REMOVED***;
  forEach(array, function(item) ***REMOVED***
    result[item[propName]] = item;
***REMOVED***);
  return result;
***REMOVED***

// extracted from underscore.js
// Return a copy of the object only containing the whitelisted properties.
function pick(obj) ***REMOVED***
  var copy = ***REMOVED******REMOVED***;
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  forEach(keys, function(key) ***REMOVED***
    if (key in obj) copy[key] = obj[key];
***REMOVED***);
  return copy;
***REMOVED***

// extracted from underscore.js
// Return a copy of the object omitting the blacklisted properties.
function omit(obj) ***REMOVED***
  var copy = ***REMOVED******REMOVED***;
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  for (var key in obj) ***REMOVED***
    if (indexOf(keys, key) == -1) copy[key] = obj[key];
***REMOVED***
  return copy;
***REMOVED***

function pluck(collection, key) ***REMOVED***
  var result = isArray(collection) ? [] : ***REMOVED******REMOVED***;

  forEach(collection, function(val, i) ***REMOVED***
    result[i] = isFunction(key) ? key(val) : val[key];
***REMOVED***);
  return result;
***REMOVED***

function filter(collection, callback) ***REMOVED***
  var array = isArray(collection);
  var result = array ? [] : ***REMOVED******REMOVED***;
  forEach(collection, function(val, i) ***REMOVED***
    if (callback(val, i)) ***REMOVED***
      result[array ? result.length : i] = val;
***REMOVED***
***REMOVED***);
  return result;
***REMOVED***

function map(collection, callback) ***REMOVED***
  var result = isArray(collection) ? [] : ***REMOVED******REMOVED***;

  forEach(collection, function(val, i) ***REMOVED***
    result[i] = callback(val, i);
***REMOVED***);
  return result;
***REMOVED***

/**
 * @ngdoc overview
 * @name ui.router.util
 *
 * @description
 * # ui.router.util sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use ***REMOVED***@link ui.router***REMOVED*** module instead).
 *
 */
angular.module('ui.router.util', ['ng']);

/**
 * @ngdoc overview
 * @name ui.router.router
 * 
 * @requires ui.router.util
 *
 * @description
 * # ui.router.router sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use ***REMOVED***@link ui.router***REMOVED*** module instead).
 */
angular.module('ui.router.router', ['ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router.state
 * 
 * @requires ui.router.router
 * @requires ui.router.util
 *
 * @description
 * # ui.router.state sub-module
 *
 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
 * in your angular app (use ***REMOVED***@link ui.router***REMOVED*** module instead).
 * 
 */
angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router
 *
 * @requires ui.router.state
 *
 * @description
 * # ui.router
 * 
 * ## The main module for ui.router 
 * There are several sub-modules included with the ui.router module, however only this module is needed
 * as a dependency within your angular app. The other modules are for organization purposes. 
 *
 * The modules are:
 * * ui.router - the main "umbrella" module
 * * ui.router.router - 
 * 
 * *You'll need to include **only** this module as the dependency within your angular app.*
 * 
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/angular.js"></script>
 *   <!-- Include the ui-router script -->
 *   <script src="js/angular-ui-router.min.js"></script>
 *   <script>
 *     // ...and add 'ui.router' as a dependency
 *     var myApp = angular.module('myApp', ['ui.router']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
angular.module('ui.router', ['ui.router.state']);

angular.module('ui.router.compat', ['ui.router']);

/**
 * @ngdoc object
 * @name ui.router.util.$resolve
 *
 * @requires $q
 * @requires $injector
 *
 * @description
 * Manages resolution of (acyclic) graphs of promises.
 */
$Resolve.$inject = ['$q', '$injector'];
function $Resolve(  $q,    $injector) ***REMOVED***
  
  var VISIT_IN_PROGRESS = 1,
      VISIT_DONE = 2,
      NOTHING = ***REMOVED******REMOVED***,
      NO_DEPENDENCIES = [],
      NO_LOCALS = NOTHING,
      NO_PARENT = extend($q.when(NOTHING), ***REMOVED*** $$promises: NOTHING, $$values: NOTHING ***REMOVED***);
  

  /**
   * @ngdoc function
   * @name ui.router.util.$resolve#study
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Studies a set of invocables that are likely to be used multiple times.
   * <pre>
   * $resolve.study(invocables)(locals, parent, self)
   * </pre>
   * is equivalent to
   * <pre>
   * $resolve.resolve(invocables, locals, parent, self)
   * </pre>
   * but the former is more efficient (in fact `resolve` just calls `study` 
   * internally).
   *
   * @param ***REMOVED***object***REMOVED*** invocables Invocable objects
   * @return ***REMOVED***function***REMOVED*** a function to pass in locals, parent and self
   */
  this.study = function (invocables) ***REMOVED***
    if (!isObject(invocables)) throw new Error("'invocables' must be an object");
    var invocableKeys = objectKeys(invocables || ***REMOVED******REMOVED***);
    
    // Perform a topological sort of invocables to build an ordered plan
    var plan = [], cycle = [], visited = ***REMOVED******REMOVED***;
    function visit(value, key) ***REMOVED***
      if (visited[key] === VISIT_DONE) return;
      
      cycle.push(key);
      if (visited[key] === VISIT_IN_PROGRESS) ***REMOVED***
        cycle.splice(0, indexOf(cycle, key));
        throw new Error("Cyclic dependency: " + cycle.join(" -> "));
  ***REMOVED***
      visited[key] = VISIT_IN_PROGRESS;
      
      if (isString(value)) ***REMOVED***
        plan.push(key, [ function() ***REMOVED*** return $injector.get(value); ***REMOVED***], NO_DEPENDENCIES);
  ***REMOVED*** else ***REMOVED***
        var params = $injector.annotate(value);
        forEach(params, function (param) ***REMOVED***
          if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);
    ***REMOVED***);
        plan.push(key, value, params);
  ***REMOVED***
      
      cycle.pop();
      visited[key] = VISIT_DONE;
***REMOVED***
    forEach(invocables, visit);
    invocables = cycle = visited = null; // plan is all that's required
    
    function isResolve(value) ***REMOVED***
      return isObject(value) && value.then && value.$$promises;
***REMOVED***
    
    return function (locals, parent, self) ***REMOVED***
      if (isResolve(locals) && self === undefined) ***REMOVED***
        self = parent; parent = locals; locals = null;
  ***REMOVED***
      if (!locals) locals = NO_LOCALS;
      else if (!isObject(locals)) ***REMOVED***
        throw new Error("'locals' must be an object");
  ***REMOVED***       
      if (!parent) parent = NO_PARENT;
      else if (!isResolve(parent)) ***REMOVED***
        throw new Error("'parent' must be a promise returned by $resolve.resolve()");
  ***REMOVED***
      
      // To complete the overall resolution, we have to wait for the parent
      // promise and for the promise for each invokable in our plan.
      var resolution = $q.defer(),
          result = resolution.promise,
          promises = result.$$promises = ***REMOVED******REMOVED***,
          values = extend(***REMOVED******REMOVED***, locals),
          wait = 1 + plan.length/3,
          merged = false;
          
      function done() ***REMOVED***
        // Merge parent values we haven't got yet and publish our own $$values
        if (!--wait) ***REMOVED***
          if (!merged) merge(values, parent.$$values); 
          result.$$values = values;
          result.$$promises = result.$$promises || true; // keep for isResolve()
          delete result.$$inheritedValues;
          resolution.resolve(values);
    ***REMOVED***
  ***REMOVED***
      
      function fail(reason) ***REMOVED***
        result.$$failure = reason;
        resolution.reject(reason);
  ***REMOVED***

      // Short-circuit if parent has already failed
      if (isDefined(parent.$$failure)) ***REMOVED***
        fail(parent.$$failure);
        return result;
  ***REMOVED***
      
      if (parent.$$inheritedValues) ***REMOVED***
        merge(values, omit(parent.$$inheritedValues, invocableKeys));
  ***REMOVED***

      // Merge parent values if the parent has already resolved, or merge
      // parent promises and wait if the parent resolve is still in progress.
      extend(promises, parent.$$promises);
      if (parent.$$values) ***REMOVED***
        merged = merge(values, omit(parent.$$values, invocableKeys));
        result.$$inheritedValues = omit(parent.$$values, invocableKeys);
        done();
  ***REMOVED*** else ***REMOVED***
        if (parent.$$inheritedValues) ***REMOVED***
          result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys);
    ***REMOVED***        
        parent.then(done, fail);
  ***REMOVED***
      
      // Process each invocable in the plan, but ignore any where a local of the same name exists.
      for (var i=0, ii=plan.length; i<ii; i+=3) ***REMOVED***
        if (locals.hasOwnProperty(plan[i])) done();
        else invoke(plan[i], plan[i+1], plan[i+2]);
  ***REMOVED***
      
      function invoke(key, invocable, params) ***REMOVED***
        // Create a deferred for this invocation. Failures will propagate to the resolution as well.
        var invocation = $q.defer(), waitParams = 0;
        function onfailure(reason) ***REMOVED***
          invocation.reject(reason);
          fail(reason);
    ***REMOVED***
        // Wait for any parameter that we have a promise for (either from parent or from this
        // resolve; in that case study() will have made sure it's ordered before us in the plan).
        forEach(params, function (dep) ***REMOVED***
          if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) ***REMOVED***
            waitParams++;
            promises[dep].then(function (result) ***REMOVED***
              values[dep] = result;
              if (!(--waitParams)) proceed();
        ***REMOVED***, onfailure);
      ***REMOVED***
    ***REMOVED***);
        if (!waitParams) proceed();
        function proceed() ***REMOVED***
          if (isDefined(result.$$failure)) return;
          try ***REMOVED***
            invocation.resolve($injector.invoke(invocable, self, values));
            invocation.promise.then(function (result) ***REMOVED***
              values[key] = result;
              done();
        ***REMOVED***, onfailure);
      ***REMOVED*** catch (e) ***REMOVED***
            onfailure(e);
      ***REMOVED***
    ***REMOVED***
        // Publish promise synchronously; invocations further down in the plan may depend on it.
        promises[key] = invocation.promise;
  ***REMOVED***
      
      return result;
***REMOVED***;
***REMOVED***;
  
  /**
   * @ngdoc function
   * @name ui.router.util.$resolve#resolve
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Resolves a set of invocables. An invocable is a function to be invoked via 
   * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
   * An invocable can either return a value directly,
   * or a `$q` promise. If a promise is returned it will be resolved and the 
   * resulting value will be used instead. Dependencies of invocables are resolved 
   * (in this order of precedence)
   *
   * - from the specified `locals`
   * - from another invocable that is part of this `$resolve` call
   * - from an invocable that is inherited from a `parent` call to `$resolve` 
   *   (or recursively
   * - from any ancestor `$resolve` of that parent).
   *
   * The return value of `$resolve` is a promise for an object that contains 
   * (in this order of precedence)
   *
   * - any `locals` (if specified)
   * - the resolved return values of all injectables
   * - any values inherited from a `parent` call to `$resolve` (if specified)
   *
   * The promise will resolve after the `parent` promise (if any) and all promises 
   * returned by injectables have been resolved. If any invocable 
   * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
   * invocable is rejected, the `$resolve` promise is immediately rejected with the 
   * same error. A rejection of a `parent` promise (if specified) will likewise be 
   * propagated immediately. Once the `$resolve` promise has been rejected, no 
   * further invocables will be called.
   * 
   * Cyclic dependencies between invocables are not permitted and will caues `$resolve`
   * to throw an error. As a special case, an injectable can depend on a parameter 
   * with the same name as the injectable, which will be fulfilled from the `parent` 
   * injectable of the same name. This allows inherited values to be decorated. 
   * Note that in this case any other injectable in the same `$resolve` with the same
   * dependency would see the decorated value, not the inherited value.
   *
   * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
   * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
   * exception.
   *
   * Invocables are invoked eagerly as soon as all dependencies are available. 
   * This is true even for dependencies inherited from a `parent` call to `$resolve`.
   *
   * As a special case, an invocable can be a string, in which case it is taken to 
   * be a service name to be passed to `$injector.get()`. This is supported primarily 
   * for backwards-compatibility with the `resolve` property of `$routeProvider` 
   * routes.
   *
   * @param ***REMOVED***object***REMOVED*** invocables functions to invoke or 
   * `$injector` services to fetch.
   * @param ***REMOVED***object***REMOVED*** locals  values to make available to the injectables
   * @param ***REMOVED***object***REMOVED*** parent  a promise returned by another call to `$resolve`.
   * @param ***REMOVED***object***REMOVED*** self  the `this` for the invoked methods
   * @return ***REMOVED***object***REMOVED*** Promise for an object that contains the resolved return value
   * of all invocables, as well as any inherited and local values.
   */
  this.resolve = function (invocables, locals, parent, self) ***REMOVED***
    return this.study(invocables)(locals, parent, self);
***REMOVED***;
***REMOVED***

angular.module('ui.router.util').service('$resolve', $Resolve);


/**
 * @ngdoc object
 * @name ui.router.util.$templateFactory
 *
 * @requires $http
 * @requires $templateCache
 * @requires $injector
 *
 * @description
 * Service. Manages loading of templates.
 */
$TemplateFactory.$inject = ['$http', '$templateCache', '$injector'];
function $TemplateFactory(  $http,   $templateCache,   $injector) ***REMOVED***

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromConfig
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a configuration object. 
   *
   * @param ***REMOVED***object***REMOVED*** config Configuration object for which to load a template. 
   * The following properties are search in the specified order, and the first one 
   * that is defined is used to create the template:
   *
   * @param ***REMOVED***string|object***REMOVED*** config.template html string template or function to 
   * load via ***REMOVED***@link ui.router.util.$templateFactory#fromString fromString***REMOVED***.
   * @param ***REMOVED***string|object***REMOVED*** config.templateUrl url to load or a function returning 
   * the url to load via ***REMOVED***@link ui.router.util.$templateFactory#fromUrl fromUrl***REMOVED***.
   * @param ***REMOVED***Function***REMOVED*** config.templateProvider function to invoke via 
   * ***REMOVED***@link ui.router.util.$templateFactory#fromProvider fromProvider***REMOVED***.
   * @param ***REMOVED***object***REMOVED*** params  Parameters to pass to the template function.
   * @param ***REMOVED***object***REMOVED*** locals Locals to pass to `invoke` if the template is loaded 
   * via a `templateProvider`. Defaults to `***REMOVED*** params: params ***REMOVED***`.
   *
   * @return ***REMOVED***string|object***REMOVED***  The template html as a string, or a promise for 
   * that string,or `null` if no template is configured.
   */
  this.fromConfig = function (config, params, locals) ***REMOVED***
    return (
      isDefined(config.template) ? this.fromString(config.template, params) :
      isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
      isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) :
      null
    );
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromString
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a string or a function returning a string.
   *
   * @param ***REMOVED***string|object***REMOVED*** template html template as a string or function that 
   * returns an html template as a string.
   * @param ***REMOVED***object***REMOVED*** params Parameters to pass to the template function.
   *
   * @return ***REMOVED***string|object***REMOVED*** The template html as a string, or a promise for that 
   * string.
   */
  this.fromString = function (template, params) ***REMOVED***
    return isFunction(template) ? template(params) : template;
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromUrl
   * @methodOf ui.router.util.$templateFactory
   * 
   * @description
   * Loads a template from the a URL via `$http` and `$templateCache`.
   *
   * @param ***REMOVED***string|Function***REMOVED*** url url of the template to load, or a function 
   * that returns a url.
   * @param ***REMOVED***Object***REMOVED*** params Parameters to pass to the url function.
   * @return ***REMOVED***string|Promise.<string>***REMOVED*** The template html as a string, or a promise 
   * for that string.
   */
  this.fromUrl = function (url, params) ***REMOVED***
    if (isFunction(url)) url = url(params);
    if (url == null) return null;
    else return $http
        .get(url, ***REMOVED*** cache: $templateCache, headers: ***REMOVED*** Accept: 'text/html' ***REMOVED******REMOVED***)
        .then(function(response) ***REMOVED*** return response.data; ***REMOVED***);
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromProvider
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template by invoking an injectable provider function.
   *
   * @param ***REMOVED***Function***REMOVED*** provider Function to invoke via `$injector.invoke`
   * @param ***REMOVED***Object***REMOVED*** params Parameters for the template.
   * @param ***REMOVED***Object***REMOVED*** locals Locals to pass to `invoke`. Defaults to 
   * `***REMOVED*** params: params ***REMOVED***`.
   * @return ***REMOVED***string|Promise.<string>***REMOVED*** The template html as a string, or a promise 
   * for that string.
   */
  this.fromProvider = function (provider, params, locals) ***REMOVED***
    return $injector.invoke(provider, null, locals || ***REMOVED*** params: params ***REMOVED***);
***REMOVED***;
***REMOVED***

angular.module('ui.router.util').service('$templateFactory', $TemplateFactory);

var $$UMFP; // reference to $UrlMatcherFactoryProvider

/**
 * @ngdoc object
 * @name ui.router.util.type:UrlMatcher
 *
 * @description
 * Matches URLs against patterns and extracts named parameters from the path or the search
 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
 * do not influence whether or not a URL is matched, but their values are passed through into
 * the matched parameters returned by ***REMOVED***@link ui.router.util.type:UrlMatcher#methods_exec exec***REMOVED***.
 * 
 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
 * syntax, which optionally allows a regular expression for the parameter to be specified:
 *
 * * `':'` name - colon placeholder
 * * `'*'` name - catch-all placeholder
 * * `'***REMOVED***' name '***REMOVED***'` - curly placeholder
 * * `'***REMOVED***' name ':' regexp|type '***REMOVED***'` - curly placeholder with regexp or type name. Should the
 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
 *
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
 * must be unique within the pattern (across both path and search parameters). For colon 
 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
 * number of characters other than '/'. For catch-all placeholders the path parameter matches
 * any number of characters.
 * 
 * Examples:
 * 
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
 * * `'/user/***REMOVED***id***REMOVED***'` - Same as the previous example, but using curly brace syntax.
 * * `'/user/***REMOVED***id:[^/]****REMOVED***'` - Same as the previous example.
 * * `'/user/***REMOVED***id:[0-9a-fA-F]***REMOVED***1,8***REMOVED******REMOVED***'` - Similar to the previous example, but only matches if the id
 *   parameter consists of 1 to 8 hex digits.
 * * `'/files/***REMOVED***path:.****REMOVED***'` - Matches any URL starting with '/files/' and captures the rest of the
 *   path into the parameter 'path'.
 * * `'/files/*path'` - ditto.
 * * `'/calendar/***REMOVED***start:date***REMOVED***'` - Matches "/calendar/2014-11-12" (because the pattern defined
 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
 *
 * @param ***REMOVED***string***REMOVED*** pattern  The pattern to compile into a matcher.
 * @param ***REMOVED***Object***REMOVED*** config  A configuration object hash:
 * @param ***REMOVED***Object=***REMOVED*** parentMatcher Used to concatenate the pattern/config onto
 *   an existing UrlMatcher
 *
 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
 *
 * @property ***REMOVED***string***REMOVED*** prefix  A static prefix of this pattern. The matcher guarantees that any
 *   URL matching this matcher (i.e. any string for which ***REMOVED***@link ui.router.util.type:UrlMatcher#methods_exec exec()***REMOVED*** returns
 *   non-null) will start with this prefix.
 *
 * @property ***REMOVED***string***REMOVED*** source  The pattern that was passed into the constructor
 *
 * @property ***REMOVED***string***REMOVED*** sourcePath  The path portion of the source property
 *
 * @property ***REMOVED***string***REMOVED*** sourceSearch  The search portion of the source property
 *
 * @property ***REMOVED***string***REMOVED*** regex  The constructed regex that will be used to match against the url when 
 *   it is time to determine which url will match.
 *
 * @returns ***REMOVED***Object***REMOVED***  New `UrlMatcher` object
 */
function UrlMatcher(pattern, config, parentMatcher) ***REMOVED***
  config = extend(***REMOVED*** params: ***REMOVED******REMOVED*** ***REMOVED***, isObject(config) ? config : ***REMOVED******REMOVED***);

  // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
  //   '*' name
  //   ':' name
  //   '***REMOVED***' name '***REMOVED***'
  //   '***REMOVED***' name ':' regexp '***REMOVED***'
  // The regular expression is somewhat complicated due to the need to allow curly braces
  // inside the regular expression. The placeholder regexp breaks down as follows:
  //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
  //    \***REMOVED***([\w\[\]]+)(?:\:( ... ))?\***REMOVED***  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
  //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
  //    [^***REMOVED******REMOVED***\\]+                       - anything other than curly braces or backslash
  //    \\.                            - a backslash escape
  //    \***REMOVED***(?:[^***REMOVED******REMOVED***\\]+|\\.)*\***REMOVED***          - a matched set of curly braces containing other atoms
  var placeholder       = /([:*])([\w\[\]]+)|\***REMOVED***([\w\[\]]+)(?:\:((?:[^***REMOVED******REMOVED***\\]+|\\.|\***REMOVED***(?:[^***REMOVED******REMOVED***\\]+|\\.)*\***REMOVED***)+))?\***REMOVED***/g,
      searchPlaceholder = /([:]?)([\w\[\]-]+)|\***REMOVED***([\w\[\]-]+)(?:\:((?:[^***REMOVED******REMOVED***\\]+|\\.|\***REMOVED***(?:[^***REMOVED******REMOVED***\\]+|\\.)*\***REMOVED***)+))?\***REMOVED***/g,
      compiled = '^', last = 0, m,
      segments = this.segments = [],
      parentParams = parentMatcher ? parentMatcher.params : ***REMOVED******REMOVED***,
      params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet(),
      paramNames = [];

  function addParameter(id, type, config, location) ***REMOVED***
    paramNames.push(id);
    if (parentParams[id]) return parentParams[id];
    if (!/^\w+(-+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
    if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
    params[id] = new $$UMFP.Param(id, type, config, location);
    return params[id];
***REMOVED***

  function quoteRegExp(string, pattern, squash) ***REMOVED***
    var surroundPattern = ['',''], result = string.replace(/[\\\[\]\^$*+?.()|***REMOVED******REMOVED***]/g, "\\$&");
    if (!pattern) return result;
    switch(squash) ***REMOVED***
      case false: surroundPattern = ['(', ')'];   break;
      case true:  surroundPattern = ['?(', ')?']; break;
      default:    surroundPattern = ['(' + squash + "|", ')?'];  break;
***REMOVED***
    return result + surroundPattern[0] + pattern + surroundPattern[1];
***REMOVED***

  this.source = pattern;

  // Split into static segments separated by path parameter placeholders.
  // The number of segments is always 1 more than the number of parameters.
  function matchDetails(m, isSearch) ***REMOVED***
    var id, regexp, segment, type, cfg, arrayMode;
    id          = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null
    cfg         = config.params[id];
    segment     = pattern.substring(last, m.index);
    regexp      = isSearch ? m[4] : m[4] || (m[1] == '*' ? '.*' : null);
    type        = $$UMFP.type(regexp || "string") || inherit($$UMFP.type("string"), ***REMOVED*** pattern: new RegExp(regexp) ***REMOVED***);
    return ***REMOVED***
      id: id, regexp: regexp, segment: segment, type: type, cfg: cfg
***REMOVED***;
***REMOVED***

  var p, param, segment;
  while ((m = placeholder.exec(pattern))) ***REMOVED***
    p = matchDetails(m, false);
    if (p.segment.indexOf('?') >= 0) break; // we're into the search part

    param = addParameter(p.id, p.type, p.cfg, "path");
    compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash);
    segments.push(p.segment);
    last = placeholder.lastIndex;
***REMOVED***
  segment = pattern.substring(last);

  // Find any search parameter names and remove them from the last segment
  var i = segment.indexOf('?');

  if (i >= 0) ***REMOVED***
    var search = this.sourceSearch = segment.substring(i);
    segment = segment.substring(0, i);
    this.sourcePath = pattern.substring(0, last + i);

    if (search.length > 0) ***REMOVED***
      last = 0;
      while ((m = searchPlaceholder.exec(search))) ***REMOVED***
        p = matchDetails(m, true);
        param = addParameter(p.id, p.type, p.cfg, "search");
        last = placeholder.lastIndex;
        // check if ?&
  ***REMOVED***
***REMOVED***
***REMOVED*** else ***REMOVED***
    this.sourcePath = pattern;
    this.sourceSearch = '';
***REMOVED***

  compiled += quoteRegExp(segment) + (config.strict === false ? '\/?' : '') + '$';
  segments.push(segment);

  this.regexp = new RegExp(compiled, config.caseInsensitive ? 'i' : undefined);
  this.prefix = segments[0];
  this.$$paramNames = paramNames;
***REMOVED***

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#concat
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns a new matcher for a pattern constructed by appending the path part and adding the
 * search parameters of the specified pattern to this pattern. The current pattern is not
 * modified. This can be understood as creating a pattern for URLs that are relative to (or
 * suffixes of) the current pattern.
 *
 * @example
 * The following two matchers are equivalent:
 * <pre>
 * new UrlMatcher('/user/***REMOVED***id***REMOVED***?q').concat('/details?date');
 * new UrlMatcher('/user/***REMOVED***id***REMOVED***/details?q&date');
 * </pre>
 *
 * @param ***REMOVED***string***REMOVED*** pattern  The pattern to append.
 * @param ***REMOVED***Object***REMOVED*** config  An object hash of the configuration for the matcher.
 * @returns ***REMOVED***UrlMatcher***REMOVED***  A matcher for the concatenated pattern.
 */
UrlMatcher.prototype.concat = function (pattern, config) ***REMOVED***
  // Because order of search parameters is irrelevant, we can add our own search
  // parameters to the end of the new pattern. Parse the new pattern by itself
  // and then join the bits together, but it's much easier to do this on a string level.
  var defaultConfig = ***REMOVED***
    caseInsensitive: $$UMFP.caseInsensitive(),
    strict: $$UMFP.strictMode(),
    squash: $$UMFP.defaultSquashPolicy()
***REMOVED***;
  return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this);
***REMOVED***;

UrlMatcher.prototype.toString = function () ***REMOVED***
  return this.source;
***REMOVED***;

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#exec
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Tests the specified path against this matcher, and returns an object containing the captured
 * parameter values, or null if the path does not match. The returned object contains the values
 * of any search parameters that are mentioned in the pattern, but their value may be null if
 * they are not present in `searchParams`. This means that search parameters are always treated
 * as optional.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/***REMOVED***id***REMOVED***?q&r').exec('/user/bob', ***REMOVED***
 *   x: '1', q: 'hello'
 * ***REMOVED***);
 * // returns ***REMOVED*** id: 'bob', q: 'hello', r: null ***REMOVED***
 * </pre>
 *
 * @param ***REMOVED***string***REMOVED*** path  The URL path to match, e.g. `$location.path()`.
 * @param ***REMOVED***Object***REMOVED*** searchParams  URL search parameters, e.g. `$location.search()`.
 * @returns ***REMOVED***Object***REMOVED***  The captured parameter values.
 */
UrlMatcher.prototype.exec = function (path, searchParams) ***REMOVED***
  var m = this.regexp.exec(path);
  if (!m) return null;
  searchParams = searchParams || ***REMOVED******REMOVED***;

  var paramNames = this.parameters(), nTotal = paramNames.length,
    nPath = this.segments.length - 1,
    values = ***REMOVED******REMOVED***, i, j, cfg, paramName;

  if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");

  function decodePathArray(string) ***REMOVED***
    function reverseString(str) ***REMOVED*** return str.split("").reverse().join(""); ***REMOVED***
    function unquoteDashes(str) ***REMOVED*** return str.replace(/\\-/, "-"); ***REMOVED***

    var split = reverseString(string).split(/-(?!\\)/);
    var allReversed = map(split, reverseString);
    return map(allReversed, unquoteDashes).reverse();
***REMOVED***

  for (i = 0; i < nPath; i++) ***REMOVED***
    paramName = paramNames[i];
    var param = this.params[paramName];
    var paramVal = m[i+1];
    // if the param value matches a pre-replace pair, replace the value before decoding.
    for (j = 0; j < param.replace; j++) ***REMOVED***
      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
***REMOVED***
    if (paramVal && param.array === true) paramVal = decodePathArray(paramVal);
    values[paramName] = param.value(paramVal);
***REMOVED***
  for (/**/; i < nTotal; i++) ***REMOVED***
    paramName = paramNames[i];
    values[paramName] = this.params[paramName].value(searchParams[paramName]);
***REMOVED***

  return values;
***REMOVED***;

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#parameters
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns the names of all path and search parameters of this pattern in an unspecified order.
 * 
 * @returns ***REMOVED***Array.<string>***REMOVED***  An array of parameter names. Must be treated as read-only. If the
 *    pattern has no parameters, an empty array is returned.
 */
UrlMatcher.prototype.parameters = function (param) ***REMOVED***
  if (!isDefined(param)) return this.$$paramNames;
  return this.params[param] || null;
***REMOVED***;

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#validate
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Checks an object hash of parameters to validate their correctness according to the parameter
 * types of this `UrlMatcher`.
 *
 * @param ***REMOVED***Object***REMOVED*** params The object hash of parameters to validate.
 * @returns ***REMOVED***boolean***REMOVED*** Returns `true` if `params` validates, otherwise `false`.
 */
UrlMatcher.prototype.validates = function (params) ***REMOVED***
  return this.params.$$validates(params);
***REMOVED***;

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#format
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Creates a URL that matches this pattern by substituting the specified values
 * for the path and search parameters. Null values for path parameters are
 * treated as empty strings.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/***REMOVED***id***REMOVED***?q').format(***REMOVED*** id:'bob', q:'yes' ***REMOVED***);
 * // returns '/user/bob?q=yes'
 * </pre>
 *
 * @param ***REMOVED***Object***REMOVED*** values  the values to substitute for the parameters in this pattern.
 * @returns ***REMOVED***string***REMOVED***  the formatted URL (path and optionally search part).
 */
UrlMatcher.prototype.format = function (values) ***REMOVED***
  values = values || ***REMOVED******REMOVED***;
  var segments = this.segments, params = this.parameters(), paramset = this.params;
  if (!this.validates(values)) return null;

  var i, search = false, nPath = segments.length - 1, nTotal = params.length, result = segments[0];

  function encodeDashes(str) ***REMOVED*** // Replace dashes with encoded "\-"
    return encodeURIComponent(str).replace(/-/g, function(c) ***REMOVED*** return '%5C%' + c.charCodeAt(0).toString(16).toUpperCase(); ***REMOVED***);
***REMOVED***

  for (i = 0; i < nTotal; i++) ***REMOVED***
    var isPathParam = i < nPath;
    var name = params[i], param = paramset[name], value = param.value(values[name]);
    var isDefaultValue = param.isOptional && param.type.equals(param.value(), value);
    var squash = isDefaultValue ? param.squash : false;
    var encoded = param.type.encode(value);

    if (isPathParam) ***REMOVED***
      var nextSegment = segments[i + 1];
      if (squash === false) ***REMOVED***
        if (encoded != null) ***REMOVED***
          if (isArray(encoded)) ***REMOVED***
            result += map(encoded, encodeDashes).join("-");
      ***REMOVED*** else ***REMOVED***
            result += encodeURIComponent(encoded);
      ***REMOVED***
    ***REMOVED***
        result += nextSegment;
  ***REMOVED*** else if (squash === true) ***REMOVED***
        var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
        result += nextSegment.match(capture)[1];
  ***REMOVED*** else if (isString(squash)) ***REMOVED***
        result += squash + nextSegment;
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      if (encoded == null || (isDefaultValue && squash !== false)) continue;
      if (!isArray(encoded)) encoded = [ encoded ];
      encoded = map(encoded, encodeURIComponent).join('&' + name + '=');
      result += (search ? '&' : '?') + (name + '=' + encoded);
      search = true;
***REMOVED***
***REMOVED***

  return result;
***REMOVED***;

/**
 * @ngdoc object
 * @name ui.router.util.type:Type
 *
 * @description
 * Implements an interface to define custom parameter types that can be decoded from and encoded to
 * string parameters matched in a URL. Used by ***REMOVED***@link ui.router.util.type:UrlMatcher `UrlMatcher`***REMOVED***
 * objects when matching or formatting URLs, or comparing or validating parameter values.
 *
 * See ***REMOVED***@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`***REMOVED*** for more
 * information on registering custom types.
 *
 * @param ***REMOVED***Object***REMOVED*** config  A configuration object which contains the custom type definition.  The object's
 *        properties will override the default methods and/or pattern in `Type`'s public interface.
 * @example
 * <pre>
 * ***REMOVED***
 *   decode: function(val) ***REMOVED*** return parseInt(val, 10); ***REMOVED***,
 *   encode: function(val) ***REMOVED*** return val && val.toString(); ***REMOVED***,
 *   equals: function(a, b) ***REMOVED*** return this.is(a) && a === b; ***REMOVED***,
 *   is: function(val) ***REMOVED*** return angular.isNumber(val) isFinite(val) && val % 1 === 0; ***REMOVED***,
 *   pattern: /\d+/
 * ***REMOVED***
 * </pre>
 *
 * @property ***REMOVED***RegExp***REMOVED*** pattern The regular expression pattern used to match values of this type when
 *           coming from a substring of a URL.
 *
 * @returns ***REMOVED***Object***REMOVED***  Returns a new `Type` object.
 */
function Type(config) ***REMOVED***
  extend(this, config);
***REMOVED***

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#is
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Detects whether a value is of a particular type. Accepts a native (decoded) value
 * and determines whether it matches the current `Type` object.
 *
 * @param ***REMOVED*******REMOVED*** val  The value to check.
 * @param ***REMOVED***string***REMOVED*** key  Optional. If the type check is happening in the context of a specific
 *        ***REMOVED***@link ui.router.util.type:UrlMatcher `UrlMatcher`***REMOVED*** object, this is the name of the
 *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.
 * @returns ***REMOVED***Boolean***REMOVED***  Returns `true` if the value matches the type, otherwise `false`.
 */
Type.prototype.is = function(val, key) ***REMOVED***
  return true;
***REMOVED***;

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#encode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the
 * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it
 * only needs to be a representation of `val` that has been coerced to a string.
 *
 * @param ***REMOVED*******REMOVED*** val  The value to encode.
 * @param ***REMOVED***string***REMOVED*** key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns ***REMOVED***string***REMOVED***  Returns a string representation of `val` that can be encoded in a URL.
 */
Type.prototype.encode = function(val, key) ***REMOVED***
  return val;
***REMOVED***;

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#decode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Converts a parameter value (from URL string or transition param) to a custom/native value.
 *
 * @param ***REMOVED***string***REMOVED*** val  The URL parameter value to decode.
 * @param ***REMOVED***string***REMOVED*** key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns ***REMOVED*******REMOVED***  Returns a custom representation of the URL parameter value.
 */
Type.prototype.decode = function(val, key) ***REMOVED***
  return val;
***REMOVED***;

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#equals
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Determines whether two decoded values are equivalent.
 *
 * @param ***REMOVED*******REMOVED*** a  A value to compare against.
 * @param ***REMOVED*******REMOVED*** b  A value to compare against.
 * @returns ***REMOVED***Boolean***REMOVED***  Returns `true` if the values are equivalent/equal, otherwise `false`.
 */
Type.prototype.equals = function(a, b) ***REMOVED***
  return a == b;
***REMOVED***;

Type.prototype.$subPattern = function() ***REMOVED***
  var sub = this.pattern.toString();
  return sub.substr(1, sub.length - 2);
***REMOVED***;

Type.prototype.pattern = /.*/;

Type.prototype.toString = function() ***REMOVED*** return "***REMOVED***Type:" + this.name + "***REMOVED***"; ***REMOVED***;

/*
 * Wraps an existing custom Type as an array of Type, depending on 'mode'.
 * e.g.:
 * - urlmatcher pattern "/path?***REMOVED***queryParam[]:int***REMOVED***"
 * - url: "/path?queryParam=1&queryParam=2
 * - $stateParams.queryParam will be [1, 2]
 * if `mode` is "auto", then
 * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
 * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
 */
Type.prototype.$asArray = function(mode, isSearch) ***REMOVED***
  if (!mode) return this;
  if (mode === "auto" && !isSearch) throw new Error("'auto' array mode is for query parameters only");
  return new ArrayType(this, mode);

  function ArrayType(type, mode) ***REMOVED***
    function bindTo(type, callbackName) ***REMOVED***
      return function() ***REMOVED***
        return type[callbackName].apply(type, arguments);
  ***REMOVED***;
***REMOVED***

    // Wrap non-array value as array
    function arrayWrap(val) ***REMOVED*** return isArray(val) ? val : (isDefined(val) ? [ val ] : []); ***REMOVED***
    // Unwrap array value for "auto" mode. Return undefined for empty array.
    function arrayUnwrap(val) ***REMOVED***
      switch(val.length) ***REMOVED***
        case 0: return undefined;
        case 1: return mode === "auto" ? val[0] : val;
        default: return val;
  ***REMOVED***
***REMOVED***
    function falsey(val) ***REMOVED*** return !val; ***REMOVED***

    // Wraps type (.is/.encode/.decode) functions to operate on each value of an array
    function arrayHandler(callback, allTruthyMode) ***REMOVED***
      return function handleArray(val) ***REMOVED***
        val = arrayWrap(val);
        var result = map(val, callback);
        if (allTruthyMode === true)
          return filter(result, falsey).length === 0;
        return arrayUnwrap(result);
  ***REMOVED***;
***REMOVED***

    // Wraps type (.equals) functions to operate on each value of an array
    function arrayEqualsHandler(callback) ***REMOVED***
      return function handleArray(val1, val2) ***REMOVED***
        var left = arrayWrap(val1), right = arrayWrap(val2);
        if (left.length !== right.length) return false;
        for (var i = 0; i < left.length; i++) ***REMOVED***
          if (!callback(left[i], right[i])) return false;
    ***REMOVED***
        return true;
  ***REMOVED***;
***REMOVED***

    this.encode = arrayHandler(bindTo(type, 'encode'));
    this.decode = arrayHandler(bindTo(type, 'decode'));
    this.is     = arrayHandler(bindTo(type, 'is'), true);
    this.equals = arrayEqualsHandler(bindTo(type, 'equals'));
    this.pattern = type.pattern;
    this.$arrayMode = mode;
***REMOVED***
***REMOVED***;



/**
 * @ngdoc object
 * @name ui.router.util.$urlMatcherFactory
 *
 * @description
 * Factory for ***REMOVED***@link ui.router.util.type:UrlMatcher `UrlMatcher`***REMOVED*** instances. The factory
 * is also available to providers under the name `$urlMatcherFactoryProvider`.
 */
function $UrlMatcherFactory() ***REMOVED***
  $$UMFP = this;

  var isCaseInsensitive = false, isStrictMode = true, defaultSquashPolicy = false;

  function valToString(val) ***REMOVED*** return val != null ? val.toString().replace(/\//g, "%2F") : val; ***REMOVED***
  function valFromString(val) ***REMOVED*** return val != null ? val.toString().replace(/%2F/g, "/") : val; ***REMOVED***
//  TODO: in 1.0, make string .is() return false if value is undefined by default.
//  function regexpMatches(val) ***REMOVED*** /*jshint validthis:true */ return isDefined(val) && this.pattern.test(val); ***REMOVED***
  function regexpMatches(val) ***REMOVED*** /*jshint validthis:true */ return this.pattern.test(val); ***REMOVED***

  var $types = ***REMOVED******REMOVED***, enqueue = true, typeQueue = [], injector, defaultTypes = ***REMOVED***
    string: ***REMOVED***
      encode: valToString,
      decode: valFromString,
      is: regexpMatches,
      pattern: /[^/]*/
***REMOVED***,
    int: ***REMOVED***
      encode: valToString,
      decode: function(val) ***REMOVED*** return parseInt(val, 10); ***REMOVED***,
      is: function(val) ***REMOVED*** return isDefined(val) && this.decode(val.toString()) === val; ***REMOVED***,
      pattern: /\d+/
***REMOVED***,
    bool: ***REMOVED***
      encode: function(val) ***REMOVED*** return val ? 1 : 0; ***REMOVED***,
      decode: function(val) ***REMOVED*** return parseInt(val, 10) !== 0; ***REMOVED***,
      is: function(val) ***REMOVED*** return val === true || val === false; ***REMOVED***,
      pattern: /0|1/
***REMOVED***,
    date: ***REMOVED***
      encode: function (val) ***REMOVED***
        if (!this.is(val))
          return undefined;
        return [ val.getFullYear(),
          ('0' + (val.getMonth() + 1)).slice(-2),
          ('0' + val.getDate()).slice(-2)
        ].join("-");
  ***REMOVED***,
      decode: function (val) ***REMOVED***
        if (this.is(val)) return val;
        var match = this.capture.exec(val);
        return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
  ***REMOVED***,
      is: function(val) ***REMOVED*** return val instanceof Date && !isNaN(val.valueOf()); ***REMOVED***,
      equals: function (a, b) ***REMOVED*** return this.is(a) && this.is(b) && a.toISOString() === b.toISOString(); ***REMOVED***,
      pattern: /[0-9]***REMOVED***4***REMOVED***-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
      capture: /([0-9]***REMOVED***4***REMOVED***)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
***REMOVED***,
    json: ***REMOVED***
      encode: angular.toJson,
      decode: angular.fromJson,
      is: angular.isObject,
      equals: angular.equals,
      pattern: /[^/]*/
***REMOVED***,
    any: ***REMOVED*** // does not encode/decode
      encode: angular.identity,
      decode: angular.identity,
      is: angular.identity,
      equals: angular.equals,
      pattern: /.*/
***REMOVED***
***REMOVED***;

  function getDefaultConfig() ***REMOVED***
    return ***REMOVED***
      strict: isStrictMode,
      caseInsensitive: isCaseInsensitive
***REMOVED***;
***REMOVED***

  function isInjectable(value) ***REMOVED***
    return (isFunction(value) || (isArray(value) && isFunction(value[value.length - 1])));
***REMOVED***

  /**
   * [Internal] Get the default value of a parameter, which may be an injectable function.
   */
  $UrlMatcherFactory.$$getDefaultValue = function(config) ***REMOVED***
    if (!isInjectable(config.value)) return config.value;
    if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
    return injector.invoke(config.value);
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#caseInsensitive
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URL matching should be case sensitive (the default behavior), or not.
   *
   * @param ***REMOVED***boolean***REMOVED*** value `false` to match URL in a case sensitive manner; otherwise `true`;
   * @returns ***REMOVED***boolean***REMOVED*** the current value of caseInsensitive
   */
  this.caseInsensitive = function(value) ***REMOVED***
    if (isDefined(value))
      isCaseInsensitive = value;
    return isCaseInsensitive;
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#strictMode
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URLs should match trailing slashes, or not (the default behavior).
   *
   * @param ***REMOVED***boolean=***REMOVED*** value `false` to match trailing slashes in URLs, otherwise `true`.
   * @returns ***REMOVED***boolean***REMOVED*** the current value of strictMode
   */
  this.strictMode = function(value) ***REMOVED***
    if (isDefined(value))
      isStrictMode = value;
    return isStrictMode;
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Sets the default behavior when generating or matching URLs with default parameter values.
   *
   * @param ***REMOVED***string***REMOVED*** value A string that defines the default parameter URL squashing behavior.
   *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
   *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
   *             parameter is surrounded by slashes, squash (remove) one slash from the URL
   *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
   *             the parameter value from the URL and replace it with this string.
   */
  this.defaultSquashPolicy = function(value) ***REMOVED***
    if (!isDefined(value)) return defaultSquashPolicy;
    if (value !== true && value !== false && !isString(value))
      throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
    defaultSquashPolicy = value;
    return value;
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#compile
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Creates a ***REMOVED***@link ui.router.util.type:UrlMatcher `UrlMatcher`***REMOVED*** for the specified pattern.
   *
   * @param ***REMOVED***string***REMOVED*** pattern  The URL pattern.
   * @param ***REMOVED***Object***REMOVED*** config  The config object hash.
   * @returns ***REMOVED***UrlMatcher***REMOVED***  The UrlMatcher.
   */
  this.compile = function (pattern, config) ***REMOVED***
    return new UrlMatcher(pattern, extend(getDefaultConfig(), config));
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#isMatcher
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Returns true if the specified object is a `UrlMatcher`, or false otherwise.
   *
   * @param ***REMOVED***Object***REMOVED*** object  The object to perform the type check against.
   * @returns ***REMOVED***Boolean***REMOVED***  Returns `true` if the object matches the `UrlMatcher` interface, by
   *          implementing all the same methods.
   */
  this.isMatcher = function (o) ***REMOVED***
    if (!isObject(o)) return false;
    var result = true;

    forEach(UrlMatcher.prototype, function(val, name) ***REMOVED***
      if (isFunction(val)) ***REMOVED***
        result = result && (isDefined(o[name]) && isFunction(o[name]));
  ***REMOVED***
***REMOVED***);
    return result;
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#type
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Registers a custom ***REMOVED***@link ui.router.util.type:Type `Type`***REMOVED*** object that can be used to
   * generate URLs with typed parameters.
   *
   * @param ***REMOVED***string***REMOVED*** name  The type name.
   * @param ***REMOVED***Object|Function***REMOVED*** definition   The type definition. See
   *        ***REMOVED***@link ui.router.util.type:Type `Type`***REMOVED*** for information on the values accepted.
   * @param ***REMOVED***Object|Function***REMOVED*** definitionFn (optional) A function that is injected before the app
   *        runtime starts.  The result of this function is merged into the existing `definition`.
   *        See ***REMOVED***@link ui.router.util.type:Type `Type`***REMOVED*** for information on the values accepted.
   *
   * @returns ***REMOVED***Object***REMOVED***  Returns `$urlMatcherFactoryProvider`.
   *
   * @example
   * This is a simple example of a custom type that encodes and decodes items from an
   * array, using the array index as the URL-encoded value:
   *
   * <pre>
   * var list = ['John', 'Paul', 'George', 'Ringo'];
   *
   * $urlMatcherFactoryProvider.type('listItem', ***REMOVED***
   *   encode: function(item) ***REMOVED***
   *     // Represent the list item in the URL using its corresponding index
   *     return list.indexOf(item);
   * ***REMOVED***,
   *   decode: function(item) ***REMOVED***
   *     // Look up the list item by index
   *     return list[parseInt(item, 10)];
   * ***REMOVED***,
   *   is: function(item) ***REMOVED***
   *     // Ensure the item is valid by checking to see that it appears
   *     // in the list
   *     return list.indexOf(item) > -1;
   * ***REMOVED***
   * ***REMOVED***);
   *
   * $stateProvider.state('list', ***REMOVED***
   *   url: "/list/***REMOVED***item:listItem***REMOVED***",
   *   controller: function($scope, $stateParams) ***REMOVED***
   *     console.log($stateParams.item);
   * ***REMOVED***
   * ***REMOVED***);
   *
   * // ...
   *
   * // Changes URL to '/list/3', logs "Ringo" to the console
   * $state.go('list', ***REMOVED*** item: "Ringo" ***REMOVED***);
   * </pre>
   *
   * This is a more complex example of a type that relies on dependency injection to
   * interact with services, and uses the parameter name from the URL to infer how to
   * handle encoding and decoding parameter values:
   *
   * <pre>
   * // Defines a custom type that gets a value from a service,
   * // where each service gets different types of values from
   * // a backend API:
   * $urlMatcherFactoryProvider.type('dbObject', ***REMOVED******REMOVED***, function(Users, Posts) ***REMOVED***
   *
   *   // Matches up services to URL parameter names
   *   var services = ***REMOVED***
   *     user: Users,
   *     post: Posts
   * ***REMOVED***;
   *
   *   return ***REMOVED***
   *     encode: function(object) ***REMOVED***
   *       // Represent the object in the URL using its unique ID
   *       return object.id;
   * ***REMOVED***,
   *     decode: function(value, key) ***REMOVED***
   *       // Look up the object by ID, using the parameter
   *       // name (key) to call the correct service
   *       return services[key].findById(value);
   * ***REMOVED***,
   *     is: function(object, key) ***REMOVED***
   *       // Check that object is a valid dbObject
   *       return angular.isObject(object) && object.id && services[key];
   * ***REMOVED***
   *     equals: function(a, b) ***REMOVED***
   *       // Check the equality of decoded objects by comparing
   *       // their unique IDs
   *       return a.id === b.id;
   * ***REMOVED***
   * ***REMOVED***;
   * ***REMOVED***);
   *
   * // In a config() block, you can then attach URLs with
   * // type-annotated parameters:
   * $stateProvider.state('users', ***REMOVED***
   *   url: "/users",
   *   // ...
   * ***REMOVED***).state('users.item', ***REMOVED***
   *   url: "/***REMOVED***user:dbObject***REMOVED***",
   *   controller: function($scope, $stateParams) ***REMOVED***
   *     // $stateParams.user will now be an object returned from
   *     // the Users service
   * ***REMOVED***,
   *   // ...
   * ***REMOVED***);
   * </pre>
   */
  this.type = function (name, definition, definitionFn) ***REMOVED***
    if (!isDefined(definition)) return $types[name];
    if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");

    $types[name] = new Type(extend(***REMOVED*** name: name ***REMOVED***, definition));
    if (definitionFn) ***REMOVED***
      typeQueue.push(***REMOVED*** name: name, def: definitionFn ***REMOVED***);
      if (!enqueue) flushTypeQueue();
***REMOVED***
    return this;
***REMOVED***;

  // `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s
  function flushTypeQueue() ***REMOVED***
    while(typeQueue.length) ***REMOVED***
      var type = typeQueue.shift();
      if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
      angular.extend($types[type.name], injector.invoke(type.def));
***REMOVED***
***REMOVED***

  // Register default types. Store them in the prototype of $types.
  forEach(defaultTypes, function(type, name) ***REMOVED*** $types[name] = new Type(extend(***REMOVED***name: name***REMOVED***, type)); ***REMOVED***);
  $types = inherit($types, ***REMOVED******REMOVED***);

  /* No need to document $get, since it returns this */
  this.$get = ['$injector', function ($injector) ***REMOVED***
    injector = $injector;
    enqueue = false;
    flushTypeQueue();

    forEach(defaultTypes, function(type, name) ***REMOVED***
      if (!$types[name]) $types[name] = new Type(type);
***REMOVED***);
    return this;
***REMOVED***];

  this.Param = function Param(id, type, config, location) ***REMOVED***
    var self = this;
    config = unwrapShorthand(config);
    type = getType(config, type, location);
    var arrayMode = getArrayMode();
    type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;
    if (type.name === "string" && !arrayMode && location === "path" && config.value === undefined)
      config.value = ""; // for 0.2.x; in 0.3.0+ do not automatically default to ""
    var isOptional = config.value !== undefined;
    var squash = getSquashPolicy(config, isOptional);
    var replace = getReplace(config, arrayMode, isOptional, squash);

    function unwrapShorthand(config) ***REMOVED***
      var keys = isObject(config) ? objectKeys(config) : [];
      var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 &&
                        indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
      if (isShorthand) config = ***REMOVED*** value: config ***REMOVED***;
      config.$$fn = isInjectable(config.value) ? config.value : function () ***REMOVED*** return config.value; ***REMOVED***;
      return config;
***REMOVED***

    function getType(config, urlType, location) ***REMOVED***
      if (config.type && urlType) throw new Error("Param '"+id+"' has two type configurations.");
      if (urlType) return urlType;
      if (!config.type) return (location === "config" ? $types.any : $types.string);
      return config.type instanceof Type ? config.type : new Type(config.type);
***REMOVED***

    // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
    function getArrayMode() ***REMOVED***
      var arrayDefaults = ***REMOVED*** array: (location === "search" ? "auto" : false) ***REMOVED***;
      var arrayParamNomenclature = id.match(/\[\]$/) ? ***REMOVED*** array: true ***REMOVED*** : ***REMOVED******REMOVED***;
      return extend(arrayDefaults, arrayParamNomenclature, config).array;
***REMOVED***

    /**
     * returns false, true, or the squash value to indicate the "default parameter url squash policy".
     */
    function getSquashPolicy(config, isOptional) ***REMOVED***
      var squash = config.squash;
      if (!isOptional || squash === false) return false;
      if (!isDefined(squash) || squash == null) return defaultSquashPolicy;
      if (squash === true || isString(squash)) return squash;
      throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
***REMOVED***

    function getReplace(config, arrayMode, isOptional, squash) ***REMOVED***
      var replace, configuredKeys, defaultPolicy = [
        ***REMOVED*** from: "",   to: (isOptional || arrayMode ? undefined : "") ***REMOVED***,
        ***REMOVED*** from: null, to: (isOptional || arrayMode ? undefined : "") ***REMOVED***
      ];
      replace = isArray(config.replace) ? config.replace : [];
      if (isString(squash))
        replace.push(***REMOVED*** from: squash, to: undefined ***REMOVED***);
      configuredKeys = map(replace, function(item) ***REMOVED*** return item.from; ***REMOVED*** );
      return filter(defaultPolicy, function(item) ***REMOVED*** return indexOf(configuredKeys, item.from) === -1; ***REMOVED***).concat(replace);
***REMOVED***

    /**
     * [Internal] Get the default value of a parameter, which may be an injectable function.
     */
    function $$getDefaultValue() ***REMOVED***
      if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
      return injector.invoke(config.$$fn);
***REMOVED***

    /**
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
     * default value, which may be the result of an injectable function.
     */
    function $value(value) ***REMOVED***
      function hasReplaceVal(val) ***REMOVED*** return function(obj) ***REMOVED*** return obj.from === val; ***REMOVED***; ***REMOVED***
      function $replace(value) ***REMOVED***
        var replacement = map(filter(self.replace, hasReplaceVal(value)), function(obj) ***REMOVED*** return obj.to; ***REMOVED***);
        return replacement.length ? replacement[0] : value;
  ***REMOVED***
      value = $replace(value);
      return isDefined(value) ? self.type.decode(value) : $$getDefaultValue();
***REMOVED***

    function toString() ***REMOVED*** return "***REMOVED***Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "***REMOVED***"; ***REMOVED***

    extend(this, ***REMOVED***
      id: id,
      type: type,
      location: location,
      array: arrayMode,
      squash: squash,
      replace: replace,
      isOptional: isOptional,
      value: $value,
      dynamic: undefined,
      config: config,
      toString: toString
***REMOVED***);
***REMOVED***;

  function ParamSet(params) ***REMOVED***
    extend(this, params || ***REMOVED******REMOVED***);
***REMOVED***

  ParamSet.prototype = ***REMOVED***
    $$new: function() ***REMOVED***
      return inherit(this, extend(new ParamSet(), ***REMOVED*** $$parent: this***REMOVED***));
***REMOVED***,
    $$keys: function () ***REMOVED***
      var keys = [], chain = [], parent = this,
        ignore = objectKeys(ParamSet.prototype);
      while (parent) ***REMOVED*** chain.push(parent); parent = parent.$$parent; ***REMOVED***
      chain.reverse();
      forEach(chain, function(paramset) ***REMOVED***
        forEach(objectKeys(paramset), function(key) ***REMOVED***
            if (indexOf(keys, key) === -1 && indexOf(ignore, key) === -1) keys.push(key);
    ***REMOVED***);
  ***REMOVED***);
      return keys;
***REMOVED***,
    $$values: function(paramValues) ***REMOVED***
      var values = ***REMOVED******REMOVED***, self = this;
      forEach(self.$$keys(), function(key) ***REMOVED***
        values[key] = self[key].value(paramValues && paramValues[key]);
  ***REMOVED***);
      return values;
***REMOVED***,
    $$equals: function(paramValues1, paramValues2) ***REMOVED***
      var equal = true, self = this;
      forEach(self.$$keys(), function(key) ***REMOVED***
        var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];
        if (!self[key].type.equals(left, right)) equal = false;
  ***REMOVED***);
      return equal;
***REMOVED***,
    $$validates: function $$validate(paramValues) ***REMOVED***
      var result = true, isOptional, val, param, self = this;

      forEach(this.$$keys(), function(key) ***REMOVED***
        param = self[key];
        val = paramValues[key];
        isOptional = !val && param.isOptional;
        result = result && (isOptional || !!param.type.is(val));
  ***REMOVED***);
      return result;
***REMOVED***,
    $$parent: undefined
***REMOVED***;

  this.ParamSet = ParamSet;
***REMOVED***

// Register as a provider so it's available to other providers
angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
angular.module('ui.router.util').run(['$urlMatcherFactory', function($urlMatcherFactory) ***REMOVED*** ***REMOVED***]);

/**
 * @ngdoc object
 * @name ui.router.router.$urlRouterProvider
 *
 * @requires ui.router.util.$urlMatcherFactoryProvider
 * @requires $locationProvider
 *
 * @description
 * `$urlRouterProvider` has the responsibility of watching `$location`. 
 * When `$location` changes it runs through a list of rules one by one until a 
 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
 * a url in a state configuration. All urls are compiled into a UrlMatcher object.
 *
 * There are several methods on `$urlRouterProvider` that make it useful to use directly
 * in your module config.
 */
$UrlRouterProvider.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];
function $UrlRouterProvider(   $locationProvider,   $urlMatcherFactory) ***REMOVED***
  var rules = [], otherwise = null, interceptDeferred = false, listener;

  // Returns a string that is a prefix of all strings matching the RegExp
  function regExpPrefix(re) ***REMOVED***
    var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|***REMOVED******REMOVED***]+)*)/.exec(re.source);
    return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
***REMOVED***

  // Interpolates matched values into a String.replace()-style pattern
  function interpolate(pattern, match) ***REMOVED***
    return pattern.replace(/\$(\$|\d***REMOVED***1,2***REMOVED***)/, function (m, what) ***REMOVED***
      return match[what === '$' ? 0 : Number(what)];
***REMOVED***);
***REMOVED***

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#rule
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines rules that are used by `$urlRouterProvider` to find matches for
   * specific URLs.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) ***REMOVED***
   *   // Here's an example of how you might allow case insensitive urls
   *   $urlRouterProvider.rule(function ($injector, $location) ***REMOVED***
   *     var path = $location.path(),
   *         normalized = path.toLowerCase();
   *
   *     if (path !== normalized) ***REMOVED***
   *       return normalized;
   * ***REMOVED***
   * ***REMOVED***);
   * ***REMOVED***);
   * </pre>
   *
   * @param ***REMOVED***object***REMOVED*** rule Handler function that takes `$injector` and `$location`
   * services as arguments. You can use them to return a valid path as a string.
   *
   * @return ***REMOVED***object***REMOVED*** `$urlRouterProvider` - `$urlRouterProvider` instance
   */
  this.rule = function (rule) ***REMOVED***
    if (!isFunction(rule)) throw new Error("'rule' must be a function");
    rules.push(rule);
    return this;
***REMOVED***;

  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouterProvider#otherwise
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines a path that is used when an invalid route is requested.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) ***REMOVED***
   *   // if the path doesn't match any of the urls you configured
   *   // otherwise will take care of routing the user to the
   *   // specified url
   *   $urlRouterProvider.otherwise('/index');
   *
   *   // Example of using function rule as param
   *   $urlRouterProvider.otherwise(function ($injector, $location) ***REMOVED***
   *     return '/a/valid/url';
   * ***REMOVED***);
   * ***REMOVED***);
   * </pre>
   *
   * @param ***REMOVED***string|object***REMOVED*** rule The url path you want to redirect to or a function 
   * rule that returns the url path. The function version is passed two params: 
   * `$injector` and `$location` services, and must return a url string.
   *
   * @return ***REMOVED***object***REMOVED*** `$urlRouterProvider` - `$urlRouterProvider` instance
   */
  this.otherwise = function (rule) ***REMOVED***
    if (isString(rule)) ***REMOVED***
      var redirect = rule;
      rule = function () ***REMOVED*** return redirect; ***REMOVED***;
***REMOVED***
    else if (!isFunction(rule)) throw new Error("'rule' must be a function");
    otherwise = rule;
    return this;
***REMOVED***;


  function handleIfMatch($injector, handler, match) ***REMOVED***
    if (!match) return false;
    var result = $injector.invoke(handler, handler, ***REMOVED*** $match: match ***REMOVED***);
    return isDefined(result) ? result : true;
***REMOVED***

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#when
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Registers a handler for a given url matching. if handle is a string, it is
   * treated as a redirect, and is interpolated according to the syntax of match
   * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
   *
   * If the handler is a function, it is injectable. It gets invoked if `$location`
   * matches. You have the option of inject the match object as `$match`.
   *
   * The handler can return
   *
   * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
   *   will continue trying to find another one that matches.
   * - **string** which is treated as a redirect and passed to `$location.url()`
   * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) ***REMOVED***
   *   $urlRouterProvider.when($state.url, function ($match, $stateParams) ***REMOVED***
   *     if ($state.$current.navigable !== state ||
   *         !equalForKeys($match, $stateParams) ***REMOVED***
   *      $state.transitionTo(state, $match, false);
   * ***REMOVED***
   * ***REMOVED***);
   * ***REMOVED***);
   * </pre>
   *
   * @param ***REMOVED***string|object***REMOVED*** what The incoming path that you want to redirect.
   * @param ***REMOVED***string|object***REMOVED*** handler The path you want to redirect your user to.
   */
  this.when = function (what, handler) ***REMOVED***
    var redirect, handlerIsString = isString(handler);
    if (isString(what)) what = $urlMatcherFactory.compile(what);

    if (!handlerIsString && !isFunction(handler) && !isArray(handler))
      throw new Error("invalid 'handler' in when()");

    var strategies = ***REMOVED***
      matcher: function (what, handler) ***REMOVED***
        if (handlerIsString) ***REMOVED***
          redirect = $urlMatcherFactory.compile(handler);
          handler = ['$match', function ($match) ***REMOVED*** return redirect.format($match); ***REMOVED***];
    ***REMOVED***
        return extend(function ($injector, $location) ***REMOVED***
          return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
    ***REMOVED***, ***REMOVED***
          prefix: isString(what.prefix) ? what.prefix : ''
    ***REMOVED***);
  ***REMOVED***,
      regex: function (what, handler) ***REMOVED***
        if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");

        if (handlerIsString) ***REMOVED***
          redirect = handler;
          handler = ['$match', function ($match) ***REMOVED*** return interpolate(redirect, $match); ***REMOVED***];
    ***REMOVED***
        return extend(function ($injector, $location) ***REMOVED***
          return handleIfMatch($injector, handler, what.exec($location.path()));
    ***REMOVED***, ***REMOVED***
          prefix: regExpPrefix(what)
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;

    var check = ***REMOVED*** matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp ***REMOVED***;

    for (var n in check) ***REMOVED***
      if (check[n]) return this.rule(strategies[n](what, handler));
***REMOVED***

    throw new Error("invalid 'what' in when()");
***REMOVED***;

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#deferIntercept
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Disables (or enables) deferring location change interception.
   *
   * If you wish to customize the behavior of syncing the URL (for example, if you wish to
   * defer a transition but maintain the current URL), call this method at configuration time.
   * Then, at run time, call `$urlRouter.listen()` after you have configured your own
   * `$locationChangeSuccess` event handler.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) ***REMOVED***
   *
   *   // Prevent $urlRouter from automatically intercepting URL changes;
   *   // this allows you to configure custom behavior in between
   *   // location changes and route synchronization:
   *   $urlRouterProvider.deferIntercept();
   *
   * ***REMOVED***).run(function ($rootScope, $urlRouter, UserService) ***REMOVED***
   *
   *   $rootScope.$on('$locationChangeSuccess', function(e) ***REMOVED***
   *     // UserService is an example service for managing user state
   *     if (UserService.isLoggedIn()) return;
   *
   *     // Prevent $urlRouter's default handler from firing
   *     e.preventDefault();
   *
   *     UserService.handleLogin().then(function() ***REMOVED***
   *       // Once the user has logged in, sync the current URL
   *       // to the router:
   *       $urlRouter.sync();
   * ***REMOVED***);
   * ***REMOVED***);
   *
   *   // Configures $urlRouter's listener *after* your custom listener
   *   $urlRouter.listen();
   * ***REMOVED***);
   * </pre>
   *
   * @param ***REMOVED***boolean***REMOVED*** defer Indicates whether to defer location change interception. Passing
            no parameter is equivalent to `true`.
   */
  this.deferIntercept = function (defer) ***REMOVED***
    if (defer === undefined) defer = true;
    interceptDeferred = defer;
***REMOVED***;

  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouter
   *
   * @requires $location
   * @requires $rootScope
   * @requires $injector
   * @requires $browser
   *
   * @description
   *
   */
  this.$get = $get;
  $get.$inject = ['$location', '$rootScope', '$injector', '$browser'];
  function $get(   $location,   $rootScope,   $injector,   $browser) ***REMOVED***

    var baseHref = $browser.baseHref(), location = $location.url(), lastPushedUrl;

    function appendBasePath(url, isHtml5, absolute) ***REMOVED***
      if (baseHref === '/') return url;
      if (isHtml5) return baseHref.slice(0, -1) + url;
      if (absolute) return baseHref.slice(1) + url;
      return url;
***REMOVED***

    // TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
    function update(evt) ***REMOVED***
      if (evt && evt.defaultPrevented) return;
      var ignoreUpdate = lastPushedUrl && $location.url() === lastPushedUrl;
      lastPushedUrl = undefined;
      if (ignoreUpdate) return true;

      function check(rule) ***REMOVED***
        var handled = rule($injector, $location);

        if (!handled) return false;
        if (isString(handled)) $location.replace().url(handled);
        return true;
  ***REMOVED***
      var n = rules.length, i;

      for (i = 0; i < n; i++) ***REMOVED***
        if (check(rules[i])) return;
  ***REMOVED***
      // always check otherwise last to allow dynamic updates to the set of rules
      if (otherwise) check(otherwise);
***REMOVED***

    function listen() ***REMOVED***
      listener = listener || $rootScope.$on('$locationChangeSuccess', update);
      return listener;
***REMOVED***

    if (!interceptDeferred) listen();

    return ***REMOVED***
      /**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#sync
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
       * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
       * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
       * with the transition by calling `$urlRouter.sync()`.
       *
       * @example
       * <pre>
       * angular.module('app', ['ui.router'])
       *   .run(function($rootScope, $urlRouter) ***REMOVED***
       *     $rootScope.$on('$locationChangeSuccess', function(evt) ***REMOVED***
       *       // Halt state change from even starting
       *       evt.preventDefault();
       *       // Perform custom logic
       *       var meetsRequirement = ...
       *       // Continue with the update and state transition if logic allows
       *       if (meetsRequirement) $urlRouter.sync();
       * ***REMOVED***);
       * ***REMOVED***);
       * </pre>
       */
      sync: function() ***REMOVED***
        update();
  ***REMOVED***,

      listen: function() ***REMOVED***
        return listen();
  ***REMOVED***,

      update: function(read) ***REMOVED***
        if (read) ***REMOVED***
          location = $location.url();
          return;
    ***REMOVED***
        if ($location.url() === location) return;

        $location.url(location);
        $location.replace();
  ***REMOVED***,

      push: function(urlMatcher, params, options) ***REMOVED***
        $location.url(urlMatcher.format(params || ***REMOVED******REMOVED***));
        lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined;
        if (options && options.replace) $location.replace();
  ***REMOVED***,

      /**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#href
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * A URL generation method that returns the compiled URL for a given
       * ***REMOVED***@link ui.router.util.type:UrlMatcher `UrlMatcher`***REMOVED***, populated with the provided parameters.
       *
       * @example
       * <pre>
       * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), ***REMOVED***
       *   person: "bob"
       * ***REMOVED***);
       * // $bob == "/about/bob";
       * </pre>
       *
       * @param ***REMOVED***UrlMatcher***REMOVED*** urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
       * @param ***REMOVED***object=***REMOVED*** params An object of parameter values to fill the matcher's required parameters.
       * @param ***REMOVED***object=***REMOVED*** options Options object. The options are:
       *
       * - **`absolute`** - ***REMOVED***boolean=false***REMOVED***,  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
       *
       * @returns ***REMOVED***string***REMOVED*** Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
       */
      href: function(urlMatcher, params, options) ***REMOVED***
        if (!urlMatcher.validates(params)) return null;

        var isHtml5 = $locationProvider.html5Mode();
        if (angular.isObject(isHtml5)) ***REMOVED***
          isHtml5 = isHtml5.enabled;
    ***REMOVED***
        
        var url = urlMatcher.format(params);
        options = options || ***REMOVED******REMOVED***;

        if (!isHtml5 && url !== null) ***REMOVED***
          url = "#" + $locationProvider.hashPrefix() + url;
    ***REMOVED***
        url = appendBasePath(url, isHtml5, options.absolute);

        if (!options.absolute || !url) ***REMOVED***
          return url;
    ***REMOVED***

        var slash = (!isHtml5 && url ? '/' : ''), port = $location.port();
        port = (port === 80 || port === 443 ? '' : ':' + port);

        return [$location.protocol(), '://', $location.host(), port, slash, url].join('');
  ***REMOVED***
***REMOVED***;
***REMOVED***
***REMOVED***

angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);

/**
 * @ngdoc object
 * @name ui.router.state.$stateProvider
 *
 * @requires ui.router.router.$urlRouterProvider
 * @requires ui.router.util.$urlMatcherFactoryProvider
 *
 * @description
 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
 * on state.
 *
 * A state corresponds to a "place" in the application in terms of the overall UI and
 * navigation. A state describes (via the controller / template / view properties) what
 * the UI looks like and does at that place.
 *
 * States often have things in common, and the primary way of factoring out these
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
 * nested states.
 *
 * The `$stateProvider` provides interfaces to declare these states for your app.
 */
$StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];
function $StateProvider(   $urlRouterProvider,   $urlMatcherFactory) ***REMOVED***

  var root, states = ***REMOVED******REMOVED***, $state, queue = ***REMOVED******REMOVED***, abstractKey = 'abstract';

  // Builds state properties from definition passed to registerState()
  var stateBuilder = ***REMOVED***

    // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
    // state.children = [];
    // if (parent) parent.children.push(state);
    parent: function(state) ***REMOVED***
      if (isDefined(state.parent) && state.parent) return findState(state.parent);
      // regex matches any valid composite state name
      // would match "contact.list" but not "contacts"
      var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
      return compositeName ? findState(compositeName[1]) : root;
***REMOVED***,

    // inherit 'data' from parent and override by own values (if any)
    data: function(state) ***REMOVED***
      if (state.parent && state.parent.data) ***REMOVED***
        state.data = state.self.data = extend(***REMOVED******REMOVED***, state.parent.data, state.data);
  ***REMOVED***
      return state.data;
***REMOVED***,

    // Build a URLMatcher if necessary, either via a relative or absolute URL
    url: function(state) ***REMOVED***
      var url = state.url, config = ***REMOVED*** params: state.params || ***REMOVED******REMOVED*** ***REMOVED***;

      if (isString(url)) ***REMOVED***
        if (url.charAt(0) == '^') return $urlMatcherFactory.compile(url.substring(1), config);
        return (state.parent.navigable || root).url.concat(url, config);
  ***REMOVED***

      if (!url || $urlMatcherFactory.isMatcher(url)) return url;
      throw new Error("Invalid url '" + url + "' in state '" + state + "'");
***REMOVED***,

    // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
    navigable: function(state) ***REMOVED***
      return state.url ? state : (state.parent ? state.parent.navigable : null);
***REMOVED***,

    // Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
    ownParams: function(state) ***REMOVED***
      var params = state.url && state.url.params || new $$UMFP.ParamSet();
      forEach(state.params || ***REMOVED******REMOVED***, function(config, id) ***REMOVED***
        if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");
  ***REMOVED***);
      return params;
***REMOVED***,

    // Derive parameters for this state and ensure they're a super-set of parent's parameters
    params: function(state) ***REMOVED***
      return state.parent && state.parent.params ? extend(state.parent.params.$$new(), state.ownParams) : new $$UMFP.ParamSet();
***REMOVED***,

    // If there is no explicit multi-view configuration, make one up so we don't have
    // to handle both cases in the view directive later. Note that having an explicit
    // 'views' property will mean the default unnamed view properties are ignored. This
    // is also a good time to resolve view names to absolute names, so everything is a
    // straight lookup at link time.
    views: function(state) ***REMOVED***
      var views = ***REMOVED******REMOVED***;

      forEach(isDefined(state.views) ? state.views : ***REMOVED*** '': state ***REMOVED***, function (view, name) ***REMOVED***
        if (name.indexOf('@') < 0) name += '@' + state.parent.name;
        views[name] = view;
  ***REMOVED***);
      return views;
***REMOVED***,

    // Keep a full path from the root down to this state as this is needed for state activation.
    path: function(state) ***REMOVED***
      return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
***REMOVED***,

    // Speed up $state.contains() as it's used a lot
    includes: function(state) ***REMOVED***
      var includes = state.parent ? extend(***REMOVED******REMOVED***, state.parent.includes) : ***REMOVED******REMOVED***;
      includes[state.name] = true;
      return includes;
***REMOVED***,

    $delegates: ***REMOVED******REMOVED***
***REMOVED***;

  function isRelative(stateName) ***REMOVED***
    return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
***REMOVED***

  function findState(stateOrName, base) ***REMOVED***
    if (!stateOrName) return undefined;

    var isStr = isString(stateOrName),
        name  = isStr ? stateOrName : stateOrName.name,
        path  = isRelative(name);

    if (path) ***REMOVED***
      if (!base) throw new Error("No reference point given for path '"  + name + "'");
      base = findState(base);
      
      var rel = name.split("."), i = 0, pathLength = rel.length, current = base;

      for (; i < pathLength; i++) ***REMOVED***
        if (rel[i] === "" && i === 0) ***REMOVED***
          current = base;
          continue;
    ***REMOVED***
        if (rel[i] === "^") ***REMOVED***
          if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
          current = current.parent;
          continue;
    ***REMOVED***
        break;
  ***REMOVED***
      rel = rel.slice(i).join(".");
      name = current.name + (current.name && rel ? "." : "") + rel;
***REMOVED***
    var state = states[name];

    if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) ***REMOVED***
      return state;
***REMOVED***
    return undefined;
***REMOVED***

  function queueState(parentName, state) ***REMOVED***
    if (!queue[parentName]) ***REMOVED***
      queue[parentName] = [];
***REMOVED***
    queue[parentName].push(state);
***REMOVED***

  function flushQueuedChildren(parentName) ***REMOVED***
    var queued = queue[parentName] || [];
    while(queued.length) ***REMOVED***
      registerState(queued.shift());
***REMOVED***
***REMOVED***

  function registerState(state) ***REMOVED***
    // Wrap a new object around the state so we can store our private details easily.
    state = inherit(state, ***REMOVED***
      self: state,
      resolve: state.resolve || ***REMOVED******REMOVED***,
      toString: function() ***REMOVED*** return this.name; ***REMOVED***
***REMOVED***);

    var name = state.name;
    if (!isString(name) || name.indexOf('@') >= 0) throw new Error("State must have a valid name");
    if (states.hasOwnProperty(name)) throw new Error("State '" + name + "'' is already defined");

    // Get parent name
    var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
        : (isString(state.parent)) ? state.parent
        : (isObject(state.parent) && isString(state.parent.name)) ? state.parent.name
        : '';

    // If parent is not registered yet, add state to queue and register later
    if (parentName && !states[parentName]) ***REMOVED***
      return queueState(parentName, state.self);
***REMOVED***

    for (var key in stateBuilder) ***REMOVED***
      if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
***REMOVED***
    states[name] = state;

    // Register the state in the global state list and with $urlRouter if necessary.
    if (!state[abstractKey] && state.url) ***REMOVED***
      $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) ***REMOVED***
        if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) ***REMOVED***
          $state.transitionTo(state, $match, ***REMOVED*** inherit: true, location: false ***REMOVED***);
    ***REMOVED***
  ***REMOVED***]);
***REMOVED***

    // Register any queued children
    flushQueuedChildren(name);

    return state;
***REMOVED***

  // Checks text to see if it looks like a glob.
  function isGlob (text) ***REMOVED***
    return text.indexOf('*') > -1;
***REMOVED***

  // Returns true if glob matches current $state name.
  function doesStateMatchGlob (glob) ***REMOVED***
    var globSegments = glob.split('.'),
        segments = $state.$current.name.split('.');

    //match greedy starts
    if (globSegments[0] === '**') ***REMOVED***
       segments = segments.slice(indexOf(segments, globSegments[1]));
       segments.unshift('**');
***REMOVED***
    //match greedy ends
    if (globSegments[globSegments.length - 1] === '**') ***REMOVED***
       segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
       segments.push('**');
***REMOVED***

    if (globSegments.length != segments.length) ***REMOVED***
      return false;
***REMOVED***

    //match single stars
    for (var i = 0, l = globSegments.length; i < l; i++) ***REMOVED***
      if (globSegments[i] === '*') ***REMOVED***
        segments[i] = '*';
  ***REMOVED***
***REMOVED***

    return segments.join('') === globSegments.join('');
***REMOVED***


  // Implicit root state that is always active
  root = registerState(***REMOVED***
    name: '',
    url: '^',
    views: null,
    'abstract': true
***REMOVED***);
  root.navigable = null;


  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#decorator
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Allows you to extend (carefully) or override (at your own peril) the 
   * `stateBuilder` object used internally by `$stateProvider`. This can be used 
   * to add custom functionality to ui-router, for example inferring templateUrl 
   * based on the state name.
   *
   * When passing only a name, it returns the current (original or decorated) builder
   * function that matches `name`.
   *
   * The builder functions that can be decorated are listed below. Though not all
   * necessarily have a good use case for decoration, that is up to you to decide.
   *
   * In addition, users can attach custom decorators, which will generate new 
   * properties within the state's internal definition. There is currently no clear 
   * use-case for this beyond accessing internal states (i.e. $state.$current), 
   * however, expect this to become increasingly relevant as we introduce additional 
   * meta-programming features.
   *
   * **Warning**: Decorators should not be interdependent because the order of 
   * execution of the builder functions in non-deterministic. Builder functions 
   * should only be dependent on the state definition object and super function.
   *
   *
   * Existing builder functions and current return values:
   *
   * - **parent** `***REMOVED***object***REMOVED***` - returns the parent state object.
   * - **data** `***REMOVED***object***REMOVED***` - returns state data, including any inherited data that is not
   *   overridden by own values (if any).
   * - **url** `***REMOVED***object***REMOVED***` - returns a ***REMOVED***@link ui.router.util.type:UrlMatcher UrlMatcher***REMOVED***
   *   or `null`.
   * - **navigable** `***REMOVED***object***REMOVED***` - returns closest ancestor state that has a URL (aka is 
   *   navigable).
   * - **params** `***REMOVED***object***REMOVED***` - returns an array of state params that are ensured to 
   *   be a super-set of parent's params.
   * - **views** `***REMOVED***object***REMOVED***` - returns a views object where each key is an absolute view 
   *   name (i.e. "viewName@stateName") and each value is the config object 
   *   (template, controller) for the view. Even when you don't use the views object 
   *   explicitly on a state config, one is still created for you internally.
   *   So by decorating this builder function you have access to decorating template 
   *   and controller properties.
   * - **ownParams** `***REMOVED***object***REMOVED***` - returns an array of params that belong to the state, 
   *   not including any params defined by ancestor states.
   * - **path** `***REMOVED***string***REMOVED***` - returns the full path from the root down to this state. 
   *   Needed for state activation.
   * - **includes** `***REMOVED***object***REMOVED***` - returns an object that includes every state that 
   *   would pass a `$state.includes()` test.
   *
   * @example
   * <pre>
   * // Override the internal 'views' builder with a function that takes the state
   * // definition, and a reference to the internal function being overridden:
   * $stateProvider.decorator('views', function (state, parent) ***REMOVED***
   *   var result = ***REMOVED******REMOVED***,
   *       views = parent(state);
   *
   *   angular.forEach(views, function (config, name) ***REMOVED***
   *     var autoName = (state.name + '.' + name).replace('.', '/');
   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
   *     result[name] = config;
   * ***REMOVED***);
   *   return result;
   * ***REMOVED***);
   *
   * $stateProvider.state('home', ***REMOVED***
   *   views: ***REMOVED***
   *     'contact.list': ***REMOVED*** controller: 'ListController' ***REMOVED***,
   *     'contact.item': ***REMOVED*** controller: 'ItemController' ***REMOVED***
   * ***REMOVED***
   * ***REMOVED***);
   *
   * // ...
   *
   * $state.go('home');
   * // Auto-populates list and item views with /partials/home/contact/list.html,
   * // and /partials/home/contact/item.html, respectively.
   * </pre>
   *
   * @param ***REMOVED***string***REMOVED*** name The name of the builder function to decorate. 
   * @param ***REMOVED***object***REMOVED*** func A function that is responsible for decorating the original 
   * builder function. The function receives two parameters:
   *
   *   - `***REMOVED***object***REMOVED***` - state - The state config object.
   *   - `***REMOVED***object***REMOVED***` - super - The original builder function.
   *
   * @return ***REMOVED***object***REMOVED*** $stateProvider - $stateProvider instance
   */
  this.decorator = decorator;
  function decorator(name, func) ***REMOVED***
    /*jshint validthis: true */
    if (isString(name) && !isDefined(func)) ***REMOVED***
      return stateBuilder[name];
***REMOVED***
    if (!isFunction(func) || !isString(name)) ***REMOVED***
      return this;
***REMOVED***
    if (stateBuilder[name] && !stateBuilder.$delegates[name]) ***REMOVED***
      stateBuilder.$delegates[name] = stateBuilder[name];
***REMOVED***
    stateBuilder[name] = func;
    return this;
***REMOVED***

  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#state
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Registers a state configuration under a given state name. The stateConfig object
   * has the following acceptable properties.
   *
   * @param ***REMOVED***string***REMOVED*** name A unique state name, e.g. "home", "about", "contacts".
   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
   * @param ***REMOVED***object***REMOVED*** stateConfig State configuration object.
   * @param ***REMOVED***string|function=***REMOVED*** stateConfig.template
   * <a id='template'></a>
   *   html template as a string or a function that returns
   *   an html template as a string which should be used by the uiView directives. This property 
   *   takes precedence over templateUrl.
   *   
   *   If `template` is a function, it will be called with the following parameters:
   *
   *   - ***REMOVED***array.&lt;object&gt;***REMOVED*** - state parameters extracted from the current $location.path() by
   *     applying the current state
   *
   * <pre>template:
   *   "<h1>inline template definition</h1>" +
   *   "<div ui-view></div>"</pre>
   * <pre>template: function(params) ***REMOVED***
   *       return "<h1>generated template</h1>"; ***REMOVED***</pre>
   * </div>
   *
   * @param ***REMOVED***string|function=***REMOVED*** stateConfig.templateUrl
   * <a id='templateUrl'></a>
   *
   *   path or function that returns a path to an html
   *   template that should be used by uiView.
   *   
   *   If `templateUrl` is a function, it will be called with the following parameters:
   *
   *   - ***REMOVED***array.&lt;object&gt;***REMOVED*** - state parameters extracted from the current $location.path() by 
   *     applying the current state
   *
   * <pre>templateUrl: "home.html"</pre>
   * <pre>templateUrl: function(params) ***REMOVED***
   *     return myTemplates[params.pageId]; ***REMOVED***</pre>
   *
   * @param ***REMOVED***function=***REMOVED*** stateConfig.templateProvider
   * <a id='templateProvider'></a>
   *    Provider function that returns HTML content string.
   * <pre> templateProvider:
   *       function(MyTemplateService, params) ***REMOVED***
   *         return MyTemplateService.getTemplate(params.pageId);
   *   ***REMOVED***</pre>
   *
   * @param ***REMOVED***string|function=***REMOVED*** stateConfig.controller
   * <a id='controller'></a>
   *
   *  Controller fn that should be associated with newly
   *   related scope or the name of a registered controller if passed as a string.
   *   Optionally, the ControllerAs may be declared here.
   * <pre>controller: "MyRegisteredController"</pre>
   * <pre>controller:
   *     "MyRegisteredController as fooCtrl"***REMOVED***</pre>
   * <pre>controller: function($scope, MyService) ***REMOVED***
   *     $scope.data = MyService.getData(); ***REMOVED***</pre>
   *
   * @param ***REMOVED***function=***REMOVED*** stateConfig.controllerProvider
   * <a id='controllerProvider'></a>
   *
   * Injectable provider function that returns the actual controller or string.
   * <pre>controllerProvider:
   *   function(MyResolveData) ***REMOVED***
   *     if (MyResolveData.foo)
   *       return "FooCtrl"
   *     else if (MyResolveData.bar)
   *       return "BarCtrl";
   *     else return function($scope) ***REMOVED***
   *       $scope.baz = "Qux";
   * ***REMOVED***
   * ***REMOVED***</pre>
   *
   * @param ***REMOVED***string=***REMOVED*** stateConfig.controllerAs
   * <a id='controllerAs'></a>
   * 
   * A controller alias name. If present the controller will be
   *   published to scope under the controllerAs name.
   * <pre>controllerAs: "myCtrl"</pre>
   *
   * @param ***REMOVED***object=***REMOVED*** stateConfig.resolve
   * <a id='resolve'></a>
   *
   * An optional map&lt;string, function&gt; of dependencies which
   *   should be injected into the controller. If any of these dependencies are promises, 
   *   the router will wait for them all to be resolved before the controller is instantiated.
   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
   *   and the values of the resolved promises are injected into any controllers that reference them.
   *   If any  of the promises are rejected the $stateChangeError event is fired.
   *
   *   The map object is:
   *   
   *   - key - ***REMOVED***string***REMOVED***: name of dependency to be injected into controller
   *   - factory - ***REMOVED***string|function***REMOVED***: If string then it is alias for service. Otherwise if function, 
   *     it is injected and return value it treated as dependency. If result is a promise, it is 
   *     resolved before its value is injected into controller.
   *
   * <pre>resolve: ***REMOVED***
   *     myResolve1:
   *       function($http, $stateParams) ***REMOVED***
   *         return $http.get("/api/foos/"+stateParams.fooID);
   *   ***REMOVED***
   * ***REMOVED***</pre>
   *
   * @param ***REMOVED***string=***REMOVED*** stateConfig.url
   * <a id='url'></a>
   *
   *   A url fragment with optional parameters. When a state is navigated or
   *   transitioned to, the `$stateParams` service will be populated with any 
   *   parameters that were passed.
   *
   * examples:
   * <pre>url: "/home"
   * url: "/users/:userid"
   * url: "/books/***REMOVED***bookid:[a-zA-Z_-]***REMOVED***"
   * url: "/books/***REMOVED***categoryid:int***REMOVED***"
   * url: "/books/***REMOVED***publishername:string***REMOVED***/***REMOVED***categoryid:int***REMOVED***"
   * url: "/messages?before&after"
   * url: "/messages?***REMOVED***before:date***REMOVED***&***REMOVED***after:date***REMOVED***"</pre>
   * url: "/messages/:mailboxid?***REMOVED***before:date***REMOVED***&***REMOVED***after:date***REMOVED***"
   *
   * @param ***REMOVED***object=***REMOVED*** stateConfig.views
   * <a id='views'></a>
   * an optional map&lt;string, object&gt; which defined multiple views, or targets views
   * manually/explicitly.
   *
   * Examples:
   *
   * Targets three named `ui-view`s in the parent state's template
   * <pre>views: ***REMOVED***
   *     header: ***REMOVED***
   *       controller: "headerCtrl",
   *       templateUrl: "header.html"
   * ***REMOVED***, body: ***REMOVED***
   *       controller: "bodyCtrl",
   *       templateUrl: "body.html"
   * ***REMOVED***, footer: ***REMOVED***
   *       controller: "footCtrl",
   *       templateUrl: "footer.html"
   * ***REMOVED***
   * ***REMOVED***</pre>
   *
   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
   * <pre>views: ***REMOVED***
   *     'header@top': ***REMOVED***
   *       controller: "msgHeaderCtrl",
   *       templateUrl: "msgHeader.html"
   * ***REMOVED***, 'body': ***REMOVED***
   *       controller: "messagesCtrl",
   *       templateUrl: "messages.html"
   * ***REMOVED***
   * ***REMOVED***</pre>
   *
   * @param ***REMOVED***boolean=***REMOVED*** [stateConfig.abstract=false]
   * <a id='abstract'></a>
   * An abstract state will never be directly activated,
   *   but can provide inherited properties to its common children states.
   * <pre>abstract: true</pre>
   *
   * @param ***REMOVED***function=***REMOVED*** stateConfig.onEnter
   * <a id='onEnter'></a>
   *
   * Callback function for when a state is entered. Good way
   *   to trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onEnter: function(MyService, $stateParams) ***REMOVED***
   *     MyService.foo($stateParams.myParam);
   * ***REMOVED***</pre>
   *
   * @param ***REMOVED***function=***REMOVED*** stateConfig.onExit
   * <a id='onExit'></a>
   *
   * Callback function for when a state is exited. Good way to
   *   trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onExit: function(MyService, $stateParams) ***REMOVED***
   *     MyService.cleanup($stateParams.myParam);
   * ***REMOVED***</pre>
   *
   * @param ***REMOVED***boolean=***REMOVED*** [stateConfig.reloadOnSearch=true]
   * <a id='reloadOnSearch'></a>
   *
   * If `false`, will not retrigger the same state
   *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
   *   Useful for when you'd like to modify $location.search() without triggering a reload.
   * <pre>reloadOnSearch: false</pre>
   *
   * @param ***REMOVED***object=***REMOVED*** stateConfig.data
   * <a id='data'></a>
   *
   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
   *   prototypally inherited.  In other words, adding a data property to a state adds it to
   *   the entire subtree via prototypal inheritance.
   *
   * <pre>data: ***REMOVED***
   *     requiredRole: 'foo'
   * ***REMOVED*** </pre>
   *
   * @param ***REMOVED***object=***REMOVED*** stateConfig.params
   * <a id='params'></a>
   *
   * A map which optionally configures parameters declared in the `url`, or
   *   defines additional non-url parameters.  For each parameter being
   *   configured, add a configuration object keyed to the name of the parameter.
   *
   *   Each parameter configuration object may contain the following properties:
   *
   *   - ** value ** - ***REMOVED***object|function=***REMOVED***: specifies the default value for this
   *     parameter.  This implicitly sets this parameter as optional.
   *
   *     When UI-Router routes to a state and no value is
   *     specified for this parameter in the URL or transition, the
   *     default value will be used instead.  If `value` is a function,
   *     it will be injected and invoked, and the return value used.
   *
   *     *Note*: `undefined` is treated as "no default value" while `null`
   *     is treated as "the default value is `null`".
   *
   *     *Shorthand*: If you only need to configure the default value of the
   *     parameter, you may use a shorthand syntax.   In the **`params`**
   *     map, instead mapping the param name to a full parameter configuration
   *     object, simply set map it to the default parameter value, e.g.:
   *
   * <pre>// define a parameter's default value
   * params: ***REMOVED***
   *     param1: ***REMOVED*** value: "defaultValue" ***REMOVED***
   * ***REMOVED***
   * // shorthand default values
   * params: ***REMOVED***
   *     param1: "defaultValue",
   *     param2: "param2Default"
   * ***REMOVED***</pre>
   *
   *   - ** array ** - ***REMOVED***boolean=***REMOVED***: *(default: false)* If true, the param value will be
   *     treated as an array of values.  If you specified a Type, the value will be
   *     treated as an array of the specified Type.  Note: query parameter values
   *     default to a special `"auto"` mode.
   *
   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
   *     are mapped to an array (e.g.: `***REMOVED*** foo: [ '1', '2', '3' ] ***REMOVED***`).  However, if
   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
   *     value (e.g.: `***REMOVED*** foo: '1' ***REMOVED***`).
   *
   * <pre>params: ***REMOVED***
   *     param1: ***REMOVED*** array: true ***REMOVED***
   * ***REMOVED***</pre>
   *
   *   - ** squash ** - ***REMOVED***bool|string=***REMOVED***: `squash` configures how a default parameter value is represented in the URL when
   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
   *     configured default squash policy.
   *     (See ***REMOVED***@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`***REMOVED***)
   *
   *   There are three squash settings:
   *
   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
   *       This can allow for cleaner looking URLs.
   *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
   *
   * <pre>params: ***REMOVED***
   *     param1: ***REMOVED***
   *       value: "defaultId",
   *       squash: true
   * ***REMOVED*** ***REMOVED***
   * // squash "defaultValue" to "~"
   * params: ***REMOVED***
   *     param1: ***REMOVED***
   *       value: "defaultValue",
   *       squash: "~"
   * ***REMOVED*** ***REMOVED***
   * </pre>
   *
   *
   * @example
   * <pre>
   * // Some state name examples
   *
   * // stateName can be a single top-level name (must be unique).
   * $stateProvider.state("home", ***REMOVED******REMOVED***);
   *
   * // Or it can be a nested state name. This state is a child of the
   * // above "home" state.
   * $stateProvider.state("home.newest", ***REMOVED******REMOVED***);
   *
   * // Nest states as deeply as needed.
   * $stateProvider.state("home.newest.abc.xyz.inception", ***REMOVED******REMOVED***);
   *
   * // state() returns $stateProvider, so you can chain state declarations.
   * $stateProvider
   *   .state("home", ***REMOVED******REMOVED***)
   *   .state("about", ***REMOVED******REMOVED***)
   *   .state("contacts", ***REMOVED******REMOVED***);
   * </pre>
   *
   */
  this.state = state;
  function state(name, definition) ***REMOVED***
    /*jshint validthis: true */
    if (isObject(name)) definition = name;
    else definition.name = name;
    registerState(definition);
    return this;
***REMOVED***

  /**
   * @ngdoc object
   * @name ui.router.state.$state
   *
   * @requires $rootScope
   * @requires $q
   * @requires ui.router.state.$view
   * @requires $injector
   * @requires ui.router.util.$resolve
   * @requires ui.router.state.$stateParams
   * @requires ui.router.router.$urlRouter
   *
   * @property ***REMOVED***object***REMOVED*** params A param object, e.g. ***REMOVED***sectionId: section.id)***REMOVED***, that 
   * you'd like to test against the current active state.
   * @property ***REMOVED***object***REMOVED*** current A reference to the state's config object. However 
   * you passed it in. Useful for accessing custom data.
   * @property ***REMOVED***object***REMOVED*** transition Currently pending transition. A promise that'll 
   * resolve or reject.
   *
   * @description
   * `$state` service is responsible for representing states as well as transitioning
   * between them. It also provides interfaces to ask for current state or even states
   * you're coming from.
   */
  this.$get = $get;
  $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$urlRouter', '$location', '$urlMatcherFactory'];
  function $get(   $rootScope,   $q,   $view,   $injector,   $resolve,   $stateParams,   $urlRouter,   $location,   $urlMatcherFactory) ***REMOVED***

    var TransitionSuperseded = $q.reject(new Error('transition superseded'));
    var TransitionPrevented = $q.reject(new Error('transition prevented'));
    var TransitionAborted = $q.reject(new Error('transition aborted'));
    var TransitionFailed = $q.reject(new Error('transition failed'));

    // Handles the case where a state which is the target of a transition is not found, and the user
    // can optionally retry or defer the transition
    function handleRedirect(redirect, state, params, options) ***REMOVED***
      /**
       * @ngdoc event
       * @name ui.router.state.$state#$stateNotFound
       * @eventOf ui.router.state.$state
       * @eventType broadcast on root scope
       * @description
       * Fired when a requested state **cannot be found** using the provided state name during transition.
       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
       *
       * @param ***REMOVED***Object***REMOVED*** event Event object.
       * @param ***REMOVED***Object***REMOVED*** unfoundState Unfound State information. Contains: `to, toParams, options` properties.
       * @param ***REMOVED***State***REMOVED*** fromState Current state object.
       * @param ***REMOVED***Object***REMOVED*** fromParams Current state params.
       *
       * @example
       *
       * <pre>
       * // somewhere, assume lazy.state has not been defined
       * $state.go("lazy.state", ***REMOVED***a:1, b:2***REMOVED***, ***REMOVED***inherit:false***REMOVED***);
       *
       * // somewhere else
       * $scope.$on('$stateNotFound',
       * function(event, unfoundState, fromState, fromParams)***REMOVED***
       *     console.log(unfoundState.to); // "lazy.state"
       *     console.log(unfoundState.toParams); // ***REMOVED***a:1, b:2***REMOVED***
       *     console.log(unfoundState.options); // ***REMOVED***inherit:false***REMOVED*** + default options
       * ***REMOVED***)
       * </pre>
       */
      var evt = $rootScope.$broadcast('$stateNotFound', redirect, state, params);

      if (evt.defaultPrevented) ***REMOVED***
        $urlRouter.update();
        return TransitionAborted;
  ***REMOVED***

      if (!evt.retry) ***REMOVED***
        return null;
  ***REMOVED***

      // Allow the handler to return a promise to defer state lookup retry
      if (options.$retry) ***REMOVED***
        $urlRouter.update();
        return TransitionFailed;
  ***REMOVED***
      var retryTransition = $state.transition = $q.when(evt.retry);

      retryTransition.then(function() ***REMOVED***
        if (retryTransition !== $state.transition) return TransitionSuperseded;
        redirect.options.$retry = true;
        return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
  ***REMOVED***, function() ***REMOVED***
        return TransitionAborted;
  ***REMOVED***);
      $urlRouter.update();

      return retryTransition;
***REMOVED***

    root.locals = ***REMOVED*** resolve: null, globals: ***REMOVED*** $stateParams: ***REMOVED******REMOVED*** ***REMOVED*** ***REMOVED***;

    $state = ***REMOVED***
      params: ***REMOVED******REMOVED***,
      current: root.self,
      $current: root,
      transition: null
***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#reload
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method that force reloads the current state. All resolves are re-resolved, events are not re-fired, 
     * and controllers reinstantiated (bug with controllers reinstantiating right now, fixing soon).
     *
     * @example
     * <pre>
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) ***REMOVED***
     *   $scope.reload = function()***REMOVED***
     *     $state.reload();
     * ***REMOVED***
     * ***REMOVED***);
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, ***REMOVED*** 
     *   reload: true, inherit: false, notify: true
     * ***REMOVED***);
     * </pre>
     *
     * @returns ***REMOVED***promise***REMOVED*** A promise representing the state of the new transition. See
     * ***REMOVED***@link ui.router.state.$state#methods_go $state.go***REMOVED***.
     */
    $state.reload = function reload() ***REMOVED***
      return $state.transitionTo($state.current, $stateParams, ***REMOVED*** reload: true, inherit: false, notify: true ***REMOVED***);
***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#go
     * @methodOf ui.router.state.$state
     *
     * @description
     * Convenience method for transitioning to a new state. `$state.go` calls 
     * `$state.transitionTo` internally but automatically sets options to 
     * `***REMOVED*** location: true, inherit: true, relative: $state.$current, notify: true ***REMOVED***`. 
     * This allows you to easily use an absolute or relative to path and specify 
     * only the parameters you'd like to update (while letting unspecified parameters 
     * inherit from the currently active ancestor states).
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) ***REMOVED***
     *   $scope.changeState = function () ***REMOVED***
     *     $state.go('contact.detail');
     * ***REMOVED***;
     * ***REMOVED***);
     * </pre>
     * <img src='../ngdoc_assets/StateGoExamples.png'/>
     *
     * @param ***REMOVED***string***REMOVED*** to Absolute state name or relative state path. Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to a parent state
     * - `$state.go('^.sibling')` - will go to a sibling state
     * - `$state.go('.child.grandchild')` - will go to grandchild state
     *
     * @param ***REMOVED***object=***REMOVED*** params A map of the parameters that will be sent to the state, 
     * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
     * defined parameters. This allows, for example, going to a sibling state that shares parameters
     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
     * will get you all current parameters, etc.
     * @param ***REMOVED***object=***REMOVED*** options Options object. The options are:
     *
     * - **`location`** - ***REMOVED***boolean=true|string=***REMOVED*** - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - ***REMOVED***boolean=true***REMOVED***, If `true` will inherit url parameters from current url.
     * - **`relative`** - ***REMOVED***object=$state.$current***REMOVED***, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - ***REMOVED***boolean=true***REMOVED***, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - ***REMOVED***boolean=false***REMOVED***, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *
     * @returns ***REMOVED***promise***REMOVED*** A promise representing the state of the new transition.
     *
     * Possible success values:
     *
     * - $state.current
     *
     * <br/>Possible rejection values:
     *
     * - 'transition superseded' - when a newer transition has been started after this one
     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
     *   when a `$stateNotFound` `event.retry` promise errors.
     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
     * - *resolve error* - when an error has occurred with a `resolve`
     *
     */
    $state.go = function go(to, params, options) ***REMOVED***
      return $state.transitionTo(to, params, extend(***REMOVED*** inherit: true, relative: $state.$current ***REMOVED***, options));
***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#transitionTo
     * @methodOf ui.router.state.$state
     *
     * @description
     * Low-level method for transitioning to a new state. ***REMOVED***@link ui.router.state.$state#methods_go $state.go***REMOVED***
     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) ***REMOVED***
     *   $scope.changeState = function () ***REMOVED***
     *     $state.transitionTo('contact.detail');
     * ***REMOVED***;
     * ***REMOVED***);
     * </pre>
     *
     * @param ***REMOVED***string***REMOVED*** to State name.
     * @param ***REMOVED***object=***REMOVED*** toParams A map of the parameters that will be sent to the state,
     * will populate $stateParams.
     * @param ***REMOVED***object=***REMOVED*** options Options object. The options are:
     *
     * - **`location`** - ***REMOVED***boolean=true|string=***REMOVED*** - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - ***REMOVED***boolean=false***REMOVED***, If `true` will inherit url parameters from current url.
     * - **`relative`** - ***REMOVED***object=***REMOVED***, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - ***REMOVED***boolean=true***REMOVED***, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - ***REMOVED***boolean=false***REMOVED***, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *
     * @returns ***REMOVED***promise***REMOVED*** A promise representing the state of the new transition. See
     * ***REMOVED***@link ui.router.state.$state#methods_go $state.go***REMOVED***.
     */
    $state.transitionTo = function transitionTo(to, toParams, options) ***REMOVED***
      toParams = toParams || ***REMOVED******REMOVED***;
      options = extend(***REMOVED***
        location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false
  ***REMOVED***, options || ***REMOVED******REMOVED***);

      var from = $state.$current, fromParams = $state.params, fromPath = from.path;
      var evt, toState = findState(to, options.relative);

      if (!isDefined(toState)) ***REMOVED***
        var redirect = ***REMOVED*** to: to, toParams: toParams, options: options ***REMOVED***;
        var redirectResult = handleRedirect(redirect, from.self, fromParams, options);

        if (redirectResult) ***REMOVED***
          return redirectResult;
    ***REMOVED***

        // Always retry once if the $stateNotFound was not prevented
        // (handles either redirect changed or state lazy-definition)
        to = redirect.to;
        toParams = redirect.toParams;
        options = redirect.options;
        toState = findState(to, options.relative);

        if (!isDefined(toState)) ***REMOVED***
          if (!options.relative) throw new Error("No such state '" + to + "'");
          throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
    ***REMOVED***
  ***REMOVED***
      if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
      if (options.inherit) toParams = inheritParams($stateParams, toParams || ***REMOVED******REMOVED***, $state.$current, toState);
      if (!toState.params.$$validates(toParams)) return TransitionFailed;

      toParams = toState.params.$$values(toParams);
      to = toState;

      var toPath = to.path;

      // Starting from the root of the path, keep all levels that haven't changed
      var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];

      if (!options.reload) ***REMOVED***
        while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) ***REMOVED***
          locals = toLocals[keep] = state.locals;
          keep++;
          state = toPath[keep];
    ***REMOVED***
  ***REMOVED***

      // If we're going to the same state and all locals are kept, we've got nothing to do.
      // But clear 'transition', as we still want to cancel any other pending transitions.
      // TODO: We may not want to bump 'transition' if we're called from a location change
      // that we've initiated ourselves, because we might accidentally abort a legitimate
      // transition initiated from code?
      if (shouldTriggerReload(to, from, locals, options)) ***REMOVED***
        if (to.self.reloadOnSearch !== false) $urlRouter.update();
        $state.transition = null;
        return $q.when($state.current);
  ***REMOVED***

      // Filter parameters before we pass them to event handlers etc.
      toParams = filterByKeys(to.params.$$keys(), toParams || ***REMOVED******REMOVED***);

      // Broadcast start event and cancel the transition if requested
      if (options.notify) ***REMOVED***
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeStart
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when the state transition **begins**. You can use `event.preventDefault()`
         * to prevent the transition from happening and then the transition promise will be
         * rejected with a `'transition prevented'` value.
         *
         * @param ***REMOVED***Object***REMOVED*** event Event object.
         * @param ***REMOVED***State***REMOVED*** toState The state being transitioned to.
         * @param ***REMOVED***Object***REMOVED*** toParams The params supplied to the `toState`.
         * @param ***REMOVED***State***REMOVED*** fromState The current state, pre-transition.
         * @param ***REMOVED***Object***REMOVED*** fromParams The params supplied to the `fromState`.
         *
         * @example
         *
         * <pre>
         * $rootScope.$on('$stateChangeStart',
         * function(event, toState, toParams, fromState, fromParams)***REMOVED***
         *     event.preventDefault();
         *     // transitionTo() promise will be rejected with
         *     // a 'transition prevented' error
         * ***REMOVED***)
         * </pre>
         */
        if ($rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams).defaultPrevented) ***REMOVED***
          $urlRouter.update();
          return TransitionPrevented;
    ***REMOVED***
  ***REMOVED***

      // Resolve locals for the remaining states, but don't update any global state just
      // yet -- if anything fails to resolve the current state needs to remain untouched.
      // We also set up an inheritance chain for the locals here. This allows the view directive
      // to quickly look up the correct definition for each view in the current state. Even
      // though we create the locals object itself outside resolveState(), it is initially
      // empty and gets filled asynchronously. We need to keep track of the promise for the
      // (fully resolved) current locals, and pass this down the chain.
      var resolved = $q.when(locals);

      for (var l = keep; l < toPath.length; l++, state = toPath[l]) ***REMOVED***
        locals = toLocals[l] = inherit(locals);
        resolved = resolveState(state, toParams, state === to, resolved, locals, options);
  ***REMOVED***

      // Once everything is resolved, we are ready to perform the actual transition
      // and return a promise for the new state. We also keep track of what the
      // current promise is, so that we can detect overlapping transitions and
      // keep only the outcome of the last transition.
      var transition = $state.transition = resolved.then(function () ***REMOVED***
        var l, entering, exiting;

        if ($state.transition !== transition) return TransitionSuperseded;

        // Exit 'from' states not kept
        for (l = fromPath.length - 1; l >= keep; l--) ***REMOVED***
          exiting = fromPath[l];
          if (exiting.self.onExit) ***REMOVED***
            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
      ***REMOVED***
          exiting.locals = null;
    ***REMOVED***

        // Enter 'to' states not kept
        for (l = keep; l < toPath.length; l++) ***REMOVED***
          entering = toPath[l];
          entering.locals = toLocals[l];
          if (entering.self.onEnter) ***REMOVED***
            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
      ***REMOVED***
    ***REMOVED***

        // Run it again, to catch any transitions in callbacks
        if ($state.transition !== transition) return TransitionSuperseded;

        // Update globals in $state
        $state.$current = to;
        $state.current = to.self;
        $state.params = toParams;
        copy($state.params, $stateParams);
        $state.transition = null;

        if (options.location && to.navigable) ***REMOVED***
          $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, ***REMOVED***
            $$avoidResync: true, replace: options.location === 'replace'
      ***REMOVED***);
    ***REMOVED***

        if (options.notify) ***REMOVED***
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeSuccess
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired once the state transition is **complete**.
         *
         * @param ***REMOVED***Object***REMOVED*** event Event object.
         * @param ***REMOVED***State***REMOVED*** toState The state being transitioned to.
         * @param ***REMOVED***Object***REMOVED*** toParams The params supplied to the `toState`.
         * @param ***REMOVED***State***REMOVED*** fromState The current state, pre-transition.
         * @param ***REMOVED***Object***REMOVED*** fromParams The params supplied to the `fromState`.
         */
          $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
    ***REMOVED***
        $urlRouter.update(true);

        return $state.current;
  ***REMOVED***, function (error) ***REMOVED***
        if ($state.transition !== transition) return TransitionSuperseded;

        $state.transition = null;
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeError
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when an **error occurs** during transition. It's important to note that if you
         * have any errors in your resolve functions (javascript errors, non-existent services, etc)
         * they will not throw traditionally. You must listen for this $stateChangeError event to
         * catch **ALL** errors.
         *
         * @param ***REMOVED***Object***REMOVED*** event Event object.
         * @param ***REMOVED***State***REMOVED*** toState The state being transitioned to.
         * @param ***REMOVED***Object***REMOVED*** toParams The params supplied to the `toState`.
         * @param ***REMOVED***State***REMOVED*** fromState The current state, pre-transition.
         * @param ***REMOVED***Object***REMOVED*** fromParams The params supplied to the `fromState`.
         * @param ***REMOVED***Error***REMOVED*** error The resolve error object.
         */
        evt = $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);

        if (!evt.defaultPrevented) ***REMOVED***
            $urlRouter.update();
    ***REMOVED***

        return $q.reject(error);
  ***REMOVED***);

      return transition;
***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#is
     * @methodOf ui.router.state.$state
     *
     * @description
     * Similar to ***REMOVED***@link ui.router.state.$state#methods_includes $state.includes***REMOVED***,
     * but only checks for the full state name. If params is supplied then it will be
     * tested for strict equality against the current active params object, so all params
     * must match with none missing and no extras.
     *
     * @example
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="***REMOVED***highlighted: $state.is('.item')***REMOVED***">Item</div>
     * </pre>
     *
     * @param ***REMOVED***string|object***REMOVED*** stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param ***REMOVED***object=***REMOVED*** params A param object, e.g. `***REMOVED***sectionId: section.id***REMOVED***`, that you'd like
     * to test against the current active state.
     * @param ***REMOVED***object=***REMOVED*** options An options object.  The options are:
     *
     * - **`relative`** - ***REMOVED***string|object***REMOVED*** -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
     * test relative to `options.relative` state (or name).
     *
     * @returns ***REMOVED***boolean***REMOVED*** Returns true if it is the state.
     */
    $state.is = function is(stateOrName, params, options) ***REMOVED***
      options = extend(***REMOVED*** relative: $state.$current ***REMOVED***, options || ***REMOVED******REMOVED***);
      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) ***REMOVED*** return undefined; ***REMOVED***
      if ($state.$current !== state) ***REMOVED*** return false; ***REMOVED***
      return params ? equalForKeys(state.params.$$values(params), $stateParams) : true;
***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#includes
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * @example
     * Partial and relative names
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     *
     * // Using relative names (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="***REMOVED***highlighted: $state.includes('.item')***REMOVED***">Item</div>
     * </pre>
     *
     * Basic globbing patterns
     * <pre>
     * $state.$current.name = 'contacts.details.item.url';
     *
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * </pre>
     *
     * @param ***REMOVED***string***REMOVED*** stateOrName A partial name, relative name, or glob pattern
     * to be searched for within the current state name.
     * @param ***REMOVED***object=***REMOVED*** params A param object, e.g. `***REMOVED***sectionId: section.id***REMOVED***`,
     * that you'd like to test against the current active state.
     * @param ***REMOVED***object=***REMOVED*** options An options object.  The options are:
     *
     * - **`relative`** - ***REMOVED***string|object=***REMOVED*** -  If `stateOrName` is a relative state reference and `options.relative` is set,
     * .includes will test relative to `options.relative` state (or name).
     *
     * @returns ***REMOVED***boolean***REMOVED*** Returns true if it does include the state
     */
    $state.includes = function includes(stateOrName, params, options) ***REMOVED***
      options = extend(***REMOVED*** relative: $state.$current ***REMOVED***, options || ***REMOVED******REMOVED***);
      if (isString(stateOrName) && isGlob(stateOrName)) ***REMOVED***
        if (!doesStateMatchGlob(stateOrName)) ***REMOVED***
          return false;
    ***REMOVED***
        stateOrName = $state.$current.name;
  ***REMOVED***

      var state = findState(stateOrName, options.relative);
      if (!isDefined(state)) ***REMOVED*** return undefined; ***REMOVED***
      if (!isDefined($state.$current.includes[state.name])) ***REMOVED*** return false; ***REMOVED***
      return params ? equalForKeys(state.params.$$values(params), $stateParams, objectKeys(params)) : true;
***REMOVED***;


    /**
     * @ngdoc function
     * @name ui.router.state.$state#href
     * @methodOf ui.router.state.$state
     *
     * @description
     * A url generation method that returns the compiled url for the given state populated with the given params.
     *
     * @example
     * <pre>
     * expect($state.href("about.person", ***REMOVED*** person: "bob" ***REMOVED***)).toEqual("/about/bob");
     * </pre>
     *
     * @param ***REMOVED***string|object***REMOVED*** stateOrName The state name or state object you'd like to generate a url from.
     * @param ***REMOVED***object=***REMOVED*** params An object of parameter values to fill the state's required parameters.
     * @param ***REMOVED***object=***REMOVED*** options Options object. The options are:
     *
     * - **`lossy`** - ***REMOVED***boolean=true***REMOVED*** -  If true, and if there is no url associated with the state provided in the
     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
     *    ancestor with a valid url).
     * - **`inherit`** - ***REMOVED***boolean=true***REMOVED***, If `true` will inherit url parameters from current url.
     * - **`relative`** - ***REMOVED***object=$state.$current***REMOVED***, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`absolute`** - ***REMOVED***boolean=false***REMOVED***,  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     * 
     * @returns ***REMOVED***string***REMOVED*** compiled state url
     */
    $state.href = function href(stateOrName, params, options) ***REMOVED***
      options = extend(***REMOVED***
        lossy:    true,
        inherit:  true,
        absolute: false,
        relative: $state.$current
  ***REMOVED***, options || ***REMOVED******REMOVED***);

      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) return null;
      if (options.inherit) params = inheritParams($stateParams, params || ***REMOVED******REMOVED***, $state.$current, state);
      
      var nav = (state && options.lossy) ? state.navigable : state;

      if (!nav || nav.url === undefined || nav.url === null) ***REMOVED***
        return null;
  ***REMOVED***
      return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys(), params || ***REMOVED******REMOVED***), ***REMOVED***
        absolute: options.absolute
  ***REMOVED***);
***REMOVED***;

    /**
     * @ngdoc function
     * @name ui.router.state.$state#get
     * @methodOf ui.router.state.$state
     *
     * @description
     * Returns the state configuration object for any specific state or all states.
     *
     * @param ***REMOVED***string|object=***REMOVED*** stateOrName (absolute or relative) If provided, will only get the config for
     * the requested state. If not provided, returns an array of ALL state configs.
     * @param ***REMOVED***string|object=***REMOVED*** context When stateOrName is a relative state reference, the state will be retrieved relative to context.
     * @returns ***REMOVED***Object|Array***REMOVED*** State configuration object or array of all objects.
     */
    $state.get = function (stateOrName, context) ***REMOVED***
      if (arguments.length === 0) return map(objectKeys(states), function(name) ***REMOVED*** return states[name].self; ***REMOVED***);
      var state = findState(stateOrName, context || $state.$current);
      return (state && state.self) ? state.self : null;
***REMOVED***;

    function resolveState(state, params, paramsAreFiltered, inherited, dst, options) ***REMOVED***
      // Make a restricted $stateParams with only the parameters that apply to this state if
      // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
      // we also need $stateParams to be available for any $injector calls we make during the
      // dependency resolution process.
      var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);
      var locals = ***REMOVED*** $stateParams: $stateParams ***REMOVED***;

      // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
      // We're also including $stateParams in this; that way the parameters are restricted
      // to the set that should be visible to the state, and are independent of when we update
      // the global $state and $stateParams values.
      dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
      var promises = [dst.resolve.then(function (globals) ***REMOVED***
        dst.globals = globals;
  ***REMOVED***)];
      if (inherited) promises.push(inherited);

      // Resolve template and dependencies for all views.
      forEach(state.views, function (view, name) ***REMOVED***
        var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : ***REMOVED******REMOVED***);
        injectables.$template = [ function () ***REMOVED***
          return $view.load(name, ***REMOVED*** view: view, locals: locals, params: $stateParams, notify: options.notify ***REMOVED***) || '';
    ***REMOVED***];

        promises.push($resolve.resolve(injectables, locals, dst.resolve, state).then(function (result) ***REMOVED***
          // References to the controller (only instantiated at link time)
          if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) ***REMOVED***
            var injectLocals = angular.extend(***REMOVED******REMOVED***, injectables, locals);
            result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
      ***REMOVED*** else ***REMOVED***
            result.$$controller = view.controller;
      ***REMOVED***
          // Provide access to the state itself for internal use
          result.$$state = state;
          result.$$controllerAs = view.controllerAs;
          dst[name] = result;
    ***REMOVED***));
  ***REMOVED***);

      // Wait for all the promises and then return the activation object
      return $q.all(promises).then(function (values) ***REMOVED***
        return dst;
  ***REMOVED***);
***REMOVED***

    return $state;
***REMOVED***

  function shouldTriggerReload(to, from, locals, options) ***REMOVED***
    if (to === from && ((locals === from.locals && !options.reload) || (to.self.reloadOnSearch === false))) ***REMOVED***
      return true;
***REMOVED***
***REMOVED***
***REMOVED***

angular.module('ui.router.state')
  .value('$stateParams', ***REMOVED******REMOVED***)
  .provider('$state', $StateProvider);


$ViewProvider.$inject = [];
function $ViewProvider() ***REMOVED***

  this.$get = $get;
  /**
   * @ngdoc object
   * @name ui.router.state.$view
   *
   * @requires ui.router.util.$templateFactory
   * @requires $rootScope
   *
   * @description
   *
   */
  $get.$inject = ['$rootScope', '$templateFactory'];
  function $get(   $rootScope,   $templateFactory) ***REMOVED***
    return ***REMOVED***
      // $view.load('full.viewName', ***REMOVED*** template: ..., controller: ..., resolve: ..., async: false, params: ... ***REMOVED***)
      /**
       * @ngdoc function
       * @name ui.router.state.$view#load
       * @methodOf ui.router.state.$view
       *
       * @description
       *
       * @param ***REMOVED***string***REMOVED*** name name
       * @param ***REMOVED***object***REMOVED*** options option object.
       */
      load: function load(name, options) ***REMOVED***
        var result, defaults = ***REMOVED***
          template: null, controller: null, view: null, locals: null, notify: true, async: true, params: ***REMOVED******REMOVED***
    ***REMOVED***;
        options = extend(defaults, options);

        if (options.view) ***REMOVED***
          result = $templateFactory.fromConfig(options.view, options.params, options.locals);
    ***REMOVED***
        if (result && options.notify) ***REMOVED***
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$viewContentLoading
         * @eventOf ui.router.state.$view
         * @eventType broadcast on root scope
         * @description
         *
         * Fired once the view **begins loading**, *before* the DOM is rendered.
         *
         * @param ***REMOVED***Object***REMOVED*** event Event object.
         * @param ***REMOVED***Object***REMOVED*** viewConfig The view config properties (template, controller, etc).
         *
         * @example
         *
         * <pre>
         * $scope.$on('$viewContentLoading',
         * function(event, viewConfig)***REMOVED***
         *     // Access to all the view config properties.
         *     // and one special property 'targetView'
         *     // viewConfig.targetView
         * ***REMOVED***);
         * </pre>
         */
          $rootScope.$broadcast('$viewContentLoading', options);
    ***REMOVED***
        return result;
  ***REMOVED***
***REMOVED***;
***REMOVED***
***REMOVED***

angular.module('ui.router.state').provider('$view', $ViewProvider);

/**
 * @ngdoc object
 * @name ui.router.state.$uiViewScrollProvider
 *
 * @description
 * Provider that returns the ***REMOVED***@link ui.router.state.$uiViewScroll***REMOVED*** service function.
 */
function $ViewScrollProvider() ***REMOVED***

  var useAnchorScroll = false;

  /**
   * @ngdoc function
   * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
   * @methodOf ui.router.state.$uiViewScrollProvider
   *
   * @description
   * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
   * scrolling based on the url anchor.
   */
  this.useAnchorScroll = function () ***REMOVED***
    useAnchorScroll = true;
***REMOVED***;

  /**
   * @ngdoc object
   * @name ui.router.state.$uiViewScroll
   *
   * @requires $anchorScroll
   * @requires $timeout
   *
   * @description
   * When called with a jqLite element, it scrolls the element into view (after a
   * `$timeout` so the DOM has time to refresh).
   *
   * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
   * this can be enabled by calling ***REMOVED***@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`***REMOVED***.
   */
  this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) ***REMOVED***
    if (useAnchorScroll) ***REMOVED***
      return $anchorScroll;
***REMOVED***

    return function ($element) ***REMOVED***
      $timeout(function () ***REMOVED***
        $element[0].scrollIntoView();
  ***REMOVED***, 0, false);
***REMOVED***;
***REMOVED***];
***REMOVED***

angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-view
 *
 * @requires ui.router.state.$state
 * @requires $compile
 * @requires $controller
 * @requires $injector
 * @requires ui.router.state.$uiViewScroll
 * @requires $document
 *
 * @restrict ECA
 *
 * @description
 * The ui-view directive tells $state where to place your templates.
 *
 * @param ***REMOVED***string=***REMOVED*** name A view name. The name should be unique amongst the other views in the
 * same state. You can have views of the same name that live in different states.
 *
 * @param ***REMOVED***string=***REMOVED*** autoscroll It allows you to set the scroll behavior of the browser window
 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
 * service, ***REMOVED***@link ui.router.state.$uiViewScroll***REMOVED***. This custom service let's you
 * scroll ui-view elements into view when they are populated during a state activation.
 *
 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
 *
 * @param ***REMOVED***string=***REMOVED*** onload Expression to evaluate whenever the view updates.
 * 
 * @example
 * A view can be unnamed or named. 
 * <pre>
 * <!-- Unnamed -->
 * <div ui-view></div> 
 * 
 * <!-- Named -->
 * <div ui-view="viewName"></div>
 * </pre>
 *
 * You can only have one unnamed view within any template (or root html). If you are only using a 
 * single view and it is unnamed then you can populate it like so:
 * <pre>
 * <div ui-view></div> 
 * $stateProvider.state("home", ***REMOVED***
 *   template: "<h1>HELLO!</h1>"
 * ***REMOVED***)
 * </pre>
 * 
 * The above is a convenient shortcut equivalent to specifying your view explicitly with the ***REMOVED***@link ui.router.state.$stateProvider#views `views`***REMOVED***
 * config property, by name, in this case an empty name:
 * <pre>
 * $stateProvider.state("home", ***REMOVED***
 *   views: ***REMOVED***
 *     "": ***REMOVED***
 *       template: "<h1>HELLO!</h1>"
 * ***REMOVED***
 * ***REMOVED***    
 * ***REMOVED***)
 * </pre>
 * 
 * But typically you'll only use the views property if you name your view or have more than one view 
 * in the same template. There's not really a compelling reason to name a view if its the only one, 
 * but you could if you wanted, like so:
 * <pre>
 * <div ui-view="main"></div>
 * </pre> 
 * <pre>
 * $stateProvider.state("home", ***REMOVED***
 *   views: ***REMOVED***
 *     "main": ***REMOVED***
 *       template: "<h1>HELLO!</h1>"
 * ***REMOVED***
 * ***REMOVED***    
 * ***REMOVED***)
 * </pre>
 * 
 * Really though, you'll use views to set up multiple views:
 * <pre>
 * <div ui-view></div>
 * <div ui-view="chart"></div> 
 * <div ui-view="data"></div> 
 * </pre>
 * 
 * <pre>
 * $stateProvider.state("home", ***REMOVED***
 *   views: ***REMOVED***
 *     "": ***REMOVED***
 *       template: "<h1>HELLO!</h1>"
 * ***REMOVED***,
 *     "chart": ***REMOVED***
 *       template: "<chart_thing/>"
 * ***REMOVED***,
 *     "data": ***REMOVED***
 *       template: "<data_thing/>"
 * ***REMOVED***
 * ***REMOVED***    
 * ***REMOVED***)
 * </pre>
 *
 * Examples for `autoscroll`:
 *
 * <pre>
 * <!-- If autoscroll present with no expression,
 *      then scroll ui-view into view -->
 * <ui-view autoscroll/>
 *
 * <!-- If autoscroll present with valid expression,
 *      then scroll ui-view into view if expression evaluates to true -->
 * <ui-view autoscroll='true'/>
 * <ui-view autoscroll='false'/>
 * <ui-view autoscroll='scopeVariable'/>
 * </pre>
 */
$ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll', '$interpolate'];
function $ViewDirective(   $state,   $injector,   $uiViewScroll,   $interpolate) ***REMOVED***

  function getService() ***REMOVED***
    return ($injector.has) ? function(service) ***REMOVED***
      return $injector.has(service) ? $injector.get(service) : null;
***REMOVED*** : function(service) ***REMOVED***
      try ***REMOVED***
        return $injector.get(service);
  ***REMOVED*** catch (e) ***REMOVED***
        return null;
  ***REMOVED***
***REMOVED***;
***REMOVED***

  var service = getService(),
      $animator = service('$animator'),
      $animate = service('$animate');

  // Returns a set of DOM manipulation functions based on which Angular version
  // it should use
  function getRenderer(attrs, scope) ***REMOVED***
    var statics = function() ***REMOVED***
      return ***REMOVED***
        enter: function (element, target, cb) ***REMOVED*** target.after(element); cb(); ***REMOVED***,
        leave: function (element, cb) ***REMOVED*** element.remove(); cb(); ***REMOVED***
  ***REMOVED***;
***REMOVED***;

    if ($animate) ***REMOVED***
      return ***REMOVED***
        enter: function(element, target, cb) ***REMOVED***
          var promise = $animate.enter(element, null, target, cb);
          if (promise && promise.then) promise.then(cb);
    ***REMOVED***,
        leave: function(element, cb) ***REMOVED***
          var promise = $animate.leave(element, cb);
          if (promise && promise.then) promise.then(cb);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

    if ($animator) ***REMOVED***
      var animate = $animator && $animator(scope, attrs);

      return ***REMOVED***
        enter: function(element, target, cb) ***REMOVED***animate.enter(element, null, target); cb(); ***REMOVED***,
        leave: function(element, cb) ***REMOVED*** animate.leave(element); cb(); ***REMOVED***
  ***REMOVED***;
***REMOVED***

    return statics();
***REMOVED***

  var directive = ***REMOVED***
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    compile: function (tElement, tAttrs, $transclude) ***REMOVED***
      return function (scope, $element, attrs) ***REMOVED***
        var previousEl, currentEl, currentScope, latestLocals,
            onloadExp     = attrs.onload || '',
            autoScrollExp = attrs.autoscroll,
            renderer      = getRenderer(attrs, scope);

        scope.$on('$stateChangeSuccess', function() ***REMOVED***
          updateView(false);
    ***REMOVED***);
        scope.$on('$viewContentLoading', function() ***REMOVED***
          updateView(false);
    ***REMOVED***);

        updateView(true);

        function cleanupLastView() ***REMOVED***
          if (previousEl) ***REMOVED***
            previousEl.remove();
            previousEl = null;
      ***REMOVED***

          if (currentScope) ***REMOVED***
            currentScope.$destroy();
            currentScope = null;
      ***REMOVED***

          if (currentEl) ***REMOVED***
            renderer.leave(currentEl, function() ***REMOVED***
              previousEl = null;
        ***REMOVED***);

            previousEl = currentEl;
            currentEl = null;
      ***REMOVED***
    ***REMOVED***

        function updateView(firstTime) ***REMOVED***
          var newScope,
              name            = getUiViewName(scope, attrs, $element, $interpolate),
              previousLocals  = name && $state.$current && $state.$current.locals[name];

          if (!firstTime && previousLocals === latestLocals) return; // nothing to do
          newScope = scope.$new();
          latestLocals = $state.$current.locals[name];

          var clone = $transclude(newScope, function(clone) ***REMOVED***
            renderer.enter(clone, $element, function onUiViewEnter() ***REMOVED***
              if(currentScope) ***REMOVED***
                currentScope.$emit('$viewContentAnimationEnded');
          ***REMOVED***

              if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) ***REMOVED***
                $uiViewScroll(clone);
          ***REMOVED***
        ***REMOVED***);
            cleanupLastView();
      ***REMOVED***);

          currentEl = clone;
          currentScope = newScope;
          /**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoaded
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description           *
           * Fired once the view is **loaded**, *after* the DOM is rendered.
           *
           * @param ***REMOVED***Object***REMOVED*** event Event object.
           */
          currentScope.$emit('$viewContentLoaded');
          currentScope.$eval(onloadExp);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
***REMOVED***;

  return directive;
***REMOVED***

$ViewDirectiveFill.$inject = ['$compile', '$controller', '$state', '$interpolate'];
function $ViewDirectiveFill (  $compile,   $controller,   $state,   $interpolate) ***REMOVED***
  return ***REMOVED***
    restrict: 'ECA',
    priority: -400,
    compile: function (tElement) ***REMOVED***
      var initial = tElement.html();
      return function (scope, $element, attrs) ***REMOVED***
        var current = $state.$current,
            name = getUiViewName(scope, attrs, $element, $interpolate),
            locals  = current && current.locals[name];

        if (! locals) ***REMOVED***
          return;
    ***REMOVED***

        $element.data('$uiView', ***REMOVED*** name: name, state: locals.$$state ***REMOVED***);
        $element.html(locals.$template ? locals.$template : initial);

        var link = $compile($element.contents());

        if (locals.$$controller) ***REMOVED***
          locals.$scope = scope;
          var controller = $controller(locals.$$controller, locals);
          if (locals.$$controllerAs) ***REMOVED***
            scope[locals.$$controllerAs] = controller;
      ***REMOVED***
          $element.data('$ngControllerController', controller);
          $element.children().data('$ngControllerController', controller);
    ***REMOVED***

        link(scope);
  ***REMOVED***;
***REMOVED***
***REMOVED***;
***REMOVED***

/**
 * Shared ui-view code for both directives:
 * Given scope, element, and its attributes, return the view's name
 */
function getUiViewName(scope, attrs, element, $interpolate) ***REMOVED***
  var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
  var inherited = element.inheritedData('$uiView');
  return name.indexOf('@') >= 0 ?  name :  (name + '@' + (inherited ? inherited.state.name : ''));
***REMOVED***

angular.module('ui.router.state').directive('uiView', $ViewDirective);
angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);

function parseStateRef(ref, current) ***REMOVED***
  var preparsed = ref.match(/^\s*(***REMOVED***[^***REMOVED***]****REMOVED***)\s*$/), parsed;
  if (preparsed) ref = current + '(' + preparsed[1] + ')';
  parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
  if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
  return ***REMOVED*** state: parsed[1], paramExpr: parsed[3] || null ***REMOVED***;
***REMOVED***

function stateContext(el) ***REMOVED***
  var stateData = el.parent().inheritedData('$uiView');

  if (stateData && stateData.state && stateData.state.name) ***REMOVED***
    return stateData.state;
***REMOVED***
***REMOVED***

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref
 *
 * @requires ui.router.state.$state
 * @requires $timeout
 *
 * @restrict A
 *
 * @description
 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated 
 * URL, the directive will automatically generate & update the `href` attribute via 
 * the ***REMOVED***@link ui.router.state.$state#methods_href $state.href()***REMOVED*** method. Clicking 
 * the link will trigger a state transition with optional parameters. 
 *
 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be 
 * handled natively by the browser.
 *
 * You can also use relative state paths within ui-sref, just like the relative 
 * paths passed to `$state.go()`. You just need to be aware that the path is relative
 * to the state that the link lives in, in other words the state that loaded the 
 * template containing the link.
 *
 * You can specify options to pass to ***REMOVED***@link ui.router.state.$state#go $state.go()***REMOVED***
 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
 * and `reload`.
 *
 * @example
 * Here's an example of how you'd use ui-sref and how it would compile. If you have the 
 * following template:
 * <pre>
 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="***REMOVED***page: 2***REMOVED***">Next page</a>
 * 
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a ui-sref="contacts.detail(***REMOVED*** id: contact.id ***REMOVED***)">***REMOVED******REMOVED*** contact.name ***REMOVED******REMOVED***</a>
 *     </li>
 * </ul>
 * </pre>
 * 
 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
 * <pre>
 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="***REMOVED***page: 2***REMOVED***">Next page</a>
 * 
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/1" ui-sref="contacts.detail(***REMOVED*** id: contact.id ***REMOVED***)">Joe</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/2" ui-sref="contacts.detail(***REMOVED*** id: contact.id ***REMOVED***)">Alice</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/3" ui-sref="contacts.detail(***REMOVED*** id: contact.id ***REMOVED***)">Bob</a>
 *     </li>
 * </ul>
 *
 * <a ui-sref="home" ui-sref-opts="***REMOVED***reload: true***REMOVED***">Home</a>
 * </pre>
 *
 * @param ***REMOVED***string***REMOVED*** ui-sref 'stateName' can be any valid absolute or relative state
 * @param ***REMOVED***Object***REMOVED*** ui-sref-opts options to pass to ***REMOVED***@link ui.router.state.$state#go $state.go()***REMOVED***
 */
$StateRefDirective.$inject = ['$state', '$timeout'];
function $StateRefDirective($state, $timeout) ***REMOVED***
  var allowedOptions = ['location', 'inherit', 'reload'];

  return ***REMOVED***
    restrict: 'A',
    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
    link: function(scope, element, attrs, uiSrefActive) ***REMOVED***
      var ref = parseStateRef(attrs.uiSref, $state.current.name);
      var params = null, url = null, base = stateContext(element) || $state.$current;
      var newHref = null, isAnchor = element.prop("tagName") === "A";
      var isForm = element[0].nodeName === "FORM";
      var attr = isForm ? "action" : "href", nav = true;

      var options = ***REMOVED*** relative: base, inherit: true ***REMOVED***;
      var optionsOverride = scope.$eval(attrs.uiSrefOpts) || ***REMOVED******REMOVED***;

      angular.forEach(allowedOptions, function(option) ***REMOVED***
        if (option in optionsOverride) ***REMOVED***
          options[option] = optionsOverride[option];
    ***REMOVED***
  ***REMOVED***);

      var update = function(newVal) ***REMOVED***
        if (newVal) params = angular.copy(newVal);
        if (!nav) return;

        newHref = $state.href(ref.state, params, options);

        var activeDirective = uiSrefActive[1] || uiSrefActive[0];
        if (activeDirective) ***REMOVED***
          activeDirective.$$setStateInfo(ref.state, params);
    ***REMOVED***
        if (newHref === null) ***REMOVED***
          nav = false;
          return false;
    ***REMOVED***
        attrs.$set(attr, newHref);
  ***REMOVED***;

      if (ref.paramExpr) ***REMOVED***
        scope.$watch(ref.paramExpr, function(newVal, oldVal) ***REMOVED***
          if (newVal !== params) update(newVal);
    ***REMOVED***, true);
        params = angular.copy(scope.$eval(ref.paramExpr));
  ***REMOVED***
      update();

      if (isForm) return;

      element.bind("click", function(e) ***REMOVED***
        var button = e.which || e.button;
        if ( !(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr('target')) ) ***REMOVED***
          // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
          var transition = $timeout(function() ***REMOVED***
            $state.go(ref.state, params, options);
      ***REMOVED***);
          e.preventDefault();

          // if the state has no URL, ignore one preventDefault from the <a> directive.
          var ignorePreventDefaultCount = isAnchor && !newHref ? 1: 0;
          e.preventDefault = function() ***REMOVED***
            if (ignorePreventDefaultCount-- <= 0)
              $timeout.cancel(transition);
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
***REMOVED***;
***REMOVED***

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * A directive working alongside ui-sref to add classes to an element when the
 * related ui-sref directive's state is active, and removing them when it is inactive.
 * The primary use-case is to simplify the special appearance of navigation menus
 * relying on `ui-sref`, by having the "active" state's menu button appear different,
 * distinguishing it from the inactive menu items.
 *
 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
 * ui-sref-active found at the same level or above the ui-sref will be used.
 *
 * Will activate when the ui-sref's target state or any child state is active. If you
 * need to activate only when the ui-sref target state is active and *not* any of
 * it's children, then you will use
 * ***REMOVED***@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq***REMOVED***
 *
 * @example
 * Given the following template:
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item">
 *     <a href ui-sref="app.user(***REMOVED***user: 'bilbobaggins'***REMOVED***)">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 *
 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item active">
 *     <a ui-sref="app.user(***REMOVED***user: 'bilbobaggins'***REMOVED***)" href="/users/bilbobaggins">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 * The class name is interpolated **once** during the directives link time (any further changes to the
 * interpolated value are ignored).
 *
 * Multiple classes may be specified in a space-separated format:
 * <pre>
 * <ul>
 *   <li ui-sref-active='class1 class2 class3'>
 *     <a ui-sref="app.user">link</a>
 *   </li>
 * </ul>
 * </pre>
 */

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active-eq
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * The same as ***REMOVED***@link ui.router.state.directive:ui-sref-active ui-sref-active***REMOVED*** but will only activate
 * when the exact target state used in the `ui-sref` is active; no child states.
 *
 */
$StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
function $StateRefActiveDirective($state, $stateParams, $interpolate) ***REMOVED***
  return  ***REMOVED***
    restrict: "A",
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) ***REMOVED***
      var state, params, activeClass;

      // There probably isn't much point in $observing this
      // uiSrefActive and uiSrefActiveEq share the same directive object with some
      // slight difference in logic routing
      activeClass = $interpolate($attrs.uiSrefActiveEq || $attrs.uiSrefActive || '', false)($scope);

      // Allow uiSref to communicate with uiSrefActive[Equals]
      this.$$setStateInfo = function (newState, newParams) ***REMOVED***
        state = $state.get(newState, stateContext($element));
        params = newParams;
        update();
  ***REMOVED***;

      $scope.$on('$stateChangeSuccess', update);

      // Update route state
      function update() ***REMOVED***
        if (isMatch()) ***REMOVED***
          $element.addClass(activeClass);
    ***REMOVED*** else ***REMOVED***
          $element.removeClass(activeClass);
    ***REMOVED***
  ***REMOVED***

      function isMatch() ***REMOVED***
        if (typeof $attrs.uiSrefActiveEq !== 'undefined') ***REMOVED***
          return state && $state.is(state.name, params);
    ***REMOVED*** else ***REMOVED***
          return state && $state.includes(state.name, params);
    ***REMOVED***
  ***REMOVED***
***REMOVED***]
***REMOVED***;
***REMOVED***

angular.module('ui.router.state')
  .directive('uiSref', $StateRefDirective)
  .directive('uiSrefActive', $StateRefActiveDirective)
  .directive('uiSrefActiveEq', $StateRefActiveDirective);

/**
 * @ngdoc filter
 * @name ui.router.state.filter:isState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to ***REMOVED***@link ui.router.state.$state#methods_is $state.is("stateName")***REMOVED***.
 */
$IsStateFilter.$inject = ['$state'];
function $IsStateFilter($state) ***REMOVED***
  var isFilter = function (state) ***REMOVED***
    return $state.is(state);
***REMOVED***;
  isFilter.$stateful = true;
  return isFilter;
***REMOVED***

/**
 * @ngdoc filter
 * @name ui.router.state.filter:includedByState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to ***REMOVED***@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')***REMOVED***.
 */
$IncludedByStateFilter.$inject = ['$state'];
function $IncludedByStateFilter($state) ***REMOVED***
  var includesFilter = function (state) ***REMOVED***
    return $state.includes(state);
***REMOVED***;
  includesFilter.$stateful = true;
  return  includesFilter;
***REMOVED***

angular.module('ui.router.state')
  .filter('isState', $IsStateFilter)
  .filter('includedByState', $IncludedByStateFilter);
***REMOVED***)(window, window.angular);