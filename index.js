mp.events.add(
{
	"guiStarted": () =>
	{
		mp.gui.execute("window.location = 'package://html/index.html'");
	},
	
	"login": (login, pass) =>
	{
		// * * * * * * * * * * * * * * *
		// verify it here (length etc) *
		// * * * * * * * * * * * * * * *
		
		mp.events.callRemote("playerLogin", login, pass); // Appelel a distance playerLogin
	},
	
	"register": (mail, login, pass) =>
	{
		// * * * * * * * * * * * * * * *
		// verify it here (length etc) *
		// * * * * * * * * * * * * * * *
		
		mp.events.callRemote("playerRegister", mail, login, pass);
	},
	
	"authReport": (wasSuccessful) =>
	{
		if(wasSuccessful == true)
			mp.gui.execute("$('#auth').fadeOut('fast'); mp.invoke('focus', false);");
		else
			mp.gui.execute("window.insertMessageToChat('You have entered wrong login/pass!');");
	}
});