const {_get_member, _add_member} = require('./meber.model')


const get_member = async ()=>{
    
    try{
       const data = _get_member()
       return data
    }catch(err){
        return {success: false, data: err.toString()}
    }
    
}

const add_member = async (req)=>{
    try{
        const data = _add_member(req)
        return data
     }catch(err){
        return {success: false, data: err.toString()}
     }
}

module.exports = {
    get_member, 
    add_member
}