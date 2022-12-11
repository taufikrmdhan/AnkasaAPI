const airlineModel = require("../model/airline.model");
const cloudinary = require('../helper/cloudinary');
const { success, failed } = require("../helper/response");

const airlineController = {
	// get all
	listAirline: (req, res) => {
		airlineModel
			.getAllAirline()
			.then((result) => {
				success(res, result.rows, "success", "Get All Airline List Success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Failed to get all airline list");
			});
	},

	// get detail
	detailAirline: (req, res) => {
		const id_airline = req.params.id;

		airlineModel
			.getDetailAirline(id_airline)
			.then((result) => {
				success(res, result.rows, "success", "Get Detail Airline Success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Failed to get detail airline");
			});
	},

	// search airline
	findAirline: (req, res) => {
		const { limit, sortBy, sortOrd, airlineName } = req.body;
		const page = req.params.page;

		airlineModel
			.findAirline(limit, page, sortBy, sortOrd, airlineName)
			.then((result) => {
				success(res, result.rows, "success", "Find Airline Success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Failed to find airline");
			});
	},

	searchAirline: (req, res) => {
		const name = req.params.name;

		airlineModel
			.searchAirline(name)
			.then((result) => {
				success(res, result.rows, "success", "Find Airline Success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Failed to find airline");
			});
	},

	// insert airline
	addAirline: async(req, res) => {
		try {
			const { name } = req.body;
			const logo = req.file ? await cloudinary.uploader.upload(req.file.path) : {secure_url: "https://res.cloudinary.com/dmkviiqax/image/upload/v1670752757/default_okkzti.png", public_id: ""};

			const data = {
				name,
				logo: `${logo.secure_url}|&&|${logo.public_id}`,
			};

			airlineModel
				.addAirline(data)
				.then((result) => {
					success(res, result.rowCount, "success", "Insert Airline Success");
				})
				.catch((err) => {
					failed(res, err.message, "failed", "Failed to insert airline");
				});
		} catch (err) {
			console.error(err);
		}
	},

	// update airline
	updateAirline: (req, res) => {
		const id_airline = req.params.id;
		const { name } = req.body;

		airlineModel
			.updateAirline(id_airline, name)
			.then((result) => {
				success(res, result.rowCount, "success", "Update Airline Success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Failed to update airline");
			});
	},

	// update logo
	updateLogo: async(req, res) => {
		const id_airline = req.params.id;
		const logo = await cloudinary.uploader.upload(req.file.path);

		const data = {
			id_airline,
			logo: `${logo.secure_url}|&&|${logo.public_id}`,
		};

		airlineModel
			.updateLogo(data)
			.then((result) => {
				success(res, result.rowCount, "success", "Update Logo Success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Failed to update logo");
			});
	},

	// delete airline
	deleteAirline: (req, res) => {
		const id_airline = req.params.id;

		airlineModel
			.deleteAirline(id_airline)
			.then((result) => {
				success(res, result.rowCount, "success", "Delete airline Success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Failed to delete airline");
			});
	},
};

module.exports = airlineController;
