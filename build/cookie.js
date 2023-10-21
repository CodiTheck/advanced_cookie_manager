/**
* @project CookieManager - https://CodiTheck.github.io/advanced_cookie_manager
* @fileoverview Manages application cookies data inside a browser.
* @author Obrymec - obrymecsprinces@gmail.com
* @type {CookieManager}
* @created 2023-10-16
* @updated 2023-10-20
* @file cookie.ts
* @version 0.0.1
*/
// Enumerations.
/**
 * @description All supported
 * 	encoding methods.
 * @exports EncodingMethod
 * @public
 * @enum {
 * 	HEXADECIMAL,
 *  BASE_64,
 *  BINARY,
 *  OCTAL
 * }
 */
export var EncodingMethod;
(function (EncodingMethod) {
    EncodingMethod[EncodingMethod["HEXADECIMAL"] = 0] = "HEXADECIMAL";
    EncodingMethod[EncodingMethod["BASE_64"] = 1] = "BASE_64";
    EncodingMethod[EncodingMethod["BINARY"] = 2] = "BINARY";
    EncodingMethod[EncodingMethod["OCTAL"] = 3] = "OCTAL";
})(EncodingMethod || (EncodingMethod = {}));
;
/**
 * @description All supported
 * 	mutation types.
 * @exports MutationType
 * @public
 * @enum {
 *  UPDATE,
 *  DELETE,
 * 	ADD
 * }
 */
export var MutationType;
(function (MutationType) {
    MutationType[MutationType["UPDATE"] = 0] = "UPDATE";
    MutationType[MutationType["DELETE"] = 1] = "DELETE";
    MutationType[MutationType["ADD"] = 2] = "ADD";
})(MutationType || (MutationType = {}));
;
/**
 * @description All supported
 * 	samesite states.
 * @exports SameSite
 * @public
 * @enum {
 * 	STRICT,
 *  NONE,
 *  LAX
 * }
 */
export var SameSite;
(function (SameSite) {
    SameSite[SameSite["STRICT"] = 0] = "STRICT";
    SameSite[SameSite["NONE"] = 1] = "NONE";
    SameSite[SameSite["LAX"] = 2] = "LAX";
})(SameSite || (SameSite = {}));
;
/**
 * @classdesc Manages application
 *  cookies data inside a browser.
 * @type {CookieManager}
 * @public
 * @class
 */
