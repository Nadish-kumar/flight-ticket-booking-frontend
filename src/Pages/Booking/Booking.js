import React from 'react'
import "./Booking.css"
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useEffect,useState } from 'react'
import flight from "../../assests/flight.png"
const Booking = () => {
    const params =  useParams();
    const [data, setdata] = useState([])
    const [count, setcount] = useState(0)
    
    
    useEffect(() => {
    getalldata()  
    }, [])

    const getalldata = async() => {
        var values = {
            _id : params.flightid
        }
        console.log(values)
        var response = await axios.post(`https://flight-ticketapp.herokuapp.com/flight/spe`,values).then((res) => { return res.data})
        setdata(response)
    }
    
   

    const bookinghandler = async() => {
      var id = sessionStorage.getItem("id")
      var mail = sessionStorage.getItem("email")
     
   
      var tickets =[]
      for(let i =1; i<=count; i++){
        let r = (Math.random() + 1).toString(36).substring(7);
        tickets.push(r)
      }


      console.log(tickets)
     var values = {
      count : count,
     ticket  : tickets,
      amount : data[0].price * count,
      userid : id,
      email : mail
     }
     console.log(values)
      try {
       var response = await axios.post(`https://flight-ticketapp.herokuapp.com/ticket/post`,values).then((res) => { return res.data}) 
       console.log(response[0].ticket)
       alert(`your ticket is booked , total amount is ${response[0].amount}`)
      } catch (error) {
        console.log(error)
      }

    }

  return (
    <div className='callback'>
        <div className='paper'>
<img className='flight' src={flight} alt="flight" />
{
  data.map((item,index) => {
    return (
<div>


<div className='time-ref'>
            <p>Name : <span>{item.name}</span></p>
            <p>Company : <span>{item.company}</span></p>
            </div>
            <div className='time-ref'>
            <p>From : <span>{item.from}</span></p>
            <p>TO : <span>{item.to}</span></p>
            </div>
            <div className='time-ref'>
            <p>Source Time : <span>{item.fromtime}</span></p>
            <p>Departure Time : <span>{item.totime}</span></p>
            </div>
            <div className='time-ref'>
            <p>Price : <span>{item.price}</span></p>
            <p> Date : <span>{item.date}</span></p>
            </div>
            <div className='time-ref'> 
              
              <input type="number" placeholder='Enter No of Tickets' value={count} onChange={(e) => { setcount(e.target.value)}} />
            
            </div>
            <div className='refbutton'>
            <button className='btn btn-primary refbutton' onClick={bookinghandler}>Book Now</button>
            </div>
            </div>
    )
  })
}

        </div>
    </div>
  )
}

export default Booking