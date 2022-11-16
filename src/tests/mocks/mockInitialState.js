const initialState = {
  player: {
    name: 'Test',
    assertions: 3,
    score: 200,
    gravatarEmail: 'test@test.com'
  },
  game: {
    questions: [
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
      }
    ],
    count: 4,
    valid: true
  }
}

export default initialState;
