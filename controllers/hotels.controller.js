const Hotels = require("../model/Hotels");
const { success } = require("../utils/response");

const addNewHotel = async (req, res) => {
  try {
    let { name, price, description, location } = req.body;
    const _images = req.files;

    let images = _images.map((image) => {
      return image.filename;
    });

    let { id } = req.user;

    let _hotels = new Hotels({
      name,
      images,
      price,
      description,
      location,
      user: id,
    });

    await _hotels.save();

    return res.status(200).json(success(_hotels));
  } catch (e) {
    console.log(e);
  }
};

const getHotelsOfUser = async (req, res) => {
  const id = req.user.id;
  let hotels = await Hotels.find({ user: id });

  return res.status(200).json(success(hotels));
};

const getAllHotels = async (req, res) => {
  let hotels = await Hotels.find({ isVerified: true });

  return res.status(200).json(success(hotels));
};

const getHotelsForAdmin = async (req, res) => {
  let hotels = await Hotels.find({ isVerified: false });

  return res.status(200).json(success(hotels));
};

const getHotelById = async (req, res) => {
  const { id } = req.params;

  let hotel = await Hotels.findById(id);

  return res.status(200).json(success(hotel));
};

const acceptHotel = async (req, res) => {
  const { id } = req.body;

  await Hotels.findByIdAndUpdate(id, { isVerified: true });
};

module.exports = {
  addNewHotel,
  getHotelsOfUser,
  getAllHotels,
  getHotelById,
  acceptHotel,
  getHotelsForAdmin,
};
