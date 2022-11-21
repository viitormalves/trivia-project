export const mockLocalStorage = [
  { name: "a", score:113, picture: "https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661" },
  { name: "b", score:190, picture: "https://www.gravatar.com/avatar/92eb5ffee6ae2fec3ad71c777531578f" },
  { name: "c", score:99, picture: "https://www.gravatar.com/avatar/4a8a08f09d37b73795649038408b5f33" },
  { name: "Test", score:200, picture: "https://www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452" },
];

export const initialState = {
  player: {
    name: 'Test',
    assertions: 3,
    score: 200,
    gravatarEmail: 'test@test.com',
  },
  game: {
    questions: [
      {
        "category": "Geography",
        "type": "boolean",
        "difficulty": "easy",
        "question": "The Republic of Malta is the smallest microstate worldwide.",
        "correct_answer": "False",
        "incorrect_answers": [
          "True"
        ]
      },
      {
        "category": "Science & Nature",
        "type": "multiple",
        "difficulty": "hard",
        "question": "In quantum physics, which of these theorised sub-atomic particles has yet to be observed?",
        "correct_answer": "Graviton",
        "incorrect_answers": [
          "Z boson",
          "Tau neutrino",
          "Gluon"
        ]
      },
      {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Generally, which component of a computer draws the most power?",
        "correct_answer": "Video Card",
        "incorrect_answers": [
          "Hard Drive",
          "Processor",
          "Power Supply"
        ]
      },
      {
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": "easy",
        "question": "What is the most expensive weapon in Counter-Strike: Global Offensive?",
        "correct_answer": "Scar-20/G3SG1",
        "incorrect_answers": [
          "M4A1",
          "AWP",
          "R8 Revolver"
        ]
      },
      {
        "category": "Entertainment: Japanese Anime & Manga",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Who was the Author of the manga Uzumaki?",
        "correct_answer": "Junji Ito",
        "incorrect_answers": [
          "Noboru Takahashi",
          "Akira Toriyama",
          "Masashi Kishimoto",
        ],
      },
    ],
    count: 4,
    valid: true,
  },
};
