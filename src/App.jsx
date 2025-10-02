import { useEffect, useState } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import { getEvents } from "./services/api";
import DeadList from "./components/DeadList";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const handleEventCreated = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const dead = [
    { pseudo: "Val Badguy", classe: "Guerrier", niveau: 5 },
    { pseudo: "Kenny", classe: "Magicienne", niveau: 3 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
        Le comptoir des Quêtes
      </h1>
      <EventForm onEventCreated={handleEventCreated} />
      <EventList events={events} />
      <DeadList dead={dead} />
    </div>
  );
}

export default App;
