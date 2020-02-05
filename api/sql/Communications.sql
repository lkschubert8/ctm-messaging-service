CREATE TABLE IF NOT EXISTS communications(
    [communicationId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [name] VARCHAR(250),
    -- International numbers are recommended to be 
    -- limited to fifteen digits. 
    -- The unique attribute is used because we are affiliating responses 
    -- with the initial communications. This enforces 
    [phoneNumber] VARCHAR(15) UNIQUE
    
)