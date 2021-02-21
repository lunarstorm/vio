import $ from 'jquery';
import _ from 'lodash';

class Toaster {

	constructor() {
		this.stacks = {
			primary: [],
			secondary: [],
			passive: []
		};
	}

}

const Toast = new Toaster();

export default Toast;