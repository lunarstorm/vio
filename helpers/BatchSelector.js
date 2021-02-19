import {
	reactive,
	computed,
	unref,
	toRaw
} from 'vue';
import _ from 'lodash';

class BatchSelector {
	constructor() {
		let state = reactive({
			selections: {},
			items: []
		});
		this.state = state;

		let self = this;

		this.nSelected = computed(function () {
			return state.items.value.length;
		});

		this.selections = computed(() => state.selections);
		this.items = computed(() => state.items);
	}

	isSelected(key) {
		//let haystack = unref(this.state.items);
		//let pos = _.findIndex(haystack, (item) => item == key);

		return !!this.state.selections[key];
		//return pos > -1;
	}

	select(key) {
		if(!this.isSelected(key)){
			this.state.items.push(key);
			this.state.selections[key] = true;
		}
		return false;
	}

	unselect(key) {
		_.remove(this.state.items, (item) => item == key);
		this.state.selections[key] = false;
		return false;
	}

	clear() {
		let self = this;
		this.state.items = [];
		this.state.selections = {};
		/*_.forEach(this.state.selections, function(value, key){
			console.log('unselect', key);
			self.unselect(key);
		});*/

		//console.log(self.selections.value, self.items.value);

		return false;
	}

	count() {
		return this.items.value.length;
	}

	toggle(key) {
		if (this.isSelected(key)) {
			this.unselect(key);
		} else {
			this.select(key);
		}
		//console.log('Batch.items', this.items.value.length);
		return false;
	}

	getValues() {
		return toRaw(unref(this.state.items));
	}

	/*selectedKeys() {
		let obj = this.state.selections;
		let keys = Object.keys(obj);
		let filtered = keys.filter(function (key) {
			return obj[key]
		});

		return filtered;
	}

	nSelected() {
		return this.selectedKeys().length;
	}*/
}

export default BatchSelector;