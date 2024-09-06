$(function () {
  ('use strict');

  var dtUserTable = $('.user-list-table'),
    // newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      'Banned': { title: 'Banned', class: 'badge-light-warning' },
      'Active': { title: 'Active', class: 'badge-light-success' },
      'Inactive': { title: 'Inactive', class: 'badge-light-secondary' }
    };

  // var assetPath = '../../../app-assets/',
  //   userView = 'app-user-view-account.html';

  // if ($('body').attr('data-framework') === 'laravel') {
  //   assetPath = $('body').attr('data-asset-path');
  //   userView = assetPath + 'app/user/view/account';
  // }

  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      // the following code is used to disable x-scrollbar when click in select input and
      // take 100% width in responsive also
      dropdownAutoWidth: true,
      width: '100%',
      dropdownParent: $this.parent()
    });
  });

  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      paging: true,
      sorting: true,
      serverSide: true,
      ajax: {
        url: `${window.location.protocol}//${window.location.host}/user/getall`,
        method: 'post',
        dataFilter: function (data) {
          var json = JSON.parse(data);
          json.recordsTotal = json.data.recordsTotal;
          json.recordsFiltered = json.data.recordsFiltered;
          json.data = json.data.data;
          return JSON.stringify(json);
        }
      },
      // ajax: assetPath + 'data/user-list.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'full_name' },
        { data: 'createdAt' },
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // User full name and username
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['full_name'],
              $email = full['email'],
              $contact = full['phone'],
              $image = full['profile_image'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="/uploads/user/profile_pic/' + $image + '" alt="Avatar" height="32" width="32">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['full_name'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-content">' + $initials + '</span>';
            }
            var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : '';
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1" style="cursor: default !important;">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' + window.location.protocol + '//' + window.location.host + '/user/view/' + full["_id"] + '" class="user_name text-truncate text-body"><span class="fw-bolder">' +
              $name +
              '</span></a>' +
              '<small class="emp_post text-muted">' +
              $email +
              '</small>' +
              ($contact ?
                '<small class="emp_post text-muted">' +
                $contact +
                '</small>' : '') +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // User Joined On
          targets: 2,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<small class="emp_post">' +
              moment(full['createdAt']).format('dddd, Do of MMMM, YYYY - hh:mm A (Z)') +
              '</small>'
            );
          }
        },
        {
          // User Status
          targets: 3,
          orderable: false,
          searchable: true,
          render: function (data, type, full, meta) {
            var $status = full['status'];

            return (
              '<span class="badge rounded-pill userStatusUpdate cursor-pointer ' +
              statusObj[$status].class +
              '" text-capitalized data-status="' + $status + '" data-id="' + full['_id'] + '">' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="' + window.location.protocol + '//' + window.location.host + '/user/view/' + full["_id"] + '" class="dropdown-item">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Details</a>' +
              '<a href="javascript:;" id="del-' + full["_id"] + '" class="dropdown-item delete-record deleteUser">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'asc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..',
        "zeroRecords": "No data Found",
        "processing": 'Loading',
        paginate: {
          // remove previous & next text from pagination
          // previous: '&nbsp;',
          // next: '&nbsp;'
        }
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
          buttons: [
            {
              extend: 'print',
              text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3] }
            }
          ],
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
            $(node).parent().removeClass('btn-group');
            setTimeout(function () {
              $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
            }, 50);
          }
        },
        // Add New Button
        {
          text: 'Add New User',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#modals-slide-in'
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIdx +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                '<td>' +
                col.title +
                ':' +
                '</td> ' +
                '<td>' +
                col.data +
                '</td>' +
                '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      initComplete: function () {
        // Adding status filter once table initialized
        this.api()
          .columns(3)
          .every(function () {
            let column = this;
            $('#StatusDropdown').select2();
            $('#StatusDropdown').ready(function () {
              let val = $.fn.dataTable.util.escapeRegex($('#StatusDropdown').val());
              column.search(val ? val : '', false, false).draw();
            });
            $('#StatusDropdown').on('change', function () {
              let val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? val : '', false, false).draw();
            });
          });
      }
    });
  }

  // Form Validation
  if (newUserForm.length) {
    newUserForm.validate({
      errorClass: 'error',
      rules: {
        'full_name': {
          required: true
        },
        'email': {
          required: true
        }
      }
    });

    // newUserForm.on('submit', function (e) {
    //   var isValid = newUserForm.valid();
    //   e.preventDefault();
    //   if (isValid) {
    //     newUserSidebar.modal('hide');
    //   }
    // });
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
        window.location.href = `${window.location.protocol}//${window.location.host}/user/status-change/${elemID}?status=${result.value}`;
      }
    });
  });

  $(document).on('click', '.deleteUser', function () {
    var elemID = $(this).attr('id').replace('del-', '');
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        window.location.href = `${location.protocol}//${window.location.host}/user/delete/${elemID}`;
      }
    });
  });

  // Phone Number
  if (dtContact.length) {
    dtContact.each(function () {
      new Cleave($(this), {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }

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


