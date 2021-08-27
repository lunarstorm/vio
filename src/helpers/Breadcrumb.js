import { reactive, ref } from "vue";

class Breadcrumb {

    constructor(defaults) {
        this.data = reactive({
            path: []
        });
    }

    push(label, url) {
        this.data.path.push({
            title: label,
            url: url
        });

        return this.data.path;
    }

    path(path) {
        this.data.path = path;
    }
}

export default new Breadcrumb();
