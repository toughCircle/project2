const list = document.querySelector("#todo_list");
const newList = document.querySelector("#new button");

const saveTodoList = JSON.parse(localStorage.getItem("saved_items"));

const createTodoElement = (itemData) => {
  const newDiv = document.createElement("div");
  const newCheckbox = document.createElement("input");
  const newInput = document.createElement("input");
  const actionDiv = document.createElement("div");
  const editBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  if (itemData) {
    newInput.value = itemData.contents;
    newCheckbox.checked = itemData.checked;
    if (itemData.complete) {
      newDiv.classList.add("complete");
      newInput.setAttribute("disabled", "");
    }
  }

  newDiv.classList.add("todoBox");
  newCheckbox.type = "checkbox";
  newInput.type = "text";
  newInput.classList.add("text");
  actionDiv.classList.add("action");
  editBtn.textContent = "✎";
  removeBtn.textContent = "⌦";

  newDiv.appendChild(newCheckbox);
  newDiv.appendChild(newInput);
  newDiv.appendChild(actionDiv);
  actionDiv.appendChild(editBtn);
  actionDiv.appendChild(removeBtn);
  list.appendChild(newDiv);

  newInput.focus();

  newInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && newInput.value) {
      newInput.setAttribute("disabled", "");
      saveItems();
    }
  });

  // TODO : 체크하면 순서 변경하는 기능 추가해보기
  newCheckbox.addEventListener("change", () => {
    if (newCheckbox.checked) {
      newDiv.classList.toggle("complete");
      newInput.setAttribute("disabled", "");
    } else {
      newDiv.classList.remove("complete");
    }
    saveItems();
  });

  editBtn.addEventListener("click", () => {
    newInput.removeAttribute("disabled");
    newInput.focus();
  });
  if (newInput.value !== "") {
    saveItems();
  }

  removeBtn.addEventListener("click", () => {
    newDiv.remove();
    saveItems();
  });
};

const saveItems = () => {
  const savedItems = [];

  for (let i = 0; i < list.children.length; i++) {
    const checkbox = list.children[i].querySelector("input[type='checkbox']");

    const listObj = {
      contents: list.children[i].querySelector(".text").value,
      complete: list.children[i].classList.contains("complete"),
      checked: checkbox.checked,
      order: checkbox.checked ? 0 : 1,
    };
    savedItems.push(listObj);
  }

  console.log(savedItems);

  savedItems.length === 0
    ? localStorage.removeItem("saved_items")
    : localStorage.setItem("saved_items", JSON.stringify(savedItems));
};

if (saveTodoList) {
  saveTodoList.sort((a, b) => a.order - b.order);
  for (let k = 0; k < saveTodoList.length; k++) {
    createTodoElement(saveTodoList[k]);
  }
}
