exports = mongoose = require('mongoose');
var mongo_uri = 'mongodb://localhost/blog';
mongoose.connect(mongo_uri);
exports = Schema = mongoose.Schema;
