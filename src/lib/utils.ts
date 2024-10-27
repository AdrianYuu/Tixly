export function formatToRupiah(number: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}

function parseStrDate(strDate: string): Date {
  const cleanedDateStr = strDate.replace(/(\d{1,2})(st|nd|rd|th)/, '$1');

  const dateParts = cleanedDateStr.split(' | ');
  const [dayString, timeString] = dateParts;

  const formattedDate = dayString + ' ' + timeString.replace('.', ':');
  const parsedDate = new Date(formattedDate);

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format');
  }

  return parsedDate;
}

export function getTimeDifference(strDate: string): string {
  const targetDate = parseStrDate(strDate);
  const now = new Date();
  const diffInMs = now.getTime() - targetDate.getTime();

  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  const msInMonth = 30 * msInDay;
  const msInYear = 12 * msInMonth;

  if (diffInMs < msInHour) {
    const minutes = Math.floor(diffInMs / msInMinute);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (diffInMs < msInDay) {
    const hours = Math.floor(diffInMs / msInHour);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (diffInMs < msInMonth) {
    const days = Math.floor(diffInMs / msInDay);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (diffInMs < msInYear) {
    const months = Math.floor(diffInMs / msInMonth);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  } else {
    const years = Math.floor(diffInMs / msInYear);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
}

export function isToday(strDate: string): boolean {
  const targetDate = parseStrDate(strDate);
  const now = new Date();

  return (
    targetDate.getDate() === now.getDate() &&
    targetDate.getMonth() === now.getMonth() &&
    targetDate.getFullYear() === now.getFullYear()
  );
}
