import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Card from "./Card";
import NewTask from "./newTask";

//create your first component
const Home = () => {

	const [users, setUsers] = useState([]) 
	const [newUser, setNewUser] = useState('')


	// si el fetch es metodo GET, no necesitamos el objeto de configuracion/opciones.
	// No se necesita, porque por DEFECTO fetch realiza GET


	useEffect(()=>{
		//fetch!!!! por promesas
		// den den mushi
		getUsers()
	},[]) // como el array de dependencias esta vacio, se ejecuta UNA vez al cargarse el componente
		

	const getUsers = () => {
		fetch('https://playground.4geeks.com/todo/users') // pedido
		.then(resp => { // recibe la respuesta del fetch
			if (!resp.ok) throw new Error('error en el pedido') // lanzamos un error si la respuesta tiene ok = false o no hay ok
			return resp.json() //la transforma a un objeto js
		}) 
		.then(data => setUsers(data.users)) // recibe la respuesta ya como  objeto js y es el que usamos
		.catch(err => console.log(err)) // si hay un error, lo manejamos
	}


	console.log(users)


	const handleChange = e => {
		setNewUser(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault() // para que no recargue la pagina
		//Aqui es donde va el fetch POST
		console.log('newUser value ', newUser)
		//fetch metodo post
		// const optionsObj = {
		// 	method: "POST", // metodo que va a usar el fetch
		// 	headers: { //configuracion del fetch
		// 		'Content-Type': 'application/json' // que "hablamos"/utilizamos JSON 
		// 	},
		// 	body: {} // objeto con la informacion que queremos añadir a la DB 
		// }
		fetch('https://playground.4geeks.com/todo/users/' + newUser, {
			method: "POST", // metodo que va a usar el fetch
			headers: { //configuracion del fetch
				'Content-Type': 'application/json' // que "hablamos"/utilizamos JSON 
			},
			body: {} // objeto con la informacion que queremos añadir a la DB 
		})
		.then(resp => { // recibe la respuesta del fetch
			if (!resp.ok) throw new Error('error en el pedido') // lanzamos un error si la respuesta tiene ok = false o no hay ok
			return resp.json() //la transforma a un objeto js
		})
		.then(data => {
			console.log(data) // {"name":"pepe_desde_app_prueba","id":22}
			// dos caminos 
			//1. agregar a la lista de usuarios que ya tengo este nuevo usuario
			//setUsers([...users, data]) // crea una copia y añade el usuario nuevo
			//2. realizar un nuevo pedido de todos los usuarios
			getUsers()
		})
		.catch(err => console.log(err))
	}


	const deleteUser = (username) => {
		fetch('https://playground.4geeks.com/todo/users/' + username, {
			method: "DELETE"
		})
		.catch(err => console.log(err))
	}





	return (
		<div className="text-center">
            
		<form onSubmit={handleSubmit} >
			<input type="text" value={newUser} onChange={handleChange} />
			<input type="submit" />
		</form>


			{users && users.map(el => <Card key={el.id} name={el.name} handleDelete={()=>deleteUser(el.name)}/> )}
		

		<NewTask />

		</div>
	);
};

export default Home;