function getForm( _form_ ){
    console.log( _form_ );
    var url_form ;
    var area_trabajo = 'area_clientes';
    switch( _form_) {
        case 'CITA':{
            url_form = './form/cita.html';
            break;
        }
        case 'CLIENTE': {
            url_form ='./form/cliente.html';
            break;
        }
        case 'REFACCION' :{
            url_form = './form/refa.html';
            break;
        }
        case 'VEHICULO': {
            url_form = './form/vehiculo.html';
            break;
        }
        case 'CITAS': {
            url_form = './view/citas.html';
            area_trabajo = 'area_citas';
            break;
        }
        case 'CLIENTES': {
            url_form = './view/listaClientes.html';
            area_trabajo = 'area_clientes';
            break;
        }
        case 'REFACCIONES': {
            url_form = './view/listaRefacciones.html';
            area_trabajo = 'area_refacciones';
            break;
        }
        case 'VEHICULOS': {
            url_form = './view/vehiculos.html';
            area_trabajo = 'area_vehiculos';
            break;
        }
    }
    var _formulario_procesar_ = _form_;
    fetch(url_form)
    .then( response => response.text() )
    .then( form => {
            document.getElementById('area_trabajo').innerHTML = form;
            queryData( _formulario_procesar_, area_trabajo )
        }
    );
}
/**
 * Funcion encargada de procesar los formulario
 * @param {*} _formulario_ 
 */
function procesarFormulario( _btn_ ) {
    switch( _btn_.form.name  ){
        case "frm_cita": {
            guardaCita ( _btn_ );     
            break;
        }
        case "frm_cliente":{
            guardaCliente( _btn_ );
            break;
        }
        case "frm_vehiculo":{
            guardaVehiculo( _btn_ );
            break;
        }
        case "frm_refaccion":{
            guardaRefaccion( _btn_ );
            break;
        }
    }
}

/**
 * Funcion encargada de consulta informacion y presentarla
 * @param {*} _formulario_procesar_ 
 * @param {*} area_trabajo 
 */
function queryData( _formulario_procesar_, area_trabajo ) {
    console.log(  _formulario_procesar_, area_trabajo  )
 
    switch( _formulario_procesar_ ) {
        case 'CLIENTES': {
           getDataFromDB( _formulario_procesar_, area_trabajo )
           break;
        }
        

        case 'CITAS': {
            getDataFromDBCitas( _formulario_procesar_, area_trabajo )
           break;
        }

        case 'REFACCIONES': {
            getDataFromDBRefacciones( _formulario_procesar_, area_trabajo )
           break;
        }
        case 'VEHICULOS': {
            getDataFromDBVehiculos( _formulario_procesar_, area_trabajo )
           break;
        }

        case 'VEHICULO' : {
            
            if (document.getElementById("cliente_id")) {
                var objPersona = document.getElementById("cliente_id");
                if (clientes && clientes.length > 0) {
                    for (var cliente of clientes) {
                        var localOption = `<option value='${cliente.nombre}'>${cliente.nombre}</option>`;
                        objPersona.innerHTML += localOption;
                    }
                }
            }
            
        }

        case 'CITA' : {
            
            if (document.getElementById("vehiculo_id")) {
                var objPersona = document.getElementById("vehiculo_id");
                if (vehiculos && vehiculos.length > 0) {
                    for (var vehiculo of vehiculos) {
                        var localOption = `<option value='${vehiculo.modelo}'>${vehiculo.modelo}</option>`;
                        objPersona.innerHTML += localOption;
                    }
                }
            }
            if (document.getElementById("refaccion_id")) {
                var objPersona = document.getElementById("refaccion_id");
                if (refacciones && refacciones.length > 0) {
                    for (var refaccion of refacciones) {
                        var localOption = `<option value='${refaccion.nombre}'>${refaccion.nombre}</option>`;
                        objPersona.innerHTML += localOption;
                    }
                }
            }
        }
    }

}

///////////////////////
/**
 * Busqueda generica de personas usando el id
* @param {*} id 
* @returns 
*/
function buscarPersona( id ) {
   //debugger;
   var posicion = -1;
   if ( personas && personas.length > 0 ) {
       for ( var i = 0 ; i < personas.length; i++ ){
           if ( personas[i].id === id  ){
               posicion = i;
               break;    
           }
       }
   }
   return posicion;
}

