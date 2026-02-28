const express = require('express');
const router = express.Router();
const { book_parts } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createPart", book_parts.create);
router.get("/api/getOnePart", book_parts.findOne);
router.get("/findAllParts", book_parts.findAll);
router.get("/getByBook/:bookId", book_parts.getByBook);
router.put("/api/updatePart/:ID_part", book_parts.update);
module.exports = router;