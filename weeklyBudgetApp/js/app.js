// class 
class HTML {
    // constructor
    constructor(initBudget, initialBudget, remainBudget) {
        this.budget = initBudget;
        this.initialBudget = initialBudget;
        // remaining budget
        this.remainBudget = remainBudget;
    }

    // display the budget value in the html
    showInitBudget() {
        this.initialBudget.innerHTML = this.budget;
        this.remainBudget.innerHTML = this.budget;
    }

    addBudget() {
        // get the input values from the form 
        const budgetName = myForm.querySelector("input[type='text']").value;
        const budgetAmount = Number(myForm.querySelector("input[type='number']").value);
        // validate the form inputs
        if( budgetName === "" || budgetAmount === "") {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error");
            errorDiv.innerHTML = `
                <p>All fields needs to be filled!</p>
            `;
            // check if the error message has displayed befor it yes remove and update else show it
            if(myForm.querySelector("div.error") != null) {
                errorDiv.remove();
            } else {
                myForm.insertBefore(errorDiv, myForm.querySelector("div"));
            }

            // remove the error message after 3 seconds
            setTimeout(
                () => {
                    errorDiv.remove()
                },
                3000
            )

            
        } else {
            const div = document.createElement("div");
            div.innerHTML = `
            <p>${budgetName}<span>$${budgetAmount}</span></p>
            `
            // get their parent div
            const result = document.querySelector(".result");
            // append 
            result.appendChild(div);
            
            // reduce the remainBudget by the amount budgeted
            this.remainBudget.innerHTML = this.remainBudget.innerHTML - budgetAmount;
            
            // changing of remaining budget div when the price gets to certain percents
            // calculating at 70%
            const atSixty = (( 70 * this.budget ) / 100);

            // calculating at less than 50%
            const atFifty = ((50 * this.budget ) / 100);


            if(Number(this.remainBudget.textContent) <= atSixty) {
                document.querySelector("#leftBudget").setAttribute("class", "leftBudgetYellow")
            }

            if(Number(this.remainBudget.textContent) < atFifty) {
                document.querySelector("#leftBudget").setAttribute("class", "leftBudgetRed")
            }
        }

    }

}


// variables
const myForm = document.querySelector("#myForm");
// budget values
const initialBudget = document.querySelector("#initBudget span");
const remainBudget = document.querySelector("#leftBudget span")
;
// declaring variable to get value from the prompt
let initBudget;

// declaring variable for instanciation
let html;

  
// listeners 
loadEventListeners();
function loadEventListeners() {
    // app init 
    document.addEventListener("DOMContentLoaded", function() {
        // assinged prompt initBudget
        initBudget = prompt(`What's your budget?`);
        initBudget = Number(initBudget);
        // validate my prompt value
        if(initBudget === null || initBudget === "" || initBudget === 0){
            window.location.reload();
        } else {
            // html instanciation
            html = new HTML(initBudget, initialBudget, remainBudget);
            html.showInitBudget();
        }
    })

    // preventing form from opening in another page
    myForm.addEventListener("submit", function(event) {
        event.preventDefault();
        html.addBudget();
        this.reset();
    })
}