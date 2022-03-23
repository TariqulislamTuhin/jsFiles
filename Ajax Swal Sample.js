// Deny code start
$(document).on('click', '.deny', function (e) {
    e.preventDefault();
    var options = {
        closeButton: true,
        debug: false,
        positionClass: "toast-bottom-right",
        onclick: null,
    };
    var id = $(this).attr('data-id');
    var status = $(this).attr('data-status');
    swal({
        title: "Do you really want to Deny This Product Purchase?",
        text: "Do you want to change it?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Accept it.",
        cancelButtonText: "No, Cancel",
        closeOnConfirm: true,
        closeOnCancel: true,
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "url.com",
                type: 'POST',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    id: id, approve: status
                },
                beforeSend: function () {
                    App.blockUI({boxed: true});
                },
                success: function (res) {
                    toastr.success(res.message, res.heading, options);
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                    App.unblockUI();
                },
                error: function (jqXhr, ajaxOptions, thrownError) {

                    if (jqXhr.status == 400) {
                        var errorsHtml = '';
                        var errors = jqXhr.responseJSON.message;
                        $.each(errors, function (key, value) {
                            errorsHtml += '<li>' + value + '</li>';
                        });
                        toastr.error(errorsHtml, jqXhr.responseJSON.heading,
                                options);
                    } else if (jqXhr.status == 401) {
                        toastr.error(jqXhr.responseJSON.message, '',
                                options);
                    } else if (jqXhr.status == 422) {
                        toastr.error(jqXhr.responseJSON.message, '', options);
                    } else {
                        toastr.error('Error', "@lang('label.SOMETHING_WENT_WRONG')",
                                options);
                    }
                    App.unblockUI();
                }
            });
        }
    });
});
// Deny code End