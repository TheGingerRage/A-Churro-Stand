exports.name = 'speak';
exports.hidden = false;
exports.enabled = true;
exports.handler = function(queryArray, response) {
    //if(queryArray.format == 'json') {
        bot.speak(queryArray.message);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        var rp = {response: queryArray.message};
        response.end(JSON.stringify(rp));
    //} else {
    //    response.writeHead(200, {'Content-Type': 'text/plain'});
    //    response.end('Pong!\n');
    //}
}