/**
* Funcion de Edicion de un Cliente / persona
* @param {*} id 
* @returns 
*/
function editarPersona(id, form) {
    var cliente = {};
    var url_form = './form/';
    _form_ = form;
    _local_id = id;

    switch (_form_) {
        case 'CLIENTE': {
            url_form = url_form + 'Cliente.html';
            fetch(url_form)
                .then(response => response.text())
                .then(form => {
                    document.getElementById('area_trabajo').innerHTML = form;

                    const requestOptions = {
                        method: "GET",
                        redirect: "follow"
                    };

                    fetch(`http://127.0.0.1:3000/api/clientes/${_local_id}`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log("Datos recibidos del servidor:", result.data);

                            cliente = result.data;

                            setTimeout(() => {
                                console.log("Llenando el formulario con los datos del cliente...");
                                document.getElementById("id").value = cliente.id || '';
                                document.getElementById("nombre").value = cliente.nombre || '';
                                document.getElementById("telefono").value = cliente.telefono || '';
                                document.getElementById("email").value = cliente.email || '';
                                document.getElementById("accion").value = "A";       
                            }, 100); 
                        })
                        .catch(error => console.error('Error al obtener datos del cliente:', error));
                })
                .catch(error => console.error('Error al cargar el formulario:', error));
            break;
        }
        case 'VEHICULO': {
            url_form = url_form + 'vehiculo.html';
            fetch(url_form)
                .then(response => response.text())
                .then(form => {
                    document.getElementById('area_trabajo').innerHTML = form;

                    const requestOptions = {
                        method: "GET",
                        redirect: "follow"
                    };

                    fetch(`http://127.0.0.1:3000/api/vehiculos/${_local_id}`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log("Datos recibidos del servidor:", result.data);

                            vehiculo = result.data;

                            setTimeout(() => {
                                console.log("Llenando el formulario con los datos del cliente...");
                                document.getElementById("id").value = vehiculo.id || '';
                                document.getElementById("cliente_id").value = vehiculo.cliente_id || '';
                                document.getElementById("marca").value = vehiculo.marca || '';
                                document.getElementById("modelo").value = vehiculo.modelo || '';
                                document.getElementById("año").value = vehiculo.año || '';
                                document.getElementById("numero_serie").value = vehiculo.numero_serie || '';
                                document.getElementById("accion").value = "A";       
                            }, 100); 
                        })
                        .catch(error => console.error('Error al obtener datos del cliente:', error));
                })
                .catch(error => console.error('Error al cargar el formulario:', error));
            break;
        }
        case 'REFACCION': {
            url_form = url_form + 'refa.html';
            fetch(url_form)
                .then(response => response.text())
                .then(form => {
                    document.getElementById('area_trabajo').innerHTML = form;

                    const requestOptions = {
                        method: "GET",
                        redirect: "follow"
                    };

                    fetch(`http://127.0.0.1:3000/api/refacciones/${_local_id}`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log("Datos recibidos del servidor:", result.data);

                            refaccion = result.data;

                            setTimeout(() => {
                                console.log("Llenando el formulario con los datos del cliente...");
                                document.getElementById("id").value = refaccion.id || '';
                                document.getElementById("nombre").value = refaccion.nombre || '';
                                document.getElementById("marca").value = refaccion.marca || '';
                                document.getElementById("descripcion").value = refaccion.descripcion || '';
                                document.getElementById("cantidad").value = refaccion.cantidad || '';
                                document.getElementById("accion").value = "A";       
                            }, 100); 
                        })
                        .catch(error => console.error('Error al obtener datos del cliente:', error));
                })
                .catch(error => console.error('Error al cargar el formulario:', error));
            break;
        }
    }
}



/**
* 
* @param {*} id 
* @returns 
*/
function borrarPersona(id) {

   if ( confirm(`Seguro desea borrar el registro\n${id}`)   ){
       // personas.splice(posicion,1);
       borrarPersonaDB(id)
       
   }
}
function borrarVehiculo(id) {

    if ( confirm(`Seguro desea borrar el registro\n${id}`)   ){
        // personas.splice(posicion,1);
        borrarVehiculoDB(id)
        
    }
 }

 function borrarRefaccion(id) {

    if ( confirm(`Seguro desea borrar el registro\n${id}`)   ){
        // personas.splice(posicion,1);
        borrarRefaccionDB(id)
        
    }
 }

 function borrarCita(id) {

    if ( confirm(`Seguro desea borrar el registro\n${id}`)   ){
        // personas.splice(posicion,1);
        borrarCitaDB(id)
        
    }
 }
