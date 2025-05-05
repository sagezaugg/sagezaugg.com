import React from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../utils/socialConstants";
import GithubButton from "../components/Social/GithubButton";
import LinkedInButton from "../components/Social/LinkedInButton";
import TwitterButton from "../components/Social/TwitterButton";
import EmailButton from "../components/Social/EmailButton";
import { Card } from "../components/common/Card";

const Contact: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        Get in Touch
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="p-8 space-y-8" disableHover>
          <div className="text-center">
            <p className="text-zelda-light-blue text-lg mb-6">
              Feel free to reach out to me directly via email:
            </p>
            <p className="text-white text-xl mt-4">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="text-zelda-gold hover:underline"
              >
                {SOCIAL_LINKS.email}
              </a>
            </p>
          </div>
          <div className="text-center mt-8">
            <p className="text-zelda-light-blue mb-4">Or connect with me on:</p>
            <div className="flex justify-center space-x-6">
              <LinkedInButton url={SOCIAL_LINKS.linkedin} />
              <GithubButton url={SOCIAL_LINKS.github} />
              <TwitterButton url={SOCIAL_LINKS.twitter} />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Contact;
