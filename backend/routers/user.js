const { getMenu, getRestaurants } = require('../controllers/user');

const Router = require('express').Router
const router = Router()


router.get("/menu", getMenu);
router.get("/restaurants", getRestaurants);

module.exports = router