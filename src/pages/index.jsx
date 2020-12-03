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
import { StepGroupB } from '../QuestionConfig'
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
  // const [stepGroupSelected, setStepGroupSelected] = useState()

  const { currentStep } = state;
  const nextStep = (questionaire, prefilled) => {

    const actualQuestions = formSelected.filter(questions => (questions.step === currentStep && questions.currentTrack === trackSelected))

    if (actualQuestions && actualQuestions[0] && actualQuestions[0].questions) {

      const actualSingleQuestion = actualQuestions[0].questions.filter(question => question.nextTrack)

      if (actualSingleQuestion && actualSingleQuestion[0]) {

        const actualSingleQuestionPosition = actualQuestions[0].questions.indexOf(actualSingleQuestion[0])
        const questionReceived = prefilled[actualSingleQuestionPosition]
    
        const idx = actualSingleQuestion[0].options.indexOf(questionReceived.answer)

        const nextTrack = actualSingleQuestion[0].nextTrack[idx]

        setTrackSelected(nextTrack)
      }
    }

    setState((prevState) => ({ ...prevState, currentStep: currentStep + 1, questionaire: [...prevState.questionaire, ...questionaire] }));
  };

  const previousStep = () => {

    const actualQuestions = formSelected.filter(questions => (questions.step === currentStep && questions.currentTrack === trackSelected))

    if (actualQuestions && actualQuestions[0]) {
      const prevTrack = actualQuestions[0].prevTrack
      setTrackSelected(prevTrack)
    }

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

  useEffect(() => {

    sessionStorage.clear()

  }, [formSelected])


  return (
    <Container>
      <SEO title="Home" />
      {
        !formSelected ?
          <div className='select-form'>

            <h2>Select Form</h2>

            <div>
              <Button type='primary'>
                HOME
              </Button>
              <Button type='primary' onClick={() => setFormSelected(QuestionConfig)}>
                FORM
              </Button>
              <Button type='primary' onClick={() => setFormSelected(StepGroupB)}>
                FORM 2
              </Button>
            </div>
          </div>
          :
          formSelected === StepGroupB ?
            <Row gutter={[100, 40]} justify="center">
              {currentStep !== 6 && (
                <>
                  <LeftBanner />
                  <Col xs={24} sm={24} md={24} lg={12} className="textCenter minQuestionareWidth">
                    <Progress percent={(currentStep + 1) * 14} showInfo status="active" style={{ marginBottom: '2rem' }} />
                    {currentStep === 0 && <Card questions={StepGroupB[0].questions} nextStep={nextStep} previousHide previousStep={previousStep} stepNumber={currentStep} storage={StepGroupB[0].key} />}
                    {currentStep === 1 && <Card questions={StepGroupB[1].questions} nextStep={nextStep} previousStep={previousStep} stepNumber={currentStep} storage={StepGroupB[1].key} />}
                    {currentStep === 2 && <Card questions={StepGroupB[2].questions} nextStep={nextStep} previousStep={previousStep} stepNumber={currentStep} storage={StepGroupB[2].key} />}
                    {currentStep === 3 && trackSelected === 'B' && <Card questions={StepGroupB[3].questions} nextStep={nextStep} previousStep={previousStep} storage={StepGroupB[3].key} stepNumber={currentStep} />}
                    {currentStep === 3 && trackSelected === 'C' && <Card questions={StepGroupB[4].questions} nextStep={nextStep} previousStep={previousStep} storage={StepGroupB[4].key} stepNumber={currentStep} />}
                    {currentStep === 4 && trackSelected === 'B' && <Card questions={StepGroupB[5].questions} nextStep={nextStep} previousStep={previousStep} storage={StepGroupB[5].key} stepNumber={currentStep} />}
                    {currentStep === 4 && trackSelected === 'C' && <Card questions={StepGroupB[6].questions} nextStep={nextStep} previousStep={previousStep} storage={StepGroupB[6].key} stepNumber={currentStep} />}
                    {currentStep === 5 && <PersonalQuestionCard questions={[]} nextStep={finalStep} previousStep={previousStep} />}
                  </Col>
                </>
              )}
              {
                currentStep === 6 && (
                  <ThankYou />
                )
              }
            </Row>
            :

            <Row gutter={[100, 40]} justify="center">
              {currentStep !== 3 && (
                <>
                  <LeftBanner />
                  <Col xs={24} sm={24} md={24} lg={12} className="textCenter minQuestionareWidth">
                    <Progress percent={(currentStep + 1) * 33} showInfo status="active" style={{ marginBottom: '2rem' }} />
                    {currentStep === 0 && <Card questions={QuestionConfig[0].questions} nextStep={nextStep} previousHide previousStep={previousStep} storage={QuestionConfig[0].key} stepNumber={currentStep} />}
                    {currentStep === 1 && <Card questions={QuestionConfig[1].questions} nextStep={nextStep} previousStep={previousStep} storage={QuestionConfig[1].key} stepNumber={currentStep} />}
                    {currentStep === 2 && <PersonalQuestionCard questions={[]} nextStep={finalStep} previousStep={previousStep} />}
                  </Col>
                </>
              )}
              {
                currentStep === 3 && (
                  <ThankYou />
                )
              }
            </Row>
      }
    </Container>
  );
};

export default IndexPage;
