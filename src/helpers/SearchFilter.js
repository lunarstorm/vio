import {reactive, watch} from 'vue';

class SearchFilter {
	constructor(defaults) {
		this.data = reactive({
			defaults: {},
			values: {},
		});

		this.setDefaults(defaults);
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

	setDefaults(values){
		this.data.defaults = values;
		this.assignValues({});
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