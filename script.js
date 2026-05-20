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
    // Define o conteúdo HTML da tarefa, incluindo os botões de completar e excluir
   li.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
            <button type="button" class="complete-btn">✓</button>
            <button type="button" class="delete-btn">✗</button>
        </div>
   `;

   const completeBtn = li.querySelector('.complete-btn');
   const deleteBtn = li.querySelector('.delete-btn');
 // Adiciona eventos aos botões de completar e excluir
   completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
   });

   deleteBtn.addEventListener('click', () => {
        li.remove();
   });
 // Adiciona a nova tarefa à lista de tarefas
   taskList.appendChild(li);
}