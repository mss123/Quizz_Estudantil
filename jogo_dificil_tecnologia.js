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
        question:'Para fazer a cópia, o usuário pode selecionar o arquivo no Windows Explorer do MS-Windows 7, pressionar o atalho de teclado ____________, depois, selecionar a pasta do disco rígido externo onde quer salvar a cópia do documento de texto e, então, pressionar o atalho de teclado _____________.',
        choice1:'Ctrl+C … Ctrl+X',
        choice2:'Ctrl+C … Ctrl+V',
        choice3:'Ctrl+X … Ctrl+C',
        choice4:'Ctrl+X … Ctrl+V',
        answer:2,
    },
    
    {
        question:'Durante a crise causada pela pandemia do covid-19, com muitos profissionais trabalhando em suas casas, os softwares que gerenciam videoconferências se mostraram extremamente úteis. Considerando essa informação, assinale a alternativa que não apresenta um desses softwares.',
        choice1:'Zoom',
        choice2:'Google Hangouts',
        choice3:'Microsoft Teams',
        choice4:'Microsoft Sway',
        answer:4,
    },
    {
        question:'Assinale a alternativa que apresenta a maior altura de letra que se pode capitular no programa Word 2013.',
        choice1:'2',
        choice2:'6',
        choice3:'10',
        choice4:'12',
        answer:3,
    },
    {
        question:'Assinale a alternativa CORRETA, de acordo com a obra A sociedade em rede, de Manuel Castells:',
        choice1:'A afirmação sobre o papel preeminente da tecnologia da informação muitas vezes é confundida com a caracterização da revolução atual como sendo essencialmente dependente de novos conhecimentos e informação.',
        choice2:'O que caracteriza a atual revolução tecnológica é a centralidade de conhecimentos e informação e a aplicação desses conhecimentos e dessa informação para geração de dispositivos de comunicação.',
        choice3:'Como tecnologia da informação, entendem-se a elaboração e o uso de conhecimentos computacionais para especificar as vias de se fazerem as coisas de uma maneira disruptiva.',
        choice4:'Entre as tecnologias da informação e comunicação, inclui-se o conjunto divergente de tecnologias em microinformática, computação, comunicação, eletrônica e nanotecnologia.',
        answer:2,
    },
    {
        question:'Agente de Fiscalização Financeira/TER-SP/FCC/2005) Diversos modelos de barramento tais como ISA e PCI, por exemplo, são, disponibilizados na placa mãe dos microcomputadores por meio de conectores chamados de:',
        choice1:'Slots',
        choice2:'Boot',
        choice3:'Bios',
        choice4:'Cmos',
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