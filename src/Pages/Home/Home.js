import React from 'react'
import "./Home.css"
import axios from "axios"
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  useEffect(() => {
    getalldata()
  }, [])

  const [data, setdata] = useState([])
  const [source, setsource] = useState("")
  const [goplace, setgoplace] = useState("")
  const [date, setdate] = useState("")


  const getalldata = async() => {
    var response = await axios.get(`http://localhost:5000/flight/get`).then((res) => { return res.data})
    setdata(response)
  }

  const searchandler = async() => {
    var refdata = {
      from : source
    }
    var refilter = await axios.post(`http://localhost:5000/flight/spe`,refdata).then((res) => { return res.data})
    var goplacefilter = refilter.filter((data) => data.to === goplace) 
    console.log(goplacefilter)
    console.log(date)
    var datefilter = goplacefilter.filter((data) => data.date === date) 
    setdata(datefilter)
   
  }
  
  return (
    <div>
      <h1 className='heading'>Get your Flight</h1>
      <div className='searchbar'>
      <input placeholder='enter your Source' value={source} onChange={(e) => {setsource(e.target.value)}} />
       <input placeholder='enter your Destination' value={goplace} onChange={(e) => {setgoplace(e.target.value)}} />
       <input type="date"  value={date} onChange={(e) => {setdate(e.target.value)}} />
       <button className='bnt btn-danger' onClick={searchandler}>Search Flights</button>
      </div>

      <div className='container'>
    {
      data.length != 0 ? 
       data.map((item,index) => {
        return (
        
     
          <div className='cards' key={index}>
          <div className='time'>
            <p>Name : <span>{item.name}</span></p>
            <p>Company : <span>{item.company}</span></p>
            </div>
            <div className='time'>
            <p>From : <span>{item.from}</span></p>
            <p>TO : <span>{item.to}</span></p>
            </div>
       
            <div className='time'>
            <p>Source Time : <span>{item.fromtime}</span></p>
            <p>Departure Time : <span>{item.totime}</span></p>
            </div>
    
            <div className='time'>
            <p>Price : <span>{item.price}</span></p>
            <p> Date : <span>{item.date}</span></p>
            </div>
           <div>
     
            <Link to={{ pathname: `/book/${item._id}` }}
            style={{ color : "white", textDecoration:"none" }}>

<button className='btn btn-primary refbutton'>Book Now</button>
            </Link>
           
            </div>
    
          </div>
        
        )
       }) 
      : 

      <h1 className='heading'>No flights</h1>
    }
     </div>
    
    </div>
  )
}

export default Home