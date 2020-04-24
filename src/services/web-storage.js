/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in web-storage.js is proprietary and confidential.        *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

const accessTokenKey  = 'accessToken';
const refreshTokenKey = 'refreshToken';
const expiryKey = 'expiresAt';

class WebStorage {
    #storage;
    constructor() {
        if (typeof sessionStorage === 'object') {
            try {
                sessionStorage.setItem('localStorage', 'item');
                sessionStorage.removeItem('localStorage');
                this.#storage = sessionStorage;
            } catch (e) {
                // //We're going to detect this and just silently drop any calls to setItem
                // //to avoid the entire page breaking, without having to do a check at each usage of Storage.
                // Storage.prototype._setItem = Storage.prototype.setItem;
                // Storage.prototype.setItem = function() {};

                alert('Your web browser does not support storing settings locally. ' +
                    'Some settings may not save or some features may not work properly for you. ' +
                    'If you are using "Private Browsing Mode", ' +
                    'you can disable it and try to access this website again.');
            }
        } else {
            alert('Your web browser does not support storing settings locally. ' +
                'Some settings may not save or some features may not work properly for you.');
        }
    }
    // GETTERS
    getAccessToken() {
        return JSON.parse(this.#storage.getItem(accessTokenKey));
    }
    getRefreshToken() {
        return JSON.parse(this.#storage.getItem(refreshTokenKey));
    }
    getExpiry() {
        return JSON.parse(this.#storage.getItem(expiryKey));
    }


    // SETTERS
    setAccessToken(accessToken) {
        this.#storage.setItem(accessTokenKey, JSON.stringify(accessToken));
    }
    setRefreshToken(refreshToken) {
        this.#storage.setItem(refreshTokenKey, JSON.stringify(refreshToken));
    }
    setExpiry(expiry) {
        this.#storage.setItem(expiryKey, JSON.stringify(expiry));
    }

    // REMOVERS
    removeAccessToken() {
        this.#storage.removeItem(accessTokenKey);
    }
    removeRefreshToken() {
        this.#storage.removeItem(refreshTokenKey);
    }
    removeExpiry() {
        this.#storage.removeItem(expiryKey);
    }
}

export default new WebStorage();