// const v5 = require('uuid');i
import v5 from 'uuid';

module.exports = {
    sayHello: function(name='you'){
        return `hello ${name}!`
    },

    iden: function(){
        return v5() + 1;
    },

    sayBye: function(){
        return 'Bye bye'
    },

    sleep: function(time){
        console.log(`sleep for ${time} minutes`)
        return 'zzz'
    }
}