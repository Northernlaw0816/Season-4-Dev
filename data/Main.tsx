const date = new Date('October 10 2023 21:00:00 GMT+0530')

const Main = {
    year: 2023,
    season: 3,
    tagline: "A Hub For Cyber Geeks!",
    dates: {
        day1: new Date(2023, 9, 20).toDateString().split(" ").slice(1).join(" "),
        day2: new Date(2023, 9, 21).toDateString().split(" ").slice(1).join(" ")
    },
    registrationClosingDate: date, // month is 0 indexed; Jan is 0;
    brochureDownload: "<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="1035" height="780" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FX9PFAq014ZsxfkFSVX7eZW%2FUntitled%3Ftype%3Ddesign%26node-id%3D3-5%26t%3Dmse1Ig00legl8BPo-1%26scaling%3Dmin-zoom%26page-id%3D0%3A1%26mode%3Ddesign" allowfullscreen></iframe>",
    brochurePreview: "https://drive.google.com/file/d/10re6i_oqC3SXiTLW5HEefl-bqKkeToRS/preview",
    updateMessage: ""
}

export default Main
