const express = require('express');
const router = express.Router();
const { books } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createBook", books.create);
router.get("/api/getOneBook", books.findOne);
router.get("/findAllBooks", books.findAll);
router.get("/getBySerie/:serie", books.getBooksBySerie);
router.put("/api/updateBook/:ID_book", books.update);
router.get("/getByPath/:serie/:book", books.getBookByPath);

module.exports = router;