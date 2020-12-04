/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Progress, message, Button,
} from 'antd';
import axios from 'axios';
import Container from '../components/container';
import SEO from '../components/seo';
import Card from '../components/QuestionnaireCard';
import PersonalQuestionCard from '../components/PersonalQuestionCard';

import ThankYou from '../components/ThankYou';

import QuestionConfig from '../QuestionConfig';
import './style.less';
import apiDataFormer from '../services/apiDataFormer';
import LeftBanner from '../components/LeftBanner';

const IndexPage = () => {
  const initialState = {
    currentStep: 0,
    questionaire: [],
  };

  const [state, setState] = useState(initialState);
  const [formSelected, setFormSelected] = useState()
  const [trackSelected, setTrackSelected] = useState('A')
  const [stepGroupSelected, setStepGroupSelected] = useState()
  const [stepsNumber, setStepsNumber] = useState()

  const { currentStep } = state;

  function goToNextTrack(prefilled) {

    const [actualQuestions] = formSelected.filter(questions => (questions.step === currentStep && questions.currentTrack === trackSelected))


    if (actualQuestions && actualQuestions.questions) {

      const [actualSingleQuestion] = actualQuestions.questions.filter(question => question.nextTrack)

      if (actualSingleQuestion && actualSingleQuestion) {

        const actualSingleQuestionPosition = actualQuestions.questions.indexOf(actualSingleQuestion)
        const questionReceived = prefilled[actualSingleQuestionPosition]

        const answerPosition = actualSingleQuestion.options.indexOf(questionReceived.answer)

        const nextTrack = actualSingleQuestion.nextTrack[answerPosition]

        setTrackSelected(nextTrack)
      }
    }
  }

  function goToPreviousTrack() {
    const [actualQuestions] = formSelected.filter(questions => (questions.step === currentStep && questions.currentTrack === trackSelected))

    if (actualQuestions) {
      const prevTrack = actualQuestions.prevTrack
      setTrackSelected(prevTrack)
    }

  }

  const nextStep = (questionaire, prefilled) => {

    goToNextTrack(prefilled)

    setState((prevState) => ({ ...prevState, currentStep: currentStep + 1, questionaire: [...prevState.questionaire, ...questionaire] }));
  };

  const previousStep = () => {

    goToPreviousTrack()

    setState((prevState) => ({ ...prevState, currentStep: currentStep - 1 }));
  };

  const finalStep = (personalQuestions) => {
    const apiData = apiDataFormer(personalQuestions);

    // ENDPOINT - VOCE DEVE MANTER ESSE ENDPOINT
    const endPoint = 'https://fortodayapi.agencysavage.com/wrike-task';
    console.log(apiData);
    axios.post(endPoint, {
      title: personalQuestions.name,
      description: apiData,
      // FOLDER ID - VOCE DEVE MANTER ESSE FOLDER ID
      folder: 'IEAA6GKGI4RSVONQ',
    }).then(() => {
      message.success('your response has been submitted');
      setState((prevState) => ({ ...prevState, currentStep: currentStep + 1 }));
    });
  };


  const renderStepGroup = (formSelected, stepGroupSelected) => {
    const [cardSelected] = formSelected.filter(stepObj => ((stepObj.step === currentStep) && (stepObj.currentTrack === trackSelected)))
    const maxSteps = stepGroupSelected.stepsNumber

    if (currentStep < maxSteps) {

      return (
        <Card questions={cardSelected.questions} nextStep={nextStep} previousHide={!cardSelected.step} previousStep={previousStep} stepNumber={currentStep} storage={cardSelected.key} />
      )
    } else {
      return (
        <PersonalQuestionCard questions={[]} nextStep={finalStep} previousStep={previousStep} />
      )
    }
  }

  useEffect(() => {

    sessionStorage.clear()
    setState((prevState) => ({ ...prevState, currentStep: 0 }));


  }, [formSelected])


  return (
    <Container>
      <SEO title="Home" />
      {
        !formSelected ?
          <div className='select-form'>

            <h2>Select Form</h2>

            <div>
              {
                QuestionConfig.map(stepGroup => {

                  const title = stepGroup.title
                  const form = stepGroup.form
                  const steps = stepGroup.stepsNumber

                  return (
                    <Button key={QuestionConfig.indexOf(stepGroup)} type='primary' onClick={() => {
                      setFormSelected(form)
                      setStepGroupSelected(stepGroup)
                      setStepsNumber(steps)
                    }}>
                      {title}
                    </Button>
                  )
                })
              }
            </div>
          </div>
          :
          <>
            <Button type='primary' onClick={() => setFormSelected()} style={{marginBottom: '2rem'}}>
              HOME
              </Button>

            <Row gutter={[100, 40]} justify="center">
              {currentStep !== (stepsNumber + 1) && (
                <>
                  <LeftBanner />
                  <Col xs={24} sm={24} md={24} lg={12} className="textCenter minQuestionareWidth">
                    <Progress percent={(currentStep + 1) * (parseInt(100 / (stepsNumber + 1)))} showInfo status="active" style={{ marginBottom: '2rem' }} />
                    {
                      renderStepGroup(formSelected, stepGroupSelected)
                    }
                  </Col>
                </>
              )}
              {
                currentStep === (stepsNumber + 1) && (
                  <ThankYou />
                )
              }
            </Row>
          </>
      }
    </Container>
  );
};

export default IndexPage;
