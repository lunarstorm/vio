import Dialog from 'vio/helpers/Dialog';
import Http from 'vio/helpers/Http';
import Messages from 'vio/helpers/Messages';
import Metadata from 'vio/helpers/Metadata';
import Modal from 'vio/helpers/Modal';

export default {
    install: (app, options) => {
        options = {
            mountMessageContainer: true,
            ...options,
        };

        Messages.setApp(app, options.mountMessageContainer);
        Modal.app = app;
        Dialog.app = app;

        Object.defineProperty(app.config.globalProperties, '$Dialog', { get: () => Dialog });
        Object.defineProperty(app.config.globalProperties, '$Modal', { get: () => Modal });
        Object.defineProperty(app.config.globalProperties, '$Messages', { get: () => Messages });
        Object.defineProperty(app.config.globalProperties, '$http', { get: () => Http });
        Object.defineProperty(app.config.globalProperties, '$ajax', { get: () => Http });
        Object.defineProperty(app.config.globalProperties, '$Metadata', { get: () => Metadata });
    },
};
