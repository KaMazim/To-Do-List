export function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let brazilian_date = (day < 10 ? `0${day}` : day) + "-" + ( month < 10 ? `0${month}` : month ) + "-" + year;
    return brazilian_date;
}