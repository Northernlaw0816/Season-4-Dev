import conference_1 from "../public/images/main-gallery/conference_01.jpg"
import conference_2 from "../public/images/main-gallery/conference_02.jpg"
import conference_3 from "../public/images/main-gallery/conference_03.jpg"
import conference_4 from "../public/images/main-gallery/conference_04.jpg"
import conference_5 from "../public/images/main-gallery/conference_05.jpg"
import conference_6 from "../public/images/main-gallery/conference_06.jpg"
import conference_7 from "../public/images/main-gallery/conference_07.jpg"

const GalleyAlbumsList = [
    {
        title: "NuTopia.in Development",
        id: 1,
        description: "Team De-Bug working on NuTopia.in",
        images: [
            {
                src: conference_1,
                name: "Conference Hall 1",
                date: new Date(2022, 0, 7).toDateString()
            },
            {
                src: conference_2,
                name: "Conference Hall 2",
                date: new Date(2022, 0, 7).toDateString()
            },
            {
                src: conference_3,
                name: "Conference Hall 3",
                date: new Date(2022, 0, 7).toDateString()
            },
            {
                src: conference_4,
                name: "Conference Hall 4",
                date: new Date(2022, 0, 7).toDateString()
            },
            {
                src: conference_6,
                name: "Conference Hall 5",
                date: new Date(2022, 0, 7).toDateString()
            },
            {
                src: conference_5,
                name: "Dev Group 1",
                date: new Date(2022, 0, 7).toDateString()
            },
            {
                src: conference_7,
                name: "Dev Group 2",
                date: new Date(2022, 0, 7).toDateString()
            }
        ],
    }
]

export default GalleyAlbumsList