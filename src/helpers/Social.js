import {reactive} from "vue";

class Social {

	static data = reactive({
		user: null,
		initials: null
	});

	static config(options){
		options = {
			user: null,
			initials: null,
			...options
		};

		Object.assign(Social.data, options);
	}

	static get initials(){
		if(typeof Social.data.initials === "function"){
			return Social.data.initials();
		}

		return Social.data.initials;
	}
}

export default Social;