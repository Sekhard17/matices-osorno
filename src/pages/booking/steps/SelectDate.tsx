import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface SelectDateProps {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  onNext: () => void;
  onBack: () => void;
}

const SelectDate: React.FC<SelectDateProps> = ({
  selectedDate,
  onSelect,
  onNext,
  onBack
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat('es-CL', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatDay = (date: Date) => {
    return new Intl.DateTimeFormat('es-CL', {
      weekday: 'short'
    }).format(date);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Selecciona una Fecha
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Elige el día que deseas jugar
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600 dark:text-gray-300" />
          </button>
          
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
            {formatMonth(currentMonth)}
          </h3>
          
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} />;
            }

            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isDisabled = isDateDisabled(date);

            return (
              <motion.button
                key={date.toISOString()}
                whileHover={!isDisabled ? { scale: 1.1 } : undefined}
                whileTap={!isDisabled ? { scale: 0.95 } : undefined}
                onClick={() => !isDisabled && onSelect(date)}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-lg flex flex-col items-center justify-center
                  transition-colors text-sm
                  ${isSelected
                    ? 'bg-emerald-500 text-white'
                    : isDisabled
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-emerald-50 dark:hover:bg-emerald-900 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <span className="text-xs mb-1">{formatDay(date)}</span>
                <span className="font-semibold">{date.getDate()}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Volver
        </button>
        
        <button
          onClick={onNext}
          disabled={!selectedDate}
          className={`px-8 py-3 rounded-lg font-semibold text-white
            ${selectedDate
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

export default SelectDate;