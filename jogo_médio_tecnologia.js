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
        question:'O que é o software?',
        choice1:'Conjunto de programas que permite o funcionamento e utilização da máquina.',
        choice2:'Conjunto de componente que permite o funcionamento e utilização do sistema operacional.',
        choice3:'Conjunto de programas que permite o funcionamento e utilização do navegador.',
        choice4:'Conjunto de componentes que formam a parte física do computador.',
        answer:1,
    },
    
    {
        question:'São características de um software livre, exceto:',
        choice1:'O usuário pode executar o software, para qualquer uso.',
        choice2:'Possui livre acesso ao código-fonte.',
        choice3:'Não é permitido redistribuir cópias.',
        choice4:'Existe a liberdade de estudar o funcionamento do programa e de adaptá-lo às suas necessidades.',
        answer:3,
    },
    {
        question:'O disco rígido, do inglês hard disk, também conhecido como HD, serve como:',
        choice1:'Transporte de dados.',
        choice2:'Unidade de armazenamento permanente, guardando dados e programas.',
        choice3:'Programa de edição de textos.',
        choice4:'Armazenamento de memória volátil, que se perde com o desligamento do computador.',
        answer:2,
    },
    {
        question:'São sistemas operacionais exceto:',
        choice1:'Windows',
        choice2:'Macintosh',
        choice3:'Linux',
        choice4:'Apple',
        answer:4,
    },
    {
        question:'“Random Access Memory” é mais conhecida como:',
        choice1:'Memória ROM.',
        choice2:'Memória interna.',
        choice3:'Memória externa.',
        choice4:'Memória RAM.',
        answer:4,
    }
]
const SCORE_POINTS = 30
const MAX_QUESTIONS = 4

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
