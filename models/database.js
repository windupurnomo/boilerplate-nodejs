var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var userSchema = Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "user"
    },
    name: String,
    phone: String,
    token: String,
    activationCode: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    status: {
        type: Number, //0: registered; 1: Active; 2: Non Active,
        default: 0
    },
    createdAt: Date,
    updatedAt: Date
});

var companySchema = Schema({
    name: {
        type: String,
        require: true
    },
    description: String,
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: String,
    phone: String,
    email: String,
    coordinate: String,
    luas: String,
    images: String,
    logo: String,
    status:{
        type: Number,
        default: 1
    },
    createdAt: Date,
    updatedAt: Date
});

var moduleSchema = Schema({
    module: {
        type: String,
        require: true,
        unique: true
    },
    roles: [String],
    group: String,
    description: String
});


userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.pre('save', function(next) {
    now = new Date();
    this.updatedAt = now;
    if (!this.created_at) {
        this.createdAt = now;
    }
    next();
});

var structure = {};
structure.User = mongoose.model('User', userSchema);
structure.Company = mongoose.model('Company', companySchema);
structure.Module = mongoose.model('Module', moduleSchema);
module.exports = structure;