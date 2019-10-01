(function(global){


    var ajaxUtils = {};

// Return HTTP request object, check what object is available
    function getRequestObject(){
        if(window.XMLHttpRequest) {
            return (new XMLHttpRequest()); // most current object
        }
        else { // for old browsers
            global.alert("Ajax is not supported");
            return (null);
        }
    }


// make an Ajax GET request to 'requestUrl'
    /* Function to set up the parameters
        requestUrl: know where to make the GET request
        responseHandler: what is going to handle the result that server returns */

    ajaxUtils.sendGetRequest = function(requestUrl, responseHandler, isJsonResponse){
        // get new XMLHttpRequest object
        var request = getRequestObject();

        request.onreadystatechange = function (){
            // pass a request and responseHandler
            // every time there is a change in communication state
            handleResponse(request, responseHandler, isJsonResponse);
        };
        // make the GET request
        request.open("GET", requestUrl, true);
        request.send(null); // for POST
    };

// only call user provided 'responseHandler'
// function if response is ready and no error presents
    function handleResponse(request,
                            responseHandler,
                            isJsonResponse){
        if ((request.readyState == 4) /* ready status 4 */
            && (request.status == 200) /* status code 200 means ok */){

            if (isJsonResponse == undefined){
                isJsonResponse = true;
            }

            if(isJsonResponse){
                responseHandler(JSON.parse(request.responseText))
            }
            else{
                responseHandler(request.responseText);
            }
        }
    }

// expose utility to global object

    global.$ajaxUtils = ajaxUtils;

})(window);
