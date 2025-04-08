const fs = require("fs")
const express = require("express")

const app = express()

app.use(express.json())

const port = 3000

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTour = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
}

const createNewTour = (req, res) => {
    console.log(req.body)

    const id = tours[tours.length-1].id + 1
    const newTour = Object.assign({id: id}, req.body)
    tours.push(newTour)

    res.status(201).json({
        status: "success",
        data: {
            tour: newTour
        }
    })
}

const getTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}

const updateTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }

    res.status(200).json({
        status: "success",
        message: "updated tour here"
    })
}

const deleteTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }

    res.status(204).json({
        status: "success",
        data: null
    })
}

app.route("/api/v1/tours").get(getAllTour).post(createNewTour)
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour)


app.listen(port, () => {
    console.log(`Server is listening at port ${port}...`)
})