import {createApp, defineAsyncComponent, reactive, ref} from 'vue';

class Pagination {
    constructor() {
        this.payload = reactive({
            'total': 50,
            'per_page': 50,
            'current_page': 1,
            'last_page': 1,
            'first_page_url': null,
            'last_page_url': null,
            'next_page_url': null,
            'prev_page_url': null,
            'path': '/',
            'from': 1,
            'to': 15,
            'data': [
                {
                    // Record...
                },
                {
                    // Record...
                },
            ],
        });
    }
}

export default Pagination;