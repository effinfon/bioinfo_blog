const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    pseudonym: { // by default, it will be "anonymous"
        type: String,
        required: false
    },
    email: {    // the server can't contact you by email; to use Internet services, there is no reason for a user to even have an email address; it's like WhatsApp requiring you to have a phone number, but why ?
        type: String,
        required: false
    },

    credential: {   // the identifier field needs to be unique in the whole database; it is a "scapegoat space" meant to make private the password space and prevent it from being exposed
        type: Buffer,
        required: true
    },
    hashFunction: { // <TODO> using PBKDF will require a parameter for the "hardness"
        type: String,
        required: true
    },
    hashHardness: {
        type: Number,
        required: false
    },

    salt: {    // entropy, generated by and private to the server; it doesn't have to be the same amount of bytes for every password
        type: Buffer,   // <TODO> salt could be encrypted by the server's private key, dedicated to this function (not the one also used for HTTP/Internet COM); each instance of the micro-service could instantiate such a private-public par of keys, but how would it protect the keys ? definitely at least by "access separation" (expirable authorization)
        required: true  // <TODO> changing the password also changes the salt
    },
    password: {   // I am thinking of hiding a detail, and to use different hash functions throughout the database; this would become saltedPassword_hash
        type: Buffer,
        required: true
    },  // <TODO> keep a list of the last 2-3 used passwords and block them ? it is unpleasant to have that happen; besides, it shouldn't be the password that gives you that much access / have that much "credential power" (!)
            // but what could you do with an account if you only have "partial credential power" ?

    expirationDate: {   // <TODO> I think that credentials should be changed periodically (1 month, 2 months, 3 months, 6 months, manually)
        type: Date,
        required: false
    }

}, {
    timestamps: true,
    id: true
});
const User = mongoose.model("user", schema);

module.exports = { User };