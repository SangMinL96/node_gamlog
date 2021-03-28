const dotenv = require('dotenv');
const path = require('path');


if (process.env.NODE_ENV === 'dev') {
    dotenv.config({ path: path.join(__dirname, '../.env.dev') })
} else if (process.env.NODE_ENV === 'tst') {
    dotenv.config({ path: path.join(__dirname, '../.env.tst') })
    
} else {
    throw new Error('process.env.NODE_ENV IS EMPTY')
}
