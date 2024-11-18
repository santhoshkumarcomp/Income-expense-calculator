async function loadLists() {
  // Get the reference of the todoList div
  const List = document.querySelector(".displayItem");

  // get the todos from the localStorage
  const lists = localStorage.getItem("lists")
    ? JSON.parse(localStorage.getItem("lists"))
    : [];

  List.innerHTML = "";

  // Create an unordered list
  const ulist = document.createElement("ul");

  // loop through the data
  // for every todo item in the data
  lists.forEach((list) => {
    // create a html list item
    const container = document.createElement("div");
    container.className = "flex gap-1";
    const listItem = document.createElement("p");
    const listAmount = document.createElement("p");
    const editButton = document.createElement("button");
    editButton.className = "bg-teal-300 px-2 py-1 rounded m-1";
    editButton.innerHTML = "edit";
    editButton.setAttribute("onclick", `editList(${list.id})`);
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    deleteButton.setAttribute("onclick", `deleteList(${list.id})`);
    deleteButton.className = "bg-rose-400 px-2 py-1 rounded m-1";

    // add the content - title of the todo item to the html list item
    listItem.textContent = list.description;
    listAmount.textContent = list.amount;

    container.appendChild(listItem);

    // append the list item to the unordered list
    container.appendChild(listAmount);
    container.appendChild(editButton);
    container.appendChild(deleteButton);
    ulist.appendChild(container);
  });

  // after exiting the loop, append the unordered list to the html todoList div
  List.appendChild(ulist);

  let income = getIncome(lists);
  let expense = getExpense(lists);
  let netIncome = income - expense;

  const Button = document.createElement("button");
  Button.className = "bg-teal-300 px-2 py-1 rounded m-1";
  Button.innerHTML = `Income : ${income}`;

  const Button1 = document.createElement("button");
  Button1.innerHTML = `Expense : ${expense}`;

  Button1.className = "bg-rose-400 px-2 py-1 rounded m-1";

  const Button2 = document.createElement("button");
  Button2.innerHTML = `Net Income : ${netIncome}`;

  Button2.className = "bg-violet-400 px-2 py-1 rounded m-1";
  List.append(Button, Button1, Button2);

  function getIncome(lists) {
    let sum = 0;
    lists.forEach((list) => {
      if (list.category === "income") {
        sum += parseInt(list.amount);
      }
    });
    console.log(sum);
    return sum;
  }
  function getExpense(lists) {
    let sum = 0;
    lists.forEach((list) => {
      if (list.category === "expense") {
        sum += parseInt(list.amount);
      }
    });
    console.log(sum);
    return sum;
  }
}

loadLists();

// get the reference of the addForm
const addForm = document.querySelector(".finance-form");

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get the title and description from the form using the form elements
  const description = addForm.desc.value;
  const amount = addForm.amount.value;
  const category = addForm.option.value;
  const id = 0;

  const list = {
    id,
    description,
    amount,
    category,
  };

  try {
    // get the todos from the localStorage
    let lists = localStorage.getItem("lists")
      ? JSON.parse(localStorage.getItem("lists"))
      : [];

    // get the id of the last todo item
    const last = lists[lists.length - 1];

    list.id = last ? last.id + 1 : 0;

    // add the new todo to the todos array
    lists.push(list);

    // set the todos to the localStorage
    localStorage.setItem("lists", JSON.stringify(lists));

    // clear the form
    addForm.reset();

    alert("lists added successfully");

    // redirect the user to the home page
    // window.location.href = '/index.html';
    loadLists();
  } catch (error) {
    alert("Failed to add todo");
  }
});

function deleteList(id) {
  console.log(id);
  const lists = localStorage.getItem("lists")
    ? JSON.parse(localStorage.getItem("lists"))
    : [];
  arr = removeByAttr(lists, "id", id);
  function removeByAttr(arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  localStorage.clear();
  localStorage.setItem("lists", JSON.stringify(arr));
  loadLists();
}

function editList(id) {
  console.log(id);
  const lists = localStorage.getItem("lists")
    ? JSON.parse(localStorage.getItem("lists"))
    : [];

  function getUserInput() {
    let userInput = prompt("Enter description");
    let userAmount = prompt("Enter amount");

    if (userInput !== null && userAmount !== null) {
      lists[id].description = userInput;
      lists[id].amount = userAmount;
      localStorage.clear();
      localStorage.setItem("lists", JSON.stringify(lists));
    } else {
      alert("You canceled the input.");
    }
  }
  getUserInput();
  loadLists();
}
