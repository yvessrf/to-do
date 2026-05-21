// Seleciona os elementos do DOM necessários para o funcionamento da aplicação
const form = document.querySelector('.todo-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const themeToggle = document.querySelector('#theme-toggle');

// Inicializa a lista de tarefas e carrega as tarefas e o tema salvos no localStorage
let tasks = [];
loadTheme();
loadTasks();

// Quando o formulário for enviado, execute a função para criar uma nova tarefa
form.addEventListener('submit', (event) => {
    // Evita o comportamento padrão de recarregar a página
    event.preventDefault();
    // Obtém o texto da tarefa do campo de entrada
    const taskText = input.value.trim();
    // Se o campo de entrada estiver vazio, não crie uma tarefa
    if (taskText === "") {
        return;
    }
    // Cria um novo objeto de tarefa com um ID único, o texto da tarefa e um status de conclusão
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    // Adiciona a nova tarefa à lista de tarefas, salva as tarefas no localStorage e renderiza a lista de tarefas
    tasks.push(newTask);
    saveTasks();
    renderTasks();

    // Limpa o campo de entrada após adicionar a tarefa

    input.value = "";
})

// Função para renderizar a lista de tarefas na página
function renderTasks() {
    taskList.innerHTML = "";
    // Para cada tarefa na lista de tarefas, cria um elemento de lista (li) e adiciona os botões de completar e excluir
    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = ` <span>${task.text}</span>
        <div class="task-buttons">
            <button type="button" class="complete-btn">✓</button>
            <button type="button" class="delete-btn">✗</button>
        </div>`;

        const completeBtn = li.querySelector('.complete-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        // Adiciona eventos aos botões de completar e excluir
        completeBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });
        // Adiciona a nova tarefa à lista de tarefas
        taskList.appendChild(li);
    })
}

// Função para salvar as tarefas no localStorage
function saveTasks() {
    // Converte a lista de tarefas em uma string JSON e salva no localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Função para carregar as tarefas do localStorage
function loadTasks() {
    // Obtém as tarefas armazenadas no localStorage, converte de volta para um array de objetos e renderiza a lista de tarefas
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Evento para alternar entre os temas claro e escuro
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    saveTheme();
})
// Função para salvar a preferência de tema no localStorage
function saveTheme() {
    const isLight = document.body.classList.contains('light');
    // Salva a preferência de tema como 'light' ou 'dark' no localStorage
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
// Função para carregar a preferência de tema do localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }
}