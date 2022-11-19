import React from 'react'
import { useState } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed,faCar,faPlane,faTaxi,faPerson,faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // this css is for calender
import 'react-date-range/dist/theme/default.css'; 
import {format}  from "date-fns"
import { useNavigate } from 'react-router-dom'

const Header = ({type}) => {
  const[destination,setDestination]=useState("")
  const[opendate,setOpenDate]=useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const[openOption,setOpenOption]=useState(false)
  const[options,setOptions]=useState(
    {
      adult:1,
      children:0,
      room:1
    }
  )

  const navigate=useNavigate()
  const handleOption=(name1,operation)=>
  {
    setOptions(prev=>{
      return{
        ...prev,[name1]:operation==="i"? options[name1]+1 :options[name1]-1,
      }
    })
  }

  const handleSearch=()=>
  {
      navigate("/hotels",{state:{destination,date,options}})
  }
  return (
    <div className='header'>
      <div className={type==="list" ? "headerContainer listMode":"headerContainer"}>
      <div className="headerList">
            <div className="headerListitem active">
            <FontAwesomeIcon icon={faBed}/>
            <span>Stays</span>
            </div>
            <div className="headerListitem">
            <FontAwesomeIcon icon={faPlane}/>
            <span>Flights</span>
            </div>
            <div className="headerListitem">
            <FontAwesomeIcon icon={faCar}/>
            <span>Car rentals</span>
            </div>
            <div className="headerListitem">
            <FontAwesomeIcon icon={faBed}/>
            <span>Attractions</span>
            </div>
            <div className="headerListitem">
            <FontAwesomeIcon icon={faTaxi}/>
            <span>Airport taxis</span>
            </div>
        </div>
        { type !=="list" &&
        <>
        <h1 className='headerTitle'>A lifetime of discounts? It's Genius</h1>
        <p className="headerDesc">Get rewarded for your travels unlock instant
        savings of more with a free LamaBooking account</p>
        <button className='headerBtn'>Sign in/Register</button>
        <div className="headerSearch">
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className="headerIcon"/>
        <input type="text" placeholder='Where are you going' className='headerSearchInput' onChange={e=>setDestination(e.target.value)}/>
        </div>

        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
        <span  onClick={()=>setOpenDate(!opendate)}className='headerSearchText'>{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].startDate,"MM/dd/yyyy")}`}</span>
        { opendate &&<DateRange
        editableDateInputs={true}
        onChange={item => setDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={date}
        className="date"
        minDate={new Date()}
        />}
        </div>

        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
        <span  onClick={()=>setOpenOption(!openOption)}className='headerSearchText'>{`${options.adult}adult . ${options.children} children .${options.room} room`}</span>
       { openOption &&<div className="options">
        <div className="optionItem">
          <span className="optionText">Adult</span>
          <div className="optionCounter">
          <button  
          disabled={options.adult<=1}
          className="optionCounterButton" 
          onClick={()=>handleOption("adult","d")}>-</button>
          <span className='optionCounterNumber'>{options.adult}</span>
          <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
          </div>
         </div>

        <div className="optionItem">
          <span className="optionText">Children</span>
          <div className="optionCounter">
          <button 
          disabled={options.children<=1}
          className="optionCounterButton" 
          onClick={()=>handleOption("children","d")}>-</button>
          <span className='optionCounterNumber'>{options.children}</span>
          <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
          </div>
        </div>

        <div className="optionItem">
          <span className="optionText">Room</span>
          <div className="optionCounter">
          <button
          disabled={options.room<=1}
           className="optionCounterButton" 
           onClick={()=>handleOption("room","d")}>-</button>
          <span className='optionCounterNumber'>{options.room}</span>
          <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
          </div>
        </div>
  
       </div>
         }
        </div>

        <div className="headerSearchItem">
          <button className='headerBtn' onClick={handleSearch}>Search</button>
        </div>
        
        </div>
              </>
              }
         </div>
     </div>
     
  );
}

export default Header
