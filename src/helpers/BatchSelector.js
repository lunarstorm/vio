import { computed, reactive, toRaw, unref } from 'vue';
import _ from 'lodash';

class BatchSelector {
    constructor(args) {
        let state = reactive({
            selectedMap: {},
            selectedValues: [],
            items: [],
            keyName: 'id',
            ...args,
        });
        this.state = state;

        this.nSelected = computed(function () {
            return state.selectedValues.value.length;
        });

        this.items = computed(() => state.items);
        this.selectedMap = computed(() => state.selectedMap);
        this.selectedValues = computed(() => state.selectedValues);
    }

    bindWithItems(items){
        //Object.assign(this.state.items, items)
        this.clear();
        this.state.items = items;
    }

    isAllSelected(){
        return this.count() > 0 && (this.count() === this.state.items.length);
    }

    isSomeSelected() {
        return this.count() > 0;
    }

    isNoneSelected(){
        return this.count() === 0;
    }

    isSelected(key) {
        //let haystack = unref(this.state.selectedValues);
        //let pos = _.findIndex(haystack, (item) => item == key);

        return !!this.state.selectedMap[key];
        //return pos > -1;
    }

    select(key) {
        if (!this.isSelected(key)) {
            this.state.selectedValues.push(key);
            this.state.selectedMap[key] = true;
        }
        return false;
    }

    unselect(key) {
        _.remove(this.state.selectedValues, (item) => item == key);
        this.state.selectedMap[key] = false;
        return false;
    }

    selectAll(){
        _.forEach(this.state.items, (item) => {
            let key = item[this.state.keyName];
            this.select(key);
        });

        return true;
    }

    selectAllToggle() {
        if(this.isAllSelected()){
            return this.selectNone();
        }

        return this.selectAll();
    }

    selectNone() {
        return this.clear();
    }

    clear() {
        let self = this;
        this.state.selectedValues = [];
        this.state.selectedMap = {};

        /*_.forEach(this.state.selectedMap, function(value, key){
			console.log('unselect', key);
			self.unselect(key);
		});*/

        //console.log(self.selectedMap.value, self.selectedValues.value);

        return false;
    }

    reset() {
        this.clear();
    }

    count() {
        return this.selectedValues.value.length;
    }

    toggle(key) {
        if (this.isSelected(key)) {
            this.unselect(key);
        } else {
            this.select(key);
        }
        //console.log('Batch.selectedValues', this.selectedValues.value.length);
        return false;
    }

    getValues() {
        return toRaw(unref(this.state.selectedValues));
    }

    /*stateKeys() {
		let obj = this.state.selectedMap;
		let keys = Object.keys(obj);
		let filtered = keys.filter(function (key) {
			return obj[key]
		});

		return filtered;
	}

	nSelected() {
		return this.stateKeys().length;
	}*/
}

export default BatchSelector;
