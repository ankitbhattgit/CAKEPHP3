
jQuery(document).ready(function () {

    // get current URL without subfolder for sending in ajax for cakephp 
    full_url = window.location.href;
    arr = full_url.split("/");
    site_url = arr[0] + "//" + arr[2];
    if (site_url.search('192.168.0.1')) {
        FbAppId = '493711384295129';
    } else if (site_url.search('34.211.31.84')) {
        FbAppId = '315394732243355';
    }

    window.asd = jQuery('.SlectBox').SumoSelect({csvDispCount: 3, selectAll: true, captionFormatAllSelected: "Yeah, OK, so everything."});

    // auto next step
    jQuery('select.home-search').on('change', function () {

//        var current_obj = jQuery(this);
//        nextStep(current_obj);
        // next step
        var parent_fieldset = jQuery(this).parents('fieldset');
        var next_step = true;

        parent_fieldset.find('input[type="text"],input[type="email"]').each(function () {
//            if (jQuery(this).val() == "") {
//                jQuery(this).addClass('input-error');
//                next_step = false;
//            } else {
//                jQuery(this).removeClass('input-error');
//            }
        });

        if (next_step) {
            parent_fieldset.fadeOut(400, function () {
                jQuery(this).next().fadeIn();
            });
        }
    });

    jQuery('input.home-search').on('blur', function () {

//        var current_obj = jQuery(this);
//        nextStep(current_obj);
        // next step
        var parent_fieldset = jQuery(this).parents('fieldset');
        var next_step = true;

        parent_fieldset.find('input[type="text"],input[type="email"]').each(function () {
            if (jQuery(this).val() == "") {
                jQuery(this).addClass('input-error');
                next_step = false;
            } else {
                jQuery(this).removeClass('input-error');
            }
        });

        if (next_step) {
            parent_fieldset.fadeOut(400, function () {
                jQuery(this).next().fadeIn();
            });
        }
    });

    // login ajax

    jQuery('#login_button').on('click', function (e) {
        e.preventDefault();
        if (jQuery('#loginForm').valid()) {
            var LoginData = jQuery('#loginForm').serialize();
            jQuery.ajax({
                type: 'POST',
                // dataType : 'json',
                url: site_url + '/users/login',
                data: LoginData,
                success: function (result) {
                    var response = JSON.parse(result);
                    if (response.value == true) {
                        jQuery('#login_success').show().text(response.message);
                        jQuery("#login_button").addClass("disabledbutton");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        jQuery('#login_error').show().text(response.message);
                    }
                }
            });
        }
    });

    // sign up ajax

    jQuery('#signup_button').on('click', function () {

        if (jQuery('#signUpForm').valid()) {
            var signUpData = jQuery('#signUpForm').serialize();
            jQuery.ajax({
                type: 'POST',
                url: site_url + '/users/signUp',
                data: signUpData,
                success: function (result) {
                    var response = JSON.parse(result);
                    if (response.value == true) {
                        jQuery('#signup_success').text(response.message);
                        jQuery("#signup_button").addClass("disabledbutton");
                    } else {
                        jQuery('#signup_error').text(response.message);
                    }
                }
            });
        }
    });

    // forgot password ajax

    jQuery('#forgot_button').on('click', function () {

        if (jQuery('#forgotPassForm').valid()) {
            var resetData = jQuery('#forgotPassForm').serialize();
            jQuery.ajax({
                type: 'POST',
                url: site_url + '/users/forgotPassword',
                data: resetData,
                beforeSend: function () {
                    jQuery("#forgot_button").addClass("disabledbutton");
                },
                success: function (result) {
                    var response = JSON.parse(result);
                    if (response.value == true) {
                        jQuery('#forgot_success').text(response.message);
                        jQuery("#forgot_button").addClass("disabledbutton");
                    } else {
                        jQuery("#forgot_button").removeClass("disabledbutton");
                        jQuery('#forgot_error').text(response.message);
                    }
                }
            });
        }
    });

    // reset password ajax

    jQuery('#reset_button').on('click', function () {

        if (jQuery('#resetForm').valid()) {
            var resetData = jQuery('#resetPassForm').serialize();
            jQuery.ajax({
                type: 'POST',
                url: site_url + '/users/reset',
                data: resetData,
                beforeSend: function () {
                    jQuery("#reset_button").addClass("disabledbutton");
                },
                success: function (result) {
                    var response = JSON.parse(result);
                    if (response.value == true) {
                        jQuery('#pass_success').text(response.message);
                        jQuery("#reset_button").addClass("disabledbutton");
                    } else {
                        jQuery("#reset_button").removeClass("disabledbutton");
                        jQuery('#pass_error').text(response.message);
                    }
                }
            });
        }
    });

    // Validation for login 
    jQuery("#loginForm").validate({
// Rules for form validation
        rules: {
            email: {
                required: true,
                email: true,
                minlength: 6,
                maxlength: 30
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 30
            }
        },
        // Messages for form validation
        messages: {
            email: {
                required: 'Email id is required.'
            },
            password: {
                required: 'Password is required.'
            }
        }
    });

    // Validation for registration

    jQuery("#signUpForm").validate({
// Rules for form validation
        rules: {
            first_name: {
                required: true,
                //    lettersonly: true,
                minlength: 3,
                maxlength: 20
            },
            last_name: {
                required: true,
                //    lettersonly: true,
                minlength: 3,
                maxlength: 20
            },
//            username: {
//                required: true,
//                lettersonly: true,
//                minlength: 5,
//                maxlength: 20,
//                remote: "/users/validateNewUser"
//            },
            email: {
                required: true,
                email: true,
                minlength: 8,
                maxlength: 30,
                remote: "/users/emailExist/signup"
            },
            password: {
                required: true,
                //    noSpace: true,
                minlength: 6,
                maxlength: 20
            },
            confirm_password: {
                required: true,
                minlength: 6,
                equalTo: '#validatePassword',
                maxlength: 20
            }
        },
        // Messages for form validation
        messages: {
            first_name: {
                required: 'First name is required'
            },
            last_name: {
                required: 'Last name is required'
            },
//            username: {
//                required: 'Please enter your username',
//                remote: "This username is already taken"
//            },
            email: {
                required: 'Email id is required.',
                email: 'Invalid email address',
                remote: "Email is already registered"
            },
            password: {
                required: 'Password is required.'
            },
            confirm_password: {
                required: 'Please retype password.',
                equalTo: 'Passwords do not match.'
            }
        }
    });


    //forget Password validation

    jQuery("#forgotPassForm").validate({
// Rules for form validation
        rules: {
            email: {
                required: true,
                email: true,
                remote: '/users/emailExist/reset'
            }
        },
        // Messages for form validation
        messages: {
            email: {
                required: 'Email address is required.',
                email: 'Invalid email address',
                remote: "This email address does not exist"
            }
        }
    });


    //    reset password ctp

    // Validation
    jQuery("#resetForm").validate({
// Rules for form validation
        rules: {
            newpassword: {
                required: true,
                minlength: 6,
                maxlength: 20

            },
            confirmpassword: {
                required: true,
                minlength: 6,
                maxlength: 20,
                equalTo: '#newpassword'
            }

        },
        // Messages for form validation
        messages: {
            newpassword: {
                required: 'Please enter your password'
            },
            confirmpassword: {
                required: 'Please enter your password one more time',
                equalTo: 'Please enter the same password as before'
            }
        }

    });

    // reload on close popup
    jQuery('#login-modal').on('hidden.bs.modal', function () {

        location.reload();
    });

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


    // load more popular lenders based on type

    jQuery('#loadMoreOwner , #loadMoreInvest').on('click', function () {

        $current_id = this.id;
        var offset = jQuery(this).attr('data-offset');
        var tablename = jQuery(this).attr('data-tablename');
        var interestType = jQuery(this).attr('data-interesttype');
        var new_offset = +offset + 3;
        var current_obj = jQuery(this);

        if ($current_id == 'loadMoreOwner') {
            getLastElement = jQuery("#homeloantab .row .col-sm-4").last();
        } else if ($current_id == 'loadMoreInvest') {
            getLastElement = jQuery("#invesloantab .row .col-sm-4").last();
        }

        jQuery.ajax({
            type: 'POST',
            url: ajax_login_object.ajaxurl,
            data: {
                action: "ajaxloadLenders",
                offset: offset,
                tablename: tablename,
                interestType: interestType
            },
            beforeSend: function () {
                jQuery(current_obj).addClass("disabledbutton");
            },
            success: function (result) {
                if (result == 0) {
                    current_obj.hide();
                } else {
                    var classLength = (result.match(/col-sm-4/g) || []).length;
                    current_obj.attr('data-offset', new_offset);
                    jQuery(result).insertAfter(getLastElement);
                    if (classLength < 3) {
                        current_obj.hide();
                    } else {
                        jQuery(current_obj).removeClass("disabledbutton");
                    }
                }
            }
        });
    });


    // on change lender type add table name to interest filter

    jQuery('.nav-tabs li a').on('click', function () {
        var tablename = jQuery(this).attr('data-tablename');
        jQuery('.interestType').attr('data-interesttable', tablename);
        // jQuery(this).closest('.loadmore').attr('data-interesttype',tablename);
    });

    // filter lenders based on interest type

    jQuery('.interestType').on('click', function () {

        var offset = jQuery(this).attr('data-offset');
        var interestType = jQuery(this).attr('data-interesttype');
        var tablename = jQuery(this).attr('data-interesttable');
        var new_offset = +offset + 3;
        var current_obj = jQuery(this);

        jQuery('.interestType').each(function (index) {
            jQuery('.interestType').removeClass('active-btm');
        });
        
        jQuery(this).addClass('active-btm');
        
        jQuery.ajax({
            type: 'POST',
            url: ajax_login_object.ajaxurl,
            data: {
                action: "ajaxloadLenders",
                offset: offset,
                interestType: interestType,
                tablename: tablename
            },
            beforeSend: function () {
                jQuery(current_obj).addClass("disabledbutton");
            },
            success: function (result) {
                if (result == 0) {
                    // current_obj.hide();
                } else {
                    var classLength = (result.match(/col-sm-4/g) || []).length;
                    
                    jQuery(current_obj).removeClass("disabledbutton");
                    jQuery(this).attr('data-interesttype', interestType);
                    jQuery(current_obj).removeClass("disabledbutton");
                    if (tablename == 'lender_owners') {
                        jQuery('#homeloantab .row').html(result);
                        jQuery('#loadMoreOwner').attr('data-interesttype', interestType);
                        jQuery('#loadMoreOwner').attr('data-offset', new_offset);
                        jQuery('#loadMoreOwner').removeClass("disabledbutton");
                        if (classLength < 3) {
                            jQuery('#loadMoreOwner').hide();
                        } else {
                            jQuery('#loadMoreOwner').show();
                        }
                    } else if (tablename == 'lender_investments') {
                        jQuery('#invesloantab .row').html(result);
                        jQuery('#loadMoreInvest').attr('data-offset', new_offset);
                        jQuery('#loadMoreInvest').attr('data-interesttype', interestType);
                        jQuery('#loadMoreInvest').removeClass("disabledbutton");
                        if (classLength < 3) {
                            jQuery('#loadMoreInvest').hide();
                        } else {
                            jQuery('#loadMoreInvest').show();
                        }
                    }
                }
            }
        });
    });
    
    
    // load more blog posts

    jQuery('#loadMoreBlog').on('click', function () {

        $current_id = this.id;
        var offset = jQuery(this).attr('data-offset');
        var new_offset = +offset + 3;
        var current_obj = jQuery(this);

        var getLastElement = jQuery("#blog_section .blog-grid").last();

        jQuery.ajax({
            type: 'POST',
            url: ajax_login_object.ajaxurl,
            data: {
                action: "ajaxloadBlogs",
                offset: offset
            },
            beforeSend: function () {
                jQuery(current_obj).addClass("disabledbutton");
            },
            success: function (result) {
                if (result == 0) {
                    current_obj.hide();
                } else {
                    var classLength = (result.match(/col-xs-4/g) || []).length;
                    current_obj.attr('data-offset', new_offset);
                    jQuery(result).insertAfter(getLastElement);
                    if (classLength < 3) {
                        current_obj.hide();
                    } else {
                        jQuery(current_obj).removeClass("disabledbutton");
                    }
                }
            }
        });
    });
    
});


