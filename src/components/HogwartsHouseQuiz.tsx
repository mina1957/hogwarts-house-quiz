import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useTransition, animated } from 'react-spring';
import WelcomeScreen from './WelcomeScreen';
import ShareButtons from './ShareButtons';

interface Answer {
  id: string;
  text: string;
  house: 'Gryffindor' | 'Hufflepuff' | 'Ravenclaw' | 'Slytherin';
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

const questions: Question[] = [
  {
    id: 'q1',
    text: "You find yourself standing at a mysterious locked door, what do you do?",
    answers: [
      { id: 'q1a1', text: "You open it right away to see what is behind!", house: "Slytherin" },
      { id: 'q1a2', text: "You go to the library to see if you can find out more about this door before doing anything.", house: "Ravenclaw" },
      { id: 'q1a3', text: "You act like you didn't see it..Which door even?", house: "Hufflepuff" },
      { id: 'q1a4', text: "You wait until everyone is asleep, you go back to the door and open it to see what is behind.", house: "Gryffindor" }
    ]
  },
  {
    id: 'q2',
    text: "What would you hate being called the most?",
    answers: [
      { id: 'q2a1', text: "Coward", house: "Gryffindor" },
      { id: 'q2a2', text: "Ignorant", house: "Ravenclaw" },
      { id: 'q2a3', text: "Naive", house: "Slytherin" },
      { id: 'q2a4', text: "Disloyal", house: "Hufflepuff" }
    ]
  },
  {
    id: 'q3',
    text: "You and your friend find yourselves in front of a three-headed dog, what do you do?",
    answers: [
      { id: 'q3a1', text: "You try to take on the dog yourself and distract its view from your friend!", house: "Gryffindor" },
      { id: 'q3a2', text: "You quickly craft a plan and you get yourself and your friend out of there quickly!", house: "Ravenclaw" },
      { id: 'q3a3', text: "You use your exceptional broom flying skills and fly away leaving your friend to face the dog by themself!", house: "Slytherin" },
      { id: 'q3a4', text: "You would just never find yourself in that situation. Not in a million years.", house: "Hufflepuff" }
    ]
  },
  {
    id: 'q4',
    text: "You are having the most amazing butterbeer, but you spot one of your classmates being picked on, what do you do?",
    answers: [
      { id: 'q4a1', text: "You first consider what you can get out of defending them and if it is worth putting your butterbeer moment on pause.", house: "Slytherin" },
      { id: 'q4a2', text: "You put down your drink without thinking twice and go defend them.", house: "Gryffindor" },
      { id: 'q4a3', text: "You quickly formulate a brilliant plan to help them on a napkin you were using.", house: "Ravenclaw" },
      { id: 'q4a4', text: "You leave your drink to run and try to find a professor as they would be able to help more than you.", house: "Hufflepuff" }
    ]
  },
  {
    id: 'q5',
    text: "If you saw a sign on a door telling you not to enter – Danger, Danger! – what would you do?",
    answers: [
      { id: 'q5a1', text: "You go in to explore. As if anything – or anyone – can tell you what to do.", house: "Gryffindor" },
      { id: 'q5a2', text: "Leave it alone: there's probably a good reason for that warning sign…", house: "Ravenclaw" },
      { id: 'q5a3', text: "Leave. Quickly. And don't look back.", house: "Hufflepuff" },
      { id: 'q5a4', text: "Go in anyway! If they're warning people off, there's something awesome in there!", house: "Slytherin" }
    ]
  },
  {
    id: 'q6',
    text: "What would your family and friends say is your worst trait?",
    answers: [
      { id: 'q6a1', text: "A bit of a know-it-all.", house: "Ravenclaw" },
      { id: 'q6a2', text: "Reckless – you don't think before you act.", house: "Gryffindor" },
      { id: 'q6a3', text: "Worst trait? You have no bad traits.", house: "Slytherin" },
      { id: 'q6a4', text: "You're too nice for your own good.", house: "Hufflepuff" }
    ]
  },
  {
    id: 'q7',
    text: "Someone steals some money from you – but they're going through tough times and really need it. What do you do?",
    answers: [
      { id: 'q7a1', text: "You calculate a way for them to get help – they can keep the money, but only after a quick telling-off.", house: "Ravenclaw" },
      { id: 'q7a2', text: "That money is yours and no one ever takes what belongs to you.", house: "Slytherin" },
      { id: 'q7a3', text: "You grumble about them stealing it but offer them another twenty.", house: "Hufflepuff" },
      { id: 'q7a4', text: "You let them keep it, befriend them, and offer them your coat.", house: "Gryffindor" }
    ]
  },
  {
    id: 'q8',
    text: "What would your ideal superpower be?",
    answers: [
      { id: 'q8a1', text: "Invisibility", house: "Hufflepuff" },
      { id: 'q8a2', text: "Mind control", house: "Slytherin" },
      { id: 'q8a3', text: "Super strength", house: "Gryffindor" },
      { id: 'q8a4', text: "Foresight", house: "Ravenclaw" }
    ]
  },
  {
    id: 'q9',
    text: "What would be your perfect home?",
    answers: [
      { id: 'q9a1', text: "A super luxurious mansion that comes with a Yacht because you deserve it.", house: "Slytherin" },
      { id: 'q9a2', text: "A moderately-sized house near a forest where you could explore and engage in cool adventures.", house: "Gryffindor" },
      { id: 'q9a3', text: "A nice little place that is safe and quiet but also close to family.", house: "Hufflepuff" },
      { id: 'q9a4', text: "A gothic styled home on the campus of one of the best universities in the world where you are a scholar.", house: "Ravenclaw" }
    ]
  },
  {
    id: 'q10',
    text: "If you could choose a potion to use for the rest of your life what would it be?",
    answers: [
      { id: 'q10a1', text: "The Wit-Sharpening Potion: to always think clearly and logically.", house: "Ravenclaw" },
      { id: 'q10a2', text: "Draught of Peace: to never be stressed again.", house: "Hufflepuff" },
      { id: 'q10a3', text: "Polyjuice Potion: to change appearance and explore places where the access is restricted.", house: "Gryffindor" },
      { id: 'q10a4', text: "Felix Felicis: Liquid Luck to succeed in all your endeavours.", house: "Slytherin" }
    ]
  },
  {
    id: 'q11',
    text: "You're faced with a challenging magical puzzle. How do you approach it?",
    answers: [
      { id: 'q11a1', text: "Dive right in and try different solutions until one works", house: "Gryffindor" },
      { id: 'q11a2', text: "Carefully analyze each component before attempting a solution", house: "Ravenclaw" },
      { id: 'q11a3', text: "Ask friends for help and work on it together", house: "Hufflepuff" },
      { id: 'q11a4', text: "Find a way to bypass the puzzle entirely", house: "Slytherin" }
    ]
  },
  {
    id: 'q12',
    text: "What would you do if you found a lost first-year student crying in the hallway?",
    answers: [
      { id: 'q12a1', text: "Comfort them and help them find their way", house: "Hufflepuff" },
      { id: 'q12a2', text: "Give them directions and advice on how to navigate the castle", house: "Ravenclaw" },
      { id: 'q12a3', text: "Take charge and personally escort them to where they need to go", house: "Gryffindor" },
      { id: 'q12a4', text: "Tell a prefect or teacher about the situation", house: "Slytherin" }
    ]
  },
  {
    id: 'q13',
    text: "During a Quidditch match, you spot the opposing team cheating. What do you do?",
    answers: [
      { id: 'q13a1', text: "Immediately call them out and demand fair play", house: "Gryffindor" },
      { id: 'q13a2', text: "Secretly plan a way to counter their cheating without getting caught", house: "Slytherin" },
      { id: 'q13a3', text: "Report it to the referee and let them handle it", house: "Hufflepuff" },
      { id: 'q13a4', text: "Analyze the situation to find a strategic advantage within the rules", house: "Ravenclaw" }
    ]
  },
  {
    id: 'q14',
    text: "You've been given a difficult assignment with a tight deadline. How do you handle it?",
    answers: [
      { id: 'q14a1', text: "Pull an all-nighter to get it done, no matter what", house: "Gryffindor" },
      { id: 'q14a2', text: "Create a detailed schedule and stick to it rigorously", house: "Ravenclaw" },
      { id: 'q14a3', text: "Ask classmates to form a study group and work together", house: "Hufflepuff" },
      { id: 'q14a4', text: "Find creative shortcuts or persuade the professor for an extension", house: "Slytherin" }
    ]
  },
  {
    id: 'q15',
    text: "If you could add one room to Hogwarts, what would it be?",
    answers: [
      { id: 'q15a1', text: "A dueling arena for practicing defensive spells", house: "Gryffindor" },
      { id: 'q15a2', text: "An enormous library with books from around the magical world", house: "Ravenclaw" },
      { id: 'q15a3', text: "A cozy common room where all houses can mingle", house: "Hufflepuff" },
      { id: 'q15a4', text: "A secret passage leading to exclusive magical opportunities", house: "Slytherin" }
    ]
  }
];

const HouseIcon: React.FC<{ house: string }> = ({ house }) => {
  switch (house) {
    case 'Gryffindor':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <path d="M50 10 L90 90 L10 90 Z" fill="#740001" />
          <circle cx="50" cy="50" r="20" fill="#D3A625" />
        </svg>
      );
    case 'Hufflepuff':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <rect x="10" y="10" width="80" height="80" fill="#ECB939" />
          <circle cx="50" cy="50" r="30" fill="#000000" />
        </svg>
      );
    case 'Ravenclaw':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <polygon points="50,10 90,90 10,90" fill="#0E1A40" />
          <circle cx="50" cy="50" r="20" fill="#946B2D" />
        </svg>
      );
    case 'Slytherin':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <path d="M10 10 Q50 90 90 10" fill="#1A472A" strokeWidth="5" />
          <circle cx="50" cy="40" r="20" fill="#AAAAAA" />
        </svg>
      );
    default:
      return null;
  }
};

