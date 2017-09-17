jQuery(document).ready(function(){
        
        full_url = window.location.href;
    arr = full_url.split("/");
    site_url = arr[0] + "//" + arr[2];
    // like and unlike loans

    jQuery(document).on('click', '.shortlistLoan', function () {
        
        $current_id = this.id;
        var lenderId = jQuery(this).attr('data-lenderid');
        var current_obj = jQuery(this);
        var eventType = jQuery(this).attr('data-eventtype');

        jQuery.ajax({
            type: 'POST',
            url: site_url + '/lenders/addTolist',
            data: {
                lenderId: lenderId,
                eventType: eventType
            },
            beforeSend: function () {
                // jQuery(current_obj).addClass("disabledbutton");
            },
            success: function (result) {

                if (result == 1 && eventType == 'like') {
                    current_obj.children('i').removeClass('fa-heart-o');
                    current_obj.children('i').addClass('fa-heart');
                    current_obj.children('span').text('unlike');
                    current_obj.attr('data-eventtype', 'unlike');

                } else if (result == 0 && eventType == 'unlike') {
                    current_obj.children('i').removeClass('fa-heart');
                    current_obj.children('i').addClass('fa-heart-o');
                    current_obj.children('span').text('like');
                    current_obj.attr('data-eventtype', 'like');
                }
            }
        });
    });
        
    });
    