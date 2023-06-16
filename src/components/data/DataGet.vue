<template>
  <slot :response="res" :loading="loading" :loaded="!loading" />
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import Http from 'vio/helpers/Http';

const props = defineProps({
    url: {
        type: String,
        required: true,
    },
    params: {
        type: Object,
        default: () => ({}),
    },
    onLoaded: {
        type: Function,
        default: null,
    },
});

const res = ref('');

const loading = ref(true);

function fetchData(){
    Http.make()
        .get(props.url, {
            params: props.params,
        })
        .then((response) => response.data)
        .then((response) => {
            res.value = response;

            if(props.onLoaded){
                props.onLoaded(response);
            }

            loading.value = false;
        });
}

onMounted(() => {
    fetchData();
});
</script>
