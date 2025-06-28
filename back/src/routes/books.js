const express = require('express');
const router = express.Router();
const { books } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createBook", books.create);
router.get("/api/getOneBook", books.findOne);
router.get("/findAllBooks", books.findAll);
router.put("/api/updateBook/:ID_book", books.update);
module.exports = router;