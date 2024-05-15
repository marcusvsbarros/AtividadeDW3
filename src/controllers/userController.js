var User = require('../models/userModel');
const jwt = require('jsonwebtoken')

exports.getUser = async function (req, res) {
    try {
        const result = await User.find();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            age: req.body.age
        }
    );
    user.save()
        .then(res.status(201).send(user.toJSON()))
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
        })
};

exports.login = function (req, res) {

    try {
        const user = User.findById(req.body.id)

        if (!user) {
            return res.status(404).json('Usuário não encontrado')
        }

        jwt.sign(
            { user: { _id: user._id } },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRES_IN },
            (err, token) => {
                if (err) throw err
                res.status(200).json({
                    access_token: token
                })
            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }



};

exports.create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            age: req.body.age
        }
    );
    user.save()
        .then(res.status(201).send(user.toJSON()))
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
        })
};

exports.details = async function (req, res) {
    try {
        const result = await User.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.update = async function (req, res) {
    try {
        const { id } = req.params

        const updatedUser = req.body

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json('Usuário não encontrado')
        }

        await User.findByIdAndUpdate({ _id: id }, updatedUser)

        res.status(200).json('Usuário atualizado com sucesso');

    } catch (error) {
        res.status(200).json(error)
    }
}

exports.delete = async function (req, res) {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json('Usuário não encontrado')
        }

        await User.findByIdAndDelete({ _id: id })

        res.status(200).json('Usuário apagado com sucesso');

    } catch (error) {
        res.status(200).json(error)
    }
}