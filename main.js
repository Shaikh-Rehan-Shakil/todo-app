// Selectors
const $form = document.getElementById('todoCreateForm');
const $displayTodoContainer = document.getElementById('displayTodoContainer');
const $toggleForm = document.getElementById('addTodoForm')

// State
let todoList = [
    {
        title: "Finish project report",
        description: "Complete the final report for the project",
        priority: "high",
        createDate: "12/09/2024",
        dueDate: "2024/09/20"
    },
    {
        title: "Buy groceries",
        description: "Purchase milk, bread, and eggs",
        priority: "medium",
        createDate: "11/09/2024",
        dueDate: "2024/09/15"
    },
    {
        title: "Schedule doctor appointment",
        description: "Call to schedule a check-up with the doctor",
        priority: "low",
        createDate: "10/09/2024",
        dueDate: "2024/10/01"
    },
    {
        title: "Prepare for team meeting",
        description: "Gather data and prepare slides for the meeting",
        priority: "high",
        createDate: "09/09/2024",
        dueDate: "2024/09/18"
    },
    {
        title: "Read book",
        description: "Finish reading the current book",
        priority: "medium",
        createDate: "08/09/2024",
        dueDate: "2006/09/30"
    }
];

// Handlers
function toggleTodoForm() {
    $form.classList.contains('hidden') ? $form.classList.remove('hidden') : $form.classList.add('hidden');
}

function sanitize(str){
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function createTodo() {
    const todo = {
        title: sanitize($form.title.value.trim()),
        description: sanitize($form.description.value.trim()),
        priority: $form.priority.value.trim(),
        createDate: new Date().toLocaleDateString(),
        dueDate: new Date($form.dueDate.value).toLocaleDateString(),
    };

    todoList.push(todo);
    render(todo);
    $form.reset();
}

function handleFormSubmit(event) {
    event.preventDefault();
    createTodo();
    toggleTodoForm();
}

function getPriorityTag(priority) {
    let colorClass;
    let text;
  
    switch (priority) {
      case 'high':
        colorClass = 'bg-red-600'; 
        text = 'High';
        break;
      case 'medium':
        colorClass = 'bg-yellow-600'; 
        text = 'Medium';
        break;
      case 'low':
        colorClass = 'bg-emerald-700';
        text = 'Low';
        break;
      default:
        break;
    }
  
    return `<span class="px-2 py-1 text-xs font-semibold rounded ${colorClass}">${text}</span>`;
  }

  function getDueDateStatus(todo) {
    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return `
            <p class="mt-auto mb-auto text-rose-500">${dueDate.toLocaleDateString()} (overdue)</p>
        `;
    } else if (diffDays <= 3) {
        return `
            <p class="mt-auto mb-auto text-yellow-600">${dueDate.toLocaleDateString()}(upcoming)</p>
        `;
    } else {
        return `<p class="mt-auto mb-auto">${dueDate.toLocaleDateString()}</p>`;
    }
}

function render(todo) {
    todoItem = document.createElement('li')
    todoItem.classList.add("bg-gray-900", "p-4", "rounded-lg", "shadow-sm", "border", "border-gray-700", "hover:shadow-md", "transition-shadow", "duration-200");
    todoItem.innerHTML = `
            <div class="flex justify-between items-start mb-2">
            <div class="flex-1">
                <h3 class="text-lg font-medium text-white">${todo.title}</h3>
                <p class="text-sm text-gray-400 mt-1">${todo.description}</p>
            </div>
            <div class="flex items-center space-x-2">
                ${getPriorityTag(todo.priority)}
                <button class="text-gray-400 hover:text-green-400">
                <!-- Check Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                </button>
                <button class="text-blue-400 hover:text-blue-300">
                <!-- Pencil Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536-9.897 9.898-3.536-3.536L15.232 5.232z" />
                </svg>
                </button>
                <button class="text-red-400 hover:text-red-300">
                <!-- Trash Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            </div>
            <div class="text-sm text-gray-500">
            </div>
            <div class="flex text-gray-600 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-4 mr-1">
                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                </svg>
                ${getDueDateStatus(todo)}
            </div>
    `;

    $displayTodoContainer.appendChild(todoItem);
}

// Events
$toggleForm.addEventListener('click', toggleTodoForm);

$form.addEventListener('submit', handleFormSubmit);

// On Mount Logic
document.addEventListener('DOMContentLoaded', function() {
    todoList.forEach(todo => {
        render(todo);
    });
});
