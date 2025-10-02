import { Link } from "react-router-dom";
import { FaHourglassHalf, FaBeer } from "react-icons/fa";
import { GiCharacter } from "react-icons/gi";
export default function EventList({ events }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-amber-700 mb-4 ">
        Toutes les missions
      </h2>
      {events.map((event) => (
        <Link key={event._id} to={`/event/${event._id}`}>
          <div className="bg-amber-50 border-2 border-amber-800 rounded-xl shadow-md shadow-amber-900/30 p-6 mt-2 hover:scale-105">
            <h3 className="font-[UncialAntiqua] text-3xl text-amber-900 drop-shadow-md">
              {event.title}
            </h3>
            <p className="flex items-center text-sm text-gray-600 mt-2 mb-2">
              <FaHourglassHalf className="mr-1" />{" "}
              {new Date(event.date).toLocaleString()}{" "}
              <FaBeer className="ml-2 mr-1" /> {event.location}
            </p>
            <p className="flex items-center text-sm italic text-gray-500">
              {event.participants.map(() => (
                <GiCharacter className="mr-1" />
              ))}
              {event.participants?.length || 0} aventurier(s)
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
