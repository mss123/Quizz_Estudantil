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
        question:'Qual é o maior país do mundo em área (km²)',
        choice1:'China',
        choice2:'índia',
        choice3:'Rússia',
        choice4:'Estados Unidos',
        answer:3,
    },
    
    {
        question:'O maior dos continentes, tanto em área como em população, é a:',
        choice1:'Ásia',
        choice2:'África',
        choice3:'Europa',
        choice4:'América do Norte',
        answer:1,
    },
    {
        question:'Qual é aproximadamente a população do estado de São Paulo?',
        choice1:'5 milhões',
        choice2:'10 milhões',
        choice3:'12 milhões',
        choice4:'45 milhões',
        answer:4,
    },
    {
        question:'Qual a bandeira, entre os países abaixo, que não possui nenhum elemento na cor amarela?',
        choice1:'Argentina',
        choice2:'Brasil',
        choice3:'Cuba',
        choice4:'Uruguai',
        answer:3,
    },
    {
        question:'O país El Salvador está localizado na...',
        choice1:'América do Sul',
        choice2:'América Central',
        choice3:'América do Norte',
        choice4:'Ásia',
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