/**
* Funcion que almacena los datos del vehiculo
*/
function guardaVehiculo(_btn_) {
    console.log( _btn_.form.elements  ); 
    var elementosFormulario = _btn_.form.elements;
    var vehiculo = {};

    // Iterar sobre los elementos del formulario y construir el objeto vehiculo
    for (var i = 0; i < elementosFormulario.length; i++) {
        console.log(elementosFormulario[i].name, elementosFormulario[i].value); 
        if (elementosFormulario[i].nodeName === 'INPUT' || elementosFormulario[i].nodeName === 'SELECT') {
           
            switch (elementosFormulario[i].name) {
                case 'id': {
                    vehiculo.id = elementosFormulario[i].value;
                    break;
                } 
                case 'cliente_id': {
                    vehiculo.cliente_id = elementosFormulario[i].value;
                    break;
                }
                case 'marca': {
                    vehiculo.marca = elementosFormulario[i].value;
                    break;
                }
                case 'modelo': {
                    vehiculo.modelo = elementosFormulario[i].value;
                    break;
                }
                case 'año': {
                    vehiculo.año = elementosFormulario[i].value;
                    break;
                }
                case 'numero_serie': {
                    vehiculo.numero_serie = elementosFormulario[i].value;
                    break;
                }
                case 'accion': {
                    vehiculo.accion = elementosFormulario[i].value;
                    break;
                }
            }
        }
    }

    console.log(JSON.stringify(vehiculo)); 

    guardaVehiculoDB(vehiculo);
}
function guardaCita(_btn_) {
    console.log( _btn_.form.elements  ); 
    var elementosFormulario = _btn_.form.elements;
    var cita = {};

    // Iterar sobre los elementos del formulario y construir el objeto vehiculo
    for (var i = 0; i < elementosFormulario.length; i++) {
        console.log(elementosFormulario[i].name, elementosFormulario[i].value); 
        if (elementosFormulario[i].nodeName === 'INPUT' || elementosFormulario[i].nodeName === 'SELECT') {
           
            switch (elementosFormulario[i].name) {
                case 'id': {
                    cita.id = elementosFormulario[i].value;
                    break;
                } 
                case 'vehiculo': {
                    cita.vehiculo = elementosFormulario[i].value;
                    break;
                }
                case 'refaccion': {
                    cita.refaccion = elementosFormulario[i].value;
                    break;
                }
                case 'fecha': {
                    cita.fecha = elementosFormulario[i].value;
                    break;
                }
                case 'tipo_mantenimiento': {
                    cita.tipo_mantenimiento = elementosFormulario[i].value;
                    break;
                }
                case 'descripcion': {
                    cita.descripcion = elementosFormulario[i].value;
                    break;
                }
                case 'accion': {
                    cita.accion = elementosFormulario[i].value;
                    break;
                }
            }
        }
    }

    console.log(JSON.stringify(cita)); 

    guardaCitaDB(cita);
}

/**
* Funcion que almacena los datos del cliente
*/
function guardaCliente(_btn_) {
    // Obtener los elementos del formulario
    var elementosFormulario = _btn_.form.elements;
    var cliente = {};

    // Iterar sobre los elementos del formulario y construir el objeto cliente
    for (var i = 0; i < elementosFormulario.length; i++) {
        if (elementosFormulario[i].nodeName === 'INPUT') {
            switch (elementosFormulario[i].name) {
                case 'id': {
                    cliente.id = elementosFormulario[i].value;
                    break;
                } 
                case 'nombre':
                    cliente.nombre = elementosFormulario[i].value;
                    break;
                case 'telefono':
                    cliente.telefono = elementosFormulario[i].value;
                    break;
                case 'email':
                    cliente.email = elementosFormulario[i].value;
                    break;
                    case 'accion': {
                        cliente.accion = elementosFormulario[i].value;
                        break;
                    }        
            }
        }
    }

    console.log(JSON.stringify(cliente)); 

    guardaClienteDB(cliente);
}

function guardaRefaccion(_btn_) {
    // Obtener los elementos del formulario
    var elementosFormulario = _btn_.form.elements;
    var refaccion = {};

    // Iterar sobre los elementos del formulario y construir el objeto cliente
    for (var i = 0; i < elementosFormulario.length; i++) {
        if (elementosFormulario[i].nodeName === 'INPUT') {
            switch (elementosFormulario[i].name) {
                case 'id': {
                    refaccion.id = elementosFormulario[i].value;
                    break;
                } 
                case 'nombre':
                    refaccion.nombre = elementosFormulario[i].value;
                    break;
                case 'marca':
                    refaccion.marca = elementosFormulario[i].value;
                    break;
                case 'descripcion':
                    refaccion.descripcion = elementosFormulario[i].value;
                    break;
                case 'cantidad':
                        refaccion.cantidad = elementosFormulario[i].value;
                break;
                case 'accion': {
                        refaccion.accion = elementosFormulario[i].value;
                break;
                    }        
            }
        }
    }

    console.log(JSON.stringify(refaccion)); 

    guardaRefaccionDB(refaccion);
}
/**
* 
* @param {*} _btn 
*/


