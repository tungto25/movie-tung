import { GiEngagementRing } from "react-icons/gi";
import { GoFileMedia } from "react-icons/go";
import { RiVipCrownFill } from "react-icons/ri";
import { TbCast } from "react-icons/tb";


export const menus = [
    {
        id: 1,
        title: "Media Management",
        icon: <GoFileMedia />,
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
                title: "Sections",
                path: "media_management/Section"
            }
        ]
    },
    {
        id: 2,
        title: "Vip",
        icon: <RiVipCrownFill />,
        items: [
            {
                id: 1,
                title: "Packages",
                path: "vip/Packages"
            },
            {
                id: 2,
                title: "Features",
                path: "vip/Features"
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

// Constants for roles
export const ROLES = {
  ADMIN: 'admin',        // Quản trị viên cấp cao
  MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
  USER: 'user',          // Người dùng thông thường
};