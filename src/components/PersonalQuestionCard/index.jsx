/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import {
  Button, Input,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import inputValidation from '../../services/inputValidation';

const PersonalQuestionCard = ({ nextStep, previousStep }) => {
  const [state, setState] = useState({
    personalQuestionsAnswered: {},
  });

  useEffect(() => {
    if (sessionStorage.getItem('personal')) {
      const personalQuestionsAnswered = JSON.parse(sessionStorage.getItem('personal'));
      setState((prevState) => ({ ...prevState, personalQuestionsAnswered }));
    }
  }, []);
  const { personalQuestionsAnswered } = state;
  const enableNext = !(Object.keys(personalQuestionsAnswered).length === 4);
  const props = useSpring({
    opacity: 1, delay: 400, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateX(200px)' },
  });
  const questionsHandle = (questionName, answer) => {
    if (answer) {
      personalQuestionsAnswered[questionName] = answer;
      setState((prevProps) => ({ ...prevProps, personalQuestionsAnswered }));
      sessionStorage.setItem('personal', JSON.stringify(personalQuestionsAnswered));
    } else {
      delete personalQuestionsAnswered[questionName];
      setState((prevProps) => ({ ...prevProps, personalQuestionsAnswered }));
    }
  };

  const { emailErr, websiteErr } = inputValidation(personalQuestionsAnswered);
  const {
    website, name, email, phoneNo,
  } = personalQuestionsAnswered;
  return (
    <>
      <animated.div style={props} className="personalQuestionPage">
        <div className="questionMrbtm">
          <h4 className="answerMarginbtm">
            1) What&apos;s your website?
          </h4>
          <Input className="inputSize" value={website && website} onChange={({ target: { value } }) => { questionsHandle('website', value); }} />
          {websiteErr && <p className="error">{websiteErr}</p>}
        </div>
        <div className="questionMrbtm">
          <h4 className="answerMarginbtm">
            2) What&apos;s your name?
          </h4>
          <Input className="inputSize" value={name && name} onChange={({ target: { value } }) => { questionsHandle('name', value); }} />
        </div>
        <div className="questionMrbtm">
          <h4 className="answerMarginbtm">
            3) What&apos;s your email?
          </h4>
          <Input className="inputSize" value={email && email} onChange={({ target: { value } }) => { questionsHandle('email', value); }} />
          {emailErr && <p className="error">{emailErr}</p>}
        </div>

        <div className="questionMrbtm">
          <h4 className="answerMarginbtm">
            4) What&apos;s your number?
          </h4>
          <Input className="inputSize" value={phoneNo && phoneNo} onChange={({ target: { value } }) => { questionsHandle('phoneNo', value); }} />
        </div>
      </animated.div>
      <Button type="default" onClick={() => previousStep()} style={{ marginRight: '1rem' }}>Previous</Button>
      <Button type="primary" onClick={() => nextStep(personalQuestionsAnswered)} disabled={enableNext} style={{ width: '8rem' }}>Submit</Button>
    </>
  );
};

export default PersonalQuestionCard;
