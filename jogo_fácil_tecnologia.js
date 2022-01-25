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
        question:'O que é Hardware?',
        choice1:'A parte lógica do computador.',
        choice2:'A parte física do computador.',
        choice3:'A parte burocrática do computador.',
        choice4:'As pessoas que usam o computador.',
        answer:2,
    },
    
    {
        question:'O que é Software?',
        choice1:'A parte lógica do computador.',
        choice2:'A parte física do computador.',
        choice3:'A parte burocrática do computador.',
        choice4:'As pessoas que usam o computador.',
        answer:1,
    },
    {
        question:'São exemplos de Hardware:',
        choice1:'Power Point, Gabinete e Monitor.',
        choice2:'Windows, Linux e Word.',
        choice3:'Placa-mãe, Memória e Bateria.',
        choice4:'Bateria, Excel e Placa-mãe.',
        answer:3,
    },
    {
        question:'São três exemplos de Software:',
        choice1:'Calculadora, Ábaco e Tabuladora.',
        choice2:'Windows, Ábaco e Calculadora.',
        choice3:'Linux, Memória e Power Point.',
        choice4:'Windows, Linux e Calculadora.',
        answer:4,
    },
    {
        question:'São exemplos de Sistema Operacional:',
        choice1:'Word e Windows.',
        choice2:'Processador e Hardware.',
        choice3:'Linux e Windows.',
        choice4:'Software e Hardware.',
        answer:3,
    }

]
const SCORE_POINTS = 20
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
