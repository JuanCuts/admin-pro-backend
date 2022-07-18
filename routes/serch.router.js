/*
    Ruta: api/searches/
*/

const { Router } = require('express');
const { getAllSerch, getSerchCollection } = require('../controllers/serch.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/:text', [validateJWT], getAllSerch);
router.get('/collection/:table/:text', [validateJWT], getSerchCollection);


module.exports = router;