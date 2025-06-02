const date = new Date('July 24 2024 21:00:00 GMT+0530')

const Main = {
    year: 2024,
    season: 4,
    tagline: "A Hub For Cyber Geeks!",
    dates: {
        day1: new Date(2024, 6, 25).toDateString().split(" ").slice(1).join(" "),
        day2: new Date(2024, 6, 26).toDateString().split(" ").slice(1).join(" ")
    },
    registrationClosingDate: date, // month is 0 indexed; Jan is 0;
    brochureDownload: "https://drive.google.com/u/0/uc?id=1kaXpgWyoBEAQvdYJqTvc6mSA6wM-Mqf_&export=download",
    brochurePreview: "https://drive.google.com/file/d/1kaXpgWyoBEAQvdYJqTvc6mSA6wM-Mqf_/preview",
    updateMessage: ""
}
//niceeee
export default Main
