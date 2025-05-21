document.addEventListener("DOMContentLoaded",()=>{
    let expForm = document.getElementById("expForm");
    let expenseBody = document.getElementById("expenseBody");
    let totalAmt = document.getElementById("totalAmt");
    let filter = document.getElementById("filter");

    let expenses = [];

    expForm.addEventListener("submit",(e)=>{
        e.preventDefault();

        let name = document.getElementById("expense").value;
        let amount = parseFloat(document.getElementById("amount").value);
        let category = document.getElementById("select1").value;
        let date = document.getElementById("date").value;

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        expenses.push(expense);
        displayList(expenses);
        updateTotal(expenses);

        expForm.reset();
    });

    function displayList(expenses){
        expenseBody.innerHTML="";
        expenses.forEach(ele =>{
            let row = document.createElement("tr");
            row.innerHTML = `
            <td>${ele.name}</td>
            <td>${ele.amount}</td>
            <td>${ele.category}</td>
            <td>${ele.date}</td>
            <td>
            <button class="editBtn" id="${ele.id}">Edit</button>
            <button class="deleteBtn" id="${ele.id}">Delete</button>
            </td>
            `;
            expenseBody.appendChild(row);
        });  
    }

    function updateTotal(expenses){
        let total = expenses.reduce((a,c)=>a+c.amount,0);
        totalAmt.textContent = total.toFixed(2);
    }

    expenseBody.addEventListener("click",(e)=>{
        if(e.target.classList.contains("deleteBtn")){
            let id = parseInt(e.target.getAttribute("id"));
            expenses = expenses.filter(e => e.id!==id)
            displayList(expenses);
            updateTotal(expenses);
        }

        if(e.target.classList.contains("editBtn")){
            let id = parseInt(e.target.getAttribute("id")); 
            let exp = expenses.find(e => e.id===id)

            document.getElementById("expense").value = exp.name;
            document.getElementById("amount").value = exp.amount;
            document.getElementById("select1").value = exp.category;
            document.getElementById("date").value = exp.date;

            expenses = expenses.filter(e => e.id!==id)
            displayList(expenses);
            updateTotal(expenses);
        }
    })

    filter.addEventListener("change",(e)=>{
        let category = e.target.value;
        if(category=="All"){
            displayList(expenses);
            updateTotal(expenses);
        }
        else{
            const filtered = expenses.filter(c => c.category===category)
            displayList(filtered);
            updateTotal(filtered);
        }
    })
})