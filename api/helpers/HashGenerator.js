const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

module.exports = (hashLength) => {
    var hash = ''
    for(let i = 0; i < hashLength; i++){
        hash += chars.charAt(Math.floor(Math.random()*chars.length))
    }
    return hash
}