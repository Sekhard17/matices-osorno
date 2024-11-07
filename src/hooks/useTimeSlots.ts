import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { generateTimeSlots, isTimeSlotPast } from '@/utils/timeSlots';
import type { TimeSlot } from '@/utils/timeSlots';
import type { BookingData } from '@/pages/booking/BookingPage';

interface UseTimeSlotsProps {
  selectedDate?: Date;
  selectedCourt?: BookingData['court'];
}

export function useTimeSlots({ selectedDate, selectedCourt }: UseTimeSlotsProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!selectedDate || !selectedCourt) return [];

    const formattedDate = selectedDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('reservas')
      .select('hora_inicio, hora_fin')
      .eq('fecha', formattedDate)
      .eq('id_cancha', selectedCourt.id)
      .eq('estado', 'confirmada');

    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }

    return data || [];
  }, [selectedDate, selectedCourt]);

  const updateTimeSlots = useCallback(async () => {
    if (!selectedDate || !selectedCourt) return;

    setIsLoading(true);
    setError(null);

    try {
      // Generar slots base
      let slots = generateTimeSlots();

      // Marcar slots pasados como no disponibles
      if (selectedDate.toDateString() === new Date().toDateString()) {
        slots = slots.map(slot => ({
          ...slot,
          disponible: !isTimeSlotPast(selectedDate, slot.horaInicio)
        }));
      }

      // Obtener reservas y marcar slots ocupados
      const bookings = await fetchBookings();
      slots = slots.map(slot => ({
        ...slot,
        disponible: slot.disponible && !bookings.some(
          booking => 
            booking.hora_inicio === slot.horaInicio &&
            booking.hora_fin === slot.horaFin
        )
      }));

      setTimeSlots(slots);
    } catch (err) {
      console.error('Error updating time slots:', err);
      setError('Error al cargar los horarios disponibles');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, selectedCourt, fetchBookings]);

  useEffect(() => {
    if (!selectedDate || !selectedCourt) return;

    const formattedDate = selectedDate.toISOString().split('T')[0];

    // Carga inicial
    updateTimeSlots();

    // Suscripción a cambios en tiempo real
    const channel = supabase
      .channel('reservas_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reservas',
          filter: `fecha=eq.${formattedDate}&id_cancha=eq.${selectedCourt.id}`
        },
        () => {
          updateTimeSlots();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedDate, selectedCourt, updateTimeSlots]);

  return {
    timeSlots,
    isLoading,
    error,
    refreshTimeSlots: updateTimeSlots
  };
}