import './App.css'
import { useRef, useState } from "react"
import { nanoid } from "nanoid"

function App() {

  const serviceField = useRef(null)
  const priceField = useRef(null)

  const [list, setList] = useState([])

  const priceList = list.map(item => {
    return(
      <li key={nanoid()}>
        {item.service} {item.price}
        <button onClick={() => edit(item.id)}>✎</button>
        <button onClick={() => del(item.id)}>✖</button>
      </li>
    )
  })

  function edit(id){
    const editService = list.find(item => item.id === id)
    serviceField.current.value = editService.service
    priceField.current.value = editService.price
    setList(prevList => prevList.filter(item => item.id !== id))
  }

  function del(id){
    setList(prevList => prevList.filter(item => item.id !== id))
  }

  function save(){
    const service = serviceField.current.value
    const price = priceField.current.value
    if (!service || !price) return null
    setList(prevList => [...prevList, {id: list.length, service: service, price: price}])
    cancel()
  }

  function cancel() {
    serviceField.current.value = ""
    priceField.current.value = ""
    serviceField.current.focus()
  }

  return (
    <div className="App">
      <input className="service" type="text" placeholder='service' ref={serviceField}></input>
      <input className="price" type="number" placeholder='price' ref={priceField}></input>
      <button onClick={save}>Save</button>
      <button onClick={cancel}>Cancel</button>
      <ul>
        {priceList}
      </ul>
    </div>
  )
}
export default App;
