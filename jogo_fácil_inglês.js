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
        question:'Marque a alternativa que apresenta a tradução das cores: grey, blue, purple, gold.',
        choice1:'Preto, amarelo, azul, dourado.',
        choice2:'Cinza, azul, roxo, dourado.',
        choice3:'Branco, lilás, amarelo, cinza.',
        choice4:'Cinza, azul, rosa, preto.',
        answer:2,
    },
    
    {
        question:'Marque a opção que apresenta o resultado da equação escrito por extenso: 5 + 15 =?',
        choice1:'Twenty',
        choice2:'Fifteen',
        choice3:'Thirty-one',
        choice4:'Ten',
        answer:1,
    },
    {
        question:'Qual das opções abaixo se refere ao seguinte número: fifty seven?',
        choice1:'37',
        choice2:'47',
        choice3:'57',
        choice4:'67',
        answer:3,
    },
    {
        question:'O que é "Bom dia" em inglês',
        choice1:'Good afternoon',
        choice2:'Good evening',
        choice3:'Good night',
        choice4:'Good morning',
        answer:4,
    },
    {
        question:'Quanto é o número 5 em inglês?',
        choice1:'One',
        choice2:'Two',
        choice3:'Four',
        choice4:'Five',
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
