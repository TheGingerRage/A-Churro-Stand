exports.name = 'churro';
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
var timeSinceUsed = (new Date().getTime() - churroTimer.getTime());
if (timeSinceUsed > 60000) {
    bot.churroTimer = new Date();
    var query = 'SELECT username FROM ' + config.database.dbname + '.' + config.database.tablenames.user + ' WHERE userid =\'' + data.userid + '\' ORDER BY lastseen DESC LIMIT 1';
    client.query(query,
        function select(error, results, fields) {
            if(error) {
                console.log(error);
            }
            if (results != null && results[0] != null) {
                sender = results[0].username;
                if (data.text == 'churro') {
                    if (sender.charAt(0) == '@') {
                        bot.speak('/me hands ' + sender + ' a churro.');
                    }
                    else {
                        bot.speak('/me hands @' + sender + ' a churro.');
                    }
                }
                else {
                    name = data.text.substring(7);
                    var query = 'SELECT username FROM ' + config.database.dbname + '.' + config.database.tablenames.user + ' WHERE username =\'' + name + '\' ORDER BY lastseen DESC LIMIT 1';
                    client.query(query,
                        function select(error, results, fields) {
                            if(error) {
                                console.log(error);
                            }
                            if (results != null && results[0] != null) {
                                if (name.charAt(0) == '@') {
                                    bot.speak('/me tosses a churro to ' + name + '.');
                                }
                            else {
                                bot.speak('/me tosses a churro to @' + name + '.');
                                }
                            }
                        });
                    }
            }
        });
    }
}
