
/*======================================================== SLIDE THEME ========================================================*/
    const Theme1 = document.querySelector('.theme-1'),
          Theme2 = document.querySelector('.theme-2'),
          Theme3 = document.querySelector('.theme-3'),
          themeMove = document.querySelector('.slide__bg'),
          bodyTheme = document.querySelector('body'),
          currentTheme = localStorage.getItem('choose-theme'),
          currentToggle = localStorage.getItem('choose-toggle')

if (currentTheme){
      bodyTheme.classList.add(currentTheme)
      themeMove.setAttribute('id',currentToggle)
    }
          Theme1.addEventListener('click', () =>{
            themeMove.setAttribute('id','move-1')
            bodyTheme.setAttribute('class','theme-1')
            localStorage.setItem('choose-theme', 'theme-1')
            localStorage.setItem('choose-toggle', 'move-1')
          })

          Theme2.addEventListener('click', () =>{ 
            themeMove.setAttribute('id','move-2')
            bodyTheme.setAttribute('class','theme-2')
            localStorage.setItem('choose-theme', 'theme-2')
            localStorage.setItem('choose-toggle', 'move-2')           
          })

          Theme3.addEventListener('click', () =>{
            themeMove.setAttribute('id','move-3')
            bodyTheme.setAttribute('class','theme-3')
            localStorage.setItem('choose-theme', 'theme-3')
            localStorage.setItem('choose-toggle', 'move-3') 
          })


/*======================================================== CALCULATOR ========================================================*/
class Calculator {
    constructor(previousOperandTextElement , currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.navgativeFirst = undefined
        this.navgativeSecond = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        if(this.currentOperand === ''){
            this.operation = undefined
            this.navgativeFirst = undefined
        }
    }

    appendNumber(number) {
        this.previousOperandShow = ''
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    nagativeOperation(){
        if(this.currentOperand === '' && this.operation == null){
            this.navgativeFirst = '-'
        }
        if(this.operation != null && this.currentOperand === ''){
            this.navgativeSecond = '-'
        }
    }
    

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        if(this.operation != null){
            this.previousOperand = this.currentOperand /*1. `${this.getDisplayNumber(this.currentOperand)} ${this.operation}`*/
            this.previousOperandShow = this.currentOperand
            this.currentOperand = ''
            
        }  
    }

    compute() {
        let computation
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)

        if(this.navgativeFirst != null){
            prev = -prev
        }
        if(this.navgativeSecond != null){
            current = -current
        }

        
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.navgativeFirst = undefined
        this.navgativeSecond = undefined
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en' , {
            maximumFractionDigits: 0 })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        /*const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')*/
    }

    updateDisplay() {
        
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        if(this.operation != null){
            this.previousOperandTextElement.innerText = /*1. this.previousOperand*/
            /*`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`*/
            this.getDisplayNumber(this.previousOperandShow)
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const nagativeButton = document.getElementById('minus')


const calculator = new Calculator(previousOperandTextElement ,currentOperandTextElement)


numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{

        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

nagativeButton.addEventListener('click', () =>{
    calculator.nagativeOperation()
})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        
        operationButtons.forEach(button => {
            button.classList.remove('active-button')
        })
        button.classList.add('active-button')

        
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
   
})

equalsButton.addEventListener('click', button => {

    operationButtons.forEach(button => {
        button.classList.remove('active-button')
    })

    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()

    operationButtons.forEach(buttons =>{
        buttons.classList.remove('active-button')
    })
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})



