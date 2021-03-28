const crypto = require('crypto')


export const upgradeBase64crypto = (password) => {
    console.log(process.env.KEY)
    return new Promise((resolve, reject) => {        
        crypto.randomBytes(64, (err, buf) => {
            const salt = buf.toString('base64');
            crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, key) => {
                resolve(key.toString('base64'));
            });
            
        })
    });
}