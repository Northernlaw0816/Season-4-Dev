const date = new Date('Feb 6 2022 15:00:00 GMT+0530')

const Main = {
    year: 2022,
    season: 1,
    tagline: "A Hub For Cyber Geeks!",
    dates: {
        day1: new Date(2022, 1, 8).toDateString().split(" ").slice(1).join(" "),
        day2: new Date(2022, 1, 9).toDateString().split(" ").slice(1).join(" ")
    },
    registrationClosingDate: date, // month is 0 indexed; Jan is 0;
    updateMessage: date.getTime() <= new Date().getTime() ? "IMPORTANT INFORMATION: REGISTER ARE CLOSED" : "IMPORTANT INFORMATION: LAST DATE FOR REGISTRATION - FEBRUARY 6 2022, 3 PM"
}

export default Main
