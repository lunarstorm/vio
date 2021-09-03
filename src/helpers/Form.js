import { reactive, computed, ref, watchEffect, watch } from 'vue';
import _ from 'lodash';
import Http from "vio/helpers/Http";

class Form {
    constructor(data) {
        let root = this;

        this.id = _.uniqueId('form');
        this._http = Http.make(this.id);

        this.config = {
            method: 'post',
            url: window.location.href
        };

        this.state = reactive({
            data: {
                ...data
            },
            errors: {},
            extraParams: {}
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
            }
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
            }
        });

        this.busy = ref(false);
        this.hasErrors = ref(false);

        watchEffect(() => {
            this.busy = this.isBusy();

            let n = 0;

            _.forEach(this.state.errors, item => {
                if (!_.isNull(item)) {
                    n++;
                }
            });

            this.hasErrors = n > 0;
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
            _.mapValues(this.state.errors, () => null)
        );
    }

    countErrors() {
        let n = 0;

        _.forEach(this.state.errors, item => {
            if (!_.isNull(item)) {
                n++;
            }
        })

        return n;
    }

    fillErrors(errors) {
        this.clearErrors();
        Object.assign(this.state.errors, errors);
    }

    isBusy() {
        return Http.isBusy(this.id);
    }

    submit(url, options) {
        options = {
            onSuccess: () => { },
            data: null,
            ...options
        };

        url = url || this.url;
        let method = "post";
        let payload = options.data ?? this.state.data;
        let errors = 0;

        if (payload.id) {
            method = "put";
            url += `/${payload.id}`;
        }

        return this._http
            .request({
                url: url,
                method: method,
                data: {
                    ...payload,
                },
                params: {
                    ...this.state.extraParams,
                }
            })
            .catch((error) => {
                if (error.response) {
                    this.fillErrors(error.response.data.errors);
                }

                errors++;
            }).then(res => {
                if (errors === 0) {
                    options.onSuccess(res);
                }

                return {
                    response: res,
                    errors: errors
                };
            });
    }
}

export default Form;
