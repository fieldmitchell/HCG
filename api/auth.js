const bcrypt = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

module.exports = (model) => {
    router.get('/', async (req, res, next) => {
        try {
        const results = await model.find(req.query).exec()
        return res.status(200).send(results)
        } catch(err) {
        return next(err)
        }
    })

    router.post('/', async (req, res, next) => 
    {
        const { username, password } = req.body

        //validation
        if(!username || !password) {
            return res.status(400).json({msg: "Please enter all fields"})
        }

        model.findOne({ username })
            .then(user => {
                if(!user) return res.status(400).json({ msg: "User does not exist." })

                if(user.password == password)
                {
                    res.json({user: {
                        id: user.id,
                        username: user.username,
                        password: user.password
                    }})
                }
                else{
                    return res.status(400).json({ msg: "Invalid password" })
                }
                //validate password this requires hashing the password (https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9)
                /*bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials" })

                        jwt.sign(
                            {id: user.id},
                            process.env.jwtSecret,
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err) throw err
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        username: user.username,
                                        password: user.password
                                    }
                                })
                            }
                        )
                    })*/
            })
    })
    
    return router
}