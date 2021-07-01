import axios from "axios";
import {reactive} from "vue";

class Http {

	constructor() {
		this.busy = reactive({});
	}

	create(name){
		const instance = axios.create();
		this.busy[name] = false;

		instance.interceptors.request.use(config => {
			this.busy[name] = true;
			return config;
		}, error => {
			this.busy[name] = false;
		});

		instance.interceptors.response.use(response => {
			this.busy[name] = false;
			return response;
		}, error => {
			this.busy[name] = false;
		});

		return instance;
	}

	make(name){
		return this.create(name);
	}

}

export default new Http();