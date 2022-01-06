const { generateToken } = require('../../utils/generateToken');
const { passwordCheck } = require('../../utils/pass-hash');
const store = require('./store');


const createUserBussiness = (userData) => {
    return new Promise((resolve, reject) => {
       try {          
           if(!userData || !userData.user || !userData.password){
                reject("Los datos de usuario son obligatorios")
           } else {
                store.findUser(userData.user).then((data)=>{
                    if(!!data && data.length > 0){
                        reject("El usuario ya existe")
                    } else {
                        const user = store.createUser(userData);

                        if(user){
                            resolve(user);
                        } else {
                            reject("BD error")
                        }
                    }
                    
                });
                
           }
       } catch (error) {
           reject(error)
       }
    });
};

const logInBussiness = (userData) => {
    return new Promise((resolve, reject) => {
       try {          
           if(!userData || !userData.user || !userData.password){
                reject("Los datos de usuario son obligatorios")
           } else {
                store.findUser(userData.user).then((data)=>{
                    if(!data || data.length == 0){
                        reject("Usuario o contraseña invalidos")
                    } else {
                        passwordCheck(data[0].password, userData.password).then((checked) => {
                            if(checked){
                                token = generateToken(userData.user);
                                resolve({token})
                            } else {
                                reject("Usuario o contraseña invalidos")
                            }
                        })
                    }
                    
                });
           }
       } catch (error) {
           reject(error)
       }
    });
};


module.exports = {
    createUserBussiness,
    logInBussiness
}