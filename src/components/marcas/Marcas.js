import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { borrarMarcaPorID, crearMarca, editarMarcaPorID, obtenerMarcas } from '../../services/MarcaService'
import HeaderTable from '../ui/HeaderTable'
import Modal from '../ui/Modal'

export default function Marcas() {
  const [marcas, setMarcas] = useState([])
  const [loading, setLoading] = useState([])
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [marca, setMarca] = useState({
    nombre: '',
    estado: true
  })
  const [errorSend, setErrorSend] = useState({
    status: false,
    msg: ''
  })

  const listMarcas = async () => {
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerMarcas(query)
      setMarcas(data)
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }
  
  useEffect(() => {
    listMarcas();
  }, [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  const guardarMarca = async () => {
    setErrorSend({status: false, msg: ''})
    setLoading(true)
    try{
      const res = await crearMarca(marca)
      console.log(res)
      setLoading(true)
      setMarca({nombre: ''})
      listMarcas()
    }catch(e){
      const {status, data} = e.response;
      setErrorSend({status: true, msg: data.msg})
      console.log(e)
      setLoading(false)
    }
  }
  
  const handleChange = e => {
    setMarca({
      ...marca,
      [e.target.name]: e.target.value
    })
  }
  const borrarMarca = async (e) => {
    setLoading(true)
    try{
      setError(false)
      const id = e.target.id
      console.log(id)
      const res = await borrarMarcaPorID(id)
      console.log(res)
      listMarcas();
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  const editarMarca = async (e)=> {
    e.preventDefault()
    setLoading(true)
    try{
      setError(false)
      const resp = await editarMarcaPorID(marca._id, marca);
      console.log(resp)
      resetMarca()
      listMarcas()
    }catch(e){
    setLoading(false)
    console.log(e)
    setError(true)
    }
  }

  const setMarcaPorId = (e) => {
    console.log(e.target.id)
    const marcasFilter = marcas.filter(t => t._id == e.target.id);
    const marc = marcasFilter[0];
    console.log(marca)
    setMarca(marc)
  }


  const resetMarca =() => {
    setMarca({
      nombre: '',
      estado: true
    })
  }

  return (
      <div>
        <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModal2Label" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModal2Label">Editar Marca</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                  onClick={resetMarca}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editarMarca}>
                  <div className="mb-3">
                    <label for="recipient-name" className="col-form-label">Nombre:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="recipient-name"
                      onChange={handleChange}
                      value={marca.nombre}
                      name="nombre"
                    />
                    <select 
                      class="form-select" 
                      aria-label="Default select example"
                      name="estado"
                      value={marca.estado}
                      onChange={handleChange}
                    >
                      <option value={false}>Inactivo</option>
                      <option value={true}>Activo</option>
                    </select>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal"
                    onClick={resetMarca}
                  >
                    Cerrar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={marca.nombre.length <= 0}
                    data-bs-dismiss="modal"
                  >
                    Enviar
                  </button>
                </form>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
        <Modal 
          titulo={'Marca'}
          guardar={guardarMarca}
          element={marca}
          change={handleChange}
        />
        <button 
          type="button" 
          className="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
        >
          Nuevo
        </button>
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            role="switch" 
            id="flexSwitchCheckChecked" 
            checked={query}
            onChange={cambiarSwitche}
          />
          <label className="form-check-label" hmtlFor="flexSwitchCheckChecked">( Inactivo / Activo )</label>
        </div>
        {
          loading && 
          (<div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          </div>)
        }
        {errorSend.status && (
        <div className="alert alert-danger" role="alert">
          {errorSend.msg}
          </div>)
        }
        {
        error && (
        <div className="alert alert-danger" role="alert">
          Error al cargar datos
          </div>)
        }
        <table className="table">
        <HeaderTable />
        <tbody>
          {
            marca.map((marca,index) => {
              return (
              <tr key={marca._id}>
                <th scope="row">{index + 1}</th>
                <td>{marca.nombre}</td>
                <td>{marca.estado ? 'Activo': 'Inactivo'}</td>
                <td>{dayjs(marca.fechaCreacion).format('YYYY-MM-DD')}</td>
                <td>{dayjs(marca.fechaActualizacion).format('YYYY-MM-DD')}</td>
                <td>
                  <button 
                    id={marca._id}
                    type="button" 
                    className="btn btn-success"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal2"
                    onClick={setMarcaPorId}
                  >
                    Editar
                  </button>
                  <button 
                    id={marca._id}
                    type="button" 
                    className="btn btn-danger"
                    onClick={borrarMarca}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
              )
            })
          }
        </tbody>
        </table>
      </div>
  )
}
