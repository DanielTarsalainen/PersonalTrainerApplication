import React from 'react';
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


function TrainCalendar() {

  const localizer = momentLocalizer(moment);
  const [trainings, setTrainings] = useState([]);


  useEffect(() => {
    fetchTrainings();
    console.log(events)
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.log(err))
  }
  
  // Used BigCalendar to generate cool looking calendar. 
  // Below I had to map through trainings and name them according to the BigCalendar rules.
  // Startdate had to be an Date object, so I had to create new Date Object
  // End-date was derived from the Startdate object.

  const events = trainings.map((training) => {
    return {
      id: training.id,
      title: training.activity + " | " + training.customer.firstname + " " + training.customer.lastname,
      start: new Date(training.date),
      end: moment(training.date).add(training.duration, 'minutes').toDate(),
      allDay: false
    }
  })

  return (
    <div style={{
      marginTop: "11vh"
    }}>
      <h1>Calendar</h1>
      <br></br><br></br><br></br><br></br>

      <Calendar
        localizer={localizer}
        events={events}
        allDayAccessor='allDay'
        titleAccessor='title'
        resourceAccessor='resource'
        startAccessor='start'
        showMultiDayTimes
        endAccessor='end'
        onView={() => { }}
        style={{ height: 500 }}
      />
    </div>
  );
}

export default TrainCalendar;
