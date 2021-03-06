document.addEventListener('DOMContentLoaded', function () {
  function getContacts(e) {
    var contacts = window.navigator.mozContacts.getAll({});
    window.document.getElementById('output').innerHTML = '';

    contacts.onsuccess = function(event) {
      var cursor = event.target;
      if (cursor.result) {
	var id = cursor.result.id;
	var givenName = cursor.result.givenName;
	var familyName = cursor.result.familyName;
	var output = window.document.getElementById('output');
	var p = document.createElement('p');
	p.textContent = "ID:" + id.toString() + " with givenName:" + givenName.toString() + " and familyName:" + familyName.toString() + ".";
	p.className = 'mini';
	output.appendChild(p);
	cursor.continue();
      }
    }

    contacts.onerror = function() {
      console.warn("error getting contacts");
    }

  }

  function addContacts(e) {
    window.document.getElementById('output').innerHTML = '';
    var person = new mozContact();
    person.givenName  = ["bad"];
    person.familyName = ["kitty"];
    var saving = navigator.mozContacts.save(person);

    saving.onsuccess = function() {
      var output = window.document.getElementById('output');
      var p = document.createElement('p');
      p.textContent = "New contact created with givenName:bad and familyName:kitty";
      p.className = 'mini';
      output.appendChild(p);
    };

    saving.onerror = function(err) {
      console.error('new contact NOT saved');
    };
  }

  function deleteContacts(e) {
    window.document.getElementById('output').innerHTML = '';
    var deleted = navigator.mozContacts.clear();
    deleted.onsuccess = function() {
      var output = window.document.getElementById('output');
      var p = document.createElement('p');
      p.textContent = "ALL contacts deleted O_O";
      p.className = 'mini';
      output.appendChild(p);
    }
  }

  document.getElementById('contacts').addEventListener('click', getContacts);
  document.getElementById('add-contact').addEventListener('click', addContacts);
  document.getElementById('delete-contact').addEventListener('click', deleteContacts);
});
