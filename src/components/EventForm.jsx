import { useState } from "react";
import { createEvent } from "../services/api";
import { FaScroll } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";

export default function EventForm({ onEventCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "Taverne de la Chèvre Ivrogne",
    organizerName: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = await createEvent(form);
    onEventCreated(newEvent);
    setForm({
      title: "",
      description: "",
      date: "",
      location: "",
      organizerName: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mb-4 bg-[url('/parchment-texture.png')] bg-cover bg-no-repeat  border-2  border-amber-800 rounded-xl shadow-md shadow-amber-900/30"
    >
      <h2 className="font-[UncialAntiqua] text-3xl text-center text-amber-900 mb-4 drop-shadow-md">
        <FaScroll className="inline mr-1" /> Appel aux aventuriers
      </h2>

      <input
        className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
        name="title"
        placeholder="Mission"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
        name="date"
        type="datetime-local"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
        name="location"
        placeholder="Lieu"
        value={form.location}
        onChange={handleChange}
      />
      <input
        className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
        name="organizerName"
        placeholder="Commanditaire"
        value={form.organizerName}
        onChange={handleChange}
        required
      />
      <div className="w-full flex justify-center mt-2">
        <button className="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg transition transform hover:scale-105">
          Publier la quête <GiCrossedSwords className="mx-1" />
        </button>
      </div>
    </form>
  );
}
