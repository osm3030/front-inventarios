import { axiosConfig } from "../configuration/axiosConfig"

/**
 * Obtiene todas las marcas de equipo
 */
const obtenerMarcas = (estado = true) => {
    return axiosConfig.get('marcas?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea marca
 */

const crearMarca = (data) => {
    return axiosConfig.post('marcas', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/**
 * Actualiza una marca por ID
 */
const editarMarcaPorID = (marcaId, data) => {
    return axiosConfig.put('marcas/'+marcaId, data,{
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra una marca por ID
 */
const borrarMarcaPorID = (marcaId) => {
    return axiosConfig.delete('marcas/'+marcaId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta una marca por ID
 */
const obtenerMarcaPorID = (marcaId) => {
    return axiosConfig.get('marcas/'+marcaId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerMarcas,
    crearMarca,
    editarMarcaPorID,
    borrarMarcaPorID,
    obtenerMarcaPorID
}