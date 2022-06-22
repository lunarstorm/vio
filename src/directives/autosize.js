import $ from 'jquery';
import autosize from 'autosize';

export default {
    name: 'autosize',
    mounted: function (el, binding, vnode) {
        var $el = $(el);

        autosize($el);

        $el.change(function () {
            autosize.update(el);
        });

        $el.trigger('change');
    },
    updated: function (el) {
        autosize.update(el);
    },
    unmounted: function (el) {
        autosize.destroy($(el));
    },
};