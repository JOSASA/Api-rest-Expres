const { Router } = require("express");
const router = Router();
//const _= require ('underscore');
const pool = require('../database.js'); 
console.log(pool);

router.get( '/', async (req, res ) => {
    var select = "SELECT * FROM refacciones ";
    try {
        const data = await pool.query( select  );
        var dataSend = {};
        dataSend.data = data.rows;
		res.status(200).send({ "data" : dataSend.data});	
    }
    catch( err ){

        console.log("ERROR", err );
    }
});

router.post('/',  async (req, res) =>{
    console.log( req.body );
    refaccion = req.body;

    var insert = "INSERT INTO refacciones (nombre, marca, descripcion, cantidad)";
    insert += " VALUES ( $1, $2, $3, $4)";

    const iData =  await  pool.query( insert, [ refaccion.nombre, refaccion.marca, refaccion.descripcion, refaccion.cantidad] )   ;
    console.log(  iData );  
       res.json (
        {
            "msg"  : "Refaccion Almacenada",
            "data" : refaccion
        }
        );
});

router.get('/:id',  (req, res) =>{
    console.log("req.params.id -> ", req.params.id );
    var select = "SELECT * FROM refacciones WHERE id = $1 ";
    var parameters = [req.params.id];

   pool.query( select,parameters, (error, result) => {
        if (error ){
            res.status(400).json({"msg": error.message });
            return;
        }
        else {
            console.log( result );
            if (result.rows.length > 0) {
                res.json({
                    "msg": "Consulta efectuada",
                    "data": result.rows[0], // Asumiendo que solo hay un cliente con ese ID
                });
            } else {
                res.status(404).json({"msg": "Cliente no encontrado"});
            }
        }
        });
 }); 

 router.put( '/:id', (req, res ) => {
    console.log( req.body );
    refaccion = req.body;
    var { nombre, marca, descripcion, cantidad }  = req.body;
    id = req.params.id

    var update = "UPDATE refacciones " ;
    update += " SET nombre = $1, marca = $2 , descripcion = $3, cantidad = $4";
    update += " WHERE id = $5 ";

    pool.query( update, [ nombre, marca, descripcion, cantidad, id ] )   ;
       res.json (
        {
            "msg"  : "refaccion Actualizada",
            "data" : refaccion,
            "id": id
        }
        );
    }


 ); 

 router.delete( '/:id', (req, res ) => {
    console.log( req.body );
    refaccion = req.body;
    var { nombre, marca, descripcion, cantidad }  = req.body;
    id = req.params.id

    var _delete_ = "DELETE FROM refacciones " ;
    _delete_ += " WHERE id = $1 ";

    pool.query( _delete_, [ id ] )   ;
       res.json (
        {
            "msg"  : "Refaccion Borrado..",
            "data" : refaccion,
            "id": id
        }
        );
    }
 ); 
 
module.exports = router;