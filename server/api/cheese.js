const { cheeses } = require('../data');

module.exports = app => {

    const get = (req, res) => {
        let today = new Date().toISOString().split('T')[0];
        console.log(today);
        res.status(200).send({data: cheeses})
    }   

    const save = (req, res) => {
        let cheese = {
            _id: Date.now(),
            name: req.body.cheese,
            };
            cheeses.push(cheese);
            res.status(201).send({data: cheese})
    }

    const update = (req, res) => {
        res.status(200).send({
            data: {
                message: `Cheese ${req.params.id} updated.`,
            }
        })
    }
    
    const remove = (req, res) => {
        res.status(200).send({
            data: {
                message: `Cheese ${req.params.id} deleted.`,
            }
        })
    }
  return { save, remove, get, update}
}