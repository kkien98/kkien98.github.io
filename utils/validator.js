const validator ={
    validate : function (rules, obj) {
       const objKeys= Object.keys(obj);  //==name, password, retypePass
       for( let i=0;i<objKeys.length;i++)
       {
           const key= objKeys[i];  // mỗi i tương ứng 1 key
           if(rules[key]!== undefined){
               //Check here
            //    console.log(rules[key]);
               const rule= rules[key];   // == {name: "not Empty"}
               const ruleName= rule.name ;  // == "not Empty"
            //    console.log(ruleName);
               const result= validator[ruleName](obj[key],rule.value);
               if(!result )
               {
                   console.log(obj[key]); 
                   console.log(`${key} violated ${ruleName}`);
               }
           }
       } 
    },

    notEmpty: function(input){
      return input.length>0;
    },
    number: function(input){
        return true;
    },

    minLength: function(input, value)
    {
     return input.length>=value;
    },

    isEmail: function (input)
    {
     return true;
    },

    matched: function(input,value){
        return input===value;
    }
};

export default validator;