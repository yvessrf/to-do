const form = document.querySelector('.todo-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// Quando o formulário for enviado, execute a função para criar uma nova tarefa
form.addEventListener('submit', (event)=>{
    // Evita o comportamento padrão de recarregar a página
    event.preventDefault();
    // Obtém o texto da tarefa do campo de entrada
    const taskText = input.value;
    // Se o campo de entrada estiver vazio, não crie uma tarefa
    if(taskText === ""){
        return;
    }
    // Cria uma nova tarefa e adiciona à lista
    createTask(taskText);
    input.value = "";
})

function createTask(taskText){
    // Cria um novo elemento de lista para a tarefa
    const li = document.createElement('li');
    // Define o texto da tarefa como o conteúdo do elemento de lista
    li.textContent = taskText;
    // Adiciona o elemento de lista à lista de tarefas
    taskList.appendChild(li);
}