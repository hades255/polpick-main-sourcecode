'use strict';

let FormControls = function () {
    let addNewUserValidation = function () {
        $("#add-new-user").validate({
            rules: {
                full_name: {
                    required: true,
                    minlength: 3,
                    normalizer: (value) => $.trim(value)
                },
                email: {
                    required: true,
                    email: true,
                    pattern: /\S+@\S+\.\S+/,
                    normalizer: (value) => $.trim(value)
                },
                phone: {
                    required: true,
                    number: true,
                    normalizer: (value) => $.trim(value)
                },
                password: {
                    required: true,
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    normalizer: (value) => $.trim(value)
                },
                // country: {
                //     required: true,
                //     normalizer: (value) => $.trim(value)
                // },
                // state: {
                //     required: true,
                //     normalizer: (value) => $.trim(value)
                // },
                address: {
                    required: true,
                    normalizer: (value) => $.trim(value)
                },
                social_link: {
                    required: true,
                    pattern: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                    normalizer: (value) => $.trim(value)
                }
            },
            messages: {
                full_name: {
                    required: "Please enter fullname",
                    minlength: "Please enter a valid fullname"
                },
                email: {
                    pattern: 'Please enter a valid email',
                    required: "Please enter email",
                    email: "Please enter a valid email"
                },
                phone: {
                    required: "Please enter phone number",
                    number: "Please enter a valid phone number"
                },
                password: {
                    required: "Please enter password",
                    pattern: "Minimum 8 characters long, uppercase, lowercase, number & symbol between: #?!@$%^&*-"
                },
                // country: {
                //     required: "Please select country",
                // },
                // state: {
                //     required: "Please enter state",
                // },
                address: {
                    required: "Please enter address",
                },
                social_link: {
                    pattern: "Pleae enter a valid social media link",
                    required: "Please enter social media link",
                }
            },
            invalidHandler: function (event, validator) {
            },
            errorPlacement: function (error, element) {
                error.css('color', 'red');
                if (element.attr("id") == "phone") {
                    error.insertAfter('#country_code');
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    let editUserValidation = function () {
        $("#editUserForm").validate({
            rules: {
                full_name: {
                    required: true,
                    minlength: 3,
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                },
                email: {
                    required: true,
                    email: true,
                    pattern: /\S+@\S+\.\S+/,
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                },
                full_number: {
                    number: true
                },
                // country: {
                //     required: true,
                //     normalizer: (value) => $.trim(value)
                // },
                // state: {
                //     required: true,
                //     normalizer: (value) => $.trim(value)
                // },
                address: {
                    required: true,
                    normalizer: (value) => $.trim(value)
                },
                social_link: {
                    required: true,
                    pattern: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                    normalizer: (value) => $.trim(value)
                }
            },
            messages: {
                full_name: {
                    required: "Please enter fullname",
                    minlength: "Please enter a valid fullname"
                },
                email: {
                    pattern: 'Please enter a valid email',
                    required: "Email is required",
                    email: "Please enter a valid email"
                },
                full_number: {
                    number: "Please enter a valid phone number"
                },
                // country: {
                //     required: "Please select country",
                // },
                // state: {
                //     required: "Please enter state",
                // },
                address: {
                    required: "Please enter address",
                },
                social_link: {
                    pattern: "Pleae enter a valid social media link",
                    required: "Please enter social media link",
                }
            },
            invalidHandler: function (event, validator) {
            },
            errorPlacement: function (error, element) {
                error.css('color', 'red');
                if (element.attr("id") == "phone") {
                    error.insertBefore('#country_code');
                } else {
                    error.insertAfter(element);
                }
                if (element.attr("id") == "full_number") {
                    error.insertBefore('#country_code');
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    let adminAcntFrmValidation = function () {
        $("#adminAcntFrm").validate({
            rules: {
                full_name: {
                    required: true,
                    minlength: 3,
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                },
                email: {
                    required: true,
                    email: true,
                    pattern: /\S+@\S+\.\S+/,
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                }
            },
            messages: {
                full_name: {
                    required: "Please enter your fullname",
                    minlength: "Please enter a valid fullname"
                },
                email: {
                    required: "Please enter your email",
                    email: "Please enter a valid email",
                    pattern: 'Please enter a valid email'
                }
            },
            invalidHandler: function (event, validator) {
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    let adminChangePasswordValidation = function () {
        $("#adminChangePassword").validate({
            rules: {
                'old_password': {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                },
                'password': {
                    required: true,
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    minlength: 8
                },
                'confirm-new-password': {
                    required: true,
                    minlength: 8,
                    equalTo: '#account-new-password',
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                }
            },
            messages: {
                'old_password': {
                    required: 'Enter old password'
                },
                'password': {
                    required: 'Enter new password',
                    pattern: 'Minimum 8 characters long, uppercase, lowercase, number & symbol between: #?!@$%^&*-',
                    minlength: 'Enter at least 8 characters'
                },
                'confirm-new-password': {
                    required: 'Please confirm new password',
                    minlength: 'Enter at least 8 characters',
                    equalTo: 'Password and confirm password does not match'
                }
            },
            invalidHandler: function (event, validator) {
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    let formChangePasswordValidation = function () {
        $("#formChangePassword").validate({
            rules: {
                new_password: {
                    required: true,
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    minlength: 8,
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                },
                confirm_password: {
                    required: true,
                    minlength: 8,
                    equalTo: '#new_password',
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                }
            },
            messages: {
                new_password: {
                    required: 'Enter new password',
                    pattern: "Minimum 8 characters long, uppercase, lowercase, number & symbol between: #?!@$%^&*-",
                    minlength: 'Enter at least 8 characters'
                },
                confirm_password: {
                    required: 'Please confirm new password',
                    minlength: 'Enter at least 8 characters',
                    equalTo: 'The password and confirm password are not same'
                }
            },
            invalidHandler: function (event, validator) {
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    let addNewCmsValidation = function () {
        $("#edit-new-cms").validate({
            rules: {
                'title': {
                    required: true,
                    minlength: 3,
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                }
            },
            messages: {
                'title': {
                    required: 'Title is required',
                    minlength: "Please enter a valid title"
                }
            },
            invalidHandler: function (event, validator) {
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    let addEditNewsletterFrm = function () {
        $("#addNewsletterFrm").validate({
            rules: {
                'email': {
                    required: true,
                    minlength: 3,
                    normalizer: function (value) {
                        return $.trim(value);
                    }
                }
            },
            messages: {
                'email': {
                    required: 'Email is required',
                    minlength: "Please enter a valid email"
                }
            },
            invalidHandler: function (event, validator) {
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    return {
        init: function () {
            addNewUserValidation();
            adminAcntFrmValidation();
            adminChangePasswordValidation();
            formChangePasswordValidation();
            addNewCmsValidation();
            editUserValidation();
            addEditNewsletterFrm();
        }
    };
}();

// Form Validation Initialize
$(document).ready(function () {
    FormControls.init();

    jQuery(".select2-custom-validate").on('change', function (evt) {
        let thisVal = $(this).val();
        if (thisVal != '') {
            setTimeout(function () {
                jQuery("#addAffiliatePostForm").validate().element('.select2-custom-validate');
            }, 100);
        }
    });
    jQuery(".select2-custom-validate-country").on('change', function (evt) {
        let thisVal = $(this).val();
        if (thisVal != '') {
            setTimeout(function () {
                jQuery("#add-new-user").validate().element('.select2-custom-validate-country');
            }, 100);
        }
    });
});

