mp.invoke("focus", true);

window.processAuth = function(registering)
{
	if($("#auth #login").val().length < 3)
	{
		window.insertMessageToChat('min login length: 3');
		return;
	}
		
	if($("#auth #password").val().length < 6)
	{
		window.insertMessageToChat('min pass length: 6');
		return;
	}
		
	if( registering )
	{
		mp.invoke("trigger", "login", $("#auth #login").val(), $("#auth #password").val());
	}
	else
	{
		mp.invoke("trigger", "register", $("#auth #email").val(), $("#auth #login").val(), $("#auth #password").val());
	}
};