$(function () {
  ('use strict');
  var dtUserTable = $('.newsletter-list-table'),
    select = $('.select2'),
    statusObj = {
      'Active': { title: 'Active', class: 'badge-light-success' },
      'Inactive': { title: 'Inactive', class: 'badge-light-secondary' }
    };

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

  // CMS List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      paging: true,
      sorting: true,
      serverSide: true,
      ajax: {
        url: `${window.location.protocol}//${window.location.host}/newsletter/getall`,
        method: 'post',
        dataFilter: function (data) {
          var json = JSON.parse(data);
          json.recordsTotal = json.data.recordsTotal;
          json.recordsFiltered = json.data.recordsFiltered;
          json.data = json.data.data;
          return JSON.stringify(json);
        }
      },
      columns: [
        // columns according to JSON
        { data: '' },
        { data: '_id' },
        { data: 'email' },
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
          // For Checkboxes
          targets: 1,
          orderable: false,
          responsivePriority: 3,
          sortable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="form-check"> <input class="form-check-input dt-checkboxes onecheck" type="checkbox" value="' + full['_id'] + '" id="checkbox_' +
              full['_id'] + 
              '" /><label class="form-check-label" for="checkbox' +
              full['_id'] +
              '"></label></div>'
            );
          },
          checkboxes: {
            selectAllRender:
              '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>'
          }
        },
        {
          // email
          targets: 2,
          responsivePriority: 4,
          render: function (datas, type, full, meta) {
            var $newsletter_img = null;
            if ($newsletter_img) {
              // For Newsletter image
              var $output =
                '<img src="/uploads/newsletter/' + $newsletter_img + '" alt="Avatar" height="32" width="32">';
            } else {
              // For Newsletter badge
              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['email'] ? full['email'] : "Newsletter",
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-content">' + $initials + '</span>';
            }

            var colorClass = $newsletter_img === '' ? ' bg-light-' + $state + ' ' : '';

            let $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1" style="cursor: default !important;">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="fw-bolder">' +
              '<a href="javascript:;" data-id="edit-' + full['_id'] +
              '" data-newsletteremail="' + full['email'] +
              '" class="text-truncate text-body edit-newsletter-modal" data-bs-toggle="modal" data-bs-target="#modals-slide-in">' +
              full['email'] +
              '</a></span>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // Status
          targets: 3,
          responsivePriority: 4,
          render: function (datas, type, full, meta) {
            let status = full['status'];

            return (
              '<span class="badge rounded-pill userStatusUpdate cursor-pointer ' +
              statusObj[status].class +
              '" text-capitalized data-status="' + status + '" data-id="' + full['_id'] + '">' +
              statusObj[status].title +
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
              '<a href="javascript:;" data-id="edit-' + full['_id'] +
              '" data-newsletteremail="' + full['email'] +
              '" class="dropdown-item edit-newsletter-modal" data-bs-toggle="modal" data-bs-target="#modals-slide-in">' +
              feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +
              '<a href="javascript:;" data-id="' + full['_id'] +
              '" class="dropdown-item deleteNewsletter">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [],
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
          autoClose: true,
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: 'Bulk Actions',
          attr: { id: 'bulk-edit-dropdown' },
          buttons: [
            {
              text: feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) + 'Delete',
              className: 'dropdown-item bulkDeleteBtn',
            }
          ]
        },
        {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle me-2 exportButton',
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
          text: 'Add New',
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

  /* Update Newsletter Button And Modal */
  $(document).on('click', '.edit-newsletter-modal', function () {
    $('#exampleModalLabel').text("Update Newsletter");
    $('#addNewsletterFrm').attr('action', '/newsletter/update');
    
    let elemID = $(this).data('id').replace('edit-', ''),
      email = $(this).data('newsletteremail');

    $('#email').val(email);
    $('#id').val(elemID);

    $('#SubmitBtn').text("Update");
  });

  /* Create Newsletter Button And Modal */
  $(document).on('click', '.add-new', function () {
    $('#exampleModalLabel').text("Add Newsletter");
    $('#addNewsletterFrm').attr('action', '/newsletter/insert');

    $('#email').val('');
    $('#id').val('');

    $('#SubmitBtn').text("Submit");
  });

  $(document).on('click', '.deleteNewsletter', function () {
    var elemID = $(this).data('id');
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        window.location.href = `${location.protocol}//${window.location.host}/newsletter/delete/${elemID}`;
      }
    });
  });

  $(document).on('click', '.userStatusUpdate', function () {
    var elemID = $(this).data('id');
    var status = $(this).data('status');
    var inputs = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status === "Active") {
          let options = {
            "Inactive": "Inactive",
            "Active": "Active"
          }
          return resolve(options);
        } else {
          let options = {
            "Active": "Active",
            "Inactive": "Inactive"
          }
          return resolve(options);
        }
      }, 200);
    });
    swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      input: 'select',
      inputOptions: inputs,
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        window.location.href = `${window.location.protocol}//${window.location.host}/newsletter/status-change/${elemID}?status=${result.value}`;
      }
    });
  });

  $(document).on('click', '#checkboxSelectAll', function () {
    let allcheck = $('#checkboxSelectAll').is(":checked");
    if (allcheck == true) {
      $('.onecheck').prop('checked', true);
    } else {
      $('.onecheck').prop('checked', false);
    }
  });

  $(document).on('click', '.bulkDeleteBtn', function () {
    var selectedIdArr = [];
    $('.onecheck:checkbox:checked').each(function () {
      selectedIdArr.push(($(this).val()));
    });
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        var body = { ids: selectedIdArr };
        $.ajax({
          url: `${location.protocol}//${window.location.host}/newsletter/bulk/delete`,
          type: "POST",
          data: JSON.stringify(body),
          contentType: "application/json; charset=utf-8",
          crossDomain: true,
          dataType: "json",
          success: function (response) {
            if (response.status == 200) {
              window.location.reload();
            }
          },
          error: function (xhr, status, error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: xhr?.responseJSON?.message
            });
          }
        });
      }
    });
  });
});