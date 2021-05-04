import Dialog from "vio/helpers/Dialog";
import Modal from "vio/helpers/Modal";

export default {
	install: (app, options) => {
		app.config.globalProperties.$Dialog = Dialog;
		app.config.globalProperties.$Modal = Modal;
	}
}