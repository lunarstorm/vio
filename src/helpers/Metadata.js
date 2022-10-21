import { reactive, watch } from 'vue';
import _ from 'lodash';

class Metadata {
    constructor(defaults) {
        this.data = reactive({
            store: {},
            getters: {},
        });

        this.requested = {};
    }

    register(key, getter){
        this.data.getters[key] = getter;
    }

    set(key, value) {
        this.data.store[key] = value;
    }

    async invokeGetter(key){
        const getter = _.get(this.data.getters, key);
        if(getter){
            this.requested[key] = true;
            this.data.store[key] = await getter();
            this.requested[key] = false;
        }
    }

    get(path) {
        let parts = _.toPath(path);
        let root = parts[0];

        //console.log('Metadata.get', path);

        if(!_.has(this.data.store, root)){
            // Fetch the data
            if(!this.requested[root]){
                //console.log('Metadata.invokeGetter', root);
                this.invokeGetter(root);
            }
            else{
                //console.log('Already requested', root);
            }
        }

        return _.get(this.data.store, path);
    }

    async fetch(path) {
        let parts = _.toPath(path);
        let root = parts[0];

        if (!_.has(this.data.store, root)) {
            // Fetch the data
            if (!this.requested[root]) {
                await this.invokeGetter(root);
            } else {
                //console.log('Already requested', root);
            }
        }

        return _.get(this.data.store, path);
    }
}

export default new Metadata();