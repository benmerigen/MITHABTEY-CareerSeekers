/**
 * RamakQuestionnaire component displays a questionnaire for the RAMAK personality test.
 * It fetches the questions from the server and allows the user to answer them.
 * After answering all questions, the user's traits are updated and suitable professions are calculated.
 * The user is then redirected to the genetic algorithm page.
 */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { FaSpinner } from 'react-icons/fa';

// Type definition for the props of the Question component
type QuestionProps = {
    question: string;
    index: number;
    totalQuestions: number;
    selectedAnswer: number | null;
    onAnswer: (index: number, answer: number) => void;
};

// Question component to render a single question with options
const Question: React.FC<QuestionProps> = ({ question, index, totalQuestions, selectedAnswer, onAnswer }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-right">שאלה {index + 1} מתוך {totalQuestions}</h3>
            <p className="mb-4 text-right">{question}</p>
            <div className="flex justify-between">
                {['לא', 'לא בטוח', 'כן'].map((option, optionIndex) => (
                    <button
                        key={optionIndex}
                        className={`px-6 py-2 rounded-full transition-colors duration-200 ${selectedAnswer === optionIndex
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => onAnswer(index, optionIndex)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Main component for the RAMAK questionnaire
const RamakQuestionnaire: React.FC = () => {
    // State to store questions, current question index, answers, loading status, and error message
    const [questions, setQuestions] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.user); // Get current user from Redux store
    const navigate = useNavigate(); // For navigation after completing the questionnaire

    // Fetch the questionnaire data from the server
    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const res = await fetchWithAuth('/server/questionnaires/getQuestionnaire', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Questionnaire_Name: 'RAMAK' })
                });
                const questionnaire = await res.json();
                setQuestions(questionnaire.Questions.map((q: any) => q.question_he));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch questionnaire');
                setLoading(false);
            }
        };

        fetchQuestionnaire();
    }, []);

    // Handle answer selection and update the question index
    const handleAnswer = (index: number, answer: number) => {
        const newAnswers = { ...answers };
        newAnswers[index] = answer === 2 ? 'Y' : answer === 0 ? 'N' : '?';
        setAnswers(newAnswers);

        // Move to the next question if there is one
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Calculate score and update user traits and professions
    const calculateScore = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth('/server/questionnaires/calculateScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answers })
            });
            const score = await res.json();
            const updateRes = await fetchWithAuth(`/server/questionnaires/updateUserTraits/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ traits: score })
            });
            const data = await updateRes.json();
            if (data.success === false) {
                setError('Failed to update user traits');
                console.log(data.message);
                return;
            }
            // Update user professions based on new traits
            await fetchWithAuth('/server/geneticAlgorithm/findSuitableProfessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: currentUser._id })
            });
            navigate('/geneticAlgorithm'); // Redirect to the genetic algorithm page
        } catch (err) {
            console.log(err);
            setError('Failed to calculate or update score');
        } finally {
            setLoading(false);
        }
    };

    // Check if all questions have been answered
    const isComplete = Object.keys(answers).length === questions.length;

    // Render loading spinner, error message, or the questionnaire
    if (loading) {
        return (
            <div className="flex items-center space-x-2 mt-40 justify-center">
                <FaSpinner className="animate-spin " />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 mt-16">
            <h1 className="text-3xl font-bold text-center mb-8">שאלון לבחינת אישיות</h1>
            <p className="text-gray-600 text-center mb-5">
                אנא סמן את התשובות שמתארות אותך בצורה הטובה ביותר
            </p>
            {questions[currentQuestionIndex] && (
                <Question
                    question={questions[currentQuestionIndex]}
                    index={currentQuestionIndex}
                    totalQuestions={questions.length}
                    selectedAnswer={answers[currentQuestionIndex] === 'Y' ? 2 : answers[currentQuestionIndex] === 'N' ? 0 : answers[currentQuestionIndex] === '?' ? 1 : null}
                    onAnswer={handleAnswer}
                />
            )}
            <div className="flex justify-between mt-8">
                <button
                    className={`bg-gray-300 font-bold py-2 px-6 rounded-xl transition-colors duration-200 ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400 text-gray-800'}`}
                    onClick={() => currentQuestionIndex < questions.length - 1 && setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    disabled={currentQuestionIndex === questions.length - 1}
                >
                    הבא
                </button>

                {isComplete && (
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-200"
                        onClick={calculateScore}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2 mt-40">
                                <FaSpinner className="animate-spin" />
                            </div>
                        ) : (
                            'מצא מקצועות'
                        )}
                    </button>
                )}

                <button
                    className={`bg-gray-300 font-bold py-2 px-6 rounded-xl transition-colors duration-200 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400 text-gray-800'}`}
                    onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    disabled={currentQuestionIndex === 0}
                >
                    הקודם
                </button>

            </div>
        </div>
    );
};

export default RamakQuestionnaire;
