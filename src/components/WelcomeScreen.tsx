import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showButton, setShowButton] = useState(false);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
    onRest: () => setShowButton(true),
  });

  const buttonFadeIn = useSpring({
    opacity: showButton ? 1 : 0,
    transform: showButton ? 'translateY(0)' : 'translateY(20px)',
  });

  return (
    <animated.div style={fadeIn} className="text-center p-8">
      <h1 className="text-5xl font-bold mb-6 text-yellow-300">Welcome to Hogwarts!</h1>
      <p className="text-xl text-white mb-8">
        Prepare to discover your unique blend of magical houses. Are you ready to find out where you truly belong?
      </p>
      <animated.button
        style={buttonFadeIn}
        onClick={onStart}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        Start the Sorting Ceremony
      </animated.button>
    </animated.div>
  );
};

export default WelcomeScreen;