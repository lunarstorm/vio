import _ from 'lodash';

class FormOptions {

	static normalize(options) {
		let opts = [];

		let isArray = _.isArray(options);

		_.forEach(options, (val, key) => {
			let opt = {
				text: null,
				label: null,
				value: null
			};

			if (_.isObject(val)) {
				opt = {
					...opt,
					...val
				};

				if (opt.label) {
					opt.text = opt.label;
				}

				if (opt.text) {
					opt.label = opt.text;
				}
			} else {
				if (isArray) {
					opt.text = val;
					opt.value = val;
				} else {
					opt.text = key;
					opt.value = val;
				}

				opt.label = opt.text;
			}

			opts.push(opt);
		})

		return opts;
	}

}

export default FormOptions;