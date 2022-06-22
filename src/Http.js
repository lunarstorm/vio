import axios from 'axios';
import io from 'io/app';
import _ from 'lodash';

class Http {
    constructor() {
        this.baseUrl = io.cfg.base_url + '/' + io.cfg.api_base;
    }

    url(path, id) {
        var url = this.baseUrl + '/' + path;

        if (id) {
            url += '/' + id;
        }

        return url;
    }

    get(path, o) {
        var pathValue = path;

        if (_.isObject(path)) {
            o = path;
            pathValue = '';
        }

        o = {
            method: 'GET',
            path: pathValue,
            ...o,
        };

        return this.request(o);
    }

    put(path, o) {
        var pathValue = path;

        if (_.isObject(path)) {
            o = path;
            pathValue = '';
        }

        o = {
            contentType: 'application/json',
            method: 'PUT',
            path: pathValue,
            ...o,
        };

        return this.request(o);
    }

    post(path, o) {
        return this.request(path, o);
    }

    request(path, o) {
        var pathValue = path;

        if (_.isObject(path)) {
            o = path;
            pathValue = '';
        }

        o = {
            id: '',
            path: pathValue,
            url: '',
            urlParams: {},
            data: {},
            _json: null,
            busyFlag: false,
            done: false,
            method: 'POST',
            silent: false,
            msg: {},
            growl: {},
            dataType: 'json',
            headers: {},
            ...o,
        };

        /**
		 * A shortcut to jsonify a payload and send to the server
		 * via the data._json option; for compatibility with the
		 * io-specific RestController in the backend.
		 */
        if (o._json) {
            o.data = {
                _json: JSON.stringify(o._json),
            };
        }

        console.log('o', o);

        o.busyFlag = true;

        var url = '';

        if (o.path) {
            url = this.url(o.path, o.id);
        }

        if (o.url) {
            url = o.url;

            if (o.id) {
                url += '/' + o.id;
            }
        }

        if (o.urlParams) {
            url += '?' + (new URLSearchParams(o.urlParams)).toString();
        }

        o.msg = {
            id: _.uniqueId('msg'),
            position: 'top',
            hideAfter: 2,
            theme: 'flat',
            ...o.msg,
        };

        //console.log(o.msg);

        var m = false;

        if (o.msg.progress) {
            //console.log('Progress', o.msg.position);
            m = io.msg.show({
                id: o.msg.id,
                type: 'info',
                position: o.msg.position,
                message: o.msg.progress,
                hideAfter: 0,
            });
        }

        let promise = axios({
            method: o.method,
            responseType: o.dataType,
            url: url,
            data: o.data,
            headers: o.headers,
        });

        // Allow the "done" alias
        promise.done = promise.then;

        return promise.then(function (res) {
            if (typeof o.done === 'function') {
                o.done(res);
            }
            if (!o.silent) {
                o.msg = {
                    ...io.msg.parse(res),
                    ...o.msg,
                };
                //console.log('Done', o.msg.position);
                io.msg.show(o.msg);

                if (!o.msg.message && m) {
                    m.hide();
                }
            }

            return promise;
        }).catch(function (error) {
            var msg = error.message;

            if(error.response){
                msg = `${error.response.status}: ${msg}`;
            }

            io.msg.show({
                id: o.msg.id,
                type: 'error',
                message: msg,
                hideAfter: 5,
            });

            return promise;
        }).then(function (xhr) {
            o.busyFlag = false;
            return promise;
        });
    }
}

const http = new Http();

export default http;