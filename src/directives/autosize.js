import autosize from 'autosize';
import $ from 'jquery';

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