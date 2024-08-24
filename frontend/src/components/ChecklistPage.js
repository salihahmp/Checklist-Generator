import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Checklist(props) {
    const { checklistCode} = useParams()
    const initialState = {
        name: "admin",
        take_a_shower: true,
        eat_breakfast: true,
        go_to_school: true,
        play_games: true,
        go_to_bed_early: true,
        isUser: true,
        
  }
  const [checklistData, setCheckListData] = useState(initialState) 

  useEffect(() => {
    fetch("/api/get-checklist" + "?code=" + checklistCode )
      .then(res => res.json())
      .then(data => {
        setCheckListData({
          checklistData, 
          name: data.name,
          take_a_shower: data.take_a_shower,
          eat_breakfast: data.eat_breakfast,
          go_to_school: data.go_to_school,
          play_games: data.play_games,
          go_to_bed_early: data.go_to_bed_early,
          isUser:data.is_sser
        })
      })
  },[checklistCode,setCheckListData]) //It renders when the object changes .If we use roomData and/or roomCode then it rerenders infinite times
  
  return (
    <div>
      <h3>{checklistData.name}</h3>
      <p>Take A Shower: {checklistData.take_a_shower.toString()}</p>  
      <p>Eat Breakfast: {checklistData.eat_breakfast.toString()}</p>
      <p>Go To School: {checklistData.go_to_school.toString()}</p>  
      <p>Play Games: {checklistData.play_games.toString()}</p>  
      <p>Go To Bed Early: {checklistData.go_to_bed_early.toString()}</p>
    </div>
  )
}

export default Checklist