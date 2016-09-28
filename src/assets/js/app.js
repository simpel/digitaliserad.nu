function signUp(form) {

$("#newsletter_submit").prop( "disabled", true );
 
$('.formposted').hide();

	$.ajax({
        type: 'GET',
        url			: '//digitaliserad.us12.list-manage.com/subscribe/post-json?c=?',
        data		: $(form).serialize(),
        cache       : false,
        dataType    : 'json',
        contentType	: "application/json; charset=utf-8",
        error       : function(err) { alert("Något gick galet! Försök igen senare."); },
        success     : function(data) {
            
            $('.formposted').attr('class', 'formposted callout');

            if (data.result == "error") {
            	$('.formposted').attr('class', 'formposted callout alert');
            	$('.formposted').html("<p>Ajaj! Något gick fel, försök igen!</p>");
            
            }

            if (data.result == "success") {
				$('.formposted').attr('class', 'formposted callout success');
				$('.formposted').html("<p>Det där gick ju fint. Håll utkik i din inkorg 📬!</p>");
            	$('input', '.column').val('');
            }

            $("#newsletter_submit").prop( "disabled", false );
            $('.formposted').show();
        }
    });

}

$(document).ready(function(){
	$('.zoom').zoom();

	$('#newsletter_form')
		.on('formvalid.zf.abide', function(e) {
  			e.preventDefault();
  			signUp(e.target);


		})
		.on("submit", function(e) {
		    e.preventDefault();
		});

});

$(document).foundation();

WebFont.load({
	google: { families: ['Raleway:400,700']}
});