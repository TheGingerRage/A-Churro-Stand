exports.name = 'scrubhat';
exports.hidden = true;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
        // data.userid == '4e4c8f2fa3f751044515d8aa' <--- Bow's access removed
        if ( moderators.some(function(modid){ return modid == data.userid; }) ||  data.userid == '4e3c5d0ca3f75169d003e6ac' || data.userid == '4e22008e4fe7d0537d031248'
            || data.user == '4e73072f4fe7d045c21cbee7' ) {
        var nameforid = data.text.substring(9);
        bot.getUserId(nameforid, function(iddata) {
            if (iddata.success) {
                if (config.database.usedb) {
						var query = 'SELECT wearing FROM '
                            + config.database.dbname + '.' + config.database.tablenames.scrubhat
                            + ' WHERE djid =\'' + iddata.userid + '\'';
						client.query(query,
						function select(error, results, fields) {
                            if(error) {
                                console.log(error);
                            }
							if (results != null && results[0] != null) {
								for (i in results){
									if (results[i]['wearing'] == '1') {
										var badresponse = 'They\'re already wearing the Scrub hat!';
										output({text: badresponse, destination: data.source, userid: data.userid});
									}
                                    else {
                                        client.query('UPDATE '
                                            + config.database.dbname + '.' + config.database.tablenames.scrubhat
                                            + ' SET wearing=0');
                                        client.query('INSERT INTO '
                                            + config.database.dbname + '.' + config.database.tablenames.scrubhat
                                            + ' (djid, wearing, timesworn, lastworn)'
                                            + 'VALUES (?, 1, 1, NOW()) ON DUPLICATE KEY UPDATE lastworn = NOW(), timesworn=timesworn+1, wearing=1 ', [iddata.userid]);
                                        var response = 'Tis a day of celebration and mockery! The Scrub hat is now being worn by @' + data.text.substring(9) +'!';
                                        bot.speak(response);
                                    }
								}
							}
                            else {
                                client.query('UPDATE '
                                    + config.database.dbname + '.' + config.database.tablenames.scrubhat
                                    + ' SET wearing=0');
                                client.query('INSERT INTO '
                                    + config.database.dbname + '.' + config.database.tablenames.scrubhat
                                    + ' (djid, wearing, timesworn, lastworn)' + 'VALUES (?, 1, 1, NOW()) ON DUPLICATE KEY UPDATE lastworn = NOW(), timesworn=timesworn+1, wearing=1 ', [iddata.userid]);
                                var response = 'Tis a day of celebration and mockery! The Scrub hat is now being worn by @' + data.text.substring(9) +'!';
                                bot.speak(response);
                            }
						});
					}
				}
			});
        }
}