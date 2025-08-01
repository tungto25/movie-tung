import { GiEngagementRing } from "react-icons/gi";
import { GoFileMedia } from "react-icons/go";
import { RiVipCrownFill } from "react-icons/ri";
import { TbCast } from "react-icons/tb";


export const menus = [
    {
        id: 1,
        title: "Media Management",
        icon: <GoFileMedia/>,
        items: [
            {
                id: 1,
                title: "Movies",
                path: "media_management/Movie"
            },
            {
                id: 2,
                title: "Episodes",
                path: "media_management/Episode"
            },
            {
                id: 3,
                title: "Trailer",
                path: "media_management/Trailer"
            }
        ]
    },
    {
        id:2,
        title:"Vip",
        icon:<RiVipCrownFill/>,
        items:[
            {
                id: 1,
                title: "Packages",
                path: "vip/Package"
            },
            {
                id: 2,
                title: "Peature",
                path: "vip/Peature"
            },
            {
                id: 3,
                title: "Plans",
                path: "vip/Plans"
            }
        ]
    },
    {
        id: 3,
        title: "MetaData",
        icon: <GiEngagementRing />,
        items: [
            {
                id: 1,
                title: "Categories",
                path: "MetaData/Categories"
            },
            {
                id: 2,
                title: "Movie_type",
                path: "MetaData/Movie_type"
            },
            {
                id: 3,
                title: "Countries",
                path: "MetaData/Countries"
            }
        ]
    },
    {
        id: 4,
        title: "Cast & Crew",
        icon: <TbCast />,
        items: [
            {
                id: 1,
                title: "Authors",
                path: "cast_crew/Author"
            },
            {
                id: 2,
                title: "Characters",
                path: "cast_crew/Character"
            },
            {
                id: 3,
                title: "Actors",
                path: "cast_crew/Actor"
            }
        ]
    }
]
