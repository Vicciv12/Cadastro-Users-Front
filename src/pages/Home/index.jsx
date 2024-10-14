import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
    const [usuarios, setUsuarios] = useState([])

    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()

    async function getUsuarios(){
      const usuariosFromApi = await api.get('/users')

      setUsuarios(usuariosFromApi.data)
    }
    async function createUsuarios(){
     await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
     })   

     getUsuarios()
    }
    
    async function deleteUsuarios(id){
      await api.delete(`/users/${id}`)

      getUsuarios()

    }

    useEffect(() => {
      getUsuarios()
    }, [])
    

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName} />
        <input placeholder="Idade" name='idade' type='number' ref={inputAge} />
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail}/>
        <button type='button' onClick={createUsuarios}>Cadastrar</button>
      </form>

      {usuarios.map((usuarios) => (
        <div key={usuarios.id} className="card">
          <div>
            <p>Nome: <span>{usuarios.name}</span></p>
            <p>Idade: <span>{usuarios.age}</span></p>
            <p>Email: <span>{usuarios.email}</span></p>
          </div>
          <button onClick={() => deleteUsuarios(usuarios.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}


    </div>
  )
}

export default Home
