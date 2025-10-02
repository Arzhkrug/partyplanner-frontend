import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaScroll,
  FaHourglassHalf,
  FaBeer,
  FaMapMarkedAlt,
  FaDungeon,
} from "react-icons/fa";
import {
  GiBossKey,
  GiTwoCoins,
  GiCharacter,
  GiCrossedSwords,
  GiSwordsEmblem,
  GiDaggers,
  GiCrossedAxes,
  GiSpellBook,
  GiHolyHandGrenade,
  GiPlantsAndAnimals,
  GiPocketBow,
  GiMusicSpell,
} from "react-icons/gi";

const API_URL = import.meta.env.VITE_API_URL;

export default function EventDetail() {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const [event, setEvent] = useState(null);
  const [participantName, setParticipantName] = useState("");
  const [participantClass, setParticipantClass] = useState("");
  const [participantLevel, setParticipantLevel] = useState("");
  const [partyLoot, setPartyLoot] = useState("");

  // Charger les détails de la soirée
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/events/${id}`);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data = await res.json();
        console.log("Event récupéré:", data);
        setEvent(data);
      } catch (err) {
        console.error("Erreur fetch EventDetail:", err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p className="text-center">Chargement...</p>;

  // Rejoindre la soirée
  const handleJoin = async () => {
    const res = await fetch(`${API_URL}/events/${id}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: participantName,
        classe: participantClass,
        niveau: parseInt(participantLevel, 10),
      }),
    });
    const updated = await res.json();
    setEvent(updated);
    setParticipantName("");
    setParticipantClass("");
    setParticipantLevel("");
  };

  const handleLoot = async () => {
    const res = await fetch(`${API_URL}/events/${id}/loot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: partyLoot }),
    });
    const updated = await res.json();
    setEvent(updated);
    setPartyLoot("");
  };

  const isPast = new Date(event.date) < new Date();

  function classColor(classe) {
    switch (classe) {
      case "Guerrier":
        return "bg-red-200 text-red-800";
      case "Barbare":
        return "bg-red-200 text-red-800";
      case "Paladin":
        return "bg-red-200 text-red-800";
      case "Voleur":
        return "bg-gray-300 text-gray-800";
      case "Moine":
        return "bg-gray-300 text-gray-800";
      case "Artificier":
        return "bg-gray-200 text-gray-800";
      case "Magicien":
        return "bg-purple-200 text-purple-800";
      case "Ensorceleur":
        return "bg-purple-200 text-purple-800";
      case "Sorcier":
        return "bg-purple-200 text-purple-800";
      case "Prêtre":
        return "bg-yellow-200 text-yellow-800";
      case "Rôdeur":
        return "bg-gray-300 text-gray-800";
      case "Barde":
        return "bg-yellow-200 text-yellow-800";
      case "Druide":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  }

  function classIcon(classe) {
    switch (classe) {
      case "Guerrier":
        return <GiSwordsEmblem className="text-amber-700 mr-1" />;
      case "Barbare":
        return <GiCrossedAxes className="text-amber-700 mr-1" />;
      case "Paladin":
        return <GiSwordsEmblem className="text-amber-700 mr-1" />;
      case "Voleur":
        return <GiDaggers className="text-amber-700 mr-1" />;
      case "Moine":
        return <GiFist className="text-amber-700 mr-1" />;
      case "Artificier":
        return <GiAnvil className="text-amber-700 mr-1" />;
      case "Magicien":
        return <GiSpellBook className="text-amber-700 mr-1" />;
      case "Ensorceleur":
        return <GiSpellBook className="text-amber-700 mr-1" />;
      case "Sorcier":
        return <GiSpellBook className="text-amber-700 mr-1" />;
      case "Prêtre":
        return <GiHolyHandGrenade className="text-amber-700 mr-1" />;
      case "Rôdeur":
        return <GiPocketBow className="text-amber-700 mr-1" />;
      case "Barde":
        return <GiMusicSpell className="text-amber-700 mr-1" />;
      case "Druide":
        return <GiPlantsAndAnimals className="text-amber-700 mr-1" />;
      default:
        return <GiCharacter className="text-amber-700 mr-1" />;
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link
        to="/"
        className="text-amber-700 underline mb-4 inline-block hover:text-amber-50"
      >
        ← Retour au comptoir
      </Link>

      <div className="bg-[url('/parchment-texture.png')] bg-cover bg-no-repeat border-2 border-amber-800 rounded-xl  shadow-md shadow-amber-900/30 p-6 mb-4 hover:rotate-1">
        <h3 className="font-[UncialAntiqua] flex items-center text-3xl text-amber-900 drop-shadow-md">
          <FaScroll className="mx-2" /> {event.title}
        </h3>
        <p className="text-gray-700 italic mb-2">{event.description}</p>

        <div className="text-sm text-gray-600 gap-2">
          <FaHourglassHalf className="inline mr-2 text-amber-700" />
          {new Date(event.date).toLocaleString()}
        </div>

        <div className="text-sm text-gray-600 gap-2">
          <FaBeer className="inline mr-2 text-amber-700" />
          {event.location}
        </div>

        <p className="text-sm mt-2 text-gray-600 gap-2">
          <GiBossKey className="inline mr-2 text-amber-700" />
          Commanditaire : {event.organizerName}
        </p>
      </div>
      {/* Participants */}
      <h2 className="text-xl text-amber-700 font-semibold mb-2">
        Participants{" "}
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {event.participants.map((p, i) => (
          <span
            key={i}
            className={`${classColor(
              p.classe
            )} border border-green-700 px-3 py-1 rounded-full text-sm shadow-sm`}
          >
            {p.pseudo}
          </span>
        ))}
      </div>
      {!isPast && (
        <div className="flex gap-2 mb-6">
          <input
            className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
            placeholder="Nom"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
          />
          <select
            className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
            value={participantClass}
            onChange={(e) => setParticipantClass(e.target.value)}
          >
            <option value="">Classe</option>
            <option value="Artificier">Artificier</option>
            <option value="Barbare">Barbare</option>
            <option value="Barde">Barde</option>
            <option value="Druide">Druide</option>
            <option value="Ensorceleur">Ensorceleur</option>
            <option value="Guerrier">Guerrier</option>
            <option value="Voleur">Voleur</option>
            <option value="Magicien">Magicien</option>
            <option value="Moine">Moine</option>
            <option value="Paladin">Paladin</option>
            <option value="Prêtre">Prêtre</option>
            <option value="Rôdeur">Rôdeur</option>
            <option value="Sorcier">Sorcier</option>
          </select>
          <input
            type="number"
            className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
            placeholder="Niveau"
            value={participantLevel}
            onChange={(e) => setParticipantLevel(e.target.value)}
          />
          <button
            onClick={handleJoin}
            className="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg transition transform hover:scale-105 focus:outline-none"
          >
            Rejoindre <GiCrossedSwords className="mx-1" />
          </button>
        </div>
      )}
      {isPast && (
        <p className="text-amber-50 italic mb-4 flex items-center">
          <FaHourglassHalf className="inline mr-2" />
          Cette mission est terminée, il n'est plus possible de s'inscrire.
        </p>
      )}
      {/* Groupe */}
      <div className="bg-amber-50 border-2 border-amber-800 rounded-xl shadow-md shadow-amber-900/30 p-6 hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">Groupe inscrit</h2>
        <ul className="space-y-3 mb-4">
          {event.participants
            .slice()
            .sort((a, b) => (b.niveau || 1) - (a.niveau || 1))
            .map((p, i) => (
              <div
                key={i}
                className="flex items-center border-b border-stone-400 py-2"
              >
                {classIcon(p.classe)} {p.pseudo} — {p.classe} (niv. {p.niveau})
              </div>
            ))}
        </ul>
      </div>

      {/* Butin à inscrire après séance */}
      <div className="bg-amber-50 border-2 border-amber-800 rounded-xl shadow-md shadow-amber-900/30  p-6 mt-2 hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">Trésors rapportés</h2>
        <ul className="mb-4">
          {event.loot.map((item, i) => (
            <li key={i} className="border-b border-stone-400 py-1">
              <GiTwoCoins className="inline text-amber-700" /> {item}
            </li>
          ))}
        </ul>
        {!isPast && (
          <div className="flex gap-2 mb-6">
            <input
              className="w-full bg-amber-100 border border-amber-700 rounded-lg px-3 py-2 text-amber-900 placeholder-amber-700/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-lg mb-2"
              placeholder="Butin"
              value={partyLoot}
              onChange={(e) => setPartyLoot(e.target.value)}
            />
            <button
              onClick={handleLoot}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg transition transform hover:scale-105 focus:outline-none"
            >
              Inscrire le butin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
