const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// change validation for name
var validateName = function(name) {
    var re = /^([А-ЯІЄ]{1}[а-яёіїє]{1,23}|[A-Z]{1}[a-z]{1,23}|[а-яёіїє]{1,24}|[a-z]{1,24})$/;
    return re.test(name)
};
var validateAge = function(age) {
    var re = /^(?<![-.])\b[0-9]+\b(?!\.[0-9]| )$/;
    return re.test(age)
};*/

const Question = new Schema(
    {
        title: { type: String,required: true},
        questionId: { type: String, required: false },
        text: { type: String, required: true },
        public: { type : Boolean,required: true},
        age :{
            type: Number
            //min: 14,
            //max: 100,
            //required:true,
            //trim: true,
            //validate: [validateAge, 'Please fill a valid age'],
            //match: [/^(?<![-.])\b[0-9]+\b(?!\.[0-9]| )$/, 'Please fill a valid age']
            },
        name :{
            type : String
            //required:true,
            //trim: true,
            //validate: [validateName, 'Please fill a valid name'],
            //match: [/^([А-ЯІЄ]{1}[а-яёіїє]{1,23}|[A-Z]{1}[a-z]{1,23}|[а-яёіїє]{1,24}|[a-z]{1,24})$/, 'Please fill a valid name'] //change
        },
        email: {
            type: String
            //trim: true,
            //lowercase: true,
            //required: 'Email address is required',
            //validate: [validateEmail, 'Please fill a valid email address'],
            //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }

    },
    { timestamps: true },
)

module.exports = mongoose.model('questions', Question)
