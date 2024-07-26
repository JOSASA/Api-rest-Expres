
 /////////
 /////LISTO
/**
 * Almacena los datos de cliente
 * @param {*} cliente 
 */

function guardaClienteDB ( cliente ) {
    var { accion, id } = cliente;
   

   const myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

   const raw = JSON.stringify( cliente );
   const requestOptions = {
    method: ( accion === 'I' ? "POST" : "PUT" ), // **
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(`http://127.0.0.1:3000/api/clientes/${accion === 'I' ? "" : id}`, requestOptions) //**
    .then( (response) => response.text() )
    .then((result) => {
                console.log("Fin inicio Guardado!!");
                console.log(result)
                // inicializar el vector
                // getDataFromDB( 'CLIENTE' );
                getForm( 'CLIENTE' )
            })
    .catch((error) => console.error( error ));
 }
 
 function guardaVehiculoDB ( vehiculo ) {
    var { accion, id } = vehiculo;
   

   const myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

   const raw = JSON.stringify( vehiculo );
   const requestOptions = {
    method: ( accion === 'I' ? "POST" : "PUT" ), // **
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(`http://127.0.0.1:3000/api/vehiculos/${accion === 'I' ? "" : id}`, requestOptions) //**
    .then( (response) => response.text() )
    .then((result) => {
                console.log("Fin inicio Guardado!!");
                console.log(result)
                // inicializar el vector
                // getDataFromDB( 'CLIENTE' );
                getForm( 'VEHICULO' )
            })
    .catch((error) => console.error( error ));


 
 }
  
 function guardaRefaccionDB ( cliente ) {
    var { accion, id } = cliente;
   

   const myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

   const raw = JSON.stringify( cliente );
   const requestOptions = {
    method: ( accion === 'I' ? "POST" : "PUT" ), // **
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(`http://127.0.0.1:3000/api/refacciones/${accion === 'I' ? "" : id}`, requestOptions) //**
    .then( (response) => response.text() )
    .then((result) => {
                console.log("Fin inicio Guardado!!");
                console.log(result)
                // inicializar el vector
                // getDataFromDB( 'CLIENTE' );
                getForm( 'REFACCIONES' )
            })
    .catch((error) => console.error( error ));
 }

 function guardaCitaDB ( cita ) {
    var { accion, id } = cita;
   

   const myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

   const raw = JSON.stringify( cita );
   const requestOptions = {
    method: ( accion === 'I' ? "POST" : "PUT" ), // **
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(`http://127.0.0.1:3000/api/citas/${accion === 'I' ? "" : id}`, requestOptions) //**
    .then( (response) => response.text() )
    .then((result) => {
                console.log("Fin inicio Guardado!!");
                console.log(result)
                // inicializar el vector
                // getDataFromDB( 'CLIENTE' );
                getForm( 'CITAS' )
            })
    .catch((error) => console.error( error ));
 }
/**
 * Consulta la lista de datos desde la base de datos
 */
function getDataFromDB( _form_, _area_trabajo_ ){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    local_form = _form_;
    local_area_trabajo = _area_trabajo_

    fetch("http://localhost:3000/api/clientes/", requestOptions)
    .then( ( response ) =>  response.json()  )
    .then((result) => {
                console.log(result.data);
                clientes = result.data; 
                // inicializar el vector
                // mustra la lista de registros una vez insertado o modificado 
                // mostrarLista( local_btn_   );
                dibujarTablaClientes( local_form, local_area_trabajo, clientes )
            })
    .catch((error) => console.error( error ));

}
/**
 * Consulta la lista de datos desde la base de datos
 */
function getDataFromDBVehiculos( _form_, _area_trabajo_ ){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    local_form = _form_;
    local_area_trabajo = _area_trabajo_

    fetch("http://localhost:3000/api/vehiculos/", requestOptions)
    .then( ( response ) =>  response.json()  )
    .then((result) => {
                console.log(result.data);
                clientes = result.data; 
                // inicializar el vector
                // mustra la lista de registros una vez insertado o modificado 
                // mostrarLista( local_btn_   );
                dibujarTablaVehiculos( local_form, local_area_trabajo, clientes )
            })
    .catch((error) => console.error( error ));

}
function getDataFromDBCitas( _form_, _area_trabajo_ ){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    local_form = _form_;
    local_area_trabajo = _area_trabajo_

    fetch("http://localhost:3000/api/citas/", requestOptions)
    .then( ( response ) =>  response.json()  )
    .then((result) => {
                console.log(result.data);
                citas = result.data; 
                
                dibujarTablaCitas( local_form, local_area_trabajo, citas )
            })
    .catch((error) => console.error( error ));

}
function getDataFromDBRefacciones( _form_, _area_trabajo_ ){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    local_form = _form_;
    local_area_trabajo = _area_trabajo_

    fetch("http://localhost:3000/api/refacciones/", requestOptions)
    .then( ( response ) =>  response.json()  )
    .then((result) => {
                console.log(result.data);
                clientes = result.data; 
                // inicializar el vector
                // mustra la lista de registros una vez insertado o modificado 
                // mostrarLista( local_btn_   );
                dibujarTablaRefacciones( local_form, local_area_trabajo, clientes )
            })
    .catch((error) => console.error( error ));

}
/**
 * Elimina un cliente 
 * @param {id_cliente} id 
 */
function borrarPersonaDB ( id ) {
   
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    const requestOptions = {
     method: "DELETE", // **
     headers: myHeaders,
     redirect: "follow"
     };
 
     fetch(`http://localhost:3000/api/clientes/${id}`, requestOptions) //**
     .then( (response) => response.text() )
     .then((result) => {
                 console.log("Fin Eliminación del registro!!");
                 console.log(result)
                 // inicializar el vector
                 // getDataFromDB( 'CLIENTE' );
                 getForm( 'CLIENTES' )
             })
     .catch((error) => console.error( error ));
  
 }

 function borrarVehiculoDB ( id ) {
   
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    const requestOptions = {
     method: "DELETE", // **
     headers: myHeaders,
     redirect: "follow"
     };
 
     fetch(`http://localhost:3000/api/vehiculos/${id}`, requestOptions) //**
     .then( (response) => response.text() )
     .then((result) => {
                 console.log("Fin Eliminación del registro!!");
                 console.log(result)
                 // inicializar el vector
                 // getDataFromDB( 'CLIENTE' );
                 getForm( 'VEHICULOS' )
             })
     .catch((error) => console.error( error ));
  
 }

 function borrarRefaccionDB ( id ) {
   
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    const requestOptions = {
     method: "DELETE", // **
     headers: myHeaders,
     redirect: "follow"
     };
 
     fetch(`http://localhost:3000/api/refacciones/${id}`, requestOptions) //**
     .then( (response) => response.text() )
     .then((result) => {
                 console.log("Fin Eliminación del registro!!");
                 console.log(result)
                 // inicializar el vector
                 // getDataFromDB( 'CLIENTE' );
                 getForm( 'REFACCIONES' )
             })
     .catch((error) => console.error( error ));
  
 }

 function borrarCitaDB ( id ) {
   
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    const requestOptions = {
     method: "DELETE", // **
     headers: myHeaders,
     redirect: "follow"
     };
 
     fetch(`http://localhost:3000/api/citas/${id}`, requestOptions) //**
     .then( (response) => response.text() )
     .then((result) => {
                 console.log("Fin Eliminación del registro!!");
                 console.log(result)
                 // inicializar el vector
                 // getDataFromDB( 'CLIENTE' );
                 getForm( 'CITAS' )
             })
     .catch((error) => console.error( error ));
  
 }



 