async function logout(req,res) {
    req.session.destroy(function(err){
        if(err) {
            console.log(err)
        }
        else {
            res.redirect('/login')
        }
    })
}

module.exports = {
    logout
}