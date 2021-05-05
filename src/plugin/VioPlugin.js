import Dialog from "vio/helpers/Dialog";
import Modal from "vio/helpers/Modal";
import Messages from "vio/helpers/Messages";

export default {
	install: (app, options) => {
		app.config.globalProperties.$Dialog = Dialog;
		app.config.globalProperties.$Modal = Modal;
		app.config.globalProperties.$Messages = Messages;
	}
}