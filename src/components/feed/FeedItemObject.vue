<template>
  <div class="m-2">
    <div v-if="objectComponent">
      <component
        :is="objectComponent.component"
        v-bind="objectComponent.props"
      />
    </div>
    <pre v-else>{{ object.displayName }}</pre>
  </div>
</template>

<script>
import {inject, ref, toRefs} from 'vue';

export default {
    name: 'FeedItemObject',
    components: {},
    props: {
        object: {
            type: Object,
            default: {},
        },
    },
    setup(props) {
        //console.log('ActivityItem', props.item);

        return {
            object: toRefs(props).object,
            expanded: ref(false),
            objectResolver: inject('objectResolver'),
        };
    },
    computed: {
        objectComponent() {
            if (this.object) {
                return this.resolveObjectComponent(this.object);
            }

            return null;
        },
    },
    methods: {
        resolveObjectComponent(data) {
            const resolver = this.objectResolver;
            //console.log('FeedItem renderObject', data);

            if (typeof resolver === 'function') {
                let resolved = resolver(data);
                return resolved;
            }

            return null;
        },
    },
};
</script>

<style scoped>

</style>