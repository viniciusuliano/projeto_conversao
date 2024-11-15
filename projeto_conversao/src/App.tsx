import './App.css'
import { useState } from 'react'
import api from './api'

function App() {

  const [moeda, setMoeda] = useState('')
  const [moedaCompra, setMoedaCompra] = useState('')
  const [responseData, setResponse] = useState(0)
  const [targeCode, setTargetCode] = useState('')

 async function handleConvertation(): Promise<void> {
  try{
    const response = await api.get(`/pair/${moeda}/${moedaCompra}`)
    console.log(response)
    setResponse(response.data.conversion_rate)
    setTargetCode(response.data.target_code)
  }    
  catch(error){
    console.log('Error:', error)  
    }
  }

  return (
    <section className='container'>
       <div className='container-filha'>
        <h1 className='container-title'>Insira a moeda que deseja trocar</h1>
          <input className='input-moeda' type='text' placeholder='Digite a moeda que deseja converter...' onChange={element => setMoeda(element.target.value)}/>
          <input className='input-moeda' type='text' placeholder='Digite a moeda que quer comprar...' onChange={element => setMoedaCompra(element.target.value)}/>
          <button className='btn-converter' onClick={handleConvertation}>Converter</button>
       </div>
      {!responseData ? <div className='container-filha resultado'>
        <p className='loading'>Taxa de conversão</p>
      </div> : (
        <div className='container-filha resultado'>
            <h1 className='container-title resultado'>Taxa de conversão</h1>
            <p className='conversao'>{targeCode} - {parseFloat(responseData.toFixed(2))}</p>
        </div>
      )}
    </section>
  )
}

export default App
