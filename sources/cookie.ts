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
export enum EncodingMethod {
  HEXADECIMAL,
  BASE_64,
  BINARY,
  OCTAL
};

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
export enum MutationType {
  UPDATE,
  DELETE,
  ADD
};

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
export enum SameSite {
  STRICT,
  NONE,
  LAX
};

/**
 * @classdesc Manages application
 *  cookies data inside a browser.
 * @type {CookieManager}
 * @public
 * @class
 */
export class CookieManager {
  // Attributes.
  /**
   * @description The delay before
   *  destroy all defined cookies
   *  on this object instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
   * @private {?(Date|number)}
   * @type {?(Date|number)}
   * @field
   */
  private lifeTime_: (Date | number | null);
  /**
   * @description The encoding/decoding
   *  method to encode cookies data.
   * @private {EncodingMethod}
   * @type {EncodingMethod}
   * @field
   */
  private encodingMethod_: EncodingMethod;
  /**
   * @description Whether we want
   *  to store cookies using a
   *  partitioned storage.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
   * @private {boolean=}
   * @type {boolean=}
   * @field
   */
  private partitioned_: boolean = false;
  /**
   * @description Called when any
   *  mutation is detected on the
   *  current instance of the
   *  cookies manager.
   * @private {?Function}
   * @type {?Function}
   * @field
   */
  private onMutate_: (Function | null);
  /**
   * @description Whether we want
   *  to automate the background
   *  save process.
   * @private {boolean=}
   * @type {boolean=}
   * @field
   */
  private autoCommit_: boolean = true;
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
  private onReady_: (Function | null);
  /**
   * @description Whether we want
   *  to automate the background
   *  load process.
   * @private {boolean=}
   * @type {boolean=}
   * @field
   */
  private autoLoad_: boolean = true;
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
  private secure_: boolean = false;
  /**
   * @description The domain name.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
   * @private {?String}
   * @type {?String}
   * @field
   */
  private domain_: (string | null);
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
  private path_: (string | null);
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
  private sameSite_: SameSite;
  /**
   * @description The store name.
   * @private {String}
   * @type {String}
   * @field
   */
  private storeName_: string;
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
  private store_: Map<string, any> = (
    new Map<string, any> ()
  );

  /**
	 * @description Initializes
   *  the cookie manager data.
   * @fires constructor#onReady
	 * @constructor
	 */
	constructor (
    {
      encodingMethod,
      defaultData,
      partitioned,
      autoCommit,
      storeName,
      lifeTime,
      onMutate,
      sameSite,
      autoLoad,
      onReady,
      domain,
      secure,
      path
    }: {
      lifeTime?: (Date | number | null),
      encodingMethod?: EncodingMethod,
      defaultData?: Map<string, any>,
      onMutate?: (Function | null),
      onReady?: (Function | null),
      domain?: (string | null),
      path?: (string | null),
      partitioned?: boolean,
      autoCommit?: boolean,
      sameSite?: SameSite,
      autoLoad?: boolean,
      storeName: string,
      secure?: boolean
    }
  ) {
    // Initializes the encoding
    // method.
    this.setEncodingMethod_ (
      encodingMethod === undefined
      ? EncodingMethod.BASE_64
      : encodingMethod
    );
    // Initializes the store
    // with the default data.
    this.store_ = (
      defaultData instanceof Map
      ? defaultData : this.store_
    );
    // Initializes partitioned.
    this.allowPartitioning_ (
      partitioned === undefined
      ? false : partitioned
    );
    // Initializes auto commit.
    this.autoCommit (
      autoCommit === undefined
      ? true : autoCommit
    );
    // Initializes samesite.
    this.setSameSite_ (
      sameSite === undefined ?
      SameSite.LAX : sameSite
    );
    // Initializes auto load.
    this.autoLoad (
      autoLoad === undefined ?
      true : autoLoad
    );
    // Initializes life time.
    this.setLifeTime_ (
      lifeTime === undefined
      ? 31536000 : lifeTime
    );
    // Initializes `onMutate`
    // event.
    this.onMutate (
      onMutate === undefined
      ? null : onMutate
    );
    // Initializes secure.
    this.allowSecure_ (
      secure === undefined ?
      false : secure
    );
    // Initializes the domain.
    this.setDomain_ (
      domain === undefined ?
      null : domain
    );
    // Initializes `onReady`
    // event.
    this.onReady (
      onReady === undefined
      ? null : onReady
    );
    // Initializes the path.
    this.setPath_ (
      path === undefined ?
      '/' : path
    );
    // Initializes the store
    // name.
    this.setStoreName_ (
      storeName
    );
    // Whether the auto load
    // is allowed.
    if (this.autoLoad_) {
      // Loads store from the
      // document cookie.
      this.load ();
    }
    // Whether `ready` event
    // is listening.
    if (
      typeof this.onReady_
        === "function"
    ) {
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
      this.onReady_ (this);
    }
  }