// function for prev and next option in questionaire
function nextStep(type) {

    var parent_fieldset = type.parents('fieldset');
    var next_step = true;

    parent_fieldset.find('input[type="text"],input[type="email"]').each(function () {
        if (type.val() == "") {
            type.addClass('input-error');
            next_step = false;
        } else {
            type.removeClass('input-error');
        }
    });

    if (next_step) {
        parent_fieldset.fadeOut(400, function () {
            type.next().fadeIn();
        });
    }
}

// fb login / signup

window.fbAsyncInit = function () {
    // FB JavaScript SDK configuration and setup
    FB.init({
        appId: FbAppId, // FB App ID
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });

    // Check whether the user already logged in
    FB.getLoginStatus(function (response) {
        //    FB.logout(logout);
        //   alert(response.status);
        if (response.status === 'connected') {
            //display user data
            //   getFbUserData();
        }
    });
};

// Load the JavaScript SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Facebook login with JavaScript SDK
function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            // Get and display the user profile data
            getFbUserData();
        } else {
            document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
        }
    }, {scope: 'email'});
}

// Fetch the user profile data from facebook
function getFbUserData() {
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        jQuery.post(site_url + "/users/fb_connect", {"data[User]": response}, function (data) {
            window.location.href = site_url;
        });
    });

}
// Logout from facebook
function fbLogout() {
    FB.logout(function () {
        document.getElementById('fbLink').setAttribute("onclick", "fbLogin()");
        document.getElementById('fbLink').innerHTML = 'Facebook';
        document.getElementById('userData').innerHTML = '';
        document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';
    });
}

jQuery(document).ready(function () {
    jQuery(document).on('click', '.fb_logout', function () {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                FB.logout(logout);
            } else {
                // logout();
            }
        });
    });
});
