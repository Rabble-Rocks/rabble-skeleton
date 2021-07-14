import Sortable from 'sortablejs';
import * as $ from 'jquery';
import MutationObserver from 'mutation-observer';

export default (function () {
    let callbacks = {
        setParent: function(evt) {
            let to = $(evt.to);
            let itemId = $(evt.item).find('[data-id]').data('id');
            let toId = to.data('id');
            $.ajax({
                url: to.data('url') + '?item=' + itemId + '&to=' + toId + '&sortOrder=' + evt.newIndex
            });
        }
    }
    let observer = new MutationObserver(function() {
        let sortableElements = $('.sortable');
        sortableElements.each(function() {
            if($(this).data('sortable')) {
                return;
            }
            $(this).data('sortable', true);
            Sortable.create(this, {
                group: $(this).data('group'),
                direction: 'vertical',
                animation: 250,
                handle: ".sort-handle",
                forceFallback: true,
                onEnd: function (evt) {
                    let from = $(evt.from);
                    let callback = $(evt.item).data('callback');
                    if(callback) {
                        callbacks[callback](evt);
                    }
                    from.children().each(function (index) {
                        $(this).find('.sort_order').val(index);
                    })
                },
            });
        });
    });
    observer.observe(document, {
        subtree: true,
        childList: true,
        attributes: false
    });
});