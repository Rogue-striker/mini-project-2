import jwt from 'jsonwebtoken';

const AccessTokenGenerator = (data)=>{
    const userData = {
        id: data,
    }
    try{
    const token  = jwt.sign(userData, process.env.ACCESS_SECRET_KEY,{expiresIn: '30d'});
    return token;
    }
    catch(e){
        console.log(e);
    }
}

export default AccessTokenGenerator;