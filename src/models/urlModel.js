const mongoose = require('mongoose')
const URLSchema = new mongoose.Schema({
    urlCode:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
  },
    longUrl: {
        type:String,
        required:true
    },
    shortUrl: {
        type:String,
        unique:true,
        required:true
    }}, { timestamps: true })


module.exports = mongoose.model('Url', URLSchema)

//{ urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }




/*const mongoose = require('mongoose')
const validator=require('validator')
const objectId = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type:String,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email',
            isAsync:false
        }
        },
    mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}\d{3}\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Please enter your Mobile number'],
        unique: true,
        minLength: [9, 'number is too small'],
        maxLength: 10
    },
    collegeId: {
        type: objectId,
        ref: "CollegeDb"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = mongoose.model('InternDb', internSchema)
*/