const TransitionComponent: React.FC<{ show: boolean; children: React.ReactNode }> = ({ show, children }) => {
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 },
  });

  return transitions((style, item) => item && <animated.div style={style}>{children}</animated.div>);
};

const HogwartsHouseQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const handleAnswer = (answerId: string) => {
    const selectedHouse = questions[currentQuestion].answers.find(a => a.id === answerId)?.house;
    if (!selectedHouse) return;

    setIsTransitioning(true);
    const newAnswers = [...answers, selectedHouse];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(undefined);
      } else {
        calculateResult(newAnswers);
      }
      setIsTransitioning(false);
    }, 500);
  };

  const calculateResult = (finalAnswers: string[]) => {
    const houseCounts = finalAnswers.reduce((acc, house) => {
      acc[house] = (acc[house] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedHouses = Object.entries(houseCounts).sort((a, b) => b[1] - a[1]);
    const topTwoHouses = sortedHouses.slice(0, 2).map(([house]) => house);
    setResult(topTwoHouses.join('-'));
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setSelectedAnswer(undefined);
  };

  const getHouseColor = (house: string) => {
    const colors: Record<string, string> = {
      Gryffindor: 'from-red-700 to-yellow-500',
      Hufflepuff: 'from-yellow-400 to-black',
      Ravenclaw: 'from-blue-900 to-[#946B2D]',
      Slytherin: 'from-green-800 to-emerald-300'
    };
    return colors[house] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto bg-white/30 backdrop-blur-md text-white rounded-lg overflow-hidden">
      {!showQuiz ? (
          <WelcomeScreen onStart={startQuiz} />
        ) : (
        <>
        <div className="text-center p-6">
          <h1 className="text-5xl font-bold mb-4 text-yellow-300">Blended Hogwarts House Quiz</h1>
          <p className="text-xl text-gray-200 italic">Discover your unique combination of Hogwarts houses!</p>
        </div>
        <div className={`p-8 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {result ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Your Blended House:</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {result.split('-').map((house, index) => (
                  <span key={index} className={`bg-gradient-to-r ${getHouseColor(house)} text-white px-6 py-3 rounded-full flex items-center text-xl`}>
                    <HouseIcon house={house} />
                    <span className="ml-3">{house}</span>
                  </span>
                ))}
              </div>
              <div className="bg-yellow-100 border-yellow-400 text-yellow-800 text-lg p-4 rounded-lg mb-8">
                <AlertCircle className="h-6 w-6 inline-block mr-2" />
                <span className="text-2xl mb-2 inline-block">Congratulations, young wizard!</span>
                <p className="text-xl mt-2">
                  Your unique blend of houses makes you a truly exceptional student at Hogwarts!
                </p>
              </div>
              <ShareButtons 
                url={window.location.href}
                title={`I'm a ${result} blend in the Hogwarts House Quiz!`}
                hashtags={['HogwartsHouseQuiz', 'HarryPotter']}
                result={result}
              />
              <button
                onClick={resetQuiz}
                className="bg-transparent border border-white text-white hover:bg-white hover:text-purple-900 transition-colors text-xl py-6 px-8 rounded cursor-pointer"
              >
                Take the Quiz Again
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-yellow-300">{questions[currentQuestion].text}</h2>
              <RadioGroup.Root onValueChange={handleAnswer} value={selectedAnswer} className="space-y-4">
                {questions[currentQuestion].answers.map((answer) => (
                  <div key={answer.id} className="flex items-start space-x-3 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <RadioGroup.Item
                        value={answer.id}
                        id={answer.id}
                        className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                      >
                        <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-white" />
                      </RadioGroup.Item>
                    </div>
                    <label
                      htmlFor={answer.id}
                      className="text-white cursor-pointer text-xl hover:text-yellow-300 transition-colors flex-grow"
                    >
                      {answer.text}
                    </label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default HogwartsHouseQuiz;
