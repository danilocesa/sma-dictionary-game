function callAjax(url, method,data = null,callback){
    if (!location.origin){
       location.origin = location.protocol + "//" + location.host;
    }
    // console.log(data);
    var request = new XMLHttpRequest();
    request.open(method, location.origin+ "/halohalo-api/public/" + url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var $data = request.responseText;
        callback(JSON.parse(request.responseText));
      } 
      else { //error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data, null, '\t'));
}