/* eslint-disable max-len */
/* eslint-disable no-undef */
import { personalQuestionConfig } from '../QuestionConfig';

const apiDataFormer = (personalQuestions) => {
  let questionAnswers = [];
  const storageKeys = Object.keys(sessionStorage);
  const index = storageKeys.indexOf('personal');
  if (index > -1) {
    storageKeys.splice(index, 1);
  }

  // eslint-disable-next-line no-return-assign
  storageKeys.map((val) => questionAnswers = [...questionAnswers, ...JSON.parse(sessionStorage.getItem(val))]);
  console.log(storageKeys, questionAnswers);
  // eslint-disable-next-line max-len
  Object.keys(personalQuestionConfig).map((key) => questionAnswers.push({ question: personalQuestionConfig[key], answer: personalQuestions[key] }));
  let htmlString = '';
  for (let i = 0; i < questionAnswers.length; i += 1) {
    htmlString += `<h2>${i + 1}) ${questionAnswers[i].question}</h2><p>${questionAnswers[i].answer}</p>`;
  }
  sessionStorage.clear();
  return htmlString;
};

export default apiDataFormer;
