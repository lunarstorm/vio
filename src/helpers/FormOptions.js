import _ from 'lodash';

class FormOptions {

	static normalize(options) {
		let opts = [];

		let isArray = _.isArray(options);

		options.forEach((val, key) => {
			let opt = {
				text: null,
				value: null
			};

			if (_.isObject(val)) {
				opt = {
					...opt,
					...val
				};
			} else {
				if (isArray) {
					opt.text = val;
				} else {
					opt.text = key;
				}

				opt.value = val;
			}

			opts.push(opt);
		});

		return opts;
	}

}

export default FormOptions;