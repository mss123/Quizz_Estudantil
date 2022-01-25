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
        question:'Os conflitos no campo decorrem dos seguintes fatores, EXCETO:',
        choice1:'Histórica concentração fundiária.',
        choice2:'Desemprego estrutural decorrente da mecanização do campo.',
        choice3:'Falta de um projeto nacional de desenvolvimento que estimule a expansão do mercado interno.',
        choice4:'Relações de trabalho não opressivas.',
        answer:3,
    },
    
    {
        question:'Dos elementos de identificação de um documento cartográfico expressos abaixo, assinale qual(is) contribui(em) para a compreensão direta do seu conteúdo:',
        choice1:'Orientação',
        choice2:'Título e subtítulo ',
        choice3:'Autor',
        choice4:'Escala',
        answer:2,
    },
    {
        question:'Tendo em vista a classificação feita pelo IBGE, assinale a opção que contém, respectivamente, exemplos de metrópole nacional e regional.',
        choice1:'Recife e Salvador',
        choice2:'Brasília e Belo Horizonte',
        choice3:'São Paulo e Rio de Janeiro ',
        choice4:'Manaus e Porto Velho',
        answer:3,
    },
    {
        question:'Uma característica da federação brasileira, que a diferencia das  outras, é a',
        choice1:'Pouca autonomia dos Estados brasileiros, frente à União e aos Municípios.',
        choice2:'Existência de dois níveis federativos, a União e os Estados.',
        choice3:'Autonomia financeira dos Estados e Municípios.',
        choice4:'Existência de três níveis federativos: União, Estados e Municípios.',
        answer:4,
    },
    {
        question:'Assinale a opção que indica a localização da Serra de Carajás e a do porto de exportação dos seus minérios, respectivamente:',
        choice1:'Pará e Maranhão ',
        choice2:'Pará e Amapá',
        choice3:'Roraima e Amapá',
        choice4:'Amazonas e Roraima',
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