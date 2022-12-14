import axios from 'axios';
import { reactive, ref } from 'vue';
import Dialog from 'vio/helpers/Dialog';
import Messages from 'vio/helpers/Messages';
import Message from 'vio/helpers/Message';

const busy = reactive({});
class Http {

    constructor(config) {
        this.id = _.uniqueId('http');
        this._busy = ref(false);
        this._axios = axios.create(config);
        this._messages = {
            progress: null,
            finish: null,
            success: null,
            error: null,
            position: Message.POS_TOP,
        };
    }

    setId(id) {
        this.id = id;
    }

    static get busy() {
        return busy;
    }

    static create(name, config) {
        const instance = new Http(config);
        instance.setId(name);
        let key = instance.id;

        Http.busy[key] = false;

        let message = null;

        instance._axios.interceptors.request.use(
            config => {
                Http.busy[key] = true;
                instance._busy = true;

                message = Messages.make();

                if (instance._messages.progress) {
                    message.update({
                        text: instance._messages.progress,
                        level: 'light',
                        spin: true,
                        autohide: false,
                        closeable: false,
                        position: instance._messages.position,
                    }).show();
                }

                return config;
            },

            error => {
                Http.busy[key] = false;
                instance._busy = false;

                if (message) {
                    message.hide();
                }

                return Promise.reject(error);
            },
        );

        instance._axios.interceptors.response.use(
            response => {
                Http.busy[key] = false;
                instance._busy = false;

                if (instance._messages.success) {
                    message.text(instance._messages.success).update({
                        spin: false,
                        level: 'info',
                        autohide: true,
                        closeable: true,
                        delay: 1500,
                    }).show();
                }
                else {
                    message.remove();
                }

                return response;
            },

            error => {
                Http.busy[key] = false;
                instance._busy = false;

                let errorMessage = instance._messages.error || _.get(error.response, 'data.message');

                if (errorMessage) {
                    message.text(errorMessage).update({
                        spin: false,
                        level: 'danger',
                        autohide: true,
                        closeable: true,
                        delay: 3000,
                    }).show();
                }
                else {
                    message.remove();
                }

                return Promise.reject(error);
            },
        );

        return instance;
    }

    static make(name, config) {
        return Http.create(name, config);
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
        if (!name) {
            name = 'default';
        }

        return !!Http.busy[name];
    }

    progressMessage(message) {
        this._messages.progress = message;
        return this;
    }

    messages(messages) {
        this._messages = {
            ...this._messages,
            ...messages,
        };

        return this;
    }

    ask(message, level, dialogOptions) {
        this._axios.interceptors.request.use(
            config => {
                const promise = new Promise((resolve, reject) => {

                    Dialog.confirm({
                        message: message,
                        level: level ?? 'danger',
                        onYes: () => {
                            resolve(config);
                        },
                        onClose: () => {
                            reject('Declined');
                        },
                        ...dialogOptions,
                    });

                });

                return promise;
            },
        );

        return this;
    }

    dialog(message, options) {
        return this.ask(message, 'info', options);
    }
}

export default Http;
