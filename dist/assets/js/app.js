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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2lnblVwKGZvcm0pIHtcblxuJChcIiNuZXdzbGV0dGVyX3N1Ym1pdFwiKS5wcm9wKCBcImRpc2FibGVkXCIsIHRydWUgKTtcbiBcbiQoJy5mb3JtcG9zdGVkJykuaGlkZSgpO1xuXG5cdCQuYWpheCh7XG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICB1cmxcdFx0XHQ6ICcvL2RpZ2l0YWxpc2VyYWQudXMxMi5saXN0LW1hbmFnZS5jb20vc3Vic2NyaWJlL3Bvc3QtanNvbj9jPT8nLFxuICAgICAgICBkYXRhXHRcdDogJChmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgY2FjaGUgICAgICAgOiBmYWxzZSxcbiAgICAgICAgZGF0YVR5cGUgICAgOiAnanNvbicsXG4gICAgICAgIGNvbnRlbnRUeXBlXHQ6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBlcnJvciAgICAgICA6IGZ1bmN0aW9uKGVycikgeyBhbGVydChcIk7DpWdvdCBnaWNrIGdhbGV0ISBGw7Zyc8O2ayBpZ2VuIHNlbmFyZS5cIik7IH0sXG4gICAgICAgIHN1Y2Nlc3MgICAgIDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKCcuZm9ybXBvc3RlZCcpLmF0dHIoJ2NsYXNzJywgJ2Zvcm1wb3N0ZWQgY2FsbG91dCcpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQgPT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgICBcdCQoJy5mb3JtcG9zdGVkJykuYXR0cignY2xhc3MnLCAnZm9ybXBvc3RlZCBjYWxsb3V0IGFsZXJ0Jyk7XG4gICAgICAgICAgICBcdCQoJy5mb3JtcG9zdGVkJykuaHRtbChcIjxwPkFqYWohIE7DpWdvdCBnaWNrIGZlbCwgZsO2cnPDtmsgaWdlbiE8L3A+XCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCA9PSBcInN1Y2Nlc3NcIikge1xuXHRcdFx0XHQkKCcuZm9ybXBvc3RlZCcpLmF0dHIoJ2NsYXNzJywgJ2Zvcm1wb3N0ZWQgY2FsbG91dCBzdWNjZXNzJyk7XG5cdFx0XHRcdCQoJy5mb3JtcG9zdGVkJykuaHRtbChcIjxwPkRldCBkw6RyIGdpY2sganUgZmludC4gSMOlbGwgdXRraWsgaSBkaW4gaW5rb3JnIPCfk6whPC9wPlwiKTtcbiAgICAgICAgICAgIFx0JCgnaW5wdXQnLCAnLmNvbHVtbicpLnZhbCgnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoXCIjbmV3c2xldHRlcl9zdWJtaXRcIikucHJvcCggXCJkaXNhYmxlZFwiLCBmYWxzZSApO1xuICAgICAgICAgICAgJCgnLmZvcm1wb3N0ZWQnKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHQkKCcuem9vbScpLnpvb20oKTtcblxuXHQkKCcjbmV3c2xldHRlcl9mb3JtJylcblx0XHQub24oJ2Zvcm12YWxpZC56Zi5hYmlkZScsIGZ1bmN0aW9uKGUpIHtcbiAgXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBcdFx0XHRzaWduVXAoZS50YXJnZXQpO1xuXG5cblx0XHR9KVxuXHRcdC5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XG5cdFx0ICAgIGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxufSk7XG5cbiQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcblxuV2ViRm9udC5sb2FkKHtcblx0Z29vZ2xlOiB7IGZhbWlsaWVzOiBbJ1JhbGV3YXk6NDAwLDcwMCddfVxufSk7Il0sImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
