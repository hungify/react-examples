import { quiz } from 'mocks';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 100%);
`;

const Inner = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 10px 2px rgb(100 100 100 / 10%);
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 400px;
  @media screen and (min-width: 576px) {
    width: 600px;
  }
`;

const QuestionStyled = styled.div`
  padding: 30px;
  text-align: center;
  h1 {
    font-weight: 600;
  }
  h2 {
    font-weight: 600;
    text-align: center;
    margin: 0;
    font-size: 25px;
  }
`;

const AnswerList = styled.ul`
  padding-top: 20px;
  padding-bottom: 50px;
`;

const AnswerItem = styled.li`
  display: flex;
  padding: 10px 50px;
  font-size: 20px;
  input {
    margin-right: 10px;
  }
`;

const Button = styled.button`
  background-color: #8e44ad;
  display: block;
  padding: 20px;
  font-size: 18px;
  width: 100%;
  color: #fff;
`;

interface Question {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
}

interface Answer {
  question: string;
  answer: string;
}

export default function QuizApp() {
  const [activeQuestion, setActiveQuestion] = useState<Question>(quiz[0]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const handlePick = (answer: string) => () => {
    const foundQuestion = answers.find((aws) => aws.question === activeQuestion.question);
    if (foundQuestion) {
      foundQuestion.answer = answer;
      setAnswers([...answers]);
    } else {
      setAnswers([
        ...answers,
        {
          question: activeQuestion.question,
          answer: answer,
        },
      ]);
    }
  };

  const handleSubmit = () => {
    if (done) {
      setDone(false);
      setActiveQuestion(quiz[0]);
      setAnswers([]);
      return;
    }

    const foundAnswerInThisQuestion = answers.find(
      (aws) => aws.question === activeQuestion.question
    )?.answer;

    if (foundAnswerInThisQuestion) {
      const nextQuestion = quiz[quiz.indexOf(activeQuestion) + 1];
      const correctAnswer = Object.keys(activeQuestion).find((key) => {
        const keyOfQuestion = key as keyof Question;
        return activeQuestion[keyOfQuestion] === foundAnswerInThisQuestion;
      });
      if (correctAnswer) {
        setScore(score + 1);
      }
      if (nextQuestion) {
        setActiveQuestion(nextQuestion);
      } else {
        setDone(true);
      }
    }
  };

  return (
    <Wrapper>
      <Inner>
        <QuestionStyled>
          {done ? (
            <h2>
              You answered {score}/{quiz.length} questions correctly
            </h2>
          ) : (
            <h1>{activeQuestion.question}</h1>
          )}
        </QuestionStyled>

        {!done && (
          <AnswerList>
            <AnswerItem>
              <input
                type="radio"
                id={activeQuestion.a}
                onChange={handlePick(activeQuestion.a)}
                checked={
                  answers.find((aws) => aws.question === activeQuestion.question)?.answer ===
                  activeQuestion.a
                }
              />
              <label htmlFor={activeQuestion.a}>{activeQuestion.a}</label>
            </AnswerItem>

            <AnswerItem>
              <input
                type="radio"
                id={activeQuestion.b}
                onChange={handlePick(activeQuestion.b)}
                checked={
                  answers.find((aws) => aws.question === activeQuestion.question)?.answer ===
                  activeQuestion.b
                }
              />
              <label htmlFor={activeQuestion.b}>{activeQuestion.b}</label>
            </AnswerItem>

            <AnswerItem>
              <input
                type="radio"
                id={activeQuestion.c}
                onChange={handlePick(activeQuestion.c)}
                checked={
                  answers.find((aws) => aws.question === activeQuestion.question)?.answer ===
                  activeQuestion.c
                }
              />
              <label htmlFor={activeQuestion.c}>{activeQuestion.c}</label>
            </AnswerItem>

            <AnswerItem>
              <input
                type="radio"
                id={activeQuestion.d}
                onChange={handlePick(activeQuestion.d)}
                checked={
                  answers.find((aws) => aws.question === activeQuestion.question)?.answer ===
                  activeQuestion.d
                }
              />
              <label htmlFor={activeQuestion.d}>{activeQuestion.d}</label>
            </AnswerItem>
          </AnswerList>
        )}
        <Button onClick={handleSubmit}>
          <span>{done ? 'Reload' : 'Next'}</span>
        </Button>
      </Inner>
    </Wrapper>
  );
}
