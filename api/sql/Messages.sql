CREATE TABLE IF NOT EXISTS messages(
    [messageId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [timestamp] DATETIME DEFAULT CURRENT_TIMESTAMP,
    [contents] TEXT,
    [source] BOOLEAN, -- Source will be 0 for messages outbound from the application
                      -- 1 for responses from the receiving number
    [communicationId] INTEGER, 
    FOREIGN KEY ([communicationId]) References communications (communicationId)
)


                            

