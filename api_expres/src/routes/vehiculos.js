const { Router } = require("express");
const router = Router();
//const _= require ('underscore');
const pool = require('../database.js'); 
const { result } = require("underscore");
console.log(pool);

router.get( '/', async (req, res ) => {
    var select = "SELECT * FROM vehiculos ";
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
    vehiculo = req.body;

    var insert = "INSERT INTO vehiculos (cliente_id,marca,modelo,año, numero_serie)";
    insert += " VALUES ( $1, $2, $3, $4, $5)";

    const iData =  await  pool.query( insert, [  vehiculo.cliente_id,vehiculo.marca,vehiculo.modelo,vehiculo.año,vehiculo.numero_serie] )   ;
    console.log(  iData );  
       res.json (
        {
            "msg"  : "Vehiculo Almacenada",
            "data" : vehiculo
        }
        );
});

router.get('/:id',  (req, res) =>{
    console.log("req.params.id -> ", req.params.id );
    var select = "SELECT * FROM vehiculos WHERE id = $1 ";
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
    vehiculo = req.body;
    var { cliente_id, marca, modelo, año, numero_serie }  = req.body;
    id = req.params.id

    var update = "UPDATE vehiculos " ;
    update += " SET cliente_id = $1, marca = $2 , modelo = $3, año = $4, numero_serie = $5";
    update += " WHERE id = $6 ";

    pool.query( update, [  cliente_id, marca, modelo, año, numero_serie, id ] )   ;
       res.json (
        {
            "msg"  : "vehiculo Actualizada",
            "data" : vehiculo,
            "id": id
        }
        );
    }


 ); 

 router.delete( '/:id', (req, res ) => {
    console.log( req.body );
    vehiculo = req.body;
    var { cliente_id, marca, modelo, año, numero_serie }  = req.body;
    id = req.params.id

    var _delete_ = "DELETE FROM vehiculos " ;
    _delete_ += " WHERE id = $1 ";

    pool.query( _delete_, [ id ] )   ;
       res.json (
        {
            "msg"  : "Vehiculo Borrado..",
            "data" : vehiculo,
            "id": id
        }
        );
    }
 ); 
 
module.exports = router;