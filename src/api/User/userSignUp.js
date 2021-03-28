import { upgradeBase64crypto } from "../../../utils/pwCrypto";
const crypto = require('crypto')

export default {
    Mutation:{
        signUpUser:async(_,args,{request,query})=>{
           
            try{
                const param=args.param;
                console.log(param)
                let pwHash =await crypto.createHash('sha512').update(param.id + param.pw+process.env.KEY).digest('hex')
                const result =await query('user','signUser',{...param,pw:pwHash});
                console.log(result)
                if(!result){
                    return {rslt: 'NG', data:""}
                }else{
                    return {rslt: 'OK', data:""} 
                }
               
            }catch(err){
                   
            } 
            }
    }
}