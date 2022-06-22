import $ from 'jquery';
import selectize from 'selectize';

export default {
    name: 'selectize',
    mounted: function (el, binding, vnode) {
        let $element = $(el);
        let self = this;
        let args = {
            modelValue: null,
            config: {},
            ...binding.value,
        };

        console.log('selectize vnode', vnode);

        let config = {
            multi: false,
            ...args.config,
        };

        let $select = $element.selectize(config);
        let selectize = $select[0].selectize;

        // TODO: update selectize selection on external change?
        $element.on('change', function (e) {
            if (this.selectize.settings.mode == 'multi') {
                /*var values = [];
				for (var i = 0; i < this.selectedOptions.length; i++) {
					values.push(this.selectedOptions[i].value)
				}
				self.set(values.join(this.selectize.settings.delimiter))*/
            } else {
                let val = this.value;
                console.log('element value change?', val, args);

                //let event = new Event('change');
                //el.dispatchEvent(event);
                //self.set(this.value)
                //selectize.setValue(val);
            }
        });

        // TODO: on selectize selection, update corresponding bindings?

        /*var value = allBindings.get('value'), valueSubscription;
		if (ko.isObservable(value)) {
			valueSubscription = value.subscribe(function (val) {
				var selectize = $select[0].selectize;
				selectize.setValue(val);
			});
		}*/
    },
    /*updated: function (el, val) {
		console.log('selectize update', el, val);
		$(el).trigger('change');
	},*/
    unmounted: function (el) {
        let $element = $(el);
        let selectize = $element[0].selectize;
        selectize.destroy();
    },
};