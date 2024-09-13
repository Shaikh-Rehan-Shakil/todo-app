// Selectors
const $form = document.getElementById('todoCreateForm');
const $displayTodoContainer = document.getElementById('displayTodoContainer');

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
        dueDate: "2024/09/30"
    }
];

// Handlers
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
        colorClass = 'bg-blue-600';
        text = 'Low';
        break;
      default:
        colorClass = 'bg-gray-600';
        text = 'Unknown';
        break;
    }
  
    return `<span class="px-2 py-1 text-xs font-semibold rounded ${colorClass}">${text}</span>`;
  }

function render(todo) {
    todoItem = document.createElement('li')
    todoItem.classList.add("bg-gray-800", "p-4", "rounded-lg", "shadow-sm", "border", "border-gray-700", "hover:shadow-md", "transition-shadow", "duration-200");
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
            <p>Created at: ${todo.createDate}</p>
            <p>Due by: ${todo.dueDate}</p>
            </div>
    `;

    $displayTodoContainer.appendChild(todoItem);
}

// Events
$form.addEventListener('submit', handleFormSubmit);

// On Mount Logic
document.addEventListener('DOMContentLoaded', function() {
    todoList.forEach(todo => {
        render(todo);
    });
});
