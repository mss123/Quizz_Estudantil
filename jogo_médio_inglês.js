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
        question:'Complete: Did you ___ your homework?',
        choice1:'Done',
        choice2:'Do',
        choice3:'Did',
        choice4:'Make',
        answer:2,
    },
    
    {
        question:'O que significa "I am going to travel"?',
        choice1:'Eu vou viajar',
        choice2:'Eu vou brincar',
        choice3:'Eu estou indo ao mercado',
        choice4:'Eu estou indo para a loja',
        answer:1,
    },
    {
        question:'Todas as frases estão gramaticalmente corretas, exceto:',
        choice1:'Does she need help?',
        choice2:'You is my best friend.',
        choice3:'They speak 5 languages, but not german.',
        choice4:'I live with my mom and my sister.',
        answer:2,
    },
    {
        question:'ENROLL significa:',
        choice1:'Enrolado',
        choice2:'Enrolar',
        choice3:'Inscrever',
        choice4:'Caracol',
        answer:3,
    },
    {
        question:'OUTDOOR significa:',
        choice1:'Placa',
        choice2:'Anúncio',
        choice3:'Dor',
        choice4:'Fora de casa',
        answer:4,
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
