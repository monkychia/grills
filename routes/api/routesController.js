const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/"
router
  .route("/")
  //.get(booksController.findAll)
  .post(booksController.createGrill)
  .get(function(req,res) {
    res.send('blah blah blah');
  })

router.route("/searchGrills").post(booksController.find);

// Matches with "/api/detail/:id"
router
  .route("/detail/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

router.route("/signup").post(booksController.createUser);

router.route("/login").post(booksController.loginUser);

router.route("/sms").post(booksController.sms);

router.route("/email").post(booksController.email);

module.exports = router;


//ACCOUNT SID
// AC2a9ce7bea93d1059cca6ebae39e88035
// AUTH TOKEN
// 3a3a241c23959675c524b48257e98295