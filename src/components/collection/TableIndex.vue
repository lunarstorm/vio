<template>
  <div ref="container">
    <div v-if="hasSlot('filter')">
      <div class="card">
        <div class="card-body">
          <slot name="filter" />
        </div>
      </div>
    </div>

    <div class="card">
      <div v-if="hasSlot('header')" class="card-header">
        <div class="d-flex align-items-center">
          <div class="flex-grow-1">
            <slot name="header" />
          </div>
        </div>
      </div>

      <div v-if="hasToolbar" class="card-body py-0 bg-light">
        <div class="d-flex align-items-start py-2">
          <div
            v-if="isBatchSelectable"
            class="mr-2 justify-content-center align-self-center"
          >
            <FauxCheckbox
              :checked="Batch.isAllSelected()"
              @toggle="Batch.selectAllToggle()"
            />
          </div>
          <div class="flex-grow-1 align-self-center">
            <ButtonMenu
              v-if="Batch.count() > 0"
              :items="generateBatchMenu()"
              class="btn-primary"
            >
              {{ Batch.count() }} Selected
            </ButtonMenu>
            <div v-else>
              <slot name="toolbar" />
            </div>
          </div>
          <div v-if="!!addItem" class="align-self-center">
            <a href="#" class="btn btn-primary" @click.prevent="addItem">
              <i class="fa fa-plus" />
              Add
            </a>
          </div>
        </div>
      </div>

      <InfiniteTable
        ref="list"
        :fetch="fetch"
        :on-mounted="onMounted"
        @busy="busy = $event"
      >
        <template #head="{ item }">
          <slot :item="item" name="head" />
        </template>

        <template #item="{ item }">
          <slot :item="item" name="item" />
        </template>
      </InfiniteTable>
    </div>
  </div>
</template>

<script>
import { ref, watch, watchEffect, toRefs, defineAsyncComponent } from 'vue';
import BatchSelector from 'vio/helpers/BatchSelector';
import InfiniteTable from './InfiniteTable.vue';

const ContextMenu = defineAsyncComponent(() =>
    import('vio/components/menu/ContextMenu'),
);
const FauxCheckbox = defineAsyncComponent(() =>
    import('vio/components/form/FauxCheckbox'),
);
const ButtonMenu = defineAsyncComponent(() =>
    import('vio/components/menu/ButtonMenu'),
);

export default {
    name: 'TableIndex',
    comments: true,
    components: {
        ContextMenu,
        InfiniteTable,
        FauxCheckbox,
        ButtonMenu,
    },
    props: {
        type: {
            type: String,
            default: 'list',
        },
        dataSource: String,
        filter: {
            type: Object,
            default: {},
        },
        fetch: Function,
        addItem: Function,
        itemMenu: Function,
        onMounted: Function,
        keywordSearch: {
            type: Boolean,
            default: true,
        },
        batch: {
            type: [Boolean, Object],
            default: false,
        },
    },
    setup(props) {
        const list = ref(null);

        let batchOptions = {
            enable: false,
            actions: null,
        };

        if (props.batch) {
            batchOptions = {
                ...batchOptions,
                enable: true,
                ...props.batch,
            };
        }

        const Batch = new BatchSelector();

        return {
            list,
            Batch,
            batch: batchOptions,
            onMounted: props.onMounted,
            busy: ref(false),
            keywords: ref(''),
            fetch: props.fetch,
            searchParams: toRefs(props).filter,
            addItem: props.addItem,
            itemMenu: toRefs(props).itemMenu,
            keywordSearch: props.keywordSearch,
            type: toRefs(props).type,
        };
    },
    computed: {
        isBatchSelectable() {
            return this.batch.enable;
        },
        hasToolbar() {
            return (
                this.isBatchSelectable || !!this.addItem || this.hasSlot('toolbar')
            );
        },
        innerComponent() {
            if (this.type === 'table') {
                return InfiniteTable;
            }

            return InfiniteList;
        },
    },
    mounted() {
        watchEffect(() => {
            let list = this.list;
            if (list) {
                let items = list.items;
                this.Batch.bindWithItems(items);
            }
        });

        watch(
            () => this.keywords,
            (val) => {
                if (this.list) {
                    this.list.refresh();
                }
            },
        );

        watch(
            () => (this.list ? this.list.items : null),
            (val) => {
                /*console.log('items have changed', val);
			if(val){
				this.Batch.bindWithItems(val);
			}*/
            },
        );
    },
    methods: {
        getInnerComponent() {
            if (this.type === 'table') {
                return InfiniteTable;
            }

            return InfiniteList;
        },
        refresh() {
            this.list.refresh();
        },
        generateBatchMenu() {
            let items = [];

            if (typeof this.batch.actions === 'function') {
                items.push(...this.batch.actions(this.Batch, this.list));
            }

            return items;
        },
        getItemMenu(item) {
            if (this.itemMenu) {
                return this.itemMenu(item);
            }

            return [];
        },
        hasSlot(name) {
            return !!this.$slots[name];
        },
    },
};
</script>

<style scoped>
</style>
