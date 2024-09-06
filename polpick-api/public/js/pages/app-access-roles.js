$(function () {
  ('use strict');

  $(document).on('click', '.deleteRole', function() {
    var elemID = $(this).attr('id').replace('del-', '');
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            window.location.href = `${location.protocol}//${window.location.host}/role/delete/${elemID}`;
        }
    });
  });

  $("input[type='checkbox']").not("#selectAll").click(function(){
    if ($("input[type='checkbox']:checked").not("#selectAll").length == $("input[type='checkbox']").not("#selectAll").length) {
      $("#selectAll").prop('checked', true);
    } else {
      $("#selectAll").prop('checked', false);
    }
  })

  let roleEdit = $('.role-edit-modal'),
    roleAdd = $('.add-new-role'),
    roleTitle = $('.role-title');

  roleAdd.on('click', function () {
    roleAdd.trigger('reset')
    roleTitle.text('Add New Role'); // reset text
  });

  roleEdit.on('click', function () {
    let roleDetails = JSON.parse($('#' + $(this).data('id')).val());
    $('#modalRoleName').val(roleDetails.roleDisplayName);
    $('#modalRoleDescription').val(roleDetails.desc);
    $('#roleId').val(roleDetails._id);
    roleTitle.text('Edit Role');
    if (roleDetails.permissions && roleDetails.permissions.permissionall && roleDetails.permissions.permissionall.length) {
      for (let permission of roleDetails.permissions.permissionall) {
        $('#' + permission.group + '_' + permission.pageName).prop('checked', true);
      }
    }
  });
});
