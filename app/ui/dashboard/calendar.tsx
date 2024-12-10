'use client';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'


export default function Calendar() {
  return (
    <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin ]}
      // contentHeight={'auto'}
      hiddenDays={[0]} // hides Sunday
      slotMinTime={'09:00:00'} // Start time
      slotMaxTime={'18:00:00'} // End time
      allDaySlot={false}
      contentHeight={'auto'}
      headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridSix,timeGridDay'
      }}
      views={{
          timeGridSix: {
          type: 'timeGrid',
          duration: { days: 7 },
          buttonText: 'week',
          dateAlignment: 'week', // Always start on monday
          }
      }}
      events={[
          { title: 'event 1', start: '2024-12-10T10:00', end: '2024-08-01T13:00'},
          { title: 'event 3', start: '2024-12-11T10:00', end: '2024-08-01T14:00' },

          { title: 'event 2', start: '2024-12-12T10:00' ,end: '2024-08-02T13:00' }
      ]}

  />
  )
}