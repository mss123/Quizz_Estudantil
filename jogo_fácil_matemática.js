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
        question:'Quanto é 1+1?',
        choice1:'0',
        choice2:'1',
        choice3:'2',
        choice4:'3',
        answer:3,
    },
    
    {
        question:'Quanto é 3x3?',
        choice1:'2',
        choice2:'3',
        choice3:'6',
        choice4:'9',
        answer:4,
    },
    {
        question:'Qual é a raíz quadrada de 9?',
        choice1:'3',
        choice2:'6',
        choice3:'28',
        choice4:'81',
        answer:1,
    },
    {
        question:'Depois de gastar a metade de sua mesada, restou 27 reais. Qual o valor da mesada?',
        choice1:'54 reais',
        choice2:'40 reais',
        choice3:'46 reais',
        choice4:'56 reais',
        answer:1,
    },
    {
        question:'Há uma caixa que possui 60 litros, qual é a metade da capacidade dessa caixa?',
        choice1:'25 litros',
        choice2:'35 litros',
        choice3:'40 litros',
        choice4:'30 litros',
        answer:4,
    },
    
    {
        question:'Depois de caminhar 30 metros, qual foi a metade que ele percorreu?',
        choice1:'30 metros',
        choice2:'15 metros',
        choice3:'45 metros',
        choice4:'40 metros',
        answer:2,
    },
    {
        question:'Qual é a metade de 100 reais?',
        choice1:'25 reais',
        choice2:'50 reais',
        choice3:'75 reais',
        choice4:'100 reais',
        answer:2,
    },
    {
        question:'Qual é a metade de 40?',
        choice1:'10',
        choice2:'15',
        choice3:'20',
        choice4:'25',
        answer:3,
    },
    
    {
        question:'Qual é o dobro de 15?',
        choice1:'5',
        choice2:'10',
        choice3:'20',
        choice4:'30',
        answer:4,
    },
    {
        question:'Quanto é 3-4?',
        choice1:' 1',
        choice2:'-1',
        choice3:'-2',
        choice4:'-3',
        answer:2,
    },
    {
        question:'Quantos metros são 2 kilômetros?',
        choice1:'1000 metros',
        choice2:'2000 metros',
        choice3:'2500 metros',
        choice4:'3500 metros',
        answer:2,
    },
    
    {
        question:'Pedro tinha 30 reais, gastou 25 com quanto ele ficou?',
        choice1:'0',
        choice2:'5',
        choice3:'10',
        choice4:'12',
        answer:2,
    },
    {
        question:'Quanto é 1+1x0?',
        choice1:'0',
        choice2:'1',
        choice3:'-1',
        choice4:'2',
        answer:1,
    },
    {
        question:'Quanto é a raíz quadrada de 36?',
        choice1:'3',
        choice2:'4',
        choice3:'5',
        choice4:'6',
        answer:4,
    },
    
    {
        question:'Quanto é a metade da metade de 20?',
        choice1:'3',
        choice2:'4',
        choice3:'5',
        choice4:'10',
        answer:3,
    },
    {
        question:'Quanto é 40+10?',
        choice1:'30',
        choice2:'50',
        choice3:'55',
        choice4:'60',
        answer:2,
    },
    {
        question:'quanto é 5x20?',
        choice1:'10',
        choice2:'25',
        choice3:'50',
        choice4:'100',
        answer:4,
    },
    
    {
        question:'Quanto é 30 dividido por 10?',
        choice1:'2',
        choice2:'3',
        choice3:'6',
        choice4:'9',
        answer:2,
    },
    {
        question:'Quanto é 30 dividido por 3?',
        choice1:'6',
        choice2:'10',
        choice3:'28',
        choice4:'81',
        answer:2,
    },
    {
        question:'Quanto é 35 dividido por 7?',
        choice1:'3',
        choice2:'5',
        choice3:'7',
        choice4:'9',
        answer:2,
    }

]
const SCORE_POINTS = 20
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
