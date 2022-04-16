<template>
  <slot :response="res" :loading="loading" />
</template>

<script>
import { ref } from 'vue';
import Http from 'vio/helpers/Http';

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

        Http.make()
            .get(props.url, {
                params: props.params,
            })
            .then((response) => response.data)
            .then((response) => {
                res.value = response;
                loading.value = false;

                if(props.onLoaded){
                    props.onLoaded(response);
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
