import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCalendarData = createAsyncThunk(
  'calendar/fetchCalendarData',
  async (coachId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/showCoachBookings/${coachId}`);
      const formattedData = response.data.coach.flatMap((item) => {
        const dailyEvents = [];
        const currentDate = new Date(item.from_date);
        const endDate = new Date(item.to_date);

        while (currentDate <= endDate) {
          dailyEvents.push({
            title: item.event_name,
            start: new Date(
              `${currentDate.toISOString().split('T')[0]}T${item.start_time}`
            ).toISOString(),
            end: new Date(
              `${currentDate.toISOString().split('T')[0]}T${item.end_time}`
            ).toISOString(),
            status: item.status,
            player_name: item.player.player_name,
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }

        return dailyEvents;
      });

      return formattedData;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching calendar data.');
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarData.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchCalendarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch calendar data.';
      });
  },
});

export const { addEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
