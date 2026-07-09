export function formatDateTimeFromISO(datetimeString: string): string {
  if (!datetimeString) return "Invalid Date & Time";

  // Format the date portion
  const datePart = formatDateFromISO(datetimeString);

  // Format the time portion
  const timePart = formatTimeFromISO(datetimeString);

  return `${datePart} - ${timePart}`;
}

export function formatDateFromISO(dateString: string): string {
  if (!dateString) return "Invalid Date";
  const dateObj = new Date(dateString);

  // Checks if the string generated a valid JavaScript date
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  // Format the date object
  const formattedString = dateObj.toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formattedString;
}

export function formatTimeFromISO(timeString: string): string {
  if (!timeString) return "Invalid Time";
  const dateObj = new Date(timeString);

  // Checks if the string generated a valid JavaScript date
  if (isNaN(dateObj.getTime())) return "Invalid Time";

  // Format the date object
  const formattedString = dateObj.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedString;
}

export function calculateHowManyHoursFromNow(datetime: string): number {
  if (!datetime) return 0;

  return (
    Math.floor(new Date(datetime).getTime() - Date.now()) / (1000 * 60 * 60)
  );
}

export function getLocalDateTimeString() {
  const now = new Date();
  // getTimezoneOffset() returns minutes, so we convert it to milliseconds
  const offset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now.getTime() - offset).toISOString();

  return localISOTime.slice(0, 16);
}
