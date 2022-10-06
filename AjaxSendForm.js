$(document).on("click", ".button-submit", function (e) {
  e.preventDefault();
  var form_data = new FormData($("#submitForm")[0]);
  var options = {
    closeButton: true,
    debug: false,
    positionClass: "toast-bottom-right",
    onclick: null,
  };
  swal(
    {
      title: "Are you sure?",

      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, Save",
      cancelButtonText: "No, Cancel",
      closeOnConfirm: true,
      closeOnCancel: true,
    },
    function (isConfirm) {
      if (isConfirm) {
        $.ajax({
          url: "{{URL::to('admin/newOrder/saveNewOrder')}}",
          type: "POST",
          datatype: "json",
          cache: false,
          contentType: false,
          processData: false,
          data: form_data,
          success: function (res) {
            toastr.success(
              '@lang("label.NEW_ORDER_SAVED_SUCCESSFULLY")',
              res,
              options
            );
            //                            $("#eventId").trigger('change');
            window.location.replace('{{URL::to("admin/newOrder")}}');
          },
          error: function (jqXhr, ajaxOptions, thrownError) {
            if (jqXhr.status == 400) {
              var errorsHtml = "";
              var errors = jqXhr.responseJSON.message;
              $.each(errors, function (key, value) {
                errorsHtml += "<li>" + value + "</li>";
              });
              toastr.error(errorsHtml, jqXhr.responseJSON.heading, options);
            } else if (jqXhr.status == 401) {
              toastr.error(jqXhr.responseJSON.message, "", options);
            } else {
              toastr.error("Error", "Something went wrong", options);
            }
            App.unblockUI();
          },
        });
      }
    }
  );
});
