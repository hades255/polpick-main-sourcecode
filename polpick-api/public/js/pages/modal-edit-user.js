$(function () {
  $(document).on('click', '.userStatusUpdate', function () {
    var elemID = $(this).data('id');
    var status = $(this).data('status');
    var elemType = $(this).data('type');
    var reportId = $(this).data('reportid');
    var redirectId = elemID;
    if(reportId && reportId != '') {
        redirectId = reportId;
    }
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
            window.location.href = `${window.location.protocol}//${window.location.host}/users/status-change/${elemID}?status=${result.value}&path=/${elemType}/view/${redirectId}`;
        }
    });
  });
});
