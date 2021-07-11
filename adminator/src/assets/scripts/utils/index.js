import * as $ from 'jquery';

export default (function () {
    // ------------------------------------------------------
    // @Window Resize
    // ------------------------------------------------------

    /**
     * NOTE: Register resize event for Masonry layout
     */
    const EVENT = document.createEvent('UIEvents');
    window.EVENT = EVENT;
    EVENT.initUIEvent('resize', true, false, window, 0);


    window.addEventListener('load', () => {
        /**
         * Trigger window resize event after page load
         * for recalculation of masonry layout.
         */
        window.dispatchEvent(EVENT);
    });

    // ------------------------------------------------------
    // @External Links
    // ------------------------------------------------------

    // Open external links in new window
    $('a')
        .filter('[href^="http"], [href^="//"]')
        .not(`[href*="${window.location.host}"]`)
        .attr('rel', 'noopener noreferrer')
        .attr('target', '_blank');

    // ------------------------------------------------------
    // @Resize Trigger
    // ------------------------------------------------------

    // Trigger resize on any element click
    document.addEventListener('click', () => {
        window.dispatchEvent(window.EVENT);
    });
    $(document).on('change', '.custom-file-input', function (e) {
        let fileName = e.target.parentElement.querySelector('input').files[0].name;
        let nextSibling = e.target.nextElementSibling
        nextSibling.innerText = fileName
    });
    $(document).on('click', '[data-confirm]', function (e) {
        if (!confirm($(this).data('confirm'))) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    });
    $(document).on('click', 'a[data-reload-datatable]', function (e) {
        e.preventDefault();
        let datatable = $('.rabble-datatable-' + $(this).data('reload-datatable')).DataTable();
        $.ajax({
            'url': $(this).attr('href'),
            'success': function () {
                datatable.draw();
            }
        });
    });

    $(document).on('click', '.rabble-collection .collection-add', function (e) {
        e.preventDefault();
        let prototypeName = $(this).data('prototype-name');
        let collection = $(this).closest('.rabble-collection');
        let i = parseInt(collection.data('items'));
        let items = collection.find('*[data-prototype]');
        let prototype = items.data('prototype').replace(new RegExp(prototypeName, 'g'), i);
        let item = $(prototype);
        item.appendTo(items);
        collection.data('items', i + 1);
    });

    $(document).on('click', '.rabble-content-blocks .content-block-add', function (e) {
        e.preventDefault();
        let prototypeName = $(this).data('prototype-name');
        let collection = $(this).closest('.rabble-content-blocks');
        let contentBlockType = $(this).data('content-block');
        let i = parseInt(collection.data('items'));
        let items = collection.find('*[data-prototype-'  + contentBlockType + ']');
        let prototype = items.data('prototype-' + contentBlockType).replace(new RegExp(prototypeName, 'g'), i);
        let item = $(prototype);
        item.appendTo(items);
        collection.data('items', i + 1);
        let length = collection.find('.collection-item').length;
        if(items.data('max-size') > 0 && length >= items.data('max-size')) {
            $(this).closest('.dropdown').hide();
        }
    });

    $(document).on('click', '.rabble-collection .collection-remove, .rabble-content-blocks .collection-remove', function (e) {
        e.preventDefault();
        let collection = $(this).closest('.rabble-collection, .rabble-content-blocks');
        let length = collection.find('.collection-item').length;
        let items = collection.find('*[data-max-size]');
        if(0 !== items.length && items.data('max-size') > 0 && length - 1 < items.data('max-size')) {
            items.parent().find('.content-block-add').closest('.dropdown').show();
        }
        $(this).closest('.collection-item').remove();
    });

    $(document).on('click', '.reload-slug', function (e) {
        e.preventDefault();
        let title = $($(this).data('title')).val();
        let field = $('#' + $(this).data('field'));
        let icon = $(this).find('.fa');
        icon.addClass('fa-spin');
        $.ajax({
            'url': $(this).data('resolver') + '?title=' + title,
            'success': function (result) {
                field.val(result.value);
                icon.removeClass('fa-spin');
            }
        });
    });
});
