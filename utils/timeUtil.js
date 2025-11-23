export const combineDateAndTime = (selectedDate, timeStr) => {
  // selectedDate is Date object (from calendar)
  // timeStr is "HH:MM" from time input

  const [hours, minutes] = timeStr.split(":").map(Number);

  const newDate = new Date(selectedDate);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
};
