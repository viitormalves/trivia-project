export const tokenResponse = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6",
};

export const mockLocalStorage = [
  { name: "a", score:113, picture: "https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661" },
  { name: "b", score:190, picture: "https://www.gravatar.com/avatar/92eb5ffee6ae2fec3ad71c777531578f" },
  { name: "c", score:99, picture: "https://www.gravatar.com/avatar/4a8a08f09d37b73795649038408b5f33" },
  { name: "Test", score:200, picture: "https://www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452" },
];

export const questionsResponse = {
  response_code: 0,
  results: [
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Which naval battle was considered the turning point of the Pacific Ocean Theater during World War 2?',
      correct_answer: 'Battle of Midway',
      incorrect_answers: [
        'Attack on Truk Island',
        'Attack on Pearl Harbor',
        'Battle of the Coral Sea'
      ]
    },
    {
      category: 'Geography',
      type: 'boolean',
      difficulty: 'medium',
      question: 'The flag of South Africa features 7 colours.',
      correct_answer: 'False',
      incorrect_answers: [
        'True'
      ]
    },
    {
      category: 'Entertainment: Film',
      type: 'boolean',
      difficulty: 'medium',
      question: 'The colour of the pills in the Matrix were Blue and Yellow.',
      correct_answer: 'False',
      incorrect_answers: [
        'True'
      ]
    },
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Which of these bands are NOT from Australia?',
      correct_answer: 'The Naked and Famous',
      incorrect_answers: [
        'Cut Copy',
        'Empire of the Sun',
        'Tame Impala'
      ]
    },
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'hard',
      question: 'What was the aim of the &quot;Umbrella Revolution&quot; in Hong Kong in 2014?',
      correct_answer: 'Genuine universal suffrage',
      incorrect_answers: [
        'Gaining Independence',
        'Go back under British Rule',
        'Lower taxes'
      ]
    },
  ],
};
