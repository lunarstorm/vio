import { reactive, watch, getCurrentInstance, onUnmounted } from 'vue';
import _ from 'lodash';

class Postbox {
    constructor(defaults) {
        this.data = reactive({
            store: {},
            handlers: {},
            collections: {},
            messages: [],
        });

        this.init();
    }

    post(topic, data) {
        //console.log("Postbox.post", topic, data);
        this.data.messages.push({
            topic: topic,
            data: data,
        });
    }

    commit(topic, data) {
        //console.log("Postbox.commit", topic, data);
        this.data.messages.push({
            topic: `${topic}.commit`,
            data: data,
        });
    }

    syncWithArray(collection, topic) {
        if (!_.has(this.data.collections, topic)) {
            _.set(this.data.collections, topic, []);
        }

        let pool = this.getCollections(topic);
        pool.push(collection);
    }

    getCollections(topic) {
        return _.get(this.data.collections, topic, []);
    }

    on(topic, callback) {
        let topics = _.castArray(topic);

        _.forEach(topics, topic => {
            if (!_.has(this.data.handlers, topic)) {
                _.set(this.data.handlers, topic, []);
            }

            let handlers = this.getHandlers(topic);
            handlers.push(callback);

            let component = getCurrentInstance();
            if (component) {
                onUnmounted(() => {
                    //console.log('Postbox auto-unmounting?');
                    this.off(topic, callback);
                });
            }
        });
    }

    off(topic, callback) {
        let topics = _.castArray(topic);

        _.forEach(topics, topic => {
            let handlers = this.getHandlers(topic);
            _.remove(handlers, handler => {
                return handler === callback;
            });
        });
    }

    getHandlers(topic) {
        return _.get(this.data.handlers, topic, []);
    }

    handleMessage(message) {
        let handlers = this.getHandlers(message.topic);
        _.forEach(handlers, handler => {
            if (typeof handler == 'function') {
                handler(message.data, message.topic);
            }
        });

        if (_.endsWith(message.topic, '.commit')) {
            let parts = _.toPath(message.topic);

            //console.log('commit detected', parts);

            if (parts.length > 0) {
                let collections = this.getCollections(parts[0]);

                //console.log('collections', collections);

                if (message.data && message.data.id) {
                    let key = message.data.id;

                    if (!key) {
                        return;
                    }

                    _.forEach(collections, collection => {
                        //console.log('Searching collection for key', key);

                        let match = _.find(collection, item => {
                            return item.id == key;
                        });

                        if (match) {
                            Object.assign(match, message.data);
                        }
                        else {
                            collection.unshift(message.data);
                        }
                    });
                }
            }
        }
    }

    init() {
        watch(
            () => this.data.messages,
            (messages, prevMessages) => {
                let message = messages.pop();
                if (message) {
                    //console.log("message received", message);
                    //console.log('handlers', this.data.handlers);
                    this.handleMessage(message);
                }
            },
            { deep: true },
        );
    }
}

const instance = new Postbox();

export default instance;
