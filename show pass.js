//START::show pass
$(document).on('click', '#showPass', function () {
    $('#passIcon').toggleClass("fa-eye fa-eye-slash");
    var input = $('#password');
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
//END::show pass