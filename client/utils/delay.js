export default function formatDelay(minutes) {
  if (minutes === 1) {
    return '1 minute';
  }
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  let remaining = Math.floor(minutes % 60);
  if (remaining < 1) {
    return `${hours} hours`;
  }
  return `${hours} hours, ${remaining} minutes`;
}
