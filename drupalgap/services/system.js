// global variables used to hold the latest system resource call results
var drupalgap_services_system_connect_result; 
var drupalgap_services_system_get_variable_result;

/**
 * Makes an synchronous call to Drupal's System Connect Service Resource.
 *
 * @return
 *   A JSON object containing information about the drupal user who made the service call, and NULL if the service call failed.
 */
function drupalgap_services_system_connect () {
	
	/* // here is an example system connect result json if the user not authenticated (anonymous)
	 * {
	 *   "sessid":"random-session-id",
	 *   "user":{
	 *     "uid":0,
	 *     "hostname":"127.0.0.1",
	 *     "roles":{
	 *       "1":"anonymous user"
	 *     },
	 *     "cache":0
	 *   }
	 * }

	 * // here is an example system connect result json if the user is authenticated
	  {
		"sessid":"random-session-id",
		"user":{
		  "uid":"1",
		  "name":"admin",
		  "pass":"md5-hashed-string",
		  "mail":"admin@example.com",
		  "theme":"",
		  "signature":"",
		  "signature_format":null,
		  "created":"1327358991",
		  "access":"1327446430",
		  "login":"1327446430",
		  "status":"1",
		  "timezone":"America/New_York",
		  "language":"",
		  "picture":"0",
		  "init":"admin@example.com",
		  "data":false,
		  "sid":"same-random-session-id-as-above",
		  "ssid":"",
		  "hostname":"127.0.0.1",
		  "timestamp":"1327446430",
		  "cache":"0",
		  "session":"",
		  "roles":{
		    "2":"authenticated user",
		    "3":"administrator"
		  }
	    }
	  }
	*/

	try {
		// build url path to service call
		var system_connect_url = drupalgap_settings.services_endpoint_default + "/system/connect.json";
		// force clear any previous system connect result
		drupalgap_services_system_connect_result = null;
		// make the service call...
		console.log(system_connect_url);
	    $.ajax({
	      url: system_connect_url,
	      type: 'post',
	      dataType: 'json',
	      async: false,
	      error: function (XMLHttpRequest, textStatus, errorThrown) {
	    	alert('drupalgap_services_system_connect - failed to connect');
	    	console.log("drupalgap_services_system_connect");
	        console.log(JSON.stringify(XMLHttpRequest));
	        console.log(JSON.stringify(textStatus));
	        console.log(JSON.stringify(errorThrown));
	      },
	      success: function (data) {
	    	  // save JSON result in global variables so others can access it
	    	  drupalgap_services_system_connect_result = data;
	    	  drupalgap_user = data.user; // save user json
	    	  console.log(JSON.stringify(drupalgap_services_system_connect_result));
	      }
	    });
	}
	catch (error) {
		console.log("drupalgap_services_system_connect - " + error);
		alert("drupalgap_services_system_connect - " + error);
	}
	return drupalgap_services_system_connect_result;
}

/**
 * Makes an synchronous call to Drupal's System Get Variable Resource.
 *
 * @param 
 *   name The name of the Drupal Variable to retrieve.
 *   
 * @return
 *   The value of the drupal variable, FALSE otherwise.
 */
function drupalgap_services_system_get_variable (name) {
	try {
		if (!name) {
			alert("drupalgap_services_system_get_variable - name was empty");
			return false;
		}
		
		// build url path to system get variable resource call
		var get_variable_url = drupalgap_settings.services_endpoint_default + "/system/get_variable.json";
		console.log(get_variable_url);
	  
		// make the service call...
		var successful = false;
		$.ajax({
		    url: get_variable_url,
		    type: 'post',
		    data: 'name=' + encodeURIComponent(name),
		    dataType: 'json',
		    async: false,
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			drupalgap_services_system_get_variable_result = XMLHttpRequest; // hold on to a copy of the json that came back
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
		    },
		    success: function (data) {
		    	drupalgap_services_system_get_variable_result = data; // hold on to a copy of the json that came back
		    	console.log(JSON.stringify(drupalgap_services_system_get_variable_result));
		    	successful = true;
		    }
		});
		if (!successful) { return false; }
		else { return drupalgap_services_system_get_variable_result; }
	}
	catch (error) {
		console.log("drupalgap_services_system_get_variable - " + error);
		alert("drupalgap_services_system_get_variable - " + error);
	}
	return false;
}