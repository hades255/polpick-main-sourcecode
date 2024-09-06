$(function () {
  const select2 = $('.select2'),
    editUserForm = $('#editUserForm'),
    modalEditUserPhone = $('.phone-number-mask');

  // Select2 Country
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        dropdownParent: $this.parent()
      });
    });
  }

  // Phone Number Input Mask
  if (modalEditUserPhone.length) {
    modalEditUserPhone.each(function () {
      new Cleave($(this), {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }

  // Edit user form validation
  if (editUserForm.length) {
    editUserForm.validate({
      rules: {
        full_name: {
          required: true
        },
        email: {
          required: true
        },
        modalEditUserFirstName: {
          required: true
        },
        modalEditUserLastName: {
          required: true
        },
        // modalEditUserName: {
        //   required: true,
        //   minlength: 6,
        //   maxlength: 30
        // }
      },
      messages: {
        modalEditUserName: {
          required: 'Please enter your username',
          minlength: 'The name must be more than 6 and less than 30 characters long',
          maxlength: 'The name must be more than 6 and less than 30 characters long'
        }
      }
    });
  }

  $(document).on('click', '.userStatusUpdate', function () {
    var elemID = $(this).data('id');
    var status = $(this).data('status');
    var inputs = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status === 'Banned') {
          let options = {
            "Banned": "Banned",
            "Active": "Active",
            "Inactive": "Inactive"
          }
          return resolve(options);
        } else if (status === "Active") {
          let options = {
            "Active": "Active",
            "Inactive": "Inactive",
            "Banned": "Banned"
          }
          return resolve(options);
        } else {
          let options = {
            "Inactive": "Inactive",
            "Active": "Active",
            "Banned": "Banned"
          }
          return resolve(options);
        }
      }, 200);
    });
    swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      input: 'select',
      inputOptions: inputs,
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        window.location.href = `${window.location.protocol}//${window.location.host}/user/status-change/${elemID}?status=${result.value}&path=/user/view/${elemID}`;
      }
    });
  });

  var accountUploadImg = $('#account-upload-img'),
    accountUploadBtn = $('#account-upload'),
    accountUserImage = $('.uploadedAvatar'),
    accountResetBtn = $('#account-reset');
  if (accountUserImage) {
    var resetImage = accountUserImage.attr('src');
    accountUploadBtn.on('change', function (e) {
      var reader = new FileReader(),
        files = e.target.files;
      reader.onload = function () {
        if (accountUploadImg) {
          accountUploadImg.attr('src', reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
      accountResetBtn.removeClass("d-none");
    });

    accountResetBtn.on('click', function () {
      accountUserImage.attr('src', resetImage);
      accountResetBtn.addClass("d-none");
    });
  }
});
