import { reactive, watch } from 'vue';
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
    }

    static make(config) {
        return new Form(config);
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
            ...options
        };

        url = url || this.url;
        let method = "post";
        let payload = this.state.data;
        let errors = 0;

        if (payload.id) {
            method = "put";
            url += `/${payload.id}`;
        }

        return this._http
            .request({
                url: url,
                method: method,
                data: payload,
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
            });
    }
}

export default Form;
