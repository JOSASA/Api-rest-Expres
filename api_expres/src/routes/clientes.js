const { Router } = require("express");
const router = Router();
//const _= require ('underscore');
const pool = require('../database.js'); 
console.log(pool);

module.exports = router;
router.get( '/', async (req, res ) => {
    var select = "SELECT * FROM clientes ";
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
    cliente = req.body;

    var insert = "INSERT INTO clientes (nombre, telefono, email)";
    insert += " VALUES ( $1, $2, $3)";

    const iData =  await  pool.query( insert, [ cliente.nombre, cliente.telefono, cliente.email] )   ;
    console.log(  iData );  
       res.json (
        {
            "msg"  : "Persona Almacenada",
          //  "data" : persona
        }
        );
});

router.get('/:id', (req, res) => {
    console.log("req.params.id -> ", req.params.id);
    var select = "SELECT * FROM clientes WHERE id = $1";
    var parameters = [req.params.id];

    pool.query(select, parameters, (error, result) => {
        if (error) {
            res.status(400).json({"msg": error.message});
            return;
        } else {
            console.log(result);

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
    cliente = req.body;
    var { nombre, telefono, email }  = req.body;
    id = req.params.id

    var update = "UPDATE clientes " ;
    update += " SET nombre = $1, telefono = $2 , email = $3";
    update += " WHERE id = $4 ";

    pool.query( update, [ nombre, telefono, email, id ] )   ;
       res.json (
        {
            "msg"  : "Cliente Actualizada",
            "data" : cliente,
            "id": id
        }
        );
    }


 ); 

 router.delete( '/:id', (req, res ) => {
    console.log( req.body );
    cliente = req.body;
    var { nombre, telefono, email }  = req.body;
    id = req.params.id

    var _delete_ = "DELETE FROM clientes " ;
    _delete_ += " WHERE id = $1 ";

    pool.query( _delete_, [ id ] )   ;
       res.json (
        {
            "msg"  : "Cliente Borrado..",
            "data" : cliente,
            "id": id
        }
        );
    }
 ); 
 