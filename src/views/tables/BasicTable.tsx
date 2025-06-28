import React from 'react';
// import '.src/App.css';
import 'src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useState, useEffect } from 'react';


type Vendedor = {
  idVendedor: number | string;
  numDocVendedor: string;
  nombreVendedor: string;
  Estado?: boolean | number;
};

function App() {

/*const baseUrl = "https://7e00-190-107-182-178.ngrok-free.app/Vendedor"; /*COLOCAR API*/
/*const baseUrl = "http://5963-190-107-182-178.ngrok-free.app/Vendedor";*/ /* API VIERNES */
const baseUrl = "https://b38b-38-25-17-121.ngrok-free.app/Vendedor"; /* API SÁBADO */
//const baseUrl = "https://localhost:7002/Vendedor";
const [data, setData] = useState<Vendedor[]>([]);
const [modalInsertar, setModalInsertar] = useState(false);
const [modalEditar, setModalEditar] = useState(false); 
const [gestorSeleccion, setGestorSeleccion] = useState<Vendedor>({
    idVendedor: '',
    numDocVendedor: '',
    nombreVendedor: ''
});

interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const handleChange = (e: HandleChangeEvent): void => {
  const { name, value } = e.target;
  setGestorSeleccion({
    ...gestorSeleccion,
    [name]: value
  });
  console.log(gestorSeleccion);
}

const abrirCerrarModalInsertar = () => {
  setModalInsertar(!modalInsertar);
};

const abrirCerrarModalEditar = () => {
  setModalEditar(!modalEditar);
};

const peticionGet=async()=>{
  await axios.get(baseUrl)
    .then(response => {
      setData(response.data as Vendedor[]); // Asignar los datos obtenidos a la variable de estado
    }).catch(error => {
      console.error("Error al obtener los datos:", error);
    })
};

/*const peticionPost = async () => {
  delete gestorSeleccion.idVendedor; // Asegurarse de que no se envíe el ID_Vendedor al crear un nuevo registro
  //gestorSeleccion.numDocVendedor = String(gestorSeleccion.numDocVendedor); // Asegurarse de que sea un número
  await axios.post(baseUrl, gestorSeleccion)
    .then(response => {
      setData(data.concat(response.data)); // Agregar el nuevo registro a la lista
      abrirCerrarModalInsertar(); // Cerrar el modal después de insertar
    }).catch(error => {
      console.error("Error al insertar el registro:", error);
    })
};

const peticionPut = async () => {
  gestorSeleccion.idVendedor = parseInt(gestorSeleccion.idVendedor); // Asegurarse de que sea un númer
  await axios.put(baseUrl+"/"+gestorSeleccion.idVendedor, gestorSeleccion)
  .then(response => {
    var respuesta = response.data;
    var dataAuxiliar = data;
    dataAuxiliar.map(vendedor => {
      if(vendedor.idVendedor === gestorSeleccion.idVendedor){
        vendedor.numDocVendedor = respuesta.numDocVendedor;
        vendedor.nombreVendedor = respuesta.nombreVendedor;
      }
    })
    abrirCerrarModalEditar(); // Cerrar el modal después de editar
  }).catch(error => {
    console.error("Error al editar el registro:", error);
  })
}*/

/*interface SeleccionarGestorProps {
  vendedor: Vendedor;
  caso: string;
}*/

const seleccionarGestor = (vendedor: Vendedor, caso: string): void => {
  setGestorSeleccion(vendedor);
  (caso === "Editar") &&
    abrirCerrarModalEditar();
};

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div className="App">
      <br />
      <h1>TABLA VENDEDORES</h1>
      <button onClick={()=>abrirCerrarModalInsertar()} className='btn btn-success'>Insertar Nuevo Vendedor</button>
      <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>N° Documento</th>
            <th>Nombre</th>
            <th>Activo</th>
            <th>Acciones</th>            
          </tr>
        </thead>
        <tbody>
          {data.map(vendedor=>(
            <tr key={vendedor?.idVendedor ?? `${vendedor.numDocVendedor}-${Math.random()}`}>
             <td>{vendedor.idVendedor}</td>
             <td>{vendedor.numDocVendedor}</td>
             <td>{vendedor.nombreVendedor}</td>
             <td>{vendedor.Estado ? "0" : "1"}</td>
             <td>
                <button className="btn btn-primary" onClick={()=>seleccionarGestor(vendedor, "Editar")}>Editar</button> {" "}
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>  
      </table>

      {/* Modal para insertar un nuevo gestor de base de datos */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Gestor de Base de Datos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            {/* <label>ID: </label>
            <br />
            <input type="text" className="form-control" name='idVendedor' onChange={handleChange}/>
            <br /> */}
            <label>N° Documento: </label>
            <br />
            <input type="text" className="form-control" name='numDocVendedor' onChange={handleChange}/>
            <br />
            <label>Nombre Vendedor: </label>
            <br />
            <input type="text" className="form-control" name='nombreVendedor' onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          {/* <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button> */}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* Modal para editar un gestor de base de datos */}
      <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Gestor de Base de Datos</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label>ID: </label>
              <br />
              <input type="text" className='form-control' name='idVendedor' readOnly value={gestorSeleccion && gestorSeleccion.idVendedor}/>
              <br />
              <label>N° Documento: </label>
              <br />
              <input type="text" className='form-control' name="numDocVendedor" onChange={handleChange} value={gestorSeleccion && gestorSeleccion.numDocVendedor}/>
              <br />
              <label>Nombre Vendedor: </label>
              <br />
              <input type="text" className='form-control' name='nombreVendedor' onChange={handleChange} value={gestorSeleccion && gestorSeleccion.nombreVendedor}/>
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <button className='btn btn-primary' onClick={()=>peticionPut()}>Editar</button>{" "} */}
            <button className='btn btn-danger' onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
          </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
