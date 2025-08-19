import { keyframes } from "styled-components";

const glowBg = keyframes`
  0% { --bgrotate: 0deg; }
  100% { --bgrotate: 360deg; }
`;

const holoBg = keyframes`
  0% { background-position: 0 var(--background-y), 0 0, center; }
  100% { background-position: 0 var(--background-y), 90% 90%, center; }
`;

const Wrapper = styled.div`
  --pointer-x: 50%;
  --pointer-y: 50%;
  --pointer-from-center: 0;
  --pointer-from-top: 0.5;
  --pointer-from-left: 0.5;
  --card-opacity: 0;
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --background-x: 50%;
  --background-y: 50%;
  --grain: none;
  --icon: none;
  --behind-gradient: none;
  --inner-gradient: none;
  --sunpillar-1: hsl(2, 100%, 73%);
  --sunpillar-2: hsl(53, 100%, 69%);
  --sunpillar-3: hsl(93, 100%, 69%);
  --sunpillar-4: hsl(176, 100%, 76%);
  --sunpillar-5: hsl(228, 100%, 74%);
  --sunpillar-6: hsl(283, 100%, 73%);
  --sunpillar-clr-1: var(--sunpillar-1);
  --sunpillar-clr-2: var(--sunpillar-2);
  --sunpillar-clr-3: var(--sunpillar-3);
  --sunpillar-clr-4: var(--sunpillar-4);
  --sunpillar-clr-5: var(--sunpillar-5);
  --sunpillar-clr-6: var(--sunpillar-6);
  --card-radius: 30px;

  perspective: 500px;
  transform: translate3d(0, 0, 0.1px);
  position: relative;
  touch-action: none;

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    background: inherit;
    background-position: inherit;
    border-radius: inherit;
    transition: all 0.5s ease;
    filter: contrast(2) saturate(2) blur(36px);
    transform: scale(0.8) translate3d(0, 0, 0.1px);
    background-size: 100% 100%;
    background-image: var(--behind-gradient);
  }

  &:hover,
  &.active {
    --card-opacity: 1;
  }
  &:hover::before,
  &.active::before {
    filter: contrast(1) saturate(2) blur(40px) opacity(1);
    transform: scale(0.9) translate3d(0, 0, 0.1px);
  }
`;

const Card = styled.section`
  height: 80svh;
  max-height: 540px;
  display: grid;
  aspect-ratio: 0.718;
  border-radius: var(--card-radius);
  position: relative;
  background-blend-mode: color-dodge, normal, normal, normal;
  animation: ${glowBg} 12s linear infinite;
  box-shadow: rgba(0, 0, 0, 0.8)
    calc((var(--pointer-from-left) * 10px) - 3px)
    calc((var(--pointer-from-top) * 20px) - 6px)
    20px -5px;
  transition: transform 1s ease;
  transform: translate3d(0, 0, 0.1px) rotateX(0deg) rotateY(0deg);
  background-size: 100% 100%;
  background-position: 0 0, 0 0, 50% 50%, 0 0;
  background-image: var(--behind-gradient);
  overflow: hidden;

  &:hover,
  &.active {
    transition: none;
    transform: translate3d(0, 0, 0.1px) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
  }
`;

import { useState } from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";

const ProfileCard = () => {
    const [avatar, setAvatar] = useState("");

    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Wrapper>
            <Card>
                <div style={{ textAlign: "center" }} className="p-2 bg-gray-800/80 w-full">
                    <h1 className="font-bold text-2xl mt-5">AVATAR</h1>
                    <input
                        accept="image/*"
                        type="file"
                        id="upload-avatar"
                        style={{ display: "none" }}
                        onChange={handleImg}
                    />

                    <label htmlFor="upload-avatar">
                        <Avatar
                            src={avatar}
                            alt="Upload Avatar"
                            sx={{
                                width: 300,
                                height: 300,
                                margin: "10px auto",
                                cursor: "pointer",
                                marginTop: "80px"
                            }}
                        />
                    </label>
                </div>
            </Card>
        </Wrapper>
    );
};

export default ProfileCard;

