const mongoose = require('mongoose');
const Question = require('../src/models/Question');

require('dotenv').config();

const questions = [
  {
    question: "What does MERN stack stand for?",
    options: [
      "MySQL, Express, React, Node.js",
      "MongoDB, Express, React, Node.js",
      "MongoDB, Ember, React, Next.js",
      "MariaDB, Express, Redux, Node.js"
    ],
    correctAnswer: 1,
    explanation: "MERN stands for MongoDB (database), Express.js (backend framework), React (frontend library), and Node.js (runtime environment). MySQL is a SQL database, not part of MERN.",
    category: "Web Development",
    difficulty: "Easy"
  },
  {
    question: "Which hook is used to manage state in React functional components?",
    options: [
      "useEffect",
      "useContext",
      "useState",
      "useReducer"
    ],
    correctAnswer: 2,
    explanation: "useState is the primary hook for managing local state in functional components. useEffect is for side effects, useContext is for consuming context, and useReducer is for complex state logic.",
    category: "React",
    difficulty: "Easy"
  },
  {
    question: "What is the default port for MongoDB?",
    options: [
      "3000",
      "5432",
      "27017",
      "8080"
    ],
    correctAnswer: 2,
    explanation: "MongoDB's default port is 27017. Port 3000 is commonly used for Node.js apps, 5432 for PostgreSQL, and 8080 for various web servers.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    question: "Which method is used to define routes in Express.js?",
    options: [
      "app.route()",
      "app.get(), app.post(), etc.",
      "app.use()",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Express.js provides multiple ways to define routes: app.get/post/put/delete for specific HTTP methods, app.route() for chaining, and app.use() for middleware and route mounting. All are valid approaches.",
    category: "Backend",
    difficulty: "Medium"
  },
  {
    question: "What does the 'useEffect' hook do in React?",
    options: [
      "Manages component state",
      "Performs side effects in functional components",
      "Creates context providers",
      "Handles form submissions"
    ],
    correctAnswer: 1,
    explanation: "useEffect is used to perform side effects like data fetching, subscriptions, or DOM manipulation. It runs after render and can be controlled with dependencies. State management is done with useState.",
    category: "React",
    difficulty: "Easy"
  },
  {
    question: "Which of the following is NOT a valid MongoDB data type?",
    options: [
      "ObjectId",
      "String",
      "Float",
      "Date"
    ],
    correctAnswer: 2,
    explanation: "MongoDB uses 'Double' and 'Decimal128' for floating-point numbers, not 'Float'. ObjectId, String, and Date are all valid MongoDB data types. The BSON specification defines specific numeric types.",
    category: "Database",
    difficulty: "Hard"
  },
  {
    question: "What is the purpose of middleware in Express.js?",
    options: [
      "To style components",
      "To process requests before they reach route handlers",
      "To manage database connections only",
      "To compile TypeScript code"
    ],
    correctAnswer: 1,
    explanation: "Middleware functions have access to request and response objects and can execute code, modify them, end the request-response cycle, or call the next middleware. They're essential for authentication, logging, parsing, etc.",
    category: "Backend",
    difficulty: "Medium"
  },
  {
    question: "In React, what is the Virtual DOM?",
    options: [
      "A physical copy of the actual DOM",
      "A lightweight JavaScript representation of the DOM",
      "A database for storing DOM elements",
      "A CSS framework"
    ],
    correctAnswer: 1,
    explanation: "The Virtual DOM is a lightweight JavaScript object that mirrors the actual DOM. React uses it to efficiently calculate what changes are needed before updating the real DOM, improving performance.",
    category: "React",
    difficulty: "Medium"
  },
  {
    question: "Which Mongoose method is used to find all documents in a collection?",
    options: [
      "Model.findAll()",
      "Model.find()",
      "Model.getAll()",
      "Model.select()"
    ],
    correctAnswer: 1,
    explanation: "Mongoose uses Model.find() to retrieve documents. Without parameters, it returns all documents. findAll() and getAll() don't exist in Mongoose, and select() is used to specify fields to return.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    question: "What does CORS stand for in web development?",
    options: [
      "Cross-Origin Resource Sharing",
      "Complete Origin Request Security",
      "Client-Origin Response System",
      "Cross-Object Resource Security"
    ],
    correctAnswer: 0,
    explanation: "CORS (Cross-Origin Resource Sharing) is a security mechanism that allows or restricts resources to be requested from another domain. It's essential for APIs that need to be accessed from different origins.",
    category: "Web Development",
    difficulty: "Medium"
  }
];

const seedDatabase = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app');
    // });

    console.log('✅ MongoDB Connected');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    // Insert new questions
    await Question.insertMany(questions);
    console.log(`✅ Successfully seeded ${questions.length} questions`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();