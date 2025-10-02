import { GiCrossedSwords, GiDeathSkull, GiCandleSkull } from "react-icons/gi";
import { useEffect, useState } from "react";

export default function DeadList() {
  const [dead, setDead] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ pseudo: "", classe: "", niveau: "" });
  const API_URL = import.meta.env.VITE_API_URL;

  // Charger les morts depuis API
  useEffect(() => {
    fetch(`${API_URL}/dead`)
      .then((res) => res.json())
      .then((data) => setDead(data));
  }, []);

  // Ajouter un mort
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/dead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newDead = await res.json();
    setDead((prev) => [...prev, newDead]);
    setForm({ pseudo: "", classe: "", niveau: "" });
    setShowModal(false);
  };

  return (
    <>
      {/* Encadré flottant */}
      <div
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 w-64 bg-stone-900/90 text-red-200 border-2 border-red-800 rounded-lg shadow-2xl p-3 font-serif cursor-pointer hover:scale-105 transition "
      >
        <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center justify-center">
          <GiDeathSkull className=" mr-2" /> Âmes perdues
        </h3>
        <ul className="space-y-1 text-sm max-h-40 overflow-y-auto">
          {dead.map((d, i) => (
            <li key={i} className="flex items-center justify-center">
              <GiCrossedSwords className="mr-1" /> {d.pseudo} ({d.classe} niv.{" "}
              {d.niveau})
            </li>
          ))}
        </ul>
        <p className="text-xs italic text-red-500 mt-2 text-center">
          Buvez un coup en leur mémoire !{" "}
        </p>
      </div>

      {/* Modale */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-stone-900 border-2 border-red-800 rounded-xl shadow-2xl p-6 w-96 text-red-200">
            <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center">
              Ajouter une âme <GiDeathSkull className=" ml-2" />
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className="w-full bg-stone-800 border border-red-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Pseudo"
                value={form.pseudo}
                onChange={(e) => setForm({ ...form, pseudo: e.target.value })}
                required
              />
              <input
                className="w-full bg-stone-800 border border-red-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Classe"
                value={form.classe}
                onChange={(e) => setForm({ ...form, classe: e.target.value })}
                required
              />
              <input
                className="w-full bg-stone-800 border border-red-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Niveau"
                type="number"
                value={form.niveau}
                onChange={(e) => setForm({ ...form, niveau: e.target.value })}
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 font-semibold flex items-center"
                >
                  Ajouter <GiDeathSkull className=" ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
