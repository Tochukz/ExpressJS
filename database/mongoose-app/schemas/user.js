const mongoose = require('mongoose');

const  { Schema, Types } = mongoose;

const userSchema = new Schema(
    {
       name: { 
            firstname: String,        
            lastname: String
       },
       adr: {
           type: String,
           alias: 'address'
       }
    }
);

// Add a virtual to the schema  
userSchema.virtual('fullname')
          .get(function() {
            return `${this.name.firstname} ${this.name.lastname}`;
          }).set(function(fullname) {
              [fname, lname] = fullname.split(' ');
              this.name.firstname = fname;
              this.name.lastname = lname;
          });
/** The get(f) and set(f) vituals are independent and you may define only the one you need */ 

module.exports = userSchema;

//Aliases are a particular type of virtual where the getter and setter seamlessly get and set another property.
