document.addEventListener('DOMContentLoaded', () => {
    const noteinput = document.getElementById('note-input');
    const btnadd = document.getElementById('btn-add');
    const notescontainer = document.getElementById('container-notes');

    loadNotes();

    btnadd.addEventListener('click', () => {
        const noteText = noteinput.value.trim();
        if (noteText) {
            const notes = getNotesFromStorage();
            notes.push(noteText);
            saveNotesToStorage(notes);
            renderNotes();
            noteinput.value = '';
        }
    });

    function getNotesFromStorage() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    function saveNotesToStorage(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        renderNotes();
    }

    function renderNotes() {
        const notes = getNotesFromStorage();
        notescontainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <p>${note}</p>
                <button onclick="btn_del(${index})">Usuń</button>
            `;
            notescontainer.appendChild(noteElement);
        });
    }

    window.btn_del = function (index) {
        const notes = getNotesFromStorage();
        notes.splice(index, 1);
        saveNotesToStorage(notes);
        renderNotes();
    }
});
