/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import { Button, Select } from 'antd';
import { useSpring, animated } from 'react-spring';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const Card = ({
  questions, nextStep, previousHide, previousStep, stepNumber, storage,
}) => {


  const [state, setState] = useState({
    questionsAnswered: [],
    prefilledAnswers: [],
  });

  useEffect(() => {


    if (sessionStorage.getItem(storage)) {
      const prefilledAnswers = JSON.parse(sessionStorage.getItem(storage));
      setState((prevState) => ({ ...prevState, prefilledAnswers }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (key, value) => {
    const { questionsAnswered, prefilledAnswers } = state;
    questionsAnswered[key] = { question: questions[key].question, answer: value };
    prefilledAnswers[key] = { question: questions[key].question, answer: value };
    setState((prevProps) => ({ ...prevProps, questionsAnswered, prefilledAnswers }));
  };

  const { questionsAnswered, prefilledAnswers } = state;
  const enableNext = !(prefilledAnswers.length === questions.length);
  const props = useSpring({
    opacity: 1, delay: 400, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateX(200px)' },
  });

  const setAnsweredQuestion = () => {
    nextStep(questionsAnswered, prefilledAnswers);
    sessionStorage.setItem(storage, JSON.stringify(prefilledAnswers));
  };


  return (
    <>
      {
        questions.map((val, key) => (
          <animated.div key={val.id} style={{ marginBottom: '4rem', ...props }}>
            <h4 style={{ marginBottom: '1rem' }}>
              {val.id}
              )
              {' '}
              {val.question}
            </h4>
            <Select
              value={((prefilledAnswers.length > 0 && prefilledAnswers[key]) ? prefilledAnswers[key].answer : null)}
              placeholder="Select a option"
              onChange={(value) => handleChange(key, value)}
              style={{ width: '300px' }}
            >
              {
                // eslint-disable-next-line max-len
                val.options.map((opt, index) => <Option value={opt} key={index}>{opt}</Option>)
              }
            </Select>
          </animated.div>
        ))
      }
      {!previousHide && <Button type="default" onClick={() => previousStep()} style={{ marginRight: '1rem' }}>Previous</Button>}
      <Button type="primary" onClick={() => setAnsweredQuestion()} disabled={enableNext} style={{ width: '8rem' }}>Next</Button>
    </>
  );
};

export default Card;
