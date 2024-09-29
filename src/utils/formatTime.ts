export function formatTime(date: Date) {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    return `${hours}:${minutes}`;
}
