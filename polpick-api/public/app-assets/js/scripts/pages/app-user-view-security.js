$(function () {
  'use strict';
  var formChangePassword = $('#formChangePassword');

  if (formChangePassword.length) {
    formChangePassword.validate({
      rules: {
        newPassword: {
          required: true,
          required: true,
          pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          minlength: 8
        },
        confirmPassword: {
          required: true,
          minlength: 8,
          equalTo: '#newPassword'
        }
      },
      messages: {
        newPassword: {
          required: 'Enter new password',
          pattern: "Minimum 8 characters long, uppercase, lowercase, number & symbol between: #?!@$%^&*-",
          minlength: 'Enter at least 8 characters'
        },
        confirmPassword: {
          required: 'Please confirm new password',
          minlength: 'Enter at least 8 characters',
          equalTo: 'Password and confirm password does not match'
        }
      }
    });
  }
});