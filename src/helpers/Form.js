import { reactive, computed, ref, watchEffect, watch } from 'vue';
import _ from 'lodash';
import Http from 'vio/helpers/Http';

class Form {
    constructor(data, http) {
        if (http && http.id) {
            this.id = http.id;
        }
        else {
            this.id = _.uniqueId('form');
        }

        this._http = http ?? Http.make(this.id);

        this.config = {
            method: 'post',
            url: window.location.href,
        };

        this.state = reactive({
            data: {
                ...data,
            },
            errors: {},
            extraParams: {},
        });

        this.data = new Proxy(this.state, {
            get(target, prop) {
                if (typeof prop === 'undefined') {
                    return target.data;
                }

                try {
                    return target.data[prop];
                }
                catch (e) {

                }

                return null;
            },
            set(target, prop, value) {
                target.data[prop] = value;
                return true;
            },
        });

        this.errors = new Proxy(this.state, {
            get(target, prop) {
                if (typeof prop === 'undefined') {
                    return target.errors;
                }

                try {
                    return target.errors[prop];
                }
                catch (e) {

                }

                return null;
            },
            set(target, prop, value) {
                target.errors[prop] = value;
                return true;
            },
        });

        this.busy = ref(false);
        this.hasErrors = ref(false);

        watchEffect(() => {
            this.busy = this.isBusy();
            this.hasErrors = this.countErrors() > 0;
        });
    }

    static make(config) {
        return new Form(config);
    }

    fill(data) {
        Object.assign(this.state.data, data);
    }

    method(value) {
        this.config.method = typeof value === 'undefined' ? 'post' : value;
        return this;
    }

    url(value) {
        this.config.url = typeof value === 'undefined' ? '/' : value;
        return this;
    }

    clearErrors() {
        Object.assign(
            this.state.errors,
            _.mapValues(this.state.errors, () => null),
        );
    }

    reset() {
        this.clearErrors();
    }

    error(path) {
        return _.get(this.state.errors, path);
    }

    countErrors() {
        let n = 0;

        _.forEach(this.state.errors, item => {
            if (!_.isNull(item)) {
                n++;
            }
        });

        return n;
    }

    fillErrors(errors) {
        this.clearErrors();
        Object.assign(this.state.errors, errors);
    }

    isBusy() {
        return Http.isBusy(this._http.id);
    }

    put(url, options){
        return this.submit(url, {
            method: 'put',
            appendId: false,
            ...options,
        });
    }

    post(url, options){
        return this.submit(url, {
            method: 'post',
            appendId: false,
            ...options,
        });
    }

    submit(url, options) {
        options = {
            onSuccess: () => { },
            onError: () => { },
            messages: {},
            data: null,
            appendId: true,
            ...options,
        };

        url = url || this.url;
        let method = options.method ?? 'post';
        let payload = options.data ?? this.state.data;
        let errors = 0;

        if (payload.id) {
            method = 'put';
            if (options.appendId) {
                url += `/${payload.id}`;
            }
        }

        return this._http
            .messages(options.messages)
            .request({
                url: url,
                method: method,
                data: {
                    ...payload,
                },
                params: {
                    ...this.state.extraParams,
                },
            })
            .catch((error) => {
                if (error.response) {
                    this.fillErrors(error.response.data.errors);
                    options.onError(error.response);
                }

                errors++;
            }).then(res => {
                if (errors === 0) {
                    this.clearErrors();
                    options.onSuccess(res);
                }

                return {
                    response: res,
                    errors: errors,
                };
            });
    }
}

export default Form;
