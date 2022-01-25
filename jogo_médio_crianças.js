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
        question:'Qual é o animal que vive debaixo da água?',
        choice1:'Passáro',
        choice2:'Gato',
        choice3:'Peixe',
        choice4:'Rato',
        answer:3,
    },
    
    {
        question:'Quais dessas palavras são as vogais?',
        choice1:'A-E-I-O-U',
        choice2:'A-B-E-I-U',
        choice3:'A-E-I-C-U',
        choice4:'A-E-I-O-T',
        answer:1,
    },
    {
        question:'Qual dessas palavras são as consoantes?',
        choice1:'A-B-C',
        choice2:'T-P-Q',
        choice3:'A-S-R',
        choice4:'L-B-O',
        answer:2,
    },
    {
        question:'Um dos itens abaixo não se parece com os demais.',
        choice1:'Copo',
        choice2:'Taça',
        choice3:'Xicará',
        choice4:'Prato',
        answer:4,
    },
    {
        question:'Qual é o antecessor do número 100?',
        choice1:'98',
        choice2:'99',
        choice3:'100',
        choice4:'101',
        answer:2,
    }

]
const SCORE_POINTS = 30
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
