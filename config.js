var config = {}

config.port = port = process.env.PORT || 4321;

config.db = {
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"student_db",
    charset:"utf8mb4",
    multipleStatement:true
};

module.exports = config;
