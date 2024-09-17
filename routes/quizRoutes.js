const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/', quizController.getAllQuizzes);
router.post('/', quizController.createQuiz);
router.get('/:quizId', quizController.getQuiz);
router.put('/:quizId', quizController.updateQuiz);
router.delete('/:quizId', quizController.deleteQuiz);
router.get('/:quizId/populate', quizController.getQuestionsWithKeyword);
router.post('/:quizId/question', quizController.addQuestionToQuiz);
router.post('/:quizId/questions', quizController.addMultipleQuestionsToQuiz);

module.exports = router;