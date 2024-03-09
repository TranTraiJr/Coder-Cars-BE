const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const {
      make,
      model,
      transmission_type,
      size,
      style,
      year,
      price,
      isDeleted,
    } = req.body;
    if (
      !make ||
      !model ||
      !transmission_type ||
      !size ||
      !style ||
      !year ||
      !price
    ) {
      const exception = new Error(`Missing car's information`);
      exception.statusCode = 400;
      throw exception;
    }

    // const newCar = {
    //   make,
    //   model,
    //   transmission_type,
    //   size,
    //   style,
    //   release_date,
    //   price,
    //   isDeleted,
    // };

    const result = await Car.create({
      make: make,
      model: model,
      year: year,
      transmission_type: transmission_type,
      price: price,
      size: size,
      style: style,
      isDeleted: false,
    });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  const filter = {};
  try {
    let { page } = req.query;
    page = parseInt(page) || 1;
    const limit = 10;

    const listOfFound = await Car.find({ isDelete: false });
    const total = listOfFound.length / 10;
    let offset = limit * (page - 1);
    const cars = listOfFound.slice(offset, offset + limit);
    const data = {
      cars: cars,
      message: "Get Car List Successfully!",
      page: page,
      total: 588,
    };
    console.log(cars);
    console.log(total);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const allowUpdate = [
      "make",
      "model",
      "year",
      "transmission_type",
      "price",
      "size",
      "style",
    ];
    const id = req.params["id"];
    const updates = req.body;

    const updated = await Car.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    console.log("huhu", updated);

    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const id = req.params["id"];

    // console.log(id);
    if (!id) {
      const exception = new Error(`Invalid ID`);
      exception.statusCode = 401;
      throw exception;
    }

    const deletedCar = await Car.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    res.status(200).json("Car deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
