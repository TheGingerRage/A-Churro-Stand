exports.name = 'scrubcheck';
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
    var query = 'SELECT username FROM ' + config.database.dbname + '.' + config.database.tablenames.user + ' WHERE userid = (SELECT djid FROM ' + config.database.dbname + '.' + config.database.tablenames.scrubhat + ' WHERE wearing = 1)';
        client.query(query,
            function select(error, results, fields) {
                if(error) {
                    console.log(error);
                }
                else if (results != null && results[0] != null) {
                    var response = 'The Scrub hat is being worn by @' + results[0]['username'] +'!';
                    bot.speak(response);
                }
            });
}