import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { addEvent } from './calenderSlice'; // Import calendar slice action

export const fetchBookedSlots = createAsyncThunk(
  'appointment/fetchBookedSlots',
  async ({ id, date }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/fetchBookedSlots/${id}?date=${date}`);
      return response.data.bookedSlots || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching booked slots.');
    }
  }
);

export const bookAppointment = createAsyncThunk(
  'appointment/bookAppointment',
  async ({ coachId, appointmentDetails }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`/bookAppointment/${coachId}`, appointmentDetails);
      const bookedAppointment = response.data;
      dispatch(addEvent(bookedAppointment)); // Add the new appointment to the calendar
      return bookedAppointment;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error booking appointment.');
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    bookedSlots: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookedSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookedSlots.fulfilled, (state, action) => {
        state.bookedSlots = action.payload.map((slot) => ({
          ...slot,
          start: new Date(slot.start).toString(),
          end: new Date(slot.end).toString(),
        }));
        state.loading = false;
      })
      .addCase(fetchBookedSlots.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default appointmentSlice.reducer;
