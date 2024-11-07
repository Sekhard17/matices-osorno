import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCheck } from '@fortawesome/free-solid-svg-icons';

interface Court {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  players: string;
  features: string[];
}

interface SelectCourtProps {
  selectedCourt?: Court;
  onSelect: (court: Court) => void;
  onNext: () => void;
}

const SelectCourt: React.FC<SelectCourtProps> = ({
  selectedCourt,
  onSelect,
  onNext
}) => {
  const courts: Court[] = [
    {
      id: '1',
      name: 'Cancha Baby Fútbol',
      type: 'Baby Fútbol',
      price: 20000,
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80',
      players: '5 VS 5',
      features: [
        'Césped sintético profesional',
        'Iluminación LED',
        'Mallas protectoras',
        'Vestuarios equipados'
      ]
    },
    {
      id: '2',
      name: 'Cancha Futbolito',
      type: 'Futbolito',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&q=80',
      players: '7 VS 7',
      features: [
        'Césped sintético de alta calidad',
        'Sistema de drenaje',
        'Arcos reglamentarios',
        'Vestuarios premium'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Selecciona tu Cancha
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Elige la cancha que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {courts.map((court) => (
          <motion.div
            key={court.id}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer
              ${selectedCourt?.id === court.id 
                ? 'ring-2 ring-emerald-500' 
                : 'hover:shadow-xl'
              }`}
            onClick={() => onSelect(court)}
          >
            {/* Selected indicator */}
            {selectedCourt?.id === court.id && (
              <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-white p-2 rounded-full">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            )}

            <div className="relative h-48">
              <img
                src={court.image}
                alt={court.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                ${court.price.toLocaleString('es-CL')}/hr
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {court.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{court.type}</p>
                </div>
                <div className="flex items-center space-x-1 text-emerald-500">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>{court.players}</span>
                </div>
              </div>

              <ul className="space-y-2">
                {court.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          disabled={!selectedCourt}
          className={`px-8 py-3 rounded-lg font-semibold text-white
            ${selectedCourt
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SelectCourt;