  /**
   * @description Returns the
   *  current samesite state.
   * @function getSameSite
   * @public
   * @returns {SameSite} SameSite
   */
  public getSameSite = ():
    SameSite => this.sameSite_;

  /**
   * @description Whether we want
   *  leave the manager to save
   *  cookies data dynamically.
   * @function isAutoCommit
   * @public
   * @returns {boolean} boolean
   */
  public isAutoCommit = ():
    boolean => this.autoCommit_;

  /**
   * @description Whether we want
   *  leave the manager to load
   *  cookies data dynamically.
   * @function isAutoLoad
   * @public
   * @returns {boolean} boolean
   */
  public isAutoLoad = ():
    boolean => this.autoLoad_;

  /**
   * @description Whether cookies
   *  storage is secured.
   * @function isSecured
   * @public
   * @returns {boolean} boolean
   */
  public isSecured = ():
    boolean => this.secure_;

  /**
   * @description Returns the
   *  current cookies life
   *  time.
   * @function getLifeTime
   * @public
   * @returns {?(Date|number)} any
   */
  public getLifeTime = (): (
    Date | number | null
  ) => this.lifeTime_;

  /**
   * @description Returns the
   *  current storage's name.
   * @function getStoreName
   * @public
   * @returns {?String} ?String
   */
  public getStoreName = (): (
    string | null
  ) => this.storeName_;

  /**
   * @description Returns the
   *  current domain's name.
   * @function getDomain
   * @public
   * @returns {?String} ?String
   */
  public getDomain = (): (
    string | null
  ) => this.domain_;

  /**
   * @description Returns the
   *  current cookies data.
   * @function getData
   * @public
   * @returns {
   *  Map<String, any>
   * } Map
   */
  public getData = (): (
    Map<string, any>
  ) => this.store_;

  /**
   * @description Returns the
   *  current cookies path.
   * @function getPath
   * @public
   * @returns {?String} ?String
   */
  public getPath = (): (
    string | null
  ) => this.path_;

  /**
   * @description Returns the
   *  current encoding method.
   * @function getEncodingMethod
   * @public
   * @returns {
   *  EncodingMethod
   * } EncodingMethod
   */
  public getEncodingMethod = ():
    EncodingMethod => (
      this.encodingMethod_
    );

  /**
   * @description Whether cookies
   *  storage is partitioned.
   * @function isPartitioned
   * @public
   * @returns {boolean} boolean
   */
  public isPartitioned = ():
    boolean => (
      this.partitioned_
    );

  /**
   * @description Returns the
   *  cookies data size.
   * @function size
   * @public
   * @returns {int} int
   */
  public getSize (): number {
    // Sends the current
    // store size.
    return this.store_.size;
  }

  /**
   * @description Throws an error.
   * @param {String} message The
   *  error message to display.
   * @private {Function}
   * @function error_
   * @returns {never} never
   */
  private error_ (
    message: string
  ): never {
    // Launches an error
    // with the given
    // message.
    throw new Error (
      message.replace (
        /[\n\t]/g, ''
      )
    );
  }

  /**
   * @description Deletes all 
   *  existing cookie(s) from
   *  the manager.
   * @function clear
   * @public
   * @returns {void} void
   */
  public clear (): void {
    // Removes all defined
    // keys with their
    // associated value.
    this.store_.clear ();
    // Whether the auto
    // save is allowed.
    if (this.autoCommit_) {
      // Destroys the store
      // from the document
      // cookie.
      this.removeKey_ (
        this.encodeStore_ ()
          .name
      );
    }
  }

  /**
   * @description Saves stored
   *  data into the document
   *  cookie.
   * @private {Function}
   * @function commit
   * @returns {void} void
   */
  private commit (): void {
    // Whether the store is
    // not empty.
    if (this.store_.size > 0) {
      // The encoded shape of
      // the global store.
      const {name, data} = (
        this.encodeStore_ ()
      );
      // Overrides the defined
      // document cookie
      // configurations.
      this.setConfigs_ (
        name, data, true
      );
    }
  }

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
  private isKeyDefined_ (
    key: string
  ): boolean {
    // Whether the passed key
    // is really defined in
    // the document cookie.
    return (
      document.cookie.toLowerCase ()
        .replace (/ /g, '')
        .includes (
          key.toLowerCase ()
            .replace (/ /g, '')
        )
    );
  }

