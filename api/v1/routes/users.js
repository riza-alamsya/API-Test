var express = require('express');
const {registerUser,getUserById} = require("../controller/UsersController");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', registerUser);

router.get('/:userId', getUserById);


module.exports = router;
