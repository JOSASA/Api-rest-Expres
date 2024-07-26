const { Router } = require("express");
const router = Router();
//const _= require ('underscore');
const pool = require('../database.js'); 
console.log(pool);

router.get( '/', async (req, res ) => {
    var select = "SELECT * FROM citas ";
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
    cita = req.body;

    var insert = "INSERT INTO citas (vehiculo_id, refaccion_id, fecha, tipo_mantenimiento, descripcion)";
    insert += " VALUES ( $1, $2, $3, $4, $5)";

    const iData =  await  pool.query( insert, [ cita.cita_id, cita.refaccion_id, cita.fecha, cita.tipo_mantenimiento, cita.descripcion] )   ;
    console.log(  iData );  
       res.json (
        {
            "msg"  : "cita Almacenado",
            "data" : cita
        }
        );
});

router.get('/:id',  (req, result) =>{
    console.log("req.params.id -> ", req.params.id );
    var select = "SELECT * FROM citas WHERE id = $1 ";
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
    cita = req.body;
    let { vehiculo_id, refaccion_id, fecha,tipo_mantenimiento,descripcion }  = req.body;
    id = req.params.id

    var update = "UPDATE citas " ;
    update += " SET vehiculo_id = $1, refaccion_id = $2 , fecha = $3,tipo_mantenimiento = $4, descripcion=$5" ;
    update += " WHERE id = $6 ";

    pool.query( update, [ vehiculo_id, refaccion_id, fecha, tipo_mantenimiento,descripcion ] )   ;
       res.json (
        {
            "msg"  : "cita Actualizada",
            "data" : cita,
            "id": id
        }
        );
    }


 ); 

 router.delete( '/:id', (req, res ) => {
    console.log( req.body );
    cita = req.body;
    var { vehiculo_id, refaccion_id, fecha,tipo_mantenimiento,descripcion }  = req.body;
    id = req.params.id

    var _delete_ = "DELETE FROM citas " ;
    _delete_ += " WHERE id = $1 ";

    pool.query( _delete_, [ id ] )   ;
       res.json (
        {
            "msg"  : "Cita Borrado..",
            "data" : cita,
            "id": id
        }

        );
    }
 ); 
 
module.exports = router;