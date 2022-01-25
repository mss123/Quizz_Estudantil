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
        question:'“…the Pony Express became legendary for its exploits …” The best translation for the word “exploits” is:',
        choice1:'Explorações',
        choice2:'Investigações',
        choice3:'Explosões',
        choice4:'Proezas',
        answer:4,
    },
    
    {
        question:'The corresponding synonym of the underlined word in “Illustrating decades of research with compelling and often bizarre examples of glitches” is:',
        choice1:'Aggressive',
        choice2:'Complacent',
        choice3:'Unreal',
        choice4:'Defensible',
        answer:4,
    },
    {
        question:'The word “masterpiece” is wrongly used in:',
        choice1:'This is one of the great masterpieces of European art.',
        choice2:'It was a masterpiece of deceit.',
        choice3:'The masterpiece of the expedition was a Frenchman',
        choice4:'“One day I’ll paint a masterpiece.”',
        answer:3,
    },
    {
        question:'According to the text, if you “tackle” a difficult task or problem, you:',
        choice1:'Deliberately don’t do what you have been told to do.',
        choice2:'Deal with it in a very determined or efficient way.',
        choice3:'Decide that it is not important enough for you to think about it.',
        choice4:'Are aware of it but don’t know what to do.',
        answer:2,
    },
    {
        question:'The corresponding synonym of the underlined word in “…by post-modern philosophers and, most important of all, by stingy politicians” is:',
        choice1:'Mean',
        choice2:'Modest',
        choice3:'Thoughtful',
        choice4:'Allergic',
        answer:1,
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