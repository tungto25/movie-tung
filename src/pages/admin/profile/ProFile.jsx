import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import Information from "./Information";
import ProfileCard from './ProfileCard'

function ProFile(props) {
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMovie({ ...movie, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <div className="flex flex-col md:flex-row p-4 gap-3">
            <ProfileCard
                name=""
                title="Avatar"
                avatarUrl=""
                onContactClick={handleImg}
            />
            <Information className="flex-1" />
        </div>
    );
}

export default ProFile;