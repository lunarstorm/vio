<template>
  <slot :response="res" :loading="loading" />
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    components: {},
    props: {
        url: String,
        params: Object,
        onLoaded: Function,
    },
    setup(props) {
        const res = ref('');
        const loading = ref(true);

        axios
            .get(props.url, {
                params: this.params,
            })
            .then((response) => response.data)
            .then((response) => {
                res.value = response;
                loading.value = false;

                if(this.onLoaded){
                    this.onLoaded(response);
                }
            });

        return {
            res,
            loading,
        };
    },
};
</script>

<style scoped>
</style>
