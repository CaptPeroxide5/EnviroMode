// Add note to local storage
let addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', function (e) {
	let addTitle = document.getElementById('note-title');
	// Added this here
	let addLocation = document.getElementById('note-location');
	let addTxt = document.getElementById('note-text');

	if (addTitle.value == '' || addTxt.value == '') {
		return alert('Please add Event Title and Details');
	}

	let notes = localStorage.getItem('notes');
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}
	let myObj = {
		title: addTitle.value,
		location: addLocation.value,
		text: addTxt.value,
	};
	notesObj.push(myObj);
	localStorage.setItem('notes', JSON.stringify(notesObj));
	addTxt.value = '';
	// Added this here
	addLocation.value = '';
	addTitle.value = '';
	//   console.log(notesObj);
	showNotes();
});

// Function to show elements from localStorage
function showNotes() {
	let notes = localStorage.getItem('notes');
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}
	let html = '';
	notesObj.forEach(function (element, index) {
		// Changed here
		html += `
        <div class="note">
            <h3 class="note-title"> ${element.title} </h3>
            <h3 class="note-loc"> Address: ${element.location} </h3>
            <h3 class="note-text"> Description: ${element.text}</h3>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn"><i class="fa-solid fa-trash"></i> Delete Event</button>
        </div>
            `;
	});
	let notesElm = document.getElementById('notes');
	if (notesObj.length != 0) {
		notesElm.innerHTML = html;
	} else {
		notesElm.innerHTML = `No Event Yet! Add an event using the form above.`;
	}
}

// Function to delete a note
function deleteNote(index) {
	//   console.log("I am deleting", index);
	let confirmDel = confirm('Delete this event?');
	if (confirmDel == true) {
		let notes = localStorage.getItem('notes');
		if (notes == null) {
			notesObj = [];
		} else {
			notesObj = JSON.parse(notes);
		}

		notesObj.splice(index, 1);
		localStorage.setItem('notes', JSON.stringify(notesObj));
		showNotes();
	}
}

// Function to Edit the Note
function editNote(index) {
	let notes = localStorage.getItem('notes');
	let addTitle = document.getElementById('note-title');
	let addTxt = document.getElementById('note-text');

	if (addTitle.value !== '' || addTxt.value !== '') {
		return alert('Please clear the form before editing an event');
	}

	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}
	console.log(notesObj);

	notesObj.findIndex((element, index) => {
		addTitle.value = element.title;
		addTxt.value = element.text;
	});
	notesObj.splice(index, 1);
	localStorage.setItem('notes', JSON.stringify(notesObj));
	showNotes();
}

showNotes();
