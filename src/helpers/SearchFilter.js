import { reactive, watch } from 'vue';
import _ from 'lodash';

class SearchFilter {
    constructor(defaults) {
        let root = this;

        this.data = reactive({
            defaults: {},
            values: {},
        });

        this.setDefaults(defaults);

        this.params = new Proxy(this.data, {
            get(data, prop) {
                if (typeof prop === 'undefined') {
                    return data.values;
                }

                try {
                    return root.get(prop);
                }
                catch (e) {

                }

                return null;
            },
            set(data, prop, value) {
                root.set(prop, value);
                return true;
            },
        });
    }

    onChange(callback) {
        watch(() => this.data.values, (values) => {
            let self = this;
            callback(values, self);
        }, {
            deep: true,
        });
    }

    assignValues(values) {
        values = {
            ...this.data.defaults,
            ...values,
        };
        Object.assign(this.data.values, values);
    }

    fill(values) {
        this.assignValues(values);
    }

    setValues(values) {
        this.assignValues(values);
    }

    getValues() {
        return this.data.values;
    }

    setDefaults(values) {
        this.data.defaults = values;
        this.assignValues({});
    }

    set(key, value) {
        this.data.values[key] = value;
    }

    clear(key) {
        this.data.values[key] = '';
    }

    reset(key) {
        this.data.values[key] = _.get(this.data.defaults, [key], '');
    }

    get(key) {
        return this.data.values[key];
    }

    resetAll() {
        _.forEach(this.data.values, (val, key) => {
            this.reset(key);
        });
    }

    clearAll() {
        _.forEach(this.data.values, (val, key) => {
            this.clear(key);
        });
    }

    serialize(obj, prefix) {
        var str = [],
            p;

        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + '[' + p + ']' : p,
                    v = obj[p];

                let encoded = '';

                if (v !== null && typeof v === 'object') {
                    encoded = serialize(v, k);
                }
                else {
                    if (v === null) {
                        encoded = '';
                    }
                    else {
                        encoded = encodeURIComponent(v);
                    }
                }

                str.push(encodeURIComponent(k) + '=' + encoded);
            }
        }

        return str.join('&');
    }

    toQueryString() {
        return this.serialize(this.data.values);
    }
}

export default SearchFilter;
