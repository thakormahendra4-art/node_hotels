const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

//Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },

    age: {
        type: Number,
    },

    work:{
        type: String,
        enum: ['chef','waiter','manager','Web Developer'],
        required : true 
    },

    mobile: {
        type: String,
        required : true
    },

    email:{
        type: String,
        required:true,
        unique :true
    },
    address:{
        type:String,
    },

    salari:{
        type:Number,
        required: true
    },

    username: {
        type: String,
        required : true
    },

    password: {
        type: String,
        required : true
    }
    
})


personSchema.pre('save' ,function(next) {
    const Person = this;

    
    // hash the password only if it has been modified (or is new)
    if(!Person.isModified('password')) return next();
    
        // hash password operation
       bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        // hash password
       bcrypt.hash(Person.password, salt, (err, hash) => {
            if (err) return next(err);
        
        // override the plain password with the hashed one 
        Person.password = hash
        next();
        })
   })
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        //use bcrypt to comapare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}
//create person model
const person = mongoose.model('person',personSchema)
module.exports = person;
