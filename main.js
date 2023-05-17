const addForm = document.querySelector('.add');
const tasks = document.querySelector('.tasks');
const clearAll = document.querySelector('.clear');
const msgSpan = document.querySelector('.message span');
const searchForm = document.querySelector('.search');



function updateMsg(){
    const textLength = tasks.children.length
    msgSpan.textContent =  `You have ${textLength} pending tasks.`;

}
updateMsg();
addForm.addEventListener('submit', event =>{
    event.preventDefault();
    const value = addForm.task.value.trim();
    if(value.length){
        tasks.innerHTML += `<li>  
                                   <span>${value}</span>
                                      <i class="fa-solid fa-trash delete"></i>
                            </li>`;
        addForm.reset();
        updateMsg();

    }
})

tasks.addEventListener('click', event =>{
    if(event.target.classList.contains("delete")){
       event.target.parentElement.remove();
       updateMsg();
    }   
})

clearAll.addEventListener('click', event => {
    const taskItems = tasks.querySelectorAll("li");
    taskItems.forEach(item => {
        item.remove();
        updateMsg();
    })
})


function filterTask(term){
    Array.from(tasks.children).filter(task => {
        return !task.textContent.toLowerCase().includes(term)
    }).forEach(task => {
        task.classList.add('hide')
    });

    Array.from(tasks.children).filter(task =>{
        return task.textContent.toLowerCase().includes(term)
    }).forEach(task =>{
        task.classList.remove('hide')
    })
}
searchForm.addEventListener('keyup',event =>{
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term)
})

searchForm.addEventListener('click',event =>{
    if(event.target.classList.contains('reset'))
    {
        searchForm.reset();
        const term = searchForm.task.value.trim();
        filterTask(term);
        
    }
})