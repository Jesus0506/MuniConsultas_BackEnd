const { Router } = require('express');
const router = Router();

var PrediosController= require('../controllers/index.controller');

router.get('/api/predios/detalles/:contrib/:anio', PrediosController.getPredioDetails);
router.get('/api/calcular/subtotal/:contrib/:anio',PrediosController.getTotales);
router.get('/api/predios/:contrib/:claveWeb', PrediosController.getAnios);
router.get('/api/calcular/:contrib/:claveWeb', PrediosController.getTotal);
router.get('/api/user/:contrib', PrediosController.getDatos);
router.get('/obtener/:nombre', PrediosController.get);





module.exports = router;