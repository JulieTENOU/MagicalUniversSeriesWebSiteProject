const express = require("express");
const router = express.Router();
const { books } = require("../controllers");
const verifyToken = require("../middleware/index");

router.post("/createBook", books.create);

router.put("/api/updateBook/:ID_book", books.update);

router.get("/api/getOneBook", books.findOne);
router.get("/findAllBooks", books.findAll);
router.get("/getBySerie/:serie", books.getBooksBySerie);
router.get("/getByPath/:serie/:book", books.getBookByPath);
router.get("/getBySerieReadable/:serie", books.getBooksBySerieReadable);

module.exports = router;
