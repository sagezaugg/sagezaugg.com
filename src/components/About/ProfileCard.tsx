import React from "react";
import { SOCIAL_LINKS } from "../../utils/socialConstants";
import GithubButton from "../Social/GithubButton";
import LinkedInButton from "../Social/LinkedInButton";
import TwitterButton from "../Social/TwitterButton";

interface ProfileCardProps {
  imageUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl }) => {
  return (
    <div className="p-4 mb-4">
      <div className="flex flex-col items-center">
        <div className="w-64 h-64 rounded-full overflow-hidden mb-2 border-2 border-zelda-gold">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex space-x-4">
          <GithubButton url={SOCIAL_LINKS.github} />
          <LinkedInButton url={SOCIAL_LINKS.linkedin} />
          <TwitterButton url={SOCIAL_LINKS.twitter} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
