import { useState } from "react"

const NewTask = () => {

    const [task, setTask] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        // formatear datos || mapear los datos
        const formData = {
            label: task,
            is_done: false
        }
        // let text = JSON.stringify(formData)
        // console.log(formData)
        // console.log(typeof text)
        // console.log(typeof formData)
        // text= JSON.parse(text)
        // console.log(typeof text)
        
        

        // estoy poniendo "harcodeado" a pepe, no es dinamico ahora mismo
        fetch('https://playground.4geeks.com/todo/todos/pepe', {
			method: "POST", // metodo que va a usar el fetch
			headers: { //configuracion del fetch
				'Content-Type': 'application/json' // que "hablamos"/utilizamos JSON 
			},
			body: JSON.stringify(formData) // objeto con la informacion que queremos añadir a la DB 
		})
		.then(resp => { // recibe la respuesta del fetch
			if (!resp.ok) throw new Error('error en el pedido') // lanzamos un error si la respuesta tiene ok = false o no hay ok
			return resp.json() //la transforma a un objeto js
		})
		.then(data => {
			console.log(data) // 
			
		})
		.catch(err => console.log(err))


    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={task} onChange={e => setTask(e.target.value)} />
            <input type="submit" />
        </form>
    )
}

export default NewTask