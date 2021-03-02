import {reactive, watch} from 'vue';

class SearchFilter {
	constructor(defaults) {
		let data = reactive({
			defaults: {
				...defaults
			},
			values: {},
		});

		this.data = data;
	}

	onChange(callback) {
		watch(() => this.data.values, (values) => {
			let self = this;
			callback(values, self);
		}, {
			deep: true
		});
	}

	assignValues(values) {
		values = {
			...this.data.defaults,
			...values
		};
		Object.assign(this.data.values, values);
	}

	set(key, value) {
		this.data.values[key] = value;
	}

	clear(key) {
		this.data.values[key] = '';
	}

	reset(key) {
		this.data.values[key] = this.data.defaults[key];
	}

	get(key) {
		return this.data.values[key];
	}
}

export default SearchFilter;