  /**
   * @description Removes a key
   *  from the document cookie.
   * @param {String} key The
   *  key's name to clear.
   * @function removeKey_
   * @private {Function}
   * @returns {void} void
   */
  private removeKey_ (
    key: string
  ): void {
    // Removes the passed key
    // from the document
    // cookie.
    document.cookie = (
      document.cookie.replace (
        new RegExp (
          `\\s*${key}=?[\\w\\W]*;?`,
          "gi"
        ), ''
      )
    );
    // Removes left and right
    // spaces from the document
    // cookie.
    document.cookie = (
      document.cookie.trim ()
    );
  }

  /**
   * @description Sets `autoLoad`
   *  field value.
   * @param {boolean} state The
   *  new value of the field.
   * @function autoLoad
   * @public
   * @returns {void} void
   */
  public autoLoad (
    state: boolean
  ): void {
    // Whether the passed state
    // is a real boolean.
    if (
      typeof state === "boolean"
    ) {
      // Updates the field.
      this.autoLoad_ = state;
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A boolean 
        value is required to perform 
        this operation. Check the 
        passed value and make sure 
        to have a boolean value.
      `);
    }
  }

  /**
   * @description Sets `autoCommit`
   *  field value.
   * @param {boolean} state The
   *  new value of the field.
   * @function autoCommit
   * @public
   * @returns {void} void
   */
  public autoCommit (
    state: boolean
  ): void {
    // Whether the passed state
    // is a real boolean.
    if (
      typeof state === "boolean"
    ) {
      // Updates the field.
      this.autoCommit_ = state;
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A boolean 
        value is required to perform 
        this operation. Check the 
        passed value and make sure 
        to have a boolean value.
      `);
    }
  }

  /**
   * @description Checks whether
   *  a key's name is valid.
   * @param {String} key The
   *  key's name to check.
   * @function isValidKeyName_
   * @private {Function}
   * @returns {boolean} boolean
   */
  private isValidKeyName_ (
    key: string
  ): boolean {
    // Whether the current key
    // name is a real string.
    if (
      typeof key === "string" &&
      key.trim ().length > 0
    ) {
      // Sends a truthy value.
      return true;
    // Otherwise.
    } else {
      // Invalid cookie name
      // format.
      this.error_ (`
        Invalid cookie's name 
        format. Any cookie's 
        name must be a non-
        empty string.
      `);
    }
  }

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
  public onMutate (
    slot: (Function | null)
  ): void {
    // Whether the passed value
    // is a function or `null`.
    if (
      typeof slot === "function"
      || slot === null
    ) {
      // Updates this field.
      this.onMutate_ = slot;
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A function 
        is required to perform this 
        operation. Check the passed 
        value and make sure to have 
        a callback method. If you 
        want to dissolve any listen 
        on that event, you can 
        pass \`null\`.
      `);
    }
  }

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
  public onReady (
    slot: (Function | null)
  ): void {
    // Whether the passed value
    // is a function or `null`.
    if (
      typeof slot === "function"
      || slot === null
    ) {
      // Updates this field.
      this.onReady_ = slot;
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A function 
        is required to perform this 
        operation. Check the passed 
        value and make sure to have 
        a callback method. If you 
        want to dissolve any listen 
        on that event, you can 
        pass \`null\`.
      `);
    }
  }

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
  private setStoreName_ (
    value: string
  ): void {
    // Whether the given value
    // is a string.
    if (
      typeof value === "string" &&
      value.trim ().length > 0
    ) {
      // Updates this field.
      this.storeName_ = value;
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A string 
        is required to perform this 
        operation. Check the passed 
        value and make sure to have 
        a string. It's mandatory to 
        give a store's name.
      `);
    }
  }

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
  private setSameSite_ (
    value: SameSite
  ): void {
    // Whether the given value
    // is in range `STRICT`,
    // `NONE` and `LAX`.
    if (
      value === SameSite.STRICT ||
      value === SameSite.NONE ||
      value === SameSite.LAX
    ) {
      // Updates this field.
      this.sameSite_ = value;
      // Updates the document
      // cookie about that.
      this.setConfigs_ (
        "SameSite", value, false
      );
    // Otherwise.
    } else {
      // Invalid constant value.
      this.error_ (`
        Invalid constant value. 
        The possible values are: 
        \`STRICT\`, \`NONE\` 
        and \`LAX\`.
      `);
    }
  }

  /**
   * @description Sets `encodingMethod`
   *  field value.
   * @param {EncodingMethod} value The
   *  new value of this field.
   * @function setEncodingMethod_
   * @private {Function}
   * @returns {void} void
   */
  private setEncodingMethod_ (
    value: EncodingMethod
  ): void {
    // Whether the given value is
    // in the range `HEXADECIMAL`,
    // `BASE_64`, `BINARY` and
    // `OCTAL`.
    if (
      value === EncodingMethod.HEXADECIMAL ||
      value === EncodingMethod.BASE_64 ||
      value === EncodingMethod.BINARY ||
      value === EncodingMethod.OCTAL
    ) {
      // Updates this field.
      this.encodingMethod_ = value;
    // Otherwise.
    } else {
      // Invalid constant value.
      this.error_ (`
        Invalid constant value. The 
        possible values are: 
        \`HEXADECIMAL\`, \`BASE_64\`, 
        \`BINARY\` and \`OCTAL\`.
      `);
    }
  }

  /**
   * @description Loads stored
   *  data from the document
   *  cookie.
   * @function load
   * @public
   * @returns {void} void
   */
  public load (): void {
    // Loads data from the
    // browser document
    // cookie.
    const loaded: (
      Map<string, any>
    ) = (
      this.decodeStore_ ()
    );
    // Merging the loaded
    // store to the current
    // global store.
    loaded.forEach (
      (
        value: any,
        key: string
      ) => {
        // Adds/Updates the
        // current key.
        this.store_.set (
          key, value
        );
      }
    );
  }

  /**
   * @description Sets `partitioned`
   *  field value.
   * @param {boolean} state The
   *  new value of the field.
   * @function allowPartitioning_
   * @private {Function}
   * @returns {void} void
   */
  private allowPartitioning_ (
    state: boolean
  ): void {
    // Whether the given state
    // is a real boolean.
    if (
      typeof state === "boolean"
    ) {
      // Updates the field.
      this.partitioned_ = state;
      // Toggles this key inside
      // the document cookie
      // according to his
      // state.
      this.toggleKey_ (
        "Partitioned", state
      );
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A boolean 
        value is required to perform 
        this operation. Check the 
        passed value and make sure 
        to have a boolean value.
      `);
    }
  }

  /**
   * @description Sets `secure`
   *  field value.
   * @param {boolean} state The
   *  new value of the field.
   * @function allowSecure_
   * @private {Function}
   * @returns {void} void
   */
  private allowSecure_ (
    state: boolean
  ): void {
    // Whether the given state
    // is a real boolean.
    if (
      typeof state === "boolean"
    ) {
      // Updates the field.
      this.secure_ = state;
      // Toggles this key inside
      // the document cookie
      // according to his
      // state.
      this.toggleKey_ (
        "Secure", state
      );
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A boolean 
        value is required to perform 
        this operation. Check the 
        passed value and make sure 
        to have a boolean value.
      `);
    }
  }

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
  private toggleKey_ (
    key: string,
    value: boolean
  ): void {
    // Whether the given key
    // is already defined.
    if (
      this.isKeyDefined_ (key)
    ) {
      // Whether the value is
      // `false`.
      if (!value) {
        // Destroys the passed
        // key from the document
        // cookie.
        this.removeKey_ (key);
      }
    // Otherwise.
    } else {
      // Whether the value is
      // `true`.
      if (value) {
        // Adds the passed key
        // to the document
        // cookie.
        this.createKey_ (
          key, null, false
        );
      }
    }
  }

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
  private str2base_ (
    input: string,
    base: number
  ): string {
    // Tries to encode the
    // passed string into
    // the given base.
    try {
      // Sends the basify version
      // of the given key with
      // some corrections.
      return (
        input.split ('')
          .map (char => (
            char.charCodeAt (0)
              .toString (base)
            )
          ).join ('_')
      );
    // An error occurred.
    } catch (exp) {
      // Makes a warn about some
      // potentials invalid chars
      // sequence.
      this.error_ (`
        An error occurred during 
        data encoding. Make sure 
        to have no unwanted chars 
        in the passed string.
      `);
    }
  }

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
  private base2str_ (
    encoded: string,
    base: number
  ): string {
    // Tries to decode the
    // passed string.
    try {
      // Sends the decoded
      // string with some
      // corrections.
      return (
        encoded.split ('_')
          .map (bin => (
              String.fromCharCode (
                parseInt (
                  bin, base
                )
              )
            )
          ).join ('')
      );
    // An error occurred.
    } catch (exp) {
      // Makes a warn about some
      // potentials invalid chars
      // sequence from the
      // original input.
      this.error_ (`
        An error occurred during 
        data decoding. Make sure 
        to have no unwanted chars 
        within the original input 
        before his encoding.
      `);
    }
  }

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
  private createKey_ (
    key: string,
    value: any,
    prepend: boolean
  ): void {
    // Whether the passed value
    // is `undefined` or `null`.
    const isValid = (
      value !== undefined
      && value !== null
    );
    // Whether the key must be
    // added at begin of the
    // document cookie.
    if (prepend) {
      // Adds the passed key at
      // begin of the document
      // cookie.
      document.cookie = (
        `${key}${(
          isValid ?
          `=${value}` : ''
        )}; ${document.cookie}`
      );
      // Removes any semicolon(s)
      // and space(s) found at
      // the end of the document
      // cookie.
      document.cookie = (
        document.cookie.replace (
          /;+\s+$/, ''
        )
      );
    // Otherwise.
    } else {
      // Adds the passed key at
      // the end of the document
      // cookie.
      document.cookie += (
        ` ${key}${(
          isValid ?
          `=${value}` : ''
        )}`
      );
      // Removes left and right
      // spaces from the document
      // cookie.
      document.cookie = (
        document.cookie.trim ()
      );
    }
  }

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
  private setConfigs_ (
    key: string,
    value: any,
    prepend: boolean
  ): void {
    // Whether the given key
    // is already defined.
    if (this.isKeyDefined_ (key)) {
      // Sets the target key
      // in the document
      // cookie.
      document.cookie = (
        document.cookie.replace (
          new RegExp (
            `${key}=(\\w|\\W)+;?`,
            "gi"
          ),
          `${key}=${value};`
        )
      );
      // Removes any semicolon(s)
      // found at the end of the 
      // document cookie.
      document.cookie = (
        document.cookie.replace (
          /;+$/, ''
        )
      );
    // Otherwise.
    } else {
      // Creates the given key.
      this.createKey_ (
        key,
        value,
        prepend
      );
    }
  }

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
  private base642str_ (
    encoded: string
  ): string {
    // Tries to decode the
    // passed string.
    try {
      // Sends the decoded
      // string with some
      // corrections.
      return window.atob (
        encoded.endsWith ('_')
        ? encoded.replace (
            '_', '='
          )
        : (
          encoded.endsWith ("__")
          ? encoded.replace (
              "__", "=="
            )
          : encoded
        )
      );
    // An error occurred.
    } catch (exp) {
      // Makes a warn about some
      // potentials invalid chars
      // sequence from the
      // original input.
      this.error_ (`
        An error occurred during 
        data decoding. Make sure 
        to have no unwanted chars 
        within the original input 
        before his encoding.
      `);
    }
  }

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
  private str2base64_ (
    input: string
  ): string {
    // Tries to convert the
    // passed string.
    try {
      // The encoded string.
      const encoded = (
        window.btoa (input)
      );
      // Sends the encoded
      // string with some
      // corrections.
      return (
        encoded.endsWith ('=')
        ? encoded.replace (
            '=', '_'
          )
        : (
          encoded.endsWith ("==")
          ? encoded.replace (
              "==", "__"
            )
          : encoded
        )
      );
    // An error occurred.
    } catch (exp) {
      // Makes a warn about some
      // potentials invalid chars
      // sequence.
      this.error_ (`
        An error occurred during 
        data encoding. Make sure 
        to have no unwanted chars 
        in the passed string.
      `);
    }
  }

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
  private setPath_ (
    value: (string | null)
  ): void {
    // Whether the passed
    // value is a filled
    // string.
    if (
      typeof value === "string" &&
      value.trim ().length > 0
    ) {
      // Updates the field.
      this.path_ = value;
      // Updates the document
      // cookie about that.
      this.setConfigs_ (
        "path", value, false
      );
    // Whether the passed
    // value is `null`.
    } else if (
      value === null
    ) {
      // Removes this key
      // from the document
      // cookie.
      this.removeKey_ (
        "path"
      );
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A string 
        is required to perform this 
        operation. Check the passed 
        value and make sure to have 
        a string. If you want to 
        comeback to the default 
        browser value, you can 
        pass \`null\`.
      `);
    }
  }

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
  private setDomain_ (
    value: (string | null)
  ): void {
    // Whether the passed
    // value is a filled
    // string.
    if (
      typeof value === "string" &&
      value.trim ().length > 0
    ) {
      // Updates the field.
      this.domain_ = value;
      // Updates the document
      // cookie about that.
      this.setConfigs_ (
        "domain", value, false
      );
    // Whether the passed
    // value is `null`.
    } else if (
      value === null
    ) {
      // Removes this key
      // from the document
      // cookie.
      this.removeKey_ (
        "domain"
      );
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A string 
        is required to perform this 
        operation. Check the passed 
        value and make sure to have 
        a string. If you want to 
        comeback to the default 
        browser value, you can 
        pass \`null\`.
      `);
    }
  }

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
  private parseStore_ (
    storeName: string,
    onParse: Function
  ): Map<string, any> {
    // The fetched store.
    let fetchedStore: (
      string | null
    ) = (
      this.getValueAt_ (
        storeName
      )
    );
    // Whether the loaded
    // data exists.
    if (
      typeof fetchedStore
        === "string"
    ) {
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
      return (
        new Map<string, any> (
          Object.entries (
            JSON.parse (
              onParse (
                fetchedStore
              )
            )
          )
        )
      );
    // No data exists.
    } else {
      // Sends an empty map.
      return (
        new Map<string, any> ()
      );
    }
  }

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
  public has (
    ...names: Array<string>
  ): boolean {
    // Flattens the given params
    // data to avoid any sub
    // arrays.
    names = names.flat (64);
    // Searching key(s)
    // existance.
    for (const key of names) {
      // Whether the current key
      // name is a real string.
      if (
        this.isValidKeyName_ (key)
      ) {
        // Whether ever a key
        // is not defined.
        if (
          !this.store_.has (key)
        ) {
          // Sends a falsy value.
          return false;
        }
      }
    }
    // All passed key(s)
    // are defined.
    return true;
  }

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
  private getValueAt_ (
    key: string,
    defaultValue: any = null
  ): any {
    // The found data.
    const foundData: (
      Array<string> | null
    ) = (
      document.cookie.match (
        new RegExp (
          `${key}=?[\\w\\W]*;?`,
          "gi"
        )
      )
    );
    // Whether the target key
    // exists.
    if (foundData != null) {
      // Whether the fetched
      // data has a value.
      if (
        foundData[0].includes (
          '='
        )
      ) {
        // Returns this value.
        return (
          foundData[0].split (
            '='
          )[1].replace (
            /;+$/, ''
          )
        );
      // Otherwise.
      } else {
        // Returns a truthy
        // value.
        return true;
      }
    // The target key is
    // undefined.
    } else {
      // Sends the default
      // value.
      return defaultValue;
    }
  }

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
  public delete (
    ...names: Array<string>
  ): void {
    // Flattens the given params
    // data to avoid any sub
    // arrays.
    names = names.flat (64);
    // The removed key(s).
    const removed: object = {
      type: MutationType.DELETE,
      ref: this
    };
    // Removing key(s).
    for (const key of names) {
      // Whether the current
      // key is valid before
      // his destroying.
      if (
        this.isValidKeyName_ (
          key
        )
      ) {
        // The current key's value.
        const value: any = (
          this.store_.get (key)
        );
        // Destroys the current
        // key with his value.
        if (
          this.store_.delete (
            key
          )
        ) {
          // Adds the deleted
          // key to `removed`
          // object.
          removed[key] = value;
        }
      }
    }
    // Whether `mutate` event
    // is listening.
    if (
      typeof this.onMutate_
        === "function"
    ) {
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
      this.onMutate_ (
        removed
      );
    }
  }

  /**
   * @description Sets `lifeTime`
   *  field value.
   * @param {?(Date|number)} value
   *  The new value of the field.
   * @function setLifeTime_
   * @private {Function}
   * @returns {void} void
   */
  private setLifeTime_ (
    value: (Date | number | null)
  ): void {
    // Whether the passed value
    // is a date.
    if (
      value instanceof Date
    ) {
      // Updates the field.
      this.lifeTime_ = value;
      // Updates the document
      // cookie about that.
      this.setConfigs_ (
        "expires",
        value.toUTCString (),
        false
      );
      // Removes `max-age` key
      // from the document
      // cookie.
      this.removeKey_ (
        "max-age"
      );
    // Whether the passed value
    // is an integer.
    } else if (
      typeof value === "number"
    ) {
      // Corrects the current
      // worth.
      value = Math.round (value);
      // Updates the field.
      this.lifeTime_ = value;
      // Updates the document
      // cookie about that.
      this.setConfigs_ (
        "max-age", value, false
      );
      // Removes `expires` key
      // from the document
      // cookie.
      this.removeKey_ (
        "expires"
      );
    // Whether the passed value
    // is `null`.
    } else if (
      value === null
    ) {
      // Removes `expires` key
      // from the document
      // cookie.
      this.removeKey_ (
        "expires"
      );
      // Removes `max-age` key
      // from the document
      // cookie.
      this.removeKey_ (
        "max-age"
      );
    // Otherwise.
    } else {
      // Invalid data type.
      this.error_ (`
        Invalid data type. A number 
        or date is required to do 
        this operation. Check the 
        passed value and make sure 
        to have either a string, 
        either a date. If you want 
        to comeback to the default 
        browser value, you can 
        pass \`null\`.
      `);
    }
  }

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
  private encodeStore_ (): {
    name: string,
    data: string
  } {
    // The stringify shape
    // of the global store.
    const store: string = (
      JSON.stringify (
        Object.fromEntries (
          this.store_
        )
      )
    );
    // Whether the chosen
    // encoding method is
    // `BASE_64`.
    if (
      this.encodingMethod_ ===
        EncodingMethod.BASE_64
    ) {
      // Encoding to base64.
      return {
        name: this.str2base64_ (
          this.storeName_
        ),
        data: this.str2base64_ (
          store
        )
      };
    // Whether the chosen
    // encoding method is
    // `BINARY`.
    } else if (
      this.encodingMethod_ ===
        EncodingMethod.BINARY
    ) {
      // Encoding to binary.
      return {
        name: this.str2base_ (
          this.storeName_, 2
        ),
        data: this.str2base_ (
          store, 2
        )
      };
    // Whether the chosen
    // encoding method is
    // `OCTAL`.
    } else if (
      this.encodingMethod_ ===
        EncodingMethod.OCTAL
    ) {
      // Encoding to octal.
      return {
        name: this.str2base_ (
          this.storeName_, 8
        ),
        data: this.str2base_ (
          store, 8
        )
      };
    // Whether the chosen
    // encoding method is
    // `HEXADECIMAL`.
    } else if (
      this.encodingMethod_ ===
        EncodingMethod.HEXADECIMAL
    ) {
      // Encoding to hexadecimal.
      return {
        name: this.str2base_ (
          this.storeName_, 16
        ),
        data: this.str2base_ (
          store, 16
        )
      };
    // Otherwise.
    } else {
      // No encoding to do.
      return {
        name: this.storeName_,
        data: store
      };
    }
  }

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
  private decodeStore_ (): (
    Map<string, any>
  ) {
    // Whether the chosen
    // decoding method is
    // `BASE_64`.
    if (
      this.encodingMethod_ ===
        EncodingMethod.BASE_64
    ) {
      // Decoding from base64.
      return this.parseStore_ (
        this.str2base64_ (
          this.storeName_
        ), (
          encodedStore: string
        ) => (
          this.base642str_ (
            encodedStore
          )
        )
      );
    // Whether the chosen
    // decoding method is
    // `BINARY`.
    } else if (
      this.encodingMethod_ ===
        EncodingMethod.BINARY
    ) {
      // Decoding from binary.
      return this.parseStore_ (
        this.str2base_ (
          this.storeName_, 2
        ), (
          encodedStore: string
        ) => (
          this.base2str_ (
            encodedStore, 2
          )
        )
      );
    // Whether the chosen
    // decoding method is
    // `OCTAL`.
    } else if (
      this.encodingMethod_ ===
        EncodingMethod.OCTAL
    ) {
      // Decoding from octal.
      return this.parseStore_ (
        this.str2base_ (
          this.storeName_, 8
        ), (
          encodedStore: string
        ) => (
          this.base2str_ (
            encodedStore, 8
          )
        )
      );
    // Whether the chosen
    // decoding method is
    // `HEXADECIMAL`.
    } else if (
      this.encodingMethod_ ===
        EncodingMethod.HEXADECIMAL
    ) {
      // Decoding from hexadecimal.
      return this.parseStore_ (
        this.str2base_ (
          this.storeName_, 16
        ), (
          encodedStore: string
        ) => (
          this.base2str_ (
            encodedStore, 16
          )
        )
      );
    // Otherwise.
    } else {
      // Don't decode any data.
      return this.parseStore_ (
        this.storeName_, (
          store: string
        ) => store
      );
    }
  }

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
  public get (
    data: (Array<string> | object),
    defaultValue: any = null
  ): any {
    // The final result.
    const res: object = {};
    // Whether the passed data
    // is an array.
    if (
      Array.isArray (data)
    ) {
      // Searching target key(s).
      for (const key of data) {
        // Whether the current key
        // name is a real string.
        if (
          this.isValidKeyName_ (key)
        ) {
          // Whether the current
          // key's value exists.
          if (this.store_.has (key)) {
            // Adds that key with
            // his value.
            res[key] = (
              this.store_.get (key)
            );
          // Otherwise.
          } else {
            // Adds that key with
            // the given default
            // value.
            res[key] = defaultValue;
          }
        }
      }
    // Whether the passed data
    // is an object.
    } else if (
      typeof data === "object"
    ) {
      // Searching target key(s).
      for (
        const key of Object.keys (data)
      ) {
        // Whether the current key
        // name is a real string.
        if (
          this.isValidKeyName_ (key)
        ) {
          // Whether the current
          // key's value exists.
          if (this.store_.has (key)) {
            // Adds that key with
            // his value.
            res[key] = (
              this.store_.get (key)
            );
          // Otherwise.
          } else {
            // Adds that key with
            // the given default
            // value.
            res[key] = data[key];
          }
        }
      }
    // Otherwise.
    } else {
      // Invalid parameter data
      // type.
      this.error_ (`
        Invalid argument data type. 
        An array of string(s) or a 
        js object is required for 
        this operation.
      `);
    }
    // The available key(s)
    // into the final result.
    const keys: Array<string> = (
      Object.keys (res)
    );
    // Sends the final result.
    return (
      keys.length <= 0
      ? defaultValue
      : (
        keys.length === 1
        ? res[keys[0]]
        : res
      )
    );
  }

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
  public set (data: object): void {
    // Whether the given data
    // is a real dictionary.
    if (
      !Array.isArray (data) &&
      typeof data === "object"
    ) {
      // Overriding passed key(s).
      for (
        const key of Object.keys (data)
      ) {
        // Whether the current key
        // name is a real string.
        if (
          this.isValidKeyName_ (key)
        ) {
          // The current key value.
          const value: any = data[key];
          // Whether the current key
          // value is not `null` or
          // `undefined`.
          if (
            value !== undefined &&
            value !== null
          ) {
            // Whether this value data
            // type maches with the
            // supported data types.
            if (
              typeof value === "boolean" ||
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "object"
            ) {
              // The old value of the
              // target key.
              const oldValue: any = (
                this.store_.get (key)
              );
              // Updates the global store.
              this.store_.set (key, value);
              // Whether `mutate` event
              // is listening.
              if (
                typeof this.onMutate_
                  === "function"
              ) {
                // Whether the current key
                // is already defined.
                if (
                  oldValue !== undefined
                ) {
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
                  this.onMutate_ ({
                    type: MutationType.UPDATE,
                    newValue: value,
                    cookieName: key,
                    ref: this,
                    oldValue
                  });
                // Otherwise.
                } else {
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
                  this.onMutate_ ({
                    type: MutationType.ADD,
                    cookieName: key,
                    ref: this,
                    value
                  });
                }
              }
            // Otherwise.
            } else {
              // Invalid key data type.
              this.error_ (`
                Invalid cookie data type. The 
                supported data types are: int, 
                float, string, boolean, array 
                and js object --> \`${key}\`.
              `);
            }
          // Otherwise.
          } else {
            // Invalid data type.
            this.error_ (`
              The value of a cookie cannot 
              be \`null\` or \`undefined\`. 
              Remove it instead --> \`${key}\`.
            `);
          }
        }
      }
      // Whether auto commits are
      // allowed.
      if (this.autoCommit_) {
        // Saves all modifications
        // into the document cookie.
        this.commit ();
      }
    // Otherwise.
    } else {
      // Invalid parameter data type.
      this.error_ (`
        Invalid argument data type. A 
        javascript object is required 
        for this operation.
      `);
    }
  }
}
