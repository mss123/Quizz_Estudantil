
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
        question:'Um novelo de linha possui 100 metros. Se a cada dia se gasta 5 metros, em quantos dias irá acabar?',
        choice1:'30 dias',
        choice2:'12 dias',
        choice3:'20 dias',
        choice4:'25 dias',
        answer:3,
    },
    
    {
        question:'Qual das cinco alternativas representa a melhor comparação? "AMOR está para ROMA assim como 5232 está para..."',
        choice1:'5223',
        choice2:'3252',
        choice3:'2325',
        choice4:'2523',
        answer:3,
    },
    {
        question:'Ao entrar numa sala, João contou 4 pessoas, incluindo ele. Todos estavam calçados. Sem contar com ele quantos sapatos havia na sala?',
        choice1:'4',
        choice2:'6',
        choice3:'8',
        choice4:'10',
        answer:2,
    },
    {
        question:'Com R$ 120,00 é possível comprar 6 pastas, a R$ 4,00 a unidade, e 8 cadernos iguais, não restando troco algum. O maior número de pastas que podem ser compradas com o mesmo valor pago na compra de um caderno é:  ',
        choice1:'3',
        choice2:'5',
        choice3:'8',
        choice4:'10',
        answer:1,
    },
    {
        question:'Carros e motos estão estacionadas em um pátio. O número de carros está para o de motos, em uma razão de 5 para 2, respectivamente. Se 20 outras motos forem estacionadas nesse pátio, a razão entre o número de carros e motos passa a ser de 5 para 6, respectivamente. Quantos carros estão no pátio?',
        choice1:'11',
        choice2:'16',
        choice3:'21',
        choice4:'25',
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
