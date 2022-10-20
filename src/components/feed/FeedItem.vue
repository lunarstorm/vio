<template>
  <div class="activity-stream-story">
    <div v-if="children.length == 0">
      <div
        v-if="item.titleTemplate == '@heading'"
        class="story-content"
      >
        <div class="content-title heading">
          <small class="text-muted">
            <em>{{ item.title }}</em>
          </small>
        </div>
      </div>
      <div v-else class="story-content">
        <small :title="item.dateString" class="text-muted">
          <TimeAgo
            v-if="item.isWithinCutoff"
            :value="item.date"
          />
          <span v-else>{{ item.dateString }}</span>
        </small>

        <div v-if="item.metaData.object" class="object-content">
          <FeedItemObject :object="item.metaData.object" />
        </div>
      </div>
    </div>

    <div v-if="children.length == 1" class="story-content">
      <div v-for="child in children">
        <div v-if="child.metaData">
          <div
            :class="child.metaData.bgClass"
            class="content-icon"
          >
            <i
              v-if="!!child.metaData.icon"
              :class="child.metaData.icon"
            />
            <i v-else class="fa fa-thumb-tack" />
          </div>
          <div class="content-title">
            <span v-html="_title(child)" />
          </div>
        </div>

        <div class="clearfix" />

        <small :title="child.dateString" class="text-muted">
          <TimeAgo
            v-if="child.isWithinCutoff"
            :value="child.date"
          />
          <span v-else>{{ child.dateString }}</span>
        </small>

        <div v-if="child.metaData.object" class="object-content">
          <FeedItemObject :object="child.metaData.object" />
        </div>
      </div>
    </div>

    <div
      v-if="children.length > 1"
      class="story-content"
    >
      <div v-if="item.metaData">
        <div
          v-if="item.metaData.icon"
          :class="item.metaData.bgClass"
          class="content-icon"
        >
          <i :class="item.metaData.icon" />
        </div>
        <div class="content-title">
          <span v-html="_title(item)" />
        </div>
      </div>

      <div class="clearfix" />

      <small class="text-muted">
        <TimeAgo
          v-if="item.isWithinCutoff"
          :value="item.date"
        />
        <span v-else>{{ item.dateString }}</span>

        <a
          href="#"
          class="ml-1 text-muted"
          @click.prevent="toggleExpanded"
        >
          <span v-if="expanded"><i class="fa fa-caret-down" /> Hide</span>
          <span v-else><i class="fa fa-caret-right" /> <strong>Show ({{ children.length }})</strong></span>
        </a>
      </small>
    </div>

    <div v-if="expanded">
      <div v-for="child in item.stories">
        <FeedItem :item="child" />
      </div>
    </div>
  </div>
</template>

<script>
import {toRefs, ref, defineAsyncComponent, inject} from 'vue';
import TimeAgo from 'vio/components/text/TextTimeAgo.vue';
import _ from 'lodash';

const FeedItem = defineAsyncComponent(() => import('./FeedItem.vue'));
const FeedItemObject = defineAsyncComponent(() => import('./FeedItemObject.vue'));

const templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
};

export default {
    name: 'FeedItem',
    components: {
        TimeAgo,
        FeedItem,
        FeedItemObject,
    },
    props: {
        item: {
            type: Object,
            default: {},
        },
    },
    setup(props) {
        //console.log('ActivityItem', props.item);

        return {
            item: toRefs(props).item,
            expanded: ref(false),
            objectResolver: inject('objectResolver'),
        };
    },
    computed: {
        children() {
            let item = this.item;

            //console.log('item?', item.stories);

            return item.stories ? item.stories : [];
        },
        title() {
            let item = this.item;

            return item.titleTemplate;
        },
    },
    methods: {
        toggleExpanded() {
            this.expanded = !this.expanded;
        },
        _implodeWithAnd(a) {
            var str = [a.slice(0, -1).join(', '), a.slice(-1)[0]].join(a.length < 2 ? '' : ' and ');
            return str;
        },
        _render(name) {
            var data = this.item.metaData[name];

            if (!Array.isArray(data)) {
                data = [data];
            }
            var tokens = [];

            _.forEach(data, function (item, i) {
                var o = {
                    url: '',
                    displayName: '',
                    attr: ' class="meta-' + name + '"',
                    ...item,
                };

                var value = '';
                if (o.url) {
                    value = _.template('<a href="{{url}}"{{attr}}>{{displayName}}</a>', templateSettings)(o);
                } else {
                    value = _.template('<span{{attr}}>{{displayName}}</span>', templateSettings)(o);
                }

                tokens.push(value);
            });

            return this._implodeWithAnd(tokens);
        },
        _title(item){
            let self = this;
            let args = {
                actor: '',
                object: '',
                target: '',
                target2: '',
            };

            let template = _.template(item.titleTemplate, templateSettings);

            _.forEach(args, (arg, name) => {
                args[name] = this._render(name);
            });

            if(item.stories){
                if(item.stories.length){
                    args.n = item.stories.length;
                }
                else{
                    args.n = 1;
                }
            }

            return template(args);
        },
    },
};
</script>

<style scoped>

</style>