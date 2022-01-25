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
        question:'Pequeno objeto usado como auxiliar para se operar um computador e que tem nome de um animal',
        choice1:'Mouse ou rato',
        choice2:'Chicken ou galinha',
        choice3:'Mouse ou pato',
        choice4:'Besouro ou bug',
        answer:1,
    },
    
    {
        question:'Animal voador no qual, de acordo com a lenda, o vampiro se transforma.',
        choice1:'Andorinha',
        choice2:'Coruja',
        choice3:'Urubu',
        choice4:'Morcego',
        answer:4,
    },
    {
        question:'Nome que se dá ao processo de reaproveitamento de lixo.',
        choice1:'Ecologia',
        choice2:'Racionamento',
        choice3:'Reciclagem',
        choice4:'Drenagem linfática',
        answer:3,
    },
    {
        question:'Complete a frase a seguir:"De Grão em grão..."',
        choice1:'O galo fica maior',
        choice2:'A galinha enche o papo',
        choice3:'O depósito fica cheio',
        choice4:'A galinha fica mais gorda',
        answer:2,
    },
    {
        question:'Planeta do sistema solar famoso pelos seus enormes anéis de poeira.',
        choice1:'Terra',
        choice2:'Marte',
        choice3:'Mercúrio',
        choice4:'Saturno',
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
        else if (classToApply === 'incorrect'){
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
