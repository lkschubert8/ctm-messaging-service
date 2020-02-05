const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');


class Db {
    static OUTBOUND_MESSAGE = 0;
    static INBOUND_MESSAGE = 1;
    constructor() {
        this.db = new sqlite3.Database('messaging-service.db', function(err){
            if (err) {
                console.log("FATAL - Failed connecting to database");
                console.log(err);
                process.exit(1);
            }
        })
    }

    /**
     * Migrates the schema
     */
    initializeDatabase() {
        const messageSchema = fs.readFileSync("./sql/Messages.sql", "utf8");
        const communicationSchema = fs.readFileSync("./sql/Communications.sql", "utf8");
        this.db.serialize(() => {
            this.db.run(communicationSchema);
            this.db.run(messageSchema);
            
        });
    }


    createCommunication(name, phoneNumber) {
        return new Promise((resolve, reject) => {
            let t = this.db.run(
                "INSERT INTO communications (name, phoneNumber) VALUES (?, ?)",
                [name, phoneNumber], function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve(this.lastID);
                })
        });
    }

    addMessage(communicationId, message, source) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO messages (contents, source, communicationId) VALUES (?, ?, ?)",
                [message, source, communicationId], function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
        });
    }

    getCommuncations() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM communications", function (err, results) {
                if (err)
                    reject(err);
                else
                    resolve(results);
            })
        });
    }
    
    getCommunicationIdByPhoneNumber(phoneNumber){
        return new Promise((resolve, reject) => {
            this.db.get("SELECT communicationId FROM communications WHERE phoneNumber = ?",
                        [phoneNumber],
                        function(err, result) {
                            if(err)
                                reject(err)
                            else
                                resolve(result);
                        });
        });
    }

    getCommunicationMessages(communicationId) {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM messages WHERE communicationId = ? ORDER BY timestamp ASC", [communicationId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        });
    }

    getNumberByCommunicationId(communicationId){
        return new Promise((resolve, reject) => {
            this.db.get("SELECT phoneNumber FROM communications WHERE communicationId = ?",
                        [communicationId],
                        (err, result) => {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        })
        })
    }
}

module.exports = new Db()

