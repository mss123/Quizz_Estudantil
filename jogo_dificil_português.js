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
        question:'Assinale a alternativa em que o adjetivo que qualifica o substantivo seja explicativo.',
        choice1:'Moça bonita',
        choice2:'Fogo quente ',
        choice3:'Dia chuvoso',
        choice4:'Lua cheia',
        answer:2,
    },
    
    {
        question:'Assinale a único grupo de palavras do mesmo gênero.',
        choice1:'Planeta, Júpiter, Laranja',
        choice2:'Cavalo, Mamute, Lagartixa',
        choice3:'Alecrim, Cadarço, Tesoura',
        choice4:'Cidade, Tempestade, Meiguice ',
        answer:4,
    },
    {
        question:'Assinale a única frase correta quanto ao uso dos pronomes pessoais.',
        choice1:'Meu amigo, o diretor quer falar consigo ',
        choice2:'Entre eu e tu não pode haver romance',
        choice3:'Para mim, jogador de futebol tem que ter raça ',
        choice4:'Você não pode ir sem eu',
        answer:3,
    },
    {
        question:'Há concordância inadequada em...',
        choice1:'Terras e clima desconhecidas ',
        choice2:'Terras e clima desconhecido',
        choice3:'Clima e terras desconhecidas',
        choice4:'Clima e terra desconhecidos',
        answer:1,
    },
    {
        question:'Indique o grupo de palavras onde há uma incompatibilidade.',
        choice1:'Ressarcir, Indenizar, Reparar',
        choice2:'Pacífico, Calmo, Crespo ',
        choice3:'Flutuar, Boiar, Afundar',
        choice4:'Fobia, Pavor, Medo',
        answer:2,
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