const Quiz = require('../models/quiz');
const Question = require('../models/question');

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuiz = async (req, res) => {
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    if (quiz == null) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, { new: true });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.quizId);
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuestionsWithKeyword = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate({
      path: 'questions',
      match: { keywords: 'capital' }
    });
    res.json(quiz.questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addQuestionToQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    const question = new Question(req.body);
    const savedQuestion = await question.save();
    quiz.questions.push(savedQuestion._id);
    await quiz.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addMultipleQuestionsToQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    const questions = await Question.insertMany(req.body);
    quiz.questions.push(...questions.map(q => q._id));
    await quiz.save();
    res.status(201).json(questions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};