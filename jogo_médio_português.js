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
        question:'Assinale a alternativa em que está correta a formação do plural.',
        choice1:'Atlas; os atlas ',
        choice2:'Mal; maus',
        choice3:'Gavião; gaviães',
        choice4:'Cadáver; cadáveis',
        answer:1,
    },
    
    {
        question:'Indique a alternativa em que todos os substantivos são Masculinos.',
        choice1:'Emblema, dó(pena), telefonema ',
        choice2:'Estudante, cal, alface',
        choice3:'Enigma, idioma, cal',
        choice4:'Edema, diabete, alface',
        answer:1,
    },
    {
        question:'Assinale a construção que fere a Norma Culta.',
        choice1:'Falam mal de si mesmos',
        choice2:'Quero falar consigo ',
        choice3:'O problema é conosco',
        choice4:'O problema é com nós dois',
        answer:2,
    },
    {
        question:'Assinale a forma correta do verbo VIR no presente do Indicativo.',
        choice1:'Vindo Paulo, não há mais nada',
        choice2:'Viesse ele, ora, tudo estaria bem',
        choice3:'Chefe, viemos mostrar a todos esse trabalho',
        choice4:'Vimos, Pedro, abraçá-lo',
        answer:4,
    },
    {
        question:'Assinale a opção que contém mal emprego de pronome pessoal.',
        choice1:'Nada mais há entre mim e ela',
        choice2:'Nada mais há entre mim e ti',
        choice3:'Nada mais há entre eu e ti ',
        choice4:'Nada mais há entre ele e ela',
        answer:3,
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
