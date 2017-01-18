		$(".ui_element").show();
		
		var g_isSpawned = false;
	
		var chat_container = $("#chat ul#chat_messages");
		var chat_size = 0;
		var chat_input;
		var chat_enabled = false;
	
		function showChatMessagesByType(type, show)
		{
			if(show)
			{
				chat_container.children("[data-mtype='" + type + "']").show();
			}
			else
			{
				chat_container.children("[data-mtype='" + type + "']").hide();
			}
		}
	
		window.insertMessageToChat = function(str, type, css_json)
		{
			if(type == null || css_json == null)
				chat_container.prepend("<li data-mtype='" + type + "']>" + str + "</li>").children(":first").css(css_json);
			else
				chat_container.prepend("<li>" + str + "</li>");			
			
			chat_size++;
			
			if(chat_size >= 50)
			{
				chat_container.children(":last").remove();
			}
		}
		
		function enableChatInput(enable)
		{
			if(enable != (chat_input != null))
			{
				chat_printing = enable;
			
				mp.invoke("focus", enable);
			
				if(enable)
				{
					//chat_container.animate({ "margin-top" : "-=30" }, 250, function()
					{
						chat_input = $("#chat").append('<div><input id="chat_msg" type="text" /></div>').children(":last");				
						
						chat_input.children("input").focus();
						/*.keydown(
							function(event)
							{ 
								if(event.which == 13) 
								{ 
									mp.triggerEvent("chatMessage", $(this).val()); 
									enableChatInput(false);
								}
						});*/
					}//);
				}
				else
				{
					chat_input.fadeOut('fast', function()
					{
						//chat_container.animate({ "margin-top" : "+=30" }, 250);
						chat_input.remove();
						chat_input = null;
					});
				}
			}
		}
		
		insertMessageToChat("Multiplayer started", "", "");
		//"<img src='http://2.bp.blogspot.com/-msghBDUozYU/UZJzbnWynKI/AAAAAAAADq8/Po1pA3SPPik/s1600/facebook-comments-symbol-with-heart-eyes.png' />"
		$("body").keydown(function( event )
		{
			if ( event.which == 84 
				&& chat_input == null)
			{
				enableChatInput(true);
				event.preventDefault();
			}
			else if( event.which == 13
				&& chat_input != null)
			{
				var value = chat_input.children("input").val();

				if(value.length > 0)
				{
					if(value[0] == "/")
					{
						value = value.substr(1);
						
						if(value.length > 0)
							mp.invoke("command", value);
					}
					else
					{
						mp.invoke("chatMessage", value);
					}
				}
				
				enableChatInput(false);
			}
		});