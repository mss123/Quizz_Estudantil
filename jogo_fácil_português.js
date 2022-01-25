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
        question:'Indique o substantivo que admite dois plurais.',
        choice1:'Demão',
        choice2:'Cristão',
        choice3:'Verão',
        choice4:'Irmão',
        answer:3,
    },
    
    {
        question:'Indique o grupo de vocábulos que só admitem a letra "O".',
        choice1:'Cal, dó, sentinela',
        choice2:'Casulo, apêndice, apendicite',
        choice3:'Trama, elipse, omoplata',
        choice4:'Telefonema, eclipse, afã ',
        answer:4,
    },
    {
        question:'Uma das frases abaixo está INCORRETA.',
        choice1:'Pedro, desejo falar consigo um instante ',
        choice2:'Espero que você leve consigo o pacote',
        choice3:'Cada um faça por si a redação',
        choice4:'Sem ti e mim poucas coisas se fariam nesta casa',
        answer:1,
    },
    {
        question:'Indique a oração que NÃO está na voz Ativa.',
        choice1:'Comeu tudo',
        choice2:'Comeu-se toda a salada ',
        choice3:'Comeu-se muito',
        choice4:'Comeram tudo',
        answer:2,
    },
    {
        question:'Uma das palavras abaixo NÃO é um substantivo.',
        choice1:'Melanina',
        choice2:'Mensagem',
        choice3:'Mensageiro',
        choice4:'Momento',
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
