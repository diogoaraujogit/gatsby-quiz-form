const QuestionConfig = [
  {
    step: 0,
    key: 0,
    currentTrack: 'A',
    questions: [
      {
        id: 1,
        question: 'What are your goals?',
        options: [
          'Get more conversions',
          'Get more phone leads',
          'Lower cost per conversion',
          'All of the above',
          'Other...',
        ],
      },
      {
        id: 2,
        question: 'Where do you advertise?',
        options: [
          'Nationally',
          'Locally',
          'Internationally',
          'Other...',
        ],
      },
    ]
  },
  {
    step: 1,
    key: 1,
    prevTrack: 'A',
    currentTrack: 'A',
    questions: [
      {
        id: 3,
        question: 'Do you want leads or sales?',
        options: [
          'Leads',
          'Sales',
          'Both, I sell a service and a product',
          'Not sure',
        ],
      },
      {
        id: 4,
        question: 'What’s your monthly PPC ad spend?',
        options: [
          '$0 - $1,000',
          '$1,001 - $5,000',
          '$5,001 - $25,00',
          '$25,001 - $100,000',
          '$100,001+',
        ],
      },
    ]
  },
];

export const StepGroupB = [
  {
    step: 0,
    key: 0,
    currentTrack: 'A',
    questions: [
      {
        id: 1,
        question: 'What is your current notebook model?',
        options: [
          'Mac',
          'Lenovo',
          'Dell',
          'None',
          'Other...',
        ],
      },
      {
        id: 2,
        question: 'What is your current phone model?',
        options: [
          'iPhone',
          'Samsung',
          'Motorola',
          'None',
          'Other...',
        ],
      },
    ]
  },
  {
    step: 1,
    key: 1,
    prevTrack: 'A',
    currentTrack: 'A',
    questions: [
      {
        id: 3,
        question: 'What do you value most in a notebook?',
        options: [
          'Price',
          'Performance',
          'Design',
          'Not sure',
          'Other...'
        ],
      },
      {
        id: 4,
        question: 'What do you value most in a phone?',
        options: [
          'Price',
          'Performance',
          'Design',
          'Camera',
          'Not sure',
          'Other...'
        ],
      },
      {
        id: 5,
        question: 'What do you value most in Apple products?',
        options: [
          'Price',
          'Performance',
          'Design',
          'Not sure',
          'Other...'
        ],
      },
    ]
  },
  {
    step: 2,
    key: 2,
    prevTrack: 'A',
    currentTrack: 'A',
    questions: [
      {
        id: 6,
        question: 'What Apple product are you looking for?',
        options: [
          'MacBook',
          'iPhone',
        ],
        nextTrack: [
          'B',
          'C',
        ],
      },
      
    ]
  },
  {
    step: 3,
    key: 3,
    prevTrack: 'A',
    currentTrack: 'B',
    questions: [
      {
        id: 7,
        question: 'Which MacBook model are you looking for?',
        options: [
          'MacBook Air',
          'MacBook Pro',
          'Other...',
        ],
      },
    ]
  },
  {
    step: 3,
    key: 4,
    prevTrack: 'A',
    currentTrack: 'C',
    questions: [
      {
        id: 7,
        question: 'Which iPhone model are you looking for?',
        options: [
          'iPhone 12',
          'iPhone 11',
          'iPhone X',
          'iPhone XR',
          'Other...',
        ],
      },
    ]
  },
  {
    step: 4,
    key: 5,
    prevTrack: 'B',
    currentTrack: 'B',
    questions: [
      {
        id: 8,
        question: 'How much storage is right for you?',
        options: [
          '1 TB SSD',
          '2 TB SSD',
          '4 TB SSD',
          '8 TB SSD',
        ],
      },
    ]
  },
  {
    step: 4,
    key: 6,
    prevTrack: 'C',
    currentTrack: 'C',
    questions: [
      {
        id: 8,
        question: 'How much storage is right for you?',
        options: [
          '64 GB',
          '128 GB',
          '256 GB',
        ],
      },
    ]
  },
];


const personalQuestionConfig = {
  website: "What's your website?",
  name: 'whats your name?',
  email: "What's your email?",
  phoneNo: "What's your number?",
};

export { personalQuestionConfig };

export default QuestionConfig;
