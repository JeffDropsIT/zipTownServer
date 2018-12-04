const http = require("http");
const server_key = "AAAAPT4ruQA:APA91bF7bCreprHjQyT20qxqdHCS_KjdehwK7udpJflVnRCZTBE3ZqFMGcPRy4oH-eLy7Gymt50d6supXmWrC0RdbkxFG2198aBATsAuEOiAKxFkLBNekiE9s5gbBS4XL6Bhzkz3FDsK";


const onMessageReceived = (event, to, payload) => {
    const post_data = { 
        "data": {
      "event": event,
      payload

    },
    "to" : to };
    
  return post_data;
}


const sendMessage = async (event, to, payload) =>{

    var options = {
        host: "gcm-http.googleapis.com",
        path: "/gcm/send",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":    "key="+server_key,
        }
    };
    
    
    var req = await http.request(options, function (res) {
        var responseString = "";
    
        res.on("data", function (data) {
            responseString += data;
            // save all the data from response
        });
        res.on("end", function () {
            console.log(responseString); 
            // print to console when response ends
        });
    });

    
    req.write(JSON.stringify(onMessageReceived(event, to, payload)));
    req.end()
}

module.exports = {
    sendMessage
}