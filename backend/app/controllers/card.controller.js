const db = require("../models");
const Card = db.cards;



// const getPagination = (page, size) => {
//   const limit = size ? +size : 3;
//   const offset = page ? page * limit : 0;

//   return { limit, offset };
// };
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const card = new Card({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    username:req.body.username
  });

  // Save Tutorial in the database
  card
    .save(card)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Card."
      });
    });
};

// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const { page, size, title } = req.query;
//   var condition = title
//     ? { title: { $regex: new RegExp(title), $options: "i" } }
//     : {};

//   const { limit, offset } = getPagination(page, size);

//   Card.paginate(condition, { offset, limit })
//     .then((data) => {
//       res.send({
//         totalItems: data.totalDocs,
//         cards: data.docs,
//         totalPages: data.totalPages,
//         currentPage: data.page - 1,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving cards.",
//       });
//     });
// };

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Card.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
//Find all publlished  Tutorials
// exports.findAllPublished = (req, res) => {
//   const { page, size } = req.query;
//   const { limit, offset } = getPagination(page, size);

//   Card.paginate({ published: true }, { offset, limit })
//     .then((data) => {
//       res.send({
//         totalItems: data.totalDocs,
//         cards: data.docs,
//         totalPages: data.totalPages,
//         currentPage: data.page - 1,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Card.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Card with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Card with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Card.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Card with id=${id}. Maybe Card was not found!`
        });
      } else res.send({ message: "Card was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Card with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Card.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
        });
      } else {
        res.send({
          message: "Card was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Card with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Card.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Cards were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Cards."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Card.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cards."
      });
    });
};