function mostrarLista( _btn_  ) {

   switch( _btn_.form.name ) {
       case "frm_cliente":{
           var _formulario_procesar_ = 'CLIENTES';
           url_form = './view/Clientes.html'
           fetch(url_form)
           .then( response => response.text() )
           .then( form => {
                   var area_trabajo = 'area_clientes';
                   document.getElementById('area_trabajo').innerHTML = form;
                   queryData( _formulario_procesar_, area_trabajo )
               }
           );
           break;
       }
       case "frm_cita":{
           var _formulario_procesar_ = 'CITAS';
           url_form = './view/citas.html'
           fetch(url_form)
           .then( response => response.text() )
           .then( form => {
                   var area_trabajo = 'area_citas';
                   document.getElementById('area_trabajo').innerHTML = form;
                   queryData( _formulario_procesar_, area_trabajo )
               }
           );

       }
   }


}

function dibujarTablaClientes( _form_, _area_trabajo_, clientes){
   if ( clientes && clientes.length > 0 ) {
       for ( var i = 0 ; i < clientes.length; i++ ){
                        var fila =  `<tr><td>${clientes[i].id}</td>
                                           <td>${clientes[i].nombre}</td>
                                           <td>${clientes[i].telefono}</td>
                                           <td>${clientes[i].email}</td>
                                           <td>
                                           <button name="editar" onclick="editarPersona('${clientes[i].id}' , 'CLIENTE')" type="button" >Editar</button>
                                           &nbsp;
                                           <button name="borrar" onclick="borrarPersona('${clientes[i].id}')" type="button" >Borrar</button>                                                    
                                           </td>
                                       <tr>`;
           //document.getElementById(area_trabajo).appendChild(fila);    
           document.getElementById(_area_trabajo_).innerHTML += fila;
      }
   }
}

function dibujarTablaVehiculos( _form_, _area_trabajo_, vehiculos){
    if ( vehiculos && vehiculos.length > 0 ) {
        for ( var i = 0 ; i < vehiculos.length; i++ ){
                         var fila =  `<tr><td>${vehiculos[i].id}</td>
                                            <td>${vehiculos[i].cliente_id}</td>
                                            <td>${vehiculos[i].marca}</td>
                                            <td>${vehiculos[i].modelo}</td>
                                            <td>${vehiculos[i].año}</td>
                                            <td>${vehiculos[i].numero_serie}</td>
                                            <td>
                                            <button name="editar" onclick="editarPersona('${vehiculos[i].id}' , 'VEHICULO')" type="button" >Editar</button>
                                            &nbsp;
                                            <button name="borrar" onclick="borrarVehiculo('${vehiculos[i].id}')" type="button" >Borrar</button>                                                    
                                            </td>
                                        <tr>`;
            //document.getElementById(area_trabajo).appendChild(fila);    
            document.getElementById(_area_trabajo_).innerHTML += fila;
       }
    }
 }

 function dibujarTablaRefacciones( _form_, _area_trabajo_, refacciones){
    if ( refacciones && refacciones.length > 0 ) {
        for ( var i = 0 ; i < refacciones.length; i++ ){
                         var fila =  `<tr><td>${refacciones[i].id}</td>
                                            <td>${refacciones[i].nombre}</td>
                                            <td>${refacciones[i].marca}</td>
                                            <td>${refacciones[i].descripcion}</td>
                                            <td>${refacciones[i].cantidad}</td>
                                            <td>
                                            <button name="editar" onclick="editarPersona('${refacciones[i].id}' , 'REFACCION')" type="button" >Editar</button>
                                            &nbsp;
                                            <button name="borrar" onclick="borrarRefaccion('${refacciones[i].id}')" type="button" >Borrar</button>                                                    
                                            </td>
                                        </tr>`;
            //document.getElementById(area_trabajo).appendChild(fila);    
            document.getElementById(_area_trabajo_).innerHTML += fila;
       }
    }
 }

 function dibujarTablaCitas( _form_, _area_trabajo_, citas){
    if ( citas && citas.length > 0 ) {
        for ( var i = 0 ; i < citas.length; i++ ){
                         var fila =  `<tr><td>${citas[i].id}</td>
                                            <td>${citas[i].vehiculo_id}</td>
                                            <td>${citas[i].refaccion_id}</td>
                                            <td>${citas[i].fecha ? citas[i].fecha : 'N/A'}</td>
                                            <td>${citas[i].tipo_mantenimiento}</td>
                                            <td>${citas[i].descripcion}</td>
                                            <td>
                                            <button name="editar" onclick="editarPersona('${citas[i].id}' , 'CITA')" type="button" >Editar</button>
                                            &nbsp;
                                            <button name="borrar" onclick="borrarCita('${citas[i].id}')" type="button" >Borrar</button>                                                    
                                            </td>
                                        </tr>`;
            //document.getElementById(area_trabajo).appendChild(fila);    
            document.getElementById(_area_trabajo_).innerHTML += fila;
       }
    }
 }