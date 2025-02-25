function getDateBeforeXDays(x) {
    const today = new Date();
    today.setDate(today.getDate() - x);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getDaysDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const timeDiff = Math.abs(d2 - d1);
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

export { getDateBeforeXDays, getDaysDifference };