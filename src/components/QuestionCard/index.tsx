import React from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import  treasure from "../../assets/images/treasure.png"
import character from "../../assets/images/character.png"
interface QuestionCardProps {
    question: string;
    options: string[];
    correctAnswer: string;
    selectedAnswer: string;
    onSelectAnswer: (anwer: string) => void;
}
const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    options,
    correctAnswer,
    selectedAnswer,
    onSelectAnswer,
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100 relative overflow-hidden">
            {/*Animated Question*/}
            <motion.div
             initial={{scale:0.8, opacity:0}}
             animate={{scale:1, opacity:1}}
             transition={{duration:0.5}}
             className="bg-green-400 text-white text-xl font-bold p-4 rounded-full mb-6 shadow-lg"
            >
              {question}
            </motion.div>
            {/*Animated Answer*/}
            <div className="flex flex-col gap-4">
                {options.map((option, index) => (
                    <motion.button
                    key={index}
                    onClick={() => onSelectAnswer(option)}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                    className={`px-6 py-3 rounded-md text-white text-lg transition-all ${
                        selectedAnswer
                        ? option === correctAnswer
                         ? 'bg-green-500'
                         : 'bg-red-500'
                         : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={!!selectedAnswer}
                    >
                      {option}
                    </motion.button>
                ))}
            </div>
            {/*Feedback Animation*/}
            <AnimatePresence>
                {selectedAnswer && (
                    <motion.div
                     initial={{y: 50, opacity: 0}}
                     animate={{y: 0, opacity: 1}}
                     exit={{y: 50, opacity:0}}
                     className="mt-6 text-2xl font-bold"
                    >
                    {selectedAnswer === correctAnswer ? (
                        <span className="text-green-600">
                            Correct!
                        </span>
                    ):(
                        <span className="text-red-600">
                             Wrong!
                        </span>
                    )}
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Character Design Animation*/}
            <motion.img
            src={character}
            alt="character"
            initial={{ x: -100}}
            animate={{ x:0}}
            transition={{ duration:1}}
            className="absolute bottom-4 left-4 w-24 h-24"
            />
            <motion.img
             src={treasure}
             alt="treasure"
             initial={{ x:100}}
             animate={{ x: 0}}
             transition={{duration: 1}}
            className="absolute bottom-4 right-4 w-24 h-24"
             />
        </div>
    );
};
    


export default QuestionCard;
