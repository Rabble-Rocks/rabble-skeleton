import * as $ from 'jquery';
import 'bootstrap-autocomplete';
import MutationObserver from 'mutation-observer';

export default (function () {
    let observer = new MutationObserver(function() {
        $('.autocomplete').each(function() {
            $(this).autoComplete({
                resolverSettings: {
                    url: $(this).data('resolver'),
                    requestThrottling: 100
                },
                minLength: 2
            })
            if($(this).data('current-value') && $(this).data('current-text')) {
                $(this).autoComplete('set', { value: $(this).data('current-value'), text: $(this).data('current-text') });
            }
        });
    });
    observer.observe(document, {
        subtree: true,
        childList: true,
        attributes: false
    });
});