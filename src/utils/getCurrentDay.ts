export default function getCurrentDay(): string {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const currentDayIndex = new Date().getDay();
    return days[currentDayIndex];
}
