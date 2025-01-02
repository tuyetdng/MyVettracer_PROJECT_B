import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface CalenderScreenProps {
  onDateSelect: (date: string) => void; // Callback function to send the selected date
}

const CalenderScreen: React.FC<CalenderScreenProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString); // Update local state
    onDateSelect(day.dateString); // Trigger the callback
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Initial date
        current={new Date().toISOString().split('T')[0]}
        // Callback for when a date is selected
        onDayPress={handleDateSelect}
        // Marked dates (optional)
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      {selectedDate ? (
        <Text style={styles.text}>Selected Date: {selectedDate}</Text>
      ) : (
        <Text style={styles.text}>Please select a date.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CalenderScreen;