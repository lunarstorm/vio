import { reactive } from 'vue';
import Messages from "vio/helpers/Messages";
import _ from 'lodash';

const LEVEL_INFO = "info",
    LEVEL_SUCCESS = "success",
    LEVEL_WARNING = "warning",
    LEVEL_DANGER = "danger",
    LEVEL_LIGHT = "light";

const POS_TOP = "top",
    POS_TOP_RIGHT = "topright",
    POS_TOP_LEFT = "topleft",
    POS_BOTTOM = "bottom",
    POS_BOTTOM_LEFT = "bottomleft",
    POS_BOTTOM_RIGHT = "bottomright";

class Message {

    static get LEVEL_INFO() {
        return LEVEL_INFO;
    }

    static get LEVEL_SUCCESS() {
        return LEVEL_SUCCESS;
    }

    static get LEVEL_WARNING() {
        return LEVEL_WARNING;
    }

    static get LEVEL_DANGER() {
        return LEVEL_DANGER;
    }

    static get LEVEL_LIGHT() {
        return LEVEL_LIGHT;
    }

    static get POS_TOP() {
        return POS_TOP;
    }

    static get POS_TOP_RIGHT() {
        return POS_TOP_RIGHT;
    }

    static get POS_TOP_LEFT() {
        return POS_TOP_LEFT;
    }

    static get POS_BOTTOM() {
        return POS_BOTTOM;
    }

    static get POS_BOTTOM_LEFT() {
        return POS_BOTTOM_LEFT;
    }

    static get POS_BOTTOM_RIGHT() {
        return POS_BOTTOM_RIGHT;
    }

    constructor(text, config) {
        this.data = reactive({
            id: _.uniqueId('message'),
            ticks: 0,
            title: null,
            text: text,
            level: LEVEL_INFO,
            autohide: true,
            delay: 3000,
            animation: true,
            position: POS_TOP,
            closeable: true,
            hidden: false,
            visible: true,
            spin: false,
            ...config
        });

        this.pushed = false;
    }

    static make(config) {
        return new Message(null, config);
    }

    id(id) {
        this.data.id = id;
        return this;
    }

    _set(key, value, defaultValue) {
        this.data[key] = typeof value === 'undefined' ? defaultValue : value;
    }

    visible(toggle) {
        this._set('visible', toggle, true);
        return this;
    }

    animate(toggle) {
        this._set('animation', toggle, true);
        return this;
    }

    closeable(toggle) {
        this._set('closeable', toggle, true);
        return this;
    }

    spin(toggle) {
        this._set('spin', toggle, true);
        return this;
    }

    sticky() {
        this.data.autohide = false;
        return this;
    }

    delay(seconds) {
        this.data.delay = (seconds * 1000);
        return this;
    }

    text(text) {
        this.data.text = text;
        return this;
    }

    level(level) {
        this.data.level = level;
        return this;
    }

    top() {
        this.data.position = POS_TOP;
        return this;
    }

    topLeft() {
        this.data.position = POS_TOP_LEFT;
        return this;
    }

    topRight() {
        this.data.position = POS_TOP_RIGHT;
        return this;
    }

    bottom() {
        this.data.position = POS_BOTTOM;
        return this;
    }

    bottomLeft() {
        this.data.position = POS_BOTTOM_LEFT;
        return this;
    }

    bottomRight() {
        this.data.position = POS_BOTTOM_RIGHT;
        return this;
    }

    update(config) {
        Object.assign(this.data, {
            ...config,
        });

        this.data.ticks++;

        return this;
    }

    show(config) {
        if(config){
            this.update({
                ...config,
                visible: true
            })
        }

        if (!this.pushed) {
            Messages.push(this);
            this.pushed = true;
        }

        return this;
    }

    hide() {
        this.visible(false);
        return this;
    }

    remove() {
        Messages.remove(this);
        return this;
    }

}

export default Message;
