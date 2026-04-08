import React from 'react';
import { useSurvey } from '../hooks/useSurvey';
import { QuizSkeleton } from '../components/skeletons/QuizSkeleton';
import SurveyIntro from '../components/survey/SurveyIntro';
import SurveyCompleted from '../components/survey/SurveyCompleted';
import SurveyTake from '../components/survey/SurveyTake';

export default function SurveyView() {
    const {
        surveyData,
        loading,
        currentQuestionIndex,
        answers,
        submitting,
        completed,
        pointsEarned,
        showIntro,
        handleStart,
        handleAnswerChange,
        nextQuestion,
        prevQuestion,
        handleSubmit,
        id,
        navigate
    } = useSurvey();

    if (loading) {
        return <QuizSkeleton />;
    }

    if (!surveyData) return null;

    const { survey, questions } = surveyData;

    if (completed) {
        return (
            <SurveyCompleted 
                pointsEarned={pointsEarned}
                onBack={() => navigate(-1)}
            />
        );
    }

    if (showIntro) {
        return (
            <SurveyIntro 
                survey={survey}
                questionsCount={questions.length}
                onStart={handleStart}
                onBack={() => navigate(-1)}
            />
        );
    }

    return (
        <SurveyTake 
            survey={survey}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onNext={nextQuestion}
            onPrev={prevQuestion}
            onSubmit={handleSubmit}
            submitting={submitting}
            onBack={() => navigate(-1)}
        />
    );
}
