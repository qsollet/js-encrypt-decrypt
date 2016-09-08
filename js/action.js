document.addEventListener("DOMContentLoaded", function(event) {
    $('button').on('click', function() {
        if ($(this).html() == 'Encrypt') {
            var el = $('.encrypt_input');
            var secret = el.find('.secret').val();
            var message = el.find('.message').val();

            var result = encrypt(message, secret);

            var el = $('.encrypt_result');
            el.find('.message').html(JSON.stringify(result));
        } else if ($(this).html() == 'Decrypt') {
            var el = $('.decrypt_input');
            var secret = el.find('.secret').val();
            var message = JSON.parse(el.find('.message').val());
            var result = decrypt(message, secret);

            var el = $('.decrypt_result');
            el.find('.message').html(result);
        } else {
            console.log('Invalid Action');
        }
    });
});
