(function () {
  // Suspend User javascript
  const suspendUser = document.querySelector('.suspend-user');

  if (suspendUser) {
    suspendUser.onclick = function () {
      var elemID = $(this).attr('id').replace('del-', '');
      var elemType = $(this).attr('data-type');
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this action!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Remove account!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          window.location.href = `${location.protocol}//${window.location.host}/users/delete/${elemID}?type=${elemType}`;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelled',
            text: 'Cancelled User Removal :)',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        }
      });
    };
  }

  // Reset User Password javascript
  const userPasswordReset = document.querySelector('.reset-user-password');

  if (userPasswordReset) {
    userPasswordReset.onclick = function () {
      var elemID = $(this).attr('id').replace('reset-', '');
      var elemType = $(this).attr('data-type');
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert account password!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reset Password!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          window.location.href = `${location.protocol}//${window.location.host}/users/reset-password/${elemID}?type=${elemType}`;
        } 
      });
    };
  }

  //? Billing page have multiple buttons
  // Cancel Subscription alert
  // const cancelSubscription = document.querySelectorAll('.cancel-subscription');

  // Alert With Functional Confirm Button
  // if (cancelSubscription) {
  //   cancelSubscription.forEach(cancelBtn => {
  //     cancelBtn.onclick = function () {
  //       Swal.fire({
  //         text: 'Are you sure you would like to cancel your subscription?',
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes',
  //         customClass: {
  //           confirmButton: 'btn btn-primary',
  //           cancelButton: 'btn btn-outline-danger ms-1'
  //         },
  //         buttonsStyling: false
  //       }).then(function (result) {
  //         if (result.value) {
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'Unsubscribed!',
  //             text: 'Your subscription cancelled successfully.',
  //             customClass: {
  //               confirmButton: 'btn btn-success'
  //             }
  //           });
  //         } else if (result.dismiss === Swal.DismissReason.cancel) {
  //           Swal.fire({
  //             title: 'Cancelled',
  //             text: 'Unsubscription Cancelled!!',
  //             icon: 'error',
  //             customClass: {
  //               confirmButton: 'btn btn-success'
  //             }
  //           });
  //         }
  //       });
  //     };
  //   });
  // }
})();
