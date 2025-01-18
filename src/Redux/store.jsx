import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './slices/calenderSlice';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    appointment: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['appointment/fetchBookedSlots/fulfilled'], // Ignore specific actions
        ignoredPaths: ['calendar.events', 'appointment.bookedSlots'], // Ignore specific state paths
      },
    }),
});

export default store;
