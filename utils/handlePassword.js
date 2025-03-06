const bcryptjs = require('bcryptjs');


const hash = async (PasswordPlana)=>{
    return await bcryptjs.hash(PasswordPlana, 10)
}

const compare = async (PasswordPlana, PasswordHash)=>{
    return await bcryptjs.compare(PasswordPlana, PasswordHash)
}

module.exports = {hash, compare}