import Dialog from "vio/helpers/Dialog";
import Modal from "vio/helpers/Modal";
import Messages from "vio/helpers/Messages";

export default {
	install: (app, options) => {
		Object.defineProperty(app.config.globalProperties, '$Dialog', {get: () => Dialog});
		Object.defineProperty(app.config.globalProperties, '$Modal', {get: () => Modal});
		Object.defineProperty(app.config.globalProperties, '$Messages', {get: () => Messages});
	}
}