import axios from "axios";
import { reactive, ref } from "vue";
import Dialog from "vio/helpers/Dialog";

class Http {

    static busy = reactive({});

    constructor() {
        this._busy = ref(false);
        this._axios = axios.create();
    }

    static create(name) {
        const instance = new Http();
        Http.busy[name] = false;

        instance._axios.interceptors.request.use(
            config => {
                Http.busy[name] = true;
                instance._busy = true;
                return config;
            },

            error => {
                Http.busy[name] = false;
                instance._busy = false;
                return Promise.reject(error);
            }
        );

        instance._axios.interceptors.response.use(
            response => {
                Http.busy[name] = false;
                instance._busy = false;
                return response;
            },

            error => {
                Http.busy[name] = false;
                instance._busy = false;
                return Promise.reject(error);
            }
        );

        return instance;
    }

    static make(name) {
        return Http.create(name);
    }

    request(...args) {
        return this._axios.request(...args);
    }

    get(...args) {
        return this._axios.get(...args);
    }

    delete(...args) {
        return this._axios.delete(...args);
    }

    head(...args) {
        return this._axios.head(...args);
    }

    options(...args) {
        return this._axios.options(...args);
    }

    post(...args) {
        return this._axios.post(...args);
    }

    put(...args) {
        return this._axios.put(...args);
    }

    patch(...args) {
        return this._axios.patch(...args);
    }

    static request(...args) {
        return this.make('default').request(...args);
    }

    static get(...args) {
        return this.make('default').get(...args);
    }

    static delete(...args) {
        return this.make('default').delete(...args);
    }

    static head(...args) {
        return this.make('default').head(...args);
    }

    static options(...args) {
        return this.make('default').options(...args);
    }

    static post(...args) {
        return this.make('default').post(...args);
    }

    static put(...args) {
        return this.make('default').put(...args);
    }

    static patch(...args) {
        return this.make('default').patch(...args);
    }

    static isBusy(name) {
        return !!Http.busy[name];
    }

    ask(message, level) {
        this._axios.interceptors.request.use(
            config => {
                const promise = new Promise((resolve, reject) => {

                    Dialog.confirm({
                        message: message,
                        level: level || 'danger',
                        onYes: () => {
                            resolve(config);
                        },
                        onClose: () => {
                            reject('Declined');
                        }
                    });

                });

                return promise;
            },
        );

        return this;
    }
}

export default Http;
