const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarfull = document.querySelector('#progressBarfull');


let currentQuestion={}
let acceptingAnswers=true
let score=0
let questionCounter=0
let availableQuestions = []

let questions = [
    {
        question:'Qual é a capital de Minas Gerais?',
        choice1:'Belo Horizonte',
        choice2:'São Paulo',
        choice3:'Rio de Janeiro',
        choice4:'Salvador',
        answer:1,
    },
    
    {
        question:'O Brasil faz parte do continente:',
        choice1:'Asiático',
        choice2:'América do Sul',
        choice3:'América Central',
        choice4:'Europeu',
        answer:2,
    },
    {
        question:'Quanto é 3x3x3?',
        choice1:'3',
        choice2:'9',
        choice3:'27',
        choice4:'81',
        answer:3,
    },
    {
        question:'Qual a comida típica do São João?',
        choice1:'Bolo de Milho e Arroz',
        choice2:'Arroz e Feijão',
        choice3:'Canjica e Feijão',
        choice4:'Bolo de Milho e Pamonha',
        answer:4,
    },
    {
        question:'Qual é o sucessor do sucessor do antecessor de 30?',
        choice1:'29',
        choice2:'30',
        choice3:'31',
        choice4:'32',
        answer:3,
    }

]
const SCORE_POINTS = 40
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions =[...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText =`Questão ${questionCounter} `

    const questionsIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice'+ number]
    })

    availableQuestions.splice(questionsIndex,1)
    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
            teste.play()
        }
        if(classToApply === 'incorrect'){
            localStorage.setItem('mostRecentScore',score)
            window.location.assign('end.html');
            erro.play()
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num =>{
    score+=num
    scoreText.innerText = score
}
startGame()