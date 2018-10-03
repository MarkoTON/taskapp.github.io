//// Define UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
/* Prvo smo definisali sta hocemo da menjamo */

//// Load all event listeners 
loadEventListeners();
/*Pozivamo funkciju koja jeos nije definisana(bice definisana ispod)*/


//// Load all event listeners
function loadEventListeners (argument) {
	// DOM Load Event
	document.addEventListener('DOMContentLoaded', getTasks);
	//add task event
	form.addEventListener('submit', addTask);// dodajemo funkciju addTask
	// Remove task event
	taskList.addEventListener('click', removeTask);// dodajemo funkciju removeTask
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);// dodajemo funkciju clearTask
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks)// dodajemo funnkciju filterTasks
}


////////////////////////////////////////////////////////////////////////////////
//// Get Tasks from LS
function getTasks () {
	// Proveravamo da li ima ista tamo u LS
	let tasks; // Samo se ovde pominje 
	if (localStorage.getItem('tasks') === null) {
		tasks = [];		
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task) {
		// Ovo TASK vazi samo za ovu funkciju i nigde vise
		//-- Sada ponovo definisemo sta da uradi kad krene da ucitava iz LS --//

		//// Create li element // Kreiranje list item-a
	 	const li = document.createElement('li');// definisali li 
	 	//// Add class
	 	li.className = 'collection-item'; // Definisali koju klasu dodajemo
	 	//// Create text node and append to li
	 	li.appendChild(document.createTextNode(task));//umesto tekstInput.value(ovog puta dolazi oz LS)
	 	/* Sve sto se ukuca u form/loadEventListeners/addTask to upada u li */

	 	/*-------------------------------------------------------------------------------*/

	 	////Create New link element
	 	const link = document.createElement('a');
	 	////Add class
	 	link.className = 'delete-item secondary-content';// Definisali koju klasu dodajemo
	 	//// Add icon html
	 	link.innerHTML = '<i class="fa fa-remove"></i>';// Definisali element koji cemo dodati NE class vec ceo jedan element da se doda
	 	//// Append the link to li
	 	li.appendChild(link);
	 	/* Sve sto se ukuca u form/loadEventListeners/addTask to upada u li a on je definisan kako izgleda upravo preko document.createElement('a') */

	 	/*-------------------------------------------------------------------------------*/

		//// Appending li to ul (sve sto je do sada definisano treba ubaciti u ul)
		taskList.appendChild(li);  //tako je definisan UL gore na pocetku

	});
}


/////////////////////////////////////////////////////////////////////////////////
//// Add Task // Posto je Event Heandler (submit) sprecicemo def ponasanje
function addTask(e) {
	if (taskInput.value === '') {
 		alert('Add a task'); // Definisali smo dugme za submit
 	} 

 	//// Create li element // Kreiranje list item-a
 	const li = document.createElement('li');// definisali li 
 	//// Add class
 	li.className = 'collection-item'; // Definisali koju klasu dodajemo
 	//// Create text node and append to li
 	li.appendChild(document.createTextNode(taskInput.value));
 	/* Sve sto se ukuca u form/loadEventListeners/addTask to upada u li */

 	/*-------------------------------------------------------------------------------*/

 	////Create New link element
 	const link = document.createElement('a');
 	////Add class
 	link.className = 'delete-item secondary-content';// Definisali koju klasu dodajemo
 	//// Add icon html
 	link.innerHTML = '<i class="fa fa-remove"></i>';// Definisali element koji cemo dodati NE class vec ceo jedan element da se doda
 	//// Append the link to li
 	li.appendChild(link);
 	/* Sve sto se ukuca u form/loadEventListeners/addTask to upada u li a on je definisan kako izgleda upravo preko document.createElement('a') */

 	/*-------------------------------------------------------------------------------*/

	//// Appending li to ul (sve sto je do sada definisano treba ubaciti u ul)
	taskList.appendChild(li);  //tako je definisan UL gore na pocetku

	/*-------------------------------------------------------------------------------*/

	//// Stor in LS
	storeTaskInLocalStorage(taskInput.value);// funkcija nije jos definisana a ubacujemo u tu funkciju
	/*Sve sto se otkuca ide u ovu funkciju*/

	/*-------------------------------------------------------------------------------*/

	//// Clear input
	taskInput.value = ''; // Posle kucanja da je prazan input

	e.preventDefault();
}

//////////////////////////////////////////////////////////////////////////////////////////
//// Store Task

function storeTaskInLocalStorage(task) {
	let tasks; // Samo se ovde pominje 
	if (localStorage.getItem('tasks') === null) {
		tasks = [];		
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}


//////////////////////////////////////////////////////////////////////////////////
//// Remove task // Sklanjamo dodato (treba pogoditi tacan item)
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();
			/*Ako parentElement ima klasu delete-item onda hocu da...*/

			//-Remove from LS-//
			removeTasksFromLocalStorage(e.target.parentElement.parentElement);//Funkcija za brisanje iz LS
		}
	}
}


/////////////////////////////////////////////////////////////////////////////////////
//// Remove from LS !!
function removeTasksFromLocalStorage(taskItem) {
	// Provera
	let tasks; 
	if (localStorage.getItem('tasks') === null) {
		tasks = [];		
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index) {
		//Sta se tacno proverava(to pozia tasks pa se vraca u removeTasksFromLoca....)
		// index mi nije jasan....(drugi parametar o forEach)
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}


////////////////////////////////////////////////////////////////////////////////////
//// Clear Tasks
function clearTasks() {
	//taskList.innerHTML = ''; // prvi nacin da sve obrisemo

	// Faster
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild); // ako jos ima firstChild obrisi ih
	}

	//// Clear from LS
	clearTasksFromLocalStorage();// Funkcija koja se poziva koja je dole definisana
}

/////////////////////////////////////////////////////////////////////////////////
//// Clear Tasks from LS
function clearTasksFromLocalStorage() {
	// Brisanje svega
	localStorage.clear();
}


/////////////////////////////////////////////////////////////////////////////////////
//// Filter Tasks

function filterTasks(e) {

	 const text = e.target.value.toLowerCase();  // dobijamo od informacija samo ono sto je upisano
	 // dodali samo toLowerCase() da bi svako kucanje pogodilo uneto 

	 /*-------------------------------------------------------------------------------*/

	 document.querySelectorAll('.collection-item').forEach 
	 (function(task) {
	 	const item = task.firstChild.textContent;
	 	if (item.toLowerCase().indexOf(text) != -1) {
	 		task.style.display = 'block';
	 	} else {
	 		task.style.display = 'none';
	 		}// function(task) nigde se ne pominje osim tu znaci da je deo samo ove funkcije
	 		// Ako stevim === 1 onda trezi tecno ako tako pocinje isto je i sa  == 1 zato bolje != -1
	 }); // Varaca NodeList zato moze
	}// Ako pogodi value onda prikazi ako ne onda nemoj