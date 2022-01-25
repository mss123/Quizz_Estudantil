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
        question:'Qual é a capital do Brasil?',
        choice1:'São Paulo',
        choice2:'Brasília',
        choice3:'Rio de Janeiro',
        choice4:'Salvador',
        answer:2,
    },
    
    {
        question:'Qual é a capital da Bahia?',
        choice1:'Salvador',
        choice2:'Recife',
        choice3:'Rio de Janeiro',
        choice4:'São Paulo',
        answer:1,
    },
    {
        question:'Que estado desses fazem parte da região do nordeste?',
        choice1:'Pará',
        choice2:'Rio Grande do Sul',
        choice3:'Bahia',
        choice4:'Rio de Janeiro',
        answer:3,
    },
    {
        question:'Quais são as cores da bandeira do Brasil?',
        choice1:'Azul,branco,e preto',
        choice2:'Verde,vermelho,branco,azul',
        choice3:'Cinza,vermelho,preto,branco',
        choice4:'Verde,amarelo,azul,e branco',
        answer:4,
    },
    {
        question:'Qual é a capital que tem o mesmo nome do estado?',
        choice1:'Salvador',
        choice2:'Porto Alegre',
        choice3:'Recife',
        choice4:'São Paulo',
        answer:4,
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