var CookieManager = /** @class */ (function () {
    /**
       * @description Initializes
     *  the cookie manager data.
     * @fires constructor#onReady
       * @constructor
       */
    function CookieManager(_a) {
        var _this = this;
        var encodingMethod = _a.encodingMethod, defaultData = _a.defaultData, partitioned = _a.partitioned, autoCommit = _a.autoCommit, storeName = _a.storeName, lifeTime = _a.lifeTime, onMutate = _a.onMutate, sameSite = _a.sameSite, autoLoad = _a.autoLoad, onReady = _a.onReady, domain = _a.domain, secure = _a.secure, path = _a.path;
        /**
         * @description Whether we want
         *  to store cookies using a
         *  partitioned storage.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
         * @private {boolean=}
         * @type {boolean=}
         * @field
         */
        this.partitioned_ = false;
        /**
         * @description Whether we want
         *  to automate the background
         *  save process.
         * @private {boolean=}
         * @type {boolean=}
         * @field
         */
        this.autoCommit_ = true;
        /**
         * @description Whether we want
         *  to automate the background
         *  load process.
         * @private {boolean=}
         * @type {boolean=}
         * @field
         */
        this.autoLoad_ = true;
        /**
         * @description Specifies that
         *  the cookie should only be
         *  transmitted over a secure
         *  protocol.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
         * @private {boolean=}
         * @type {boolean=}
         * @field
         */
        this.secure_ = false;
        /**
         * @description The cookies data.
         * @field
         * @private {
         *  Map<String, Object>=
         * }
         * @type {
         *  Map<String, Object>=
         * }
         */
        this.store_ = (new Map());
        /**
         * @description Returns the
         *  current samesite state.
         * @function getSameSite
         * @public
         * @returns {SameSite} SameSite
         */
        this.getSameSite = function () { return _this.sameSite_; };
        /**
         * @description Whether we want
         *  leave the manager to save
         *  cookies data dynamically.
         * @function isAutoCommit
         * @public
         * @returns {boolean} boolean
         */
        this.isAutoCommit = function () { return _this.autoCommit_; };
        /**
         * @description Whether we want
         *  leave the manager to load
         *  cookies data dynamically.
         * @function isAutoLoad
         * @public
         * @returns {boolean} boolean
         */
        this.isAutoLoad = function () { return _this.autoLoad_; };
        /**
         * @description Whether cookies
         *  storage is secured.
         * @function isSecured
         * @public
         * @returns {boolean} boolean
         */
        this.isSecured = function () { return _this.secure_; };
        /**
         * @description Returns the
         *  current cookies life
         *  time.
         * @function getLifeTime
         * @public
         * @returns {?(Date|number)} any
         */
        this.getLifeTime = function () { return _this.lifeTime_; };
        /**
         * @description Returns the
         *  current storage's name.
         * @function getStoreName
         * @public
         * @returns {?String} ?String
         */
        this.getStoreName = function () { return _this.storeName_; };
        /**
         * @description Returns the
         *  current domain's name.
         * @function getDomain
         * @public
         * @returns {?String} ?String
         */
        this.getDomain = function () { return _this.domain_; };
        /**
         * @description Returns the
         *  current cookies data.
         * @function getData
         * @public
         * @returns {
         *  Map<String, any>
         * } Map
         */
        this.getData = function () { return _this.store_; };
        /**
         * @description Returns the
         *  current cookies path.
         * @function getPath
         * @public
         * @returns {?String} ?String
         */
        this.getPath = function () { return _this.path_; };
        /**
         * @description Returns the
         *  current encoding method.
         * @function getEncodingMethod
         * @public
         * @returns {
         *  EncodingMethod
         * } EncodingMethod
         */
        this.getEncodingMethod = function () { return (_this.encodingMethod_); };
        /**
         * @description Whether cookies
         *  storage is partitioned.
         * @function isPartitioned
         * @public
         * @returns {boolean} boolean
         */
        this.isPartitioned = function () { return (_this.partitioned_); };
        // Initializes the encoding
        // method.
        this.setEncodingMethod_(encodingMethod === undefined
            ? EncodingMethod.BASE_64
            : encodingMethod);
        // Initializes the store
        // with the default data.
        this.store_ = (defaultData instanceof Map
            ? defaultData : this.store_);
        // Initializes partitioned.
        this.allowPartitioning_(partitioned === undefined
            ? false : partitioned);
        // Initializes auto commit.
        this.autoCommit(autoCommit === undefined
            ? true : autoCommit);
        // Initializes samesite.
        this.setSameSite_(sameSite === undefined ?
            SameSite.LAX : sameSite);
        // Initializes auto load.
        this.autoLoad(autoLoad === undefined ?
            true : autoLoad);
        // Initializes life time.
        this.setLifeTime_(lifeTime === undefined
            ? 31536000 : lifeTime);
        // Initializes `onMutate`
        // event.
        this.onMutate(onMutate === undefined
            ? null : onMutate);
        // Initializes secure.
        this.allowSecure_(secure === undefined ?
            false : secure);
        // Initializes the domain.
        this.setDomain_(domain === undefined ?
            null : domain);
        // Initializes `onReady`
        // event.
        this.onReady(onReady === undefined
            ? null : onReady);
        // Initializes the path.
        this.setPath_(path === undefined ?
            '/' : path);
        // Initializes the store
        // name.
        this.setStoreName_(storeName);
        // Whether the auto load
        // is allowed.
        if (this.autoLoad_) {
            // Loads store from the
            // document cookie.
            this.load();
        }
        // Whether `ready` event
        // is listening.
        if (typeof this.onReady_
            === "function") {
            /**
             * @description Calls `ready`
             *  event.
             * @event constructor#onReady
             * @readonly
             * @emit
             * @property {CookieManager} ref
             *  The current object instance
             *  of the cookie manager.
             */
            this.onReady_(this);
        }
    }
    /**
     * @description Returns the
     *  cookies data size.
     * @function size
     * @public
     * @returns {int} int
     */
    CookieManager.prototype.getSize = function () {
        // Sends the current
        // store size.
        return this.store_.size;
    };
    /**
     * @description Throws an error.
     * @param {String} message The
     *  error message to display.
     * @private {Function}
     * @function error_
     * @returns {never} never
     */
    CookieManager.prototype.error_ = function (message) {
        // Launches an error
        // with the given
        // message.
        throw new Error(message.replace(/[\n\t]/g, ''));
    };
    /**
     * @description Deletes all
     *  existing cookie(s) from
     *  the manager.
     * @function clear
     * @public
     * @returns {void} void
     */
    CookieManager.prototype.clear = function () {
        // Removes all defined
        // keys with their
        // associated value.
        this.store_.clear();
        // Whether the auto
        // save is allowed.
        if (this.autoCommit_) {
            // Destroys the store
            // from the document
            // cookie.
            this.removeKey_(this.encodeStore_()
                .name);
        }
    };
    /**
     * @description Saves stored
     *  data into the document
     *  cookie.
     * @private {Function}
     * @function commit
     * @returns {void} void
     */
    CookieManager.prototype.commit = function () {
        // Whether the store is
        // not empty.
        if (this.store_.size > 0) {
            // The encoded shape of
            // the global store.
            var _a = (this.encodeStore_()), name_1 = _a.name, data = _a.data;
            // Overrides the defined
            // document cookie
            // configurations.
            this.setConfigs_(name_1, data, true);
        }
    };
    /**
     * @description Checks whether a
     *  key exists in the document
     *  cookie.
     * @param {String} key The key's
     *  name to check.
     * @function isKeyDefined_
     * @private {Function}
     * @returns {boolean} boolean
     */
    CookieManager.prototype.isKeyDefined_ = function (key) {
        // Whether the passed key
        // is really defined in
        // the document cookie.
        return (document.cookie.toLowerCase()
            .replace(/ /g, '')
            .includes(key.toLowerCase()
            .replace(/ /g, '')));
    };
    /**
     * @description Removes a key
     *  from the document cookie.
     * @param {String} key The
     *  key's name to clear.
     * @function removeKey_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.removeKey_ = function (key) {
        // Removes the passed key
        // from the document
        // cookie.
        document.cookie = (document.cookie.replace(new RegExp("\\s*".concat(key, "=?[\\w\\W]*;?"), "gi"), ''));
        // Removes left and right
        // spaces from the document
        // cookie.
        document.cookie = (document.cookie.trim());
    };
    /**
     * @description Sets `autoLoad`
     *  field value.
     * @param {boolean} state The
     *  new value of the field.
     * @function autoLoad
     * @public
     * @returns {void} void
     */
    CookieManager.prototype.autoLoad = function (state) {
        // Whether the passed state
        // is a real boolean.
        if (typeof state === "boolean") {
            // Updates the field.
            this.autoLoad_ = state;
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A boolean \n        value is required to perform \n        this operation. Check the \n        passed value and make sure \n        to have a boolean value.\n      ");
        }
    };
    /**
     * @description Sets `autoCommit`
     *  field value.
     * @param {boolean} state The
     *  new value of the field.
     * @function autoCommit
     * @public
     * @returns {void} void
     */
    CookieManager.prototype.autoCommit = function (state) {
        // Whether the passed state
        // is a real boolean.
        if (typeof state === "boolean") {
            // Updates the field.
            this.autoCommit_ = state;
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A boolean \n        value is required to perform \n        this operation. Check the \n        passed value and make sure \n        to have a boolean value.\n      ");
        }
    };
    /**
     * @description Checks whether
     *  a key's name is valid.
     * @param {String} key The
     *  key's name to check.
     * @function isValidKeyName_
     * @private {Function}
     * @returns {boolean} boolean
     */
    CookieManager.prototype.isValidKeyName_ = function (key) {
        // Whether the current key
        // name is a real string.
        if (typeof key === "string" &&
            key.trim().length > 0) {
            // Sends a truthy value.
            return true;
            // Otherwise.
        }
        else {
            // Invalid cookie name
            // format.
            this.error_("\n        Invalid cookie's name \n        format. Any cookie's \n        name must be a non-\n        empty string.\n      ");
        }
    };
    /**
     * @description Overrides
     *  the callback method
     *  for `onMutate` event.
     * @param {?Function} slot
     *  The new callback method
     *  to call when `onMutate`
     *  event throws.
     * @function onMutate
     * @public
     * @returns {void} void
     */
    CookieManager.prototype.onMutate = function (slot) {
        // Whether the passed value
        // is a function or `null`.
        if (typeof slot === "function"
            || slot === null) {
            // Updates this field.
            this.onMutate_ = slot;
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A function \n        is required to perform this \n        operation. Check the passed \n        value and make sure to have \n        a callback method. If you \n        want to dissolve any listen \n        on that event, you can \n        pass `null`.\n      ");
        }
    };
    /**
     * @description Overrides
     *  the callback method
     *  for `onReady` event.
     * @param {?Function} slot
     *  The new callback method
     *  to call when `onReady`
     *  event throws.
     * @function onReady
     * @public
     * @returns {void} void
     */
    CookieManager.prototype.onReady = function (slot) {
        // Whether the passed value
        // is a function or `null`.
        if (typeof slot === "function"
            || slot === null) {
            // Updates this field.
            this.onReady_ = slot;
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A function \n        is required to perform this \n        operation. Check the passed \n        value and make sure to have \n        a callback method. If you \n        want to dissolve any listen \n        on that event, you can \n        pass `null`.\n      ");
        }
    };
    /**
     * @description Sets `storeName`
     *  field value.
     * @param {String} value
     *  The new value of this
     *  field.
     * @function setStoreName_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.setStoreName_ = function (value) {
        // Whether the given value
        // is a string.
        if (typeof value === "string" &&
            value.trim().length > 0) {
            // Updates this field.
            this.storeName_ = value;
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A string \n        is required to perform this \n        operation. Check the passed \n        value and make sure to have \n        a string. It's mandatory to \n        give a store's name.\n      ");
        }
    };
    /**
     * @description Sets `sameSite`
     *  field value.
     * @param {SameSite} value
     *  The new value of this
     *  field.
     * @function setSameSite_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.setSameSite_ = function (value) {
        // Whether the given value
        // is in range `STRICT`,
        // `NONE` and `LAX`.
        if (value === SameSite.STRICT ||
            value === SameSite.NONE ||
            value === SameSite.LAX) {
            // Updates this field.
            this.sameSite_ = value;
            // Updates the document
            // cookie about that.
            this.setConfigs_("SameSite", value, false);
            // Otherwise.
        }
        else {
            // Invalid constant value.
            this.error_("\n        Invalid constant value. \n        The possible values are: \n        `STRICT`, `NONE` \n        and `LAX`.\n      ");
        }
    };
    /**
     * @description Sets `encodingMethod`
     *  field value.
     * @param {EncodingMethod} value The
     *  new value of this field.
     * @function setEncodingMethod_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.setEncodingMethod_ = function (value) {
        // Whether the given value is
        // in the range `HEXADECIMAL`,
        // `BASE_64`, `BINARY` and
        // `OCTAL`.
        if (value === EncodingMethod.HEXADECIMAL ||
            value === EncodingMethod.BASE_64 ||
            value === EncodingMethod.BINARY ||
            value === EncodingMethod.OCTAL) {
            // Updates this field.
            this.encodingMethod_ = value;
            // Otherwise.
        }
        else {
            // Invalid constant value.
            this.error_("\n        Invalid constant value. The \n        possible values are: \n        `HEXADECIMAL`, `BASE_64`, \n        `BINARY` and `OCTAL`.\n      ");
        }
    };
    /**
     * @description Loads stored
     *  data from the document
     *  cookie.
     * @function load
     * @public
     * @returns {void} void
     */
    CookieManager.prototype.load = function () {
        var _this = this;
        // Loads data from the
        // browser document
        // cookie.
        var loaded = (this.decodeStore_());
        // Merging the loaded
        // store to the current
        // global store.
        loaded.forEach(function (value, key) {
            // Adds/Updates the
            // current key.
            _this.store_.set(key, value);
        });
    };
    /**
     * @description Sets `partitioned`
     *  field value.
     * @param {boolean} state The
     *  new value of the field.
     * @function allowPartitioning_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.allowPartitioning_ = function (state) {
        // Whether the given state
        // is a real boolean.
        if (typeof state === "boolean") {
            // Updates the field.
            this.partitioned_ = state;
            // Toggles this key inside
            // the document cookie
            // according to his
            // state.
            this.toggleKey_("Partitioned", state);
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A boolean \n        value is required to perform \n        this operation. Check the \n        passed value and make sure \n        to have a boolean value.\n      ");
        }
    };
    /**
     * @description Sets `secure`
     *  field value.
     * @param {boolean} state The
     *  new value of the field.
     * @function allowSecure_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.allowSecure_ = function (state) {
        // Whether the given state
        // is a real boolean.
        if (typeof state === "boolean") {
            // Updates the field.
            this.secure_ = state;
            // Toggles this key inside
            // the document cookie
            // according to his
            // state.
            this.toggleKey_("Secure", state);
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A boolean \n        value is required to perform \n        this operation. Check the \n        passed value and make sure \n        to have a boolean value.\n      ");
        }
    };
    /**
     * @description Toggles key definition
     *  inside document. This method is
     *  created to handle `secure` and
     *  `partitioned` cookie's fields.
     * @param {String} key The key's
     *  name to target.
     * @param {boolean} value The
     *  key's value.
     * @function toggleKey_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.toggleKey_ = function (key, value) {
        // Whether the given key
        // is already defined.
        if (this.isKeyDefined_(key)) {
            // Whether the value is
            // `false`.
            if (!value) {
                // Destroys the passed
                // key from the document
                // cookie.
                this.removeKey_(key);
            }
            // Otherwise.
        }
        else {
            // Whether the value is
            // `true`.
            if (value) {
                // Adds the passed key
                // to the document
                // cookie.
                this.createKey_(key, null, false);
            }
        }
    };
    /**
     * @description Encodes a string
     *  into the specified base.
     * @param {String} input The
     *  characters sequence to
     *  encode.
     * @param {number} base The
     *  final base of the given
     *  input after encoding.
     * @private {Function}
     * @function str2base_
     * @returns {String} String
     */
    CookieManager.prototype.str2base_ = function (input, base) {
        // Tries to encode the
        // passed string into
        // the given base.
        try {
            // Sends the basify version
            // of the given key with
            // some corrections.
            return (input.split('')
                .map(function (char) { return (char.charCodeAt(0)
                .toString(base)); }).join('_'));
            // An error occurred.
        }
        catch (exp) {
            // Makes a warn about some
            // potentials invalid chars
            // sequence.
            this.error_("\n        An error occurred during \n        data encoding. Make sure \n        to have no unwanted chars \n        in the passed string.\n      ");
        }
    };
    /**
     * @description Decodes a string
     *  into the specified base.
     * @param {String} encoded The
     *  characters sequence to
     *  decode.
     * @param {number} base The
     *  base that has been used
     *  during encoding process.
     * @private {Function}
     * @function base2str_
     * @returns {String} String
     */
    CookieManager.prototype.base2str_ = function (encoded, base) {
        // Tries to decode the
        // passed string.
        try {
            // Sends the decoded
            // string with some
            // corrections.
            return (encoded.split('_')
                .map(function (bin) { return (String.fromCharCode(parseInt(bin, base))); }).join(''));
            // An error occurred.
        }
        catch (exp) {
            // Makes a warn about some
            // potentials invalid chars
            // sequence from the
            // original input.
            this.error_("\n        An error occurred during \n        data decoding. Make sure \n        to have no unwanted chars \n        within the original input \n        before his encoding.\n      ");
        }
    };
    /**
     * @description Creates a key with
     *  his associated value inside
     *  the document cookie. If the
     *  value of the key is invalid,
     *  only key's name will be
     *  added.
     * @param {String} key The key's
     *  name to create/add.
     * @param {any} value The value
     *  associated to the passed key.
     * @param {boolean} prepend If
     *  we want to add the key at
     *  begin of the document
     *  cookie.
     * @function createKey_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.createKey_ = function (key, value, prepend) {
        // Whether the passed value
        // is `undefined` or `null`.
        var isValid = (value !== undefined
            && value !== null);
        // Whether the key must be
        // added at begin of the
        // document cookie.
        if (prepend) {
            // Adds the passed key at
            // begin of the document
            // cookie.
            document.cookie = ("".concat(key).concat((isValid ?
                "=".concat(value) : ''), "; ").concat(document.cookie));
            // Removes any semicolon(s)
            // and space(s) found at
            // the end of the document
            // cookie.
            document.cookie = (document.cookie.replace(/;+\s+$/, ''));
            // Otherwise.
        }
        else {
            // Adds the passed key at
            // the end of the document
            // cookie.
            document.cookie += (" ".concat(key).concat((isValid ?
                "=".concat(value) : '')));
            // Removes left and right
            // spaces from the document
            // cookie.
            document.cookie = (document.cookie.trim());
        }
    };
    /**
     * @description Overrides document
     *  cookie property dynamically.
     * @param {String} key The key's
     *  name to override/create.
     * @param {any} value The value
     *  associated to the passed
     *  key's name.
     * @param {boolean} prepend If
     *  we want to add the key at
     *  begin of cookie data when
     *  it not exist.
     * @function setConfigs_
     * @private {Function}
     * @returns {void}
     */
    CookieManager.prototype.setConfigs_ = function (key, value, prepend) {
        // Whether the given key
        // is already defined.
        if (this.isKeyDefined_(key)) {
            // Sets the target key
            // in the document
            // cookie.
            document.cookie = (document.cookie.replace(new RegExp("".concat(key, "=(\\w|\\W)+;?"), "gi"), "".concat(key, "=").concat(value, ";")));
            // Removes any semicolon(s)
            // found at the end of the 
            // document cookie.
            document.cookie = (document.cookie.replace(/;+$/, ''));
            // Otherwise.
        }
        else {
            // Creates the given key.
            this.createKey_(key, value, prepend);
        }
    };
    /**
     * @description Decodes an
     *  encoded string in base64
     *  to the original input.
     * @param {String} encoded
     *  The input to decode.
     * @function base642str_
     * @private {Function}
     * @returns {String} String
     */
    CookieManager.prototype.base642str_ = function (encoded) {
        // Tries to decode the
        // passed string.
        try {
            // Sends the decoded
            // string with some
            // corrections.
            return window.atob(encoded.endsWith('_')
                ? encoded.replace('_', '=')
                : (encoded.endsWith("__")
                    ? encoded.replace("__", "==")
                    : encoded));
            // An error occurred.
        }
        catch (exp) {
            // Makes a warn about some
            // potentials invalid chars
            // sequence from the
            // original input.
            this.error_("\n        An error occurred during \n        data decoding. Make sure \n        to have no unwanted chars \n        within the original input \n        before his encoding.\n      ");
        }
    };
    /**
     * @description Encodes a string
     *  into a valid base64 chars
     *  sequence for the document
     *  cookie.
     * @param {String} input The
     *  input to encode.
     * @function str2base64_
     * @private {Function}
     * @returns {String} String
     */
    CookieManager.prototype.str2base64_ = function (input) {
        // Tries to convert the
        // passed string.
        try {
            // The encoded string.
            var encoded = (window.btoa(input));
            // Sends the encoded
            // string with some
            // corrections.
            return (encoded.endsWith('=')
                ? encoded.replace('=', '_')
                : (encoded.endsWith("==")
                    ? encoded.replace("==", "__")
                    : encoded));
            // An error occurred.
        }
        catch (exp) {
            // Makes a warn about some
            // potentials invalid chars
            // sequence.
            this.error_("\n        An error occurred during \n        data encoding. Make sure \n        to have no unwanted chars \n        in the passed string.\n      ");
        }
    };
    /**
     * @description Sets `path`
     *  field value.
     * @param {?String} value
     *  The new value of this
     *  field.
     * @private {Function}
     * @function setPath_
     * @returns {void} void
     */
    CookieManager.prototype.setPath_ = function (value) {
        // Whether the passed
        // value is a filled
        // string.
        if (typeof value === "string" &&
            value.trim().length > 0) {
            // Updates the field.
            this.path_ = value;
            // Updates the document
            // cookie about that.
            this.setConfigs_("path", value, false);
            // Whether the passed
            // value is `null`.
        }
        else if (value === null) {
            // Removes this key
            // from the document
            // cookie.
            this.removeKey_("path");
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A string \n        is required to perform this \n        operation. Check the passed \n        value and make sure to have \n        a string. If you want to \n        comeback to the default \n        browser value, you can \n        pass `null`.\n      ");
        }
    };
    /**
     * @description Sets `domain`
     *  field value.
     * @param {?String} value
     *  The new value of this
     *  field.
     * @function setDomain_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.setDomain_ = function (value) {
        // Whether the passed
        // value is a filled
        // string.
        if (typeof value === "string" &&
            value.trim().length > 0) {
            // Updates the field.
            this.domain_ = value;
            // Updates the document
            // cookie about that.
            this.setConfigs_("domain", value, false);
            // Whether the passed
            // value is `null`.
        }
        else if (value === null) {
            // Removes this key
            // from the document
            // cookie.
            this.removeKey_("domain");
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A string \n        is required to perform this \n        operation. Check the passed \n        value and make sure to have \n        a string. If you want to \n        comeback to the default \n        browser value, you can \n        pass `null`.\n      ");
        }
    };
    /**
     * @description Parses the loaded
     *  data from the document cookie
     *  into a map.
     * @param {String} storeName
     *  The global store name.
     * @param {
     *  String Function(String)
     * } onParse Called before
     *  transform and convert
     *  the given data into a
     *  map.
     * @fires parseStore_#onParse
     * @function parseStore_
     * @private {Function}
     * @returns {
     *  Map<String, any>
     * } Map
     */
    CookieManager.prototype.parseStore_ = function (storeName, onParse) {
        // The fetched store.
        var fetchedStore = (this.getValueAt_(storeName));
        // Whether the loaded
        // data exists.
        if (typeof fetchedStore
            === "string") {
            /**
             * @description Calls `parse`
             *  event.
             * @property {String} store
             *  The fetched store from
             *  the document cookie.
             * @event parseStore_#onParse
             * @readonly
             * @emit
             */
            return (new Map(Object.entries(JSON.parse(onParse(fetchedStore)))));
            // No data exists.
        }
        else {
            // Sends an empty map.
            return (new Map());
        }
    };
    /**
     * @description Checks whether
     *  the given cookie(s) exists.
     * @param {Array<String>} names
     *  The cookie's name(s) to
     *  search.
     * @function has
     * @public
     * @returns {boolean} boolean
     */
    CookieManager.prototype.has = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        // Flattens the given params
        // data to avoid any sub
        // arrays.
        names = names.flat(64);
        // Searching key(s)
        // existance.
        for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
            var key = names_1[_a];
            // Whether the current key
            // name is a real string.
            if (this.isValidKeyName_(key)) {
                // Whether ever a key
                // is not defined.
                if (!this.store_.has(key)) {
                    // Sends a falsy value.
                    return false;
                }
            }
        }
        // All passed key(s)
        // are defined.
        return true;
    };
    /**
     * @description Retrieves the value
     *  associated to a specific key in
     *  the document cookie.
     * @param {string} key The key's
     *  name to target.
     * @param {any=} defaultValue The
     *  default value to return when
     *  the target key isn't defined.
     * @function getValueAt_
     * @private {Function}
     * @returns {any} any
     */
    CookieManager.prototype.getValueAt_ = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        // The found data.
        var foundData = (document.cookie.match(new RegExp("".concat(key, "=?[\\w\\W]*;?"), "gi")));
        // Whether the target key
        // exists.
        if (foundData != null) {
            // Whether the fetched
            // data has a value.
            if (foundData[0].includes('=')) {
                // Returns this value.
                return (foundData[0].split('=')[1].replace(/;+$/, ''));
                // Otherwise.
            }
            else {
                // Returns a truthy
                // value.
                return true;
            }
            // The target key is
            // undefined.
        }
        else {
            // Sends the default
            // value.
            return defaultValue;
        }
    };
    /**
     * @description Destroys the target
     *  cookie(s).
     * @param {Array<String>} names The
     *  cookie's name(s) to delete.
     * @fires delete#onMutate
     * @function delete
     * @public
     * @returns {void} void
     */
    CookieManager.prototype.delete = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        // Flattens the given params
        // data to avoid any sub
        // arrays.
        names = names.flat(64);
        // The removed key(s).
        var removed = {
            type: MutationType.DELETE,
            ref: this
        };
        // Removing key(s).
        for (var _a = 0, names_2 = names; _a < names_2.length; _a++) {
            var key = names_2[_a];
            // Whether the current
            // key is valid before
            // his destroying.
            if (this.isValidKeyName_(key)) {
                // The current key's value.
                var value = (this.store_.get(key));
                // Destroys the current
                // key with his value.
                if (this.store_.delete(key)) {
                    // Adds the deleted
                    // key to `removed`
                    // object.
                    removed[key] = value;
                }
            }
        }
        // Whether `mutate` event
        // is listening.
        if (typeof this.onMutate_
            === "function") {
            /**
             * @description Calls `mutate`
             *  event.
             * @property {
             *   Object<String, any>
             * } event The event's data.
             * @event delete#onMutates
             * @readonly
             * @emit
             */
            this.onMutate_(removed);
        }
    };
    /**
     * @description Sets `lifeTime`
     *  field value.
     * @param {?(Date|number)} value
     *  The new value of the field.
     * @function setLifeTime_
     * @private {Function}
     * @returns {void} void
     */
    CookieManager.prototype.setLifeTime_ = function (value) {
        // Whether the passed value
        // is a date.
        if (value instanceof Date) {
            // Updates the field.
            this.lifeTime_ = value;
            // Updates the document
            // cookie about that.
            this.setConfigs_("expires", value.toUTCString(), false);
            // Removes `max-age` key
            // from the document
            // cookie.
            this.removeKey_("max-age");
            // Whether the passed value
            // is an integer.
        }
        else if (typeof value === "number") {
            // Corrects the current
            // worth.
            value = Math.round(value);
            // Updates the field.
            this.lifeTime_ = value;
            // Updates the document
            // cookie about that.
            this.setConfigs_("max-age", value, false);
            // Removes `expires` key
            // from the document
            // cookie.
            this.removeKey_("expires");
            // Whether the passed value
            // is `null`.
        }
        else if (value === null) {
            // Removes `expires` key
            // from the document
            // cookie.
            this.removeKey_("expires");
            // Removes `max-age` key
            // from the document
            // cookie.
            this.removeKey_("max-age");
            // Otherwise.
        }
        else {
            // Invalid data type.
            this.error_("\n        Invalid data type. A number \n        or date is required to do \n        this operation. Check the \n        passed value and make sure \n        to have either a string, \n        either a date. If you want \n        to comeback to the default \n        browser value, you can \n        pass `null`.\n      ");
        }
    };
    /**
     * @description Encodes the
     *  current store data into
     *  the specified encoding
     *  method.
     * @function encodeStore_
     * @private {Function}
     * @returns {{
     *  name: String,
     *  data: String
     * }} Object
     */
    CookieManager.prototype.encodeStore_ = function () {
        // The stringify shape
        // of the global store.
        var store = (JSON.stringify(Object.fromEntries(this.store_)));
        // Whether the chosen
        // encoding method is
        // `BASE_64`.
        if (this.encodingMethod_ ===
            EncodingMethod.BASE_64) {
            // Encoding to base64.
            return {
                name: this.str2base64_(this.storeName_),
                data: this.str2base64_(store)
            };
            // Whether the chosen
            // encoding method is
            // `BINARY`.
        }
        else if (this.encodingMethod_ ===
            EncodingMethod.BINARY) {
            // Encoding to binary.
            return {
                name: this.str2base_(this.storeName_, 2),
                data: this.str2base_(store, 2)
            };
            // Whether the chosen
            // encoding method is
            // `OCTAL`.
        }
        else if (this.encodingMethod_ ===
            EncodingMethod.OCTAL) {
            // Encoding to octal.
            return {
                name: this.str2base_(this.storeName_, 8),
                data: this.str2base_(store, 8)
            };
            // Whether the chosen
            // encoding method is
            // `HEXADECIMAL`.
        }
        else if (this.encodingMethod_ ===
            EncodingMethod.HEXADECIMAL) {
            // Encoding to hexadecimal.
            return {
                name: this.str2base_(this.storeName_, 16),
                data: this.str2base_(store, 16)
            };
            // Otherwise.
        }
        else {
            // No encoding to do.
            return {
                name: this.storeName_,
                data: store
            };
        }
    };
    /**
     * @description Decodes the
     *  fetched store data with
     *  the specified encoding
     *  method.
     * @function decodeStore_
     * @private {Function}
     * @returns {
     *  Map<String, any>
     * } Map
     */
    CookieManager.prototype.decodeStore_ = function () {
        var _this = this;
        // Whether the chosen
        // decoding method is
        // `BASE_64`.
        if (this.encodingMethod_ ===
            EncodingMethod.BASE_64) {
            // Decoding from base64.
            return this.parseStore_(this.str2base64_(this.storeName_), function (encodedStore) { return (_this.base642str_(encodedStore)); });
            // Whether the chosen
            // decoding method is
            // `BINARY`.
        }
        else if (this.encodingMethod_ ===
            EncodingMethod.BINARY) {
            // Decoding from binary.
            return this.parseStore_(this.str2base_(this.storeName_, 2), function (encodedStore) { return (_this.base2str_(encodedStore, 2)); });
            // Whether the chosen
            // decoding method is
            // `OCTAL`.
        }
        else if (this.encodingMethod_ ===
            EncodingMethod.OCTAL) {
            // Decoding from octal.
            return this.parseStore_(this.str2base_(this.storeName_, 8), function (encodedStore) { return (_this.base2str_(encodedStore, 8)); });
            // Whether the chosen
            // decoding method is
            // `HEXADECIMAL`.
        }
        else if (this.encodingMethod_ ===
            EncodingMethod.HEXADECIMAL) {
            // Decoding from hexadecimal.
            return this.parseStore_(this.str2base_(this.storeName_, 16), function (encodedStore) { return (_this.base2str_(encodedStore, 16)); });
            // Otherwise.
        }
        else {
            // Don't decode any data.
            return this.parseStore_(this.storeName_, function (store) { return store; });
        }
    };
    /**
     * @description Returns the associated
     *  value of a given cookie.
     * @param {
     *  Array<String>|Object<String, any>
     * } data The cookie(s) to fetch.
     * @param {any} defaultValue The
     *  default value if a cookie is
     *  not defined. Use this param
     *  if and only if the first
     *  argument data type is an
     *  array of keys.
     * @function get
     * @public
     * @returns {any} any
     */
    CookieManager.prototype.get = function (data, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        // The final result.
        var res = {};
        // Whether the passed data
        // is an array.
        if (Array.isArray(data)) {
            // Searching target key(s).
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var key = data_1[_i];
                // Whether the current key
                // name is a real string.
                if (this.isValidKeyName_(key)) {
                    // Whether the current
                    // key's value exists.
                    if (this.store_.has(key)) {
                        // Adds that key with
                        // his value.
                        res[key] = (this.store_.get(key));
                        // Otherwise.
                    }
                    else {
                        // Adds that key with
                        // the given default
                        // value.
                        res[key] = defaultValue;
                    }
                }
            }
            // Whether the passed data
            // is an object.
        }
        else if (typeof data === "object") {
            // Searching target key(s).
            for (var _a = 0, _b = Object.keys(data); _a < _b.length; _a++) {
                var key = _b[_a];
                // Whether the current key
                // name is a real string.
                if (this.isValidKeyName_(key)) {
                    // Whether the current
                    // key's value exists.
                    if (this.store_.has(key)) {
                        // Adds that key with
                        // his value.
                        res[key] = (this.store_.get(key));
                        // Otherwise.
                    }
                    else {
                        // Adds that key with
                        // the given default
                        // value.
                        res[key] = data[key];
                    }
                }
            }
            // Otherwise.
        }
        else {
            // Invalid parameter data
            // type.
            this.error_("\n        Invalid argument data type. \n        An array of string(s) or a \n        js object is required for \n        this operation.\n      ");
        }
        // The available key(s)
        // into the final result.
        var keys = (Object.keys(res));
        // Sends the final result.
        return (keys.length <= 0
            ? defaultValue
            : (keys.length === 1
                ? res[keys[0]]
                : res));
    };
    /**
     * @description Sets/Creates cookie(s)
     *  from their name and value.
     * @param {Object<String, any>} data
     *  The cookie(s) to create or update.
     * @fires set#onMutate
     * @function set
     * @public
     * @returns {void} void
     */
    CookieManager.prototype.set = function (data) {
        // Whether the given data
        // is a real dictionary.
        if (!Array.isArray(data) &&
            typeof data === "object") {
            // Overriding passed key(s).
            for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                var key = _a[_i];
                // Whether the current key
                // name is a real string.
                if (this.isValidKeyName_(key)) {
                    // The current key value.
                    var value = data[key];
                    // Whether the current key
                    // value is not `null` or
                    // `undefined`.
                    if (value !== undefined &&
                        value !== null) {
                        // Whether this value data
                        // type maches with the
                        // supported data types.
                        if (typeof value === "boolean" ||
                            typeof value === "string" ||
                            typeof value === "number" ||
                            typeof value === "object") {
                            // The old value of the
                            // target key.
                            var oldValue = (this.store_.get(key));
                            // Updates the global store.
                            this.store_.set(key, value);
                            // Whether `mutate` event
                            // is listening.
                            if (typeof this.onMutate_
                                === "function") {
                                // Whether the current key
                                // is already defined.
                                if (oldValue !== undefined) {
                                    /**
                                     * @description Calls `mutate`
                                     *  event.
                                     * @event set#onMutate
                                     * @readonly
                                     * @emit
                                     * @property {
                                     *   Object<String, any>
                                     * } event The event's data.
                                     */
                                    this.onMutate_({
                                        type: MutationType.UPDATE,
                                        newValue: value,
                                        cookieName: key,
                                        ref: this,
                                        oldValue: oldValue
                                    });
                                    // Otherwise.
                                }
                                else {
                                    /**
                                     * @description Calls `mutate`
                                     *  event.
                                     * @event set#onMutate
                                     * @readonly
                                     * @emit
                                     * @property {
                                     *   Object<String, any>
                                     * } event The event's data.
                                     */
                                    this.onMutate_({
                                        type: MutationType.ADD,
                                        cookieName: key,
                                        ref: this,
                                        value: value
                                    });
                                }
                            }
                            // Otherwise.
                        }
                        else {
                            // Invalid key data type.
                            this.error_("\n                Invalid cookie data type. The \n                supported data types are: int, \n                float, string, boolean, array \n                and js object --> `".concat(key, "`.\n              "));
                        }
                        // Otherwise.
                    }
                    else {
                        // Invalid data type.
                        this.error_("\n              The value of a cookie cannot \n              be `null` or `undefined`. \n              Remove it instead --> `".concat(key, "`.\n            "));
                    }
                }
            }
            // Whether auto commits are
            // allowed.
            if (this.autoCommit_) {
                // Saves all modifications
                // into the document cookie.
                this.commit();
            }
            // Otherwise.
        }
        else {
            // Invalid parameter data type.
            this.error_("\n        Invalid argument data type. A \n        javascript object is required \n        for this operation.\n      ");
        }
    };
    return CookieManager;
}());
export { CookieManager };
// CookieManager v0.0.1 | © CodiTheck organization
