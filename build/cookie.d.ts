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
export declare enum EncodingMethod {
    HEXADECIMAL = 0,
    BASE_64 = 1,
    BINARY = 2,
    OCTAL = 3
}
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
export declare enum MutationType {
    UPDATE = 0,
    DELETE = 1,
    ADD = 2
}
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
export declare enum SameSite {
    STRICT = 0,
    NONE = 1,
    LAX = 2
}
/**
 * @classdesc Manages application
 *  cookies data inside a browser.
 * @type {CookieManager}
 * @public
 * @class
 */
export declare class CookieManager {
    /**
     * @description The delay before
     *  destroy all defined cookies
     *  on this object instance.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
     * @private {?(Date|number)}
     * @type {?(Date|number)}
     * @field
     */
    private lifeTime_;
    /**
     * @description The encoding/decoding
     *  method to encode cookies data.
     * @private {EncodingMethod}
     * @type {EncodingMethod}
     * @field
     */
    private encodingMethod_;
    /**
     * @description Whether we want
     *  to store cookies using a
     *  partitioned storage.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
     * @private {boolean=}
     * @type {boolean=}
     * @field
     */
    private partitioned_;
    /**
     * @description Called when any
     *  mutation is detected on the
     *  current instance of the
     *  cookies manager.
     * @private {?Function}
     * @type {?Function}
     * @field
     */
    private onMutate_;
    /**
     * @description Whether we want
     *  to automate the background
     *  save process.
     * @private {boolean=}
     * @type {boolean=}
     * @field
     */
    private autoCommit_;
    /**
     * @description Called when all
     *  pre-defined cookies have
     *  been loaded successfully.
     *  This event is generally
     *  triggered after create
     *  an object instance of
     *  the cookie manager.
     * @private {?Function}
     * @type {?Function}
     * @field
     */
    private onReady_;
    /**
     * @description Whether we want
     *  to automate the background
     *  load process.
     * @private {boolean=}
     * @type {boolean=}
     * @field
     */
    private autoLoad_;
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
    private secure_;
    /**
     * @description The domain name.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
     * @private {?String}
     * @type {?String}
     * @field
     */
    private domain_;
    /**
     * @description Indicates the
     *  path that must exist in
     *  the requested URL for
     *  the browser to send
     *  the Cookie header.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
     * @private {?String}
     * @type {?String}
     * @field
     */
    private path_;
    /**
     * @description prevents the
     *  browser from sending this
     *  cookie along with
     *  cross-site requests.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
     * @private {SameSite}
     * @type {SameSite}
     * @field
     */
    private sameSite_;
    /**
     * @description The store name.
     * @private {String}
     * @type {String}
     * @field
     */
    private storeName_;
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
    private store_;
    /**
       * @description Initializes
     *  the cookie manager data.
     * @fires constructor#onReady
       * @constructor
       */
    constructor({ encodingMethod, defaultData, partitioned, autoCommit, storeName, lifeTime, onMutate, sameSite, autoLoad, onReady, domain, secure, path }: {
        lifeTime?: (Date | number | null);
        encodingMethod?: EncodingMethod;
        defaultData?: Map<string, any>;
        onMutate?: (Function | null);
        onReady?: (Function | null);
        domain?: (string | null);
        path?: (string | null);
        partitioned?: boolean;
        autoCommit?: boolean;
        sameSite?: SameSite;
        autoLoad?: boolean;
        storeName: string;
        secure?: boolean;
    });
    /**
     * @description Returns the
     *  current samesite state.
     * @function getSameSite
     * @public
     * @returns {SameSite} SameSite
     */
    getSameSite: () => SameSite;
    /**
     * @description Whether we want
     *  leave the manager to save
     *  cookies data dynamically.
     * @function isAutoCommit
     * @public
     * @returns {boolean} boolean
     */
    isAutoCommit: () => boolean;
    /**
     * @description Whether we want
     *  leave the manager to load
     *  cookies data dynamically.
     * @function isAutoLoad
     * @public
     * @returns {boolean} boolean
     */
    isAutoLoad: () => boolean;
    /**
     * @description Whether cookies
     *  storage is secured.
     * @function isSecured
     * @public
     * @returns {boolean} boolean
     */
    isSecured: () => boolean;
    /**
     * @description Returns the
     *  current cookies life
     *  time.
     * @function getLifeTime
     * @public
     * @returns {?(Date|number)} any
     */
    getLifeTime: () => (Date | number | null);
    /**
     * @description Returns the
     *  current storage's name.
     * @function getStoreName
     * @public
     * @returns {?String} ?String
     */
    getStoreName: () => (string | null);
    /**
     * @description Returns the
     *  current domain's name.
     * @function getDomain
     * @public
     * @returns {?String} ?String
     */
    getDomain: () => (string | null);
    /**
     * @description Returns the
     *  current cookies data.
     * @function getData
     * @public
     * @returns {
     *  Map<String, any>
     * } Map
     */
    getData: () => (Map<string, any>);
    /**
     * @description Returns the
     *  current cookies path.
     * @function getPath
     * @public
     * @returns {?String} ?String
     */
    getPath: () => (string | null);
    /**
     * @description Returns the
     *  current encoding method.
     * @function getEncodingMethod
     * @public
     * @returns {
     *  EncodingMethod
     * } EncodingMethod
     */
    getEncodingMethod: () => EncodingMethod;
    /**
     * @description Whether cookies
     *  storage is partitioned.
     * @function isPartitioned
     * @public
     * @returns {boolean} boolean
     */
    isPartitioned: () => boolean;
    /**
     * @description Returns the
     *  cookies data size.
     * @function size
     * @public
     * @returns {int} int
     */
    getSize(): number;
    /**
     * @description Throws an error.
     * @param {String} message The
     *  error message to display.
     * @private {Function}
     * @function error_
     * @returns {never} never
     */
    private error_;
    /**
     * @description Deletes all
     *  existing cookie(s) from
     *  the manager.
     * @function clear
     * @public
     * @returns {void} void
     */
    clear(): void;
    /**
     * @description Saves stored
     *  data into the document
     *  cookie.
     * @private {Function}
     * @function commit
     * @returns {void} void
     */
    private commit;
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
    private isKeyDefined_;
    /**
     * @description Removes a key
     *  from the document cookie.
     * @param {String} key The
     *  key's name to clear.
     * @function removeKey_
     * @private {Function}
     * @returns {void} void
     */
    private removeKey_;
    /**
     * @description Sets `autoLoad`
     *  field value.
     * @param {boolean} state The
     *  new value of the field.
     * @function autoLoad
     * @public
     * @returns {void} void
     */
    autoLoad(state: boolean): void;
    /**
     * @description Sets `autoCommit`
     *  field value.
     * @param {boolean} state The
     *  new value of the field.
     * @function autoCommit
     * @public
     * @returns {void} void
     */
    autoCommit(state: boolean): void;
    /**
     * @description Checks whether
     *  a key's name is valid.
     * @param {String} key The
     *  key's name to check.
     * @function isValidKeyName_
     * @private {Function}
     * @returns {boolean} boolean
     */
    private isValidKeyName_;
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
    onMutate(slot: (Function | null)): void;
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
    onReady(slot: (Function | null)): void;
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
    private setStoreName_;
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
    private setSameSite_;
    /**
     * @description Sets `encodingMethod`
     *  field value.
     * @param {EncodingMethod} value The
     *  new value of this field.
     * @function setEncodingMethod_
     * @private {Function}
     * @returns {void} void
     */
    private setEncodingMethod_;
    /**
     * @description Loads stored
     *  data from the document
     *  cookie.
     * @function load
     * @public
     * @returns {void} void
     */
    load(): void;
    /**
     * @description Sets `partitioned`
     *  field value.
     * @param {boolean} state The
     *  new value of the field.
     * @function allowPartitioning_
     * @private {Function}
     * @returns {void} void
     */
    private allowPartitioning_;
    /**
     * @description Sets `secure`
     *  field value.
     * @param {boolean} state The
     *  new value of the field.
     * @function allowSecure_
     * @private {Function}
     * @returns {void} void
     */
    private allowSecure_;
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
    private toggleKey_;
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
    private str2base_;
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
    private base2str_;
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
    private createKey_;
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
    private setConfigs_;
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
    private base642str_;
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
    private str2base64_;
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
    private setPath_;
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
    private setDomain_;
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
    private parseStore_;
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
    has(...names: Array<string>): boolean;
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
    private getValueAt_;
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
    delete(...names: Array<string>): void;
    /**
     * @description Sets `lifeTime`
     *  field value.
     * @param {?(Date|number)} value
     *  The new value of the field.
     * @function setLifeTime_
     * @private {Function}
     * @returns {void} void
     */
    private setLifeTime_;
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
    private encodeStore_;
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
    private decodeStore_;
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
    get(data: (Array<string> | object), defaultValue?: any): any;
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
    set(data: object): void;
}
