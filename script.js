let input = document.querySelector("#input");
let botao = document.querySelector("#botao");
let tarefas = document.getElementById("pai");

let lista = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarNoStorage(){
  localStorage.setItem("tarefas" , JSON.stringify(lista))
}

function criarElementoTarefa(textoTarefa) {
  let tarefa = document.createElement("li");
  tarefas.appendChild(tarefa);
  tarefa.textContent = textoTarefa;

  let concluida = document.createElement("button");

  let imgcheck = document.createElement("img");
  imgcheck.src = "check.png"
  imgcheck.width = 24;

  concluida.appendChild(imgcheck);

  tarefa.appendChild(concluida)

  concluida.addEventListener("click", () => {
    tarefa.classList.toggle("concluida")
    if (tarefa.classList.contains("concluida")) {
      imgcheck.src = "checked.png"
    } else {
      imgcheck.src = "check.png"  
    }
  })

  let del = document.createElement("button")
  del.textContent = "❌"
  tarefa.appendChild(del);

  del.addEventListener("click", () => {
    const index=lista.indexOf(textoTarefa);

    if (index>-1) {
      lista.splice(index,1)
    }
    salvarNoStorage();

    tarefa.remove()
  });
}

function AddTarefa(){
  const value =input.value;

  if (value==="") {
    alert("Escreva sua tarefa!");
    return;
  }
  lista.push(value);

  salvarNoStorage();

  criarElementoTarefa(value);

  input.value = "";
  input.focus();
}
function carregarTarefas(){
  lista.forEach(tarefa => {
    criarElementoTarefa(tarefa)
  });
}


botao.addEventListener("click", AddTarefa);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { AddTarefa() }
});

carregarTarefas()