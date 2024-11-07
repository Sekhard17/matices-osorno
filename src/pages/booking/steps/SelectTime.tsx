import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useTimeSlots } from '@/hooks/useTimeSlots';
import LoadingScreen from '@/components/LoadingScreen';
import toast from 'react-hot-toast';
import type { BookingData } from '../BookingPage';

interface SelectTimeProps {
  selectedTime?: string;
  onSelect: (time: string) => void;
  onBack: () => void;
  selectedDate?: Date;
  selectedCourt?: BookingData['court'];
}

const SelectTime: React.FC<SelectTimeProps> = ({
  selectedTime,
  onSelect,
  onBack,
  selectedDate,
  selectedCourt
}) => {
  const { timeSlots, isLoading, error } = useTimeSlots({
    selectedDate,
    selectedCourt
  });

  useEffect(() => {
    if (error) {
      toast.error('Error al cargar los horarios disponibles');
    }
  }, [error]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const formatTime = (time: string) => {
    return time.substring(0, 5); // "16:00:00" -> "16:00"
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Selecciona una Hora
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Elige el horario que prefieras
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {timeSlots.map((slot) => {
            const isSelected = selectedTime === slot.horaInicio;
            const isDisabled = !slot.disponible;

            return (
              <motion.button
                key={slot.horaInicio}
                whileHover={!isDisabled ? { scale: 1.05 } : undefined}
                whileTap={!isDisabled ? { scale: 0.95 } : undefined}
                onClick={() => !isDisabled && onSelect(slot.horaInicio)}
                disabled={isDisabled}
                className={`
                  relative p-4 rounded-xl flex flex-col items-center justify-center
                  transition-all duration-200
                  ${isSelected
                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-500 ring-offset-2'
                    : isDisabled
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-emerald-50 dark:hover:bg-emerald-900 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <FontAwesomeIcon 
                  icon={faClock} 
                  className={`text-xl mb-2 ${isSelected ? 'text-white' : 'text-emerald-500'}`}
                />
                <span className="font-semibold">
                  {formatTime(slot.horaInicio)}
                </span>
                
                {isDisabled && (
                  <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                    No disponible
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">No Disponible</span>
          </div>
        </div>
      </div>

      <div className="flex justify-start mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default SelectTime;