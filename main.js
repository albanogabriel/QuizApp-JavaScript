const questions = [
    {
        question: "Which is largest animal in the world ?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is largest desert in the world ?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ] 
    },
    {
        question: "Which is the smallest continent in the world ?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Artic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
]

const questionElement = document.getElementById('question')  
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    //set a state for a currentQuestionIndex and Score. 
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    //renderiza o número e o título no question element, usando como ref. o index do array de objetos. (o +1 é para burlar o [0(0+1), 1(1+1)...])
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}` 

    //renderiza todas as answers.text de questions, nosso array de objetos
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
            console.log(button)
        }
        button.addEventListener('click', selectAnswer)
    })
}

function resetState() {
    //remove all preview answers
    nextButton.style.display = "none"
    //Enquanto tiver um firstChild(01 filho), irá executar o loop e remover
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true' 

    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++
    } else {
        selectedBtn.classList.add('incorrect')
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    })

    nextButton.style.display = 'block'
}

function showScore() {
    resetState()
    questionElement.innerHTML = `You're scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()