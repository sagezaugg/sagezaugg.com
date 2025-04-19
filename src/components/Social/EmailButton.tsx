import React from "react";

interface EmailButtonProps {
  email: string;
}

const EmailButton: React.FC<EmailButtonProps> = ({ email }) => {
  return (
    <a
      href={`mailto:${email}`}
      className="text-gray-400 hover:text-zelda-gold transition-colors"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
      </svg>
    </a>
  );
};

export default EmailButton;
