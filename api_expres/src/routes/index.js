const { Router } = require('express');
const router = Router();

router.get( '/', (req, res ) => {
    console.log( req.headers  );
        res.json (
            {
             "msg":"Aplicación en Línea!!!",  
            }
        );
    }
);

module.exports = router;
