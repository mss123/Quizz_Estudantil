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
        question:'Seja X o subconjunto dos números inteiros dado por {0,1,2,3,4,5}. Quantos pares distintos (A,B) de subconjuntos A e B de X existem tais que AC– B = {0,1}, em que AC denota o complementar de A em X?',
        choice1:'16',
        choice2:'14',
        choice3:'10',
        choice4:'12',
        answer:4,
    },
    
    {
        question:'Durante uma viagem choveu 5 vezes. A chuva caia pela manhã ou à tarde, nunca o dia todo.Houve 6 manhãs e 3 tardes sem chuvas. Quantos dias durou a viagem:',
        choice1:'6',
        choice2:'7',
        choice3:'8',
        choice4:'9',
        answer:2,
    },
    {
        question:'Se n é o número de subconjuntos não vazios do conjunto formado pelos múltiplos estritamente positivos de 5, menores do que 40, então o valor de n é:',
        choice1:'127',
        choice2:'125',
        choice3:'124',
        choice4:'120',
        answer:1,
    },
    {
        question:'Num grupo de estudantes, 80% estudam Inglês, 40% estudam Francês e 10% não estudam nenhuma dessas duas línguas. Nesse grupo, a porcentagem de alunos que estudam ambas as línguas é:',
        choice1:'25%',
        choice2:'30%',
        choice3:'35%',
        choice4:'40%',
        answer:2,
    },
    {
        question:'Numa pesquisa sobre o consumo dos produtos A, B e C, obteve-se o seguinte resultado:68% dos entrevistados consomem A, 56% consomem B, 66% consomem C e 15% não consomem nenhum dos produtos. Qual a percentagem mínima de entrevistados que consomem A, B e C?',
        choice1:'5%',
        choice2:'10%',
        choice3:'15%',
        choice4:'20%',
        answer:4,
    }

]
const SCORE_POINTS = 40
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