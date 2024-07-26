const tipo_mantenimiento = ["mantenimiento", "reparación"];

var clientes = [];

var cliente = {
    id: "",
    nombre: "",
    telefono: "",
    email: ""
};

var vehiculos = [];
var vehiculo = {
    id: "",
    cliente_id: "",
    marca: "",
    modelo: "",
    año: "",
    numero_serie: ""
};

var refacciones = [];
var refaccion = {
    id: "",
    nombre: "",
    marca: "",
    descripcion: "",
    cantidad: ""
};

var citas = [];
var cita = {
    id: "",
    vehiculo_id: "",
    refaccion_id: "",
    fecha: "",
    tipo_mantenimiento: "",
    descripcion: ""
};
