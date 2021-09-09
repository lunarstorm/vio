import axios from "axios";
import { reactive, ref } from "vue";
import Dialog from "vio/helpers/Dialog";
import Messages from "vio/helpers/Messages";
import Message from 'vio/helpers/Message';

const busy = reactive({});
class Http {

    constructor() {
        this._busy = ref(false);
        this._axios = axios.create();
        this._messages = {
            progress: null,
            finish: null,
            success: null,
            error: null,
            position: Message.POS_TOP
        };
    }

    static get busy() {
        return busy;
    }

    static create(name) {
        const instance = new Http();

        if(!name){
            name = "default";
        }

        Http.busy[name] = false;

        let message = Messages.make();

        instance._axios.interceptors.request.use(
            config => {
                Http.busy[name] = true;
                instance._busy = true;

                if (instance._messages.progress) {
                    message.update({
                        text: instance._messages.progress,
                        level: 'light',
                        spin: true,
                        autohide: false,
                        closeable: false,
                        position: instance._messages.position
                    }).show();
                }

                return config;
            },

            error => {
                Http.busy[name] = false;
                instance._busy = false;

                if (message) {
                    message.hide();
                }

                return Promise.reject(error);
            }
        );

        instance._axios.interceptors.response.use(
            response => {
                Http.busy[name] = false;
                instance._busy = false;

                if (instance._messages.success) {
                    message.text(instance._messages.success).update({
                        spin: false,
                        level: 'success',
                        autohide: true,
                        closeable: true,
                        delay: 1500,
                    }).show();
                }
                else {
                    message.hide();
                }

                return response;
            },

            error => {
                Http.busy[name] = false;
                instance._busy = false;

                if (instance._messages.error) {
                    message.text(instance._messages.error).update({
                        spin: false,
                        level: 'danger',
                        closeable: true,
                        autohide: false
                    }).show();
                }
                else {
                    message.hide();
                }

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

    progressMessage(message) {
        this._messages.progress = message;
        return this;
    }

    messages(messages) {
        this._messages = {
            ...this._messages,
            ...messages
        };

        return this;
    }

    ask(message, level) {
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
