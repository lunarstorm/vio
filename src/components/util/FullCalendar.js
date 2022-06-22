import '@fullcalendar/core/vdom';
import {Calendar} from '@fullcalendar/core';
import {
    defineComponent,
    h,
    onMounted,
    onUnmounted,
    ref,
    watchEffect,
} from 'vue';

export default defineComponent({
    props: {
        options: Object,
    },

    setup(props) {
        const el = ref();

        const calendar = ref();

        onMounted(() => {
            calendar.value = new Calendar(el.value, props.options);
            calendar.value.render();
        });

        watchEffect(() => {
            if (calendar.value) {
                calendar.value.pauseRendering();
                calendar.value.resetOptions(props.options);
                calendar.value.resumeRendering();
            }
        });

        onUnmounted(() => {
            calendar.value.destroy();
        });

        return () => h('div', {ref: el});
    },
});