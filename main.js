const todoWrapperUL = document.querySelector(".todo-wrapper");
const completedWrapperUL = document.querySelector(".completed-wrapper");

const form = document.querySelector("form");
const count = document.querySelector(".count");
const countCompleted = document.querySelector(".count-completed");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const render = () => {
  completedWrapperUL.textContent = "";
  todoWrapperUL.textContent = "";
  count.textContent = todos.filter((e) => e.status === "todo").length;
  countCompleted.textContent = todos.filter(
    (e) => e.status === "completed"
  ).length;
  localStorage.setItem("todos", JSON.stringify(todos));
  todos.forEach((e) => {
    if (e.status === "completed") {
      const li = document.createElement("li");
      li.classList.add("todo-completed");
      const p = document.createElement("p");
      p.textContent = e.title;
      li.append(p);
      completedWrapperUL.prepend(li);
      li.addEventListener("click", () => {
        e.status = "todo";
        render();
      });
    } else {
      todoWrapperUL.innerHTML += `<li class="todo">
              <p>${e.title}</p>
              <div class="none-btns">
                <button onclick="confirmFn(${e.id})" class="bg-none">
                  <img src="./assets/Vector.png" alt="" />
                </button>
                <button onclick="deleteFn(${e.id})" class="bg-none">
                  <img src="./assets/trash.png" alt="" />
                </button>
              </div>
            </li>`;
    }
  });
};
render();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = e.target[0].value;
  todos.unshift({
    title: value,
    status: "todo",
    id: new Date().getTime(),
  });
  e.target.reset();
  render();
});

const confirmFn = (id) => {
  const todoOne = todos.filter((e) => {
    return e.id === id;
  });
  todoOne[0].status = "completed";
  render();
};

const deleteFn = (id) => {
  const todoOne = todos.filter((e) => {
    return e.id !== id;
  });
  todos = todoOne;
  render();
};