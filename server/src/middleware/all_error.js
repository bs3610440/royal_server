export const errorhandling = (err, res) => {
  
    if (err.name == 'ValidationError') return res.status(400).send({ status: false, msg: err.message })
    if (err.name == 'CastError') return res.status(400).send({ status: false, msg: 'Id is Invalid!' })

    if (err.code == 11000) return res.status(400).send(
        { status: false, msg: `this ${Object.keys(err.keyValue)} - ${Object.values(err.keyValue)} already present` }
    )

    return res.status(500).send({ status: false, msg: err.message })
}