document.addEventListener("DOMContentLoaded", function(event) {
    $('button').on('click', function() {
        if ($(this).html() == 'Encrypt') {
            var el = $('.encrypt_input');
            var secret = el.find('.secret').val();
            var message = el.find('.message').val();

            var result = encrypt(message, secret);

            var el = $('.encrypt_result');
            el.find('.message').html(result.message);
            el.find('.salt').html(result.salt);
            el.find('.iv').html(result.iv);
            el.show();
        } else if ($(this).html() == 'Decrypt') {
            var el = $('.decrypt_input');
            var secret = el.find('.secret').val();
            var message = {
                "message": el.find('.message').val(),
                "salt": el.find('.salt').val(),
                "iv": el.find('.iv').val()
            };

            var result = decrypt(message, secret);

            var el = $('.decrypt_result');
            el.find('.message').html(result);
            el.show();
        } else {
            console.log('Invalid Action');
        }
    });
});
