<template>
  <form @submit.prevent="refresh">
    <template v-for="modelAttr in filterModel" :key="modelAttr.key">
      <FilterField
        v-if="modelAttr.type !== 'none'"
        v-model="filter.data.values[modelAttr.key]"
        :label="modelAttr.label"
      >
        <InputText
          v-if="modelAttr.type === 'text'"
          v-model="filter.data.values[modelAttr.key]"
        />
        <OptionsMulti
          v-if="modelAttr.type === 'select'"
          v-model="filter.data.values[modelAttr.key]"
          :options="Metadata.get(modelAttr.optionsMetaKey)"
        />
        <OptionsMulti
          v-if="modelAttr.type === 'multiselect'"
          v-model="filter.data.values[modelAttr.key]"
          :options="Metadata.get(modelAttr.optionsMetaKey)"
          mode="tags"
        />
        <InputDate
          v-if="modelAttr.type === 'date'"
          v-model="filter.data.values[modelAttr.key]"
        />
        <InputCheckbox
          v-if="modelAttr.type === 'checkbox'"
          v-model="filter.data.values[modelAttr.key]"
        />
      </FilterField>
    </template>

    <hr>

    <div>
      <ButtonSubmit>Search</ButtonSubmit>
      <a
        class="btn btn-light mx-1"
        href="#"
        title="Clear Filter"
        @click.prevent="reset"
      >
        Clear All
      </a>
    </div>
  </form>
</template>

<script>
import InputText from 'vio/components/form/InputText';
import InputDate from 'vio/components/form/InputDate';
import InputCheckbox from 'vio/components/form/InputCheckbox';
import FormGroup from 'vio/components/form/FormGroup';
import FilterField from 'vio/ux/SearchFilter/FilterField';
import Metadata from 'vio/helpers/Metadata';
import OptionsRadio from 'vio/components/form/OptionsRadio';
import OptionsMulti from 'vio/components/form/OptionsMulti';
import ButtonSubmit from 'vio/components/form/ButtonSubmit';

export default {
    name: 'FilterForm',
    components: {
        InputText,
        InputDate,
        InputCheckbox,
        FormGroup,
        FilterField,
        Metadata,
        OptionsRadio,
        OptionsMulti,
        ButtonSubmit,

    },
    props: {
        filter: Object,
        filterModel: Array,
        Metadata: Object,
    },
    setup(props) {
        console.log(props);
        props.filterModel.map(attr => {
            if(attr.type === 'range' && attr.range ) props.filter.data.values[attr.key] = attr.range;
        });
        return {
            ...props,
        };
    },
    methods: {
        refresh() {
            let msg = this.$Messages
                .make()
                .text('Searching...')
                .spin()
                .level('light')
                .show();
            this.$inertia.reload({
                data: {
                    ...this.filter.getValues(),
                    page: 1,
                },
                only: ['page', 'query'],
                onFinish() {
                    msg.remove();
                },
            });
        },
        reset(){
            this.filter.resetAll();
            this.refresh();
        },
    },
};
</script>

<style>
</style>
