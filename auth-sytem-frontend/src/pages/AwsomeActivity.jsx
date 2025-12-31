import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, RotateCcw, MessageSquare, Linkedin, Youtube, Star, Sparkles, CheckCheck } from 'lucide-react'
import Unauthorized from '../components/extras/Unauthorized';
import CoinGained from '../components/extras/CoinGained';
import { completeActivity5, submitActivityFeedback } from '../api/profile';
import SucessModal from '../components/extras/SucessModal';
import ErrorModal from '../components/extras/ErrorModal';

const AwsomeActivity = () => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [showCoinModal, setShowCoinModal] = useState(
        localStorage.getItem("activity5Status") === 'false'
    );
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [points, setPoints] = useState(localStorage.getItem('points') || '0');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        try {
            const points = parseInt(localStorage.getItem('points') || '0');
            if (points < 250) {
                setErrorMessage('Insufficient points to submit feedback.');
                setShowErrorModal(true);
                return;
            }
            const response = await submitActivityFeedback({ feedback, rating });
            const updatedPoints = points - 250;
            localStorage.setItem('points', updatedPoints);
            setPoints(updatedPoints);
            setSuccessMessage(response || 'Feedback submitted successfully!');
            setShowSuccessModal(true);
            setFeedbackSubmitted(true);
            setTimeout(() => {
                setFeedback('');
                setRating(0);
                setFeedbackSubmitted(false);
            }, 7000);
        } catch (error) {
            setErrorMessage(error.response.data||'Error processing points. Please try again later.');
            setShowErrorModal(true);
            return;
        }
    };

    const handleCoinModalClose = async (e) => {
        e.preventDefault();
        setShowCoinModal(false);
        localStorage.setItem("activity5Status", true);
        try {
            const response = await completeActivity5();
            setSuccessMessage(response || 'You have earned 500 coins for completing all activities!');
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error?.response?.data || 'Failed to complete activity 5. Please try again later.');
            setShowErrorModal(true);
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6 md:p-10'>
            <Unauthorized roleRequired='LEGEND' />
            {showCoinModal && <CoinGained coinValue={500} onClose={handleCoinModalClose} />}
            <SucessModal successMessage={successMessage} onClose={() => { setShowSuccessModal(false); setSuccessMessage(''); }} />
            <ErrorModal errorMessage={errorMessage} onClose={() => { setShowErrorModal(false); setErrorMessage(''); }} />
            <div className="navigations mb-6">
                <Link to="../user/dashboard" className="text-blue-600 hover:underline">Dashboard</Link> &#8250;
                <Link to="/user/awesome-activity" className="text-green-800 hover:underline"> Congratulations</Link> &#8250;
            </div>

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8 text-center border-2 border-green-600 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-600"></div>

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Trophy className="w-24 h-24 text-yellow-500" strokeWidth={1.5} />
                            <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-6 -right-2 animate-pulse" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        🎉 Congratulations! 🎉
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-700 mb-4">
                        You've completed <span className="text-green-600 font-bold">all activities!</span>
                    </p>

                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Your dedication and effort in completing all the activities is truly commendable.
                        You've unlocked every feature and explored the full potential of this authentication system!
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                            <RotateCcw className="w-8 h-8 text-green-600" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                Want to Experience It Again?
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                You can reset your account to start fresh and complete all the activities again.
                                This will reset your progress, role, and activity status, giving you a chance to
                                experience the entire journey once more.
                            </p>
                            <Link
                                to="/user/profile-setting"
                                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:shadow-md"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Reset Account
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-green-100 p-3 rounded-full">
                            <MessageSquare className="w-8 h-8 text-green-600" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Share Your Feedback
                        </h2>
                    </div>

                    {feedbackSubmitted ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                            <p className="text-green-700 font-semibold text-lg">
                                Thank you for your feedback! We appreciate your input.
                            </p>
                            <p className="text-gray-600 text-sm mt-2">
                                250 points have been deducted from your account.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleFeedbackSubmit}>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                <p className="text-yellow-800 text-sm font-semibold">
                                    Note: Submitting feedback will deduct <span className="font-bold">250 points</span> from your account, but don't worry, 500 coins have already been added for completing all activities! So give it a try to share your thoughts.
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-3">
                                    How would you rate your experience?
                                </label>
                                <div className="flex gap-2 justify-center md:justify-start">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`w-8 h-8 ${star <= rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="feedback" className="block text-gray-700 font-semibold mb-2">
                                    Your Feedback
                                </label>
                                <textarea
                                    id="feedback"
                                    rows="5"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Tell us about your experience, suggestions, or any improvements you'd like to see..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                    maxLength={500}
                                    required
                                />
                                <div className="text-right text-sm text-gray-500 mt-1">
                                    {feedback.length}/500 characters
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={rating === 0}
                                    className={`
                      w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-300
                      ${rating === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
                                        }
                    `}
                                >
                                    Submit Feedback (250 points)
                                </button>
                                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 shadow-sm">
                                    <span className="text-gray-700 text-sm font-medium">Available Points: </span>
                                    <span className="font-bold text-green-600 text-lg">{points}</span>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                        Connect & Learn More
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Check out my content and connect with me on social media
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">

                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-all duration-300 hover:border-blue-600"
                        >
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Linkedin className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">LinkedIn Post</h3>
                                <p className="text-sm text-gray-600">Read about this project</p>
                            </div>
                        </a>

                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-all duration-300 hover:border-red-600"
                        >
                            <div className="bg-red-100 p-3 rounded-full">
                                <Youtube className="w-8 h-8 text-red-600" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">YouTube Video</h3>
                                <p className="text-sm text-gray-600">Watch the demo</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link
                        to="/user/dashboard"
                        className="inline-block text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AwsomeActivity