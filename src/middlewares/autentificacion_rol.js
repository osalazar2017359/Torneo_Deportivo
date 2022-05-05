exports.Admi = function (req, res, next) {
    if (req.user.rol !== "Admin") {
        return res.status(500).send({ message: "Solo para usuarios rol: Admin"})
    }
    next()
}

exports.Org = function (req, res, next) {
    if (req.user.rol !== "Organizador") {
        return res.status(500).send({ message: "Solo para usuarios rol: Organizador"})
    }
    next()
}
