const express = require('express');
const ctrl = require('../controllers/tools.controller');

const router = express.Router();

router.get('/', ctrl.listTools);
router.get('/featured', ctrl.getFeatured);
router.get('/categories', ctrl.getCategories);
router.get('/:slug', ctrl.getBySlug);

module.exports = router;
