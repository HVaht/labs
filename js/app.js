const personLists = document.querySelectorAll(".person-list");
const level1Persons = document.querySelector("#level-1 .person-list");
const nameInput = document.querySelector("#name");
const titleInput = document.querySelector("#title");
const submitButton = document.querySelector("#submit-button");
const errorContainer = document.querySelector(".error-container");

let persons = [
  {
    id: 0,
    name: "Michael Scott",
    title: "Head of Sales"
  },
  {
    id: 1,
    name: "Jamie Oliver",
    title: "Head of HR"
  },
  {
    id: 2,
    name: "Tom Cruise",
    title: "Assistant"
  }
];

personLists.forEach((personList) => {
  personList.addEventListener("dragover", dragOver);
  personList.addEventListener("drop", dragDrop);
});

function createPerson(personId, name, title) {
  const personCard = document.createElement("div");
  const personHeader = document.createElement("div");
  const personName = document.createElement("p");
  const personDescriptionContainer = document.createElement("div");
  const personDescription = document.createElement("p");
  const deleteIcon = document.createElement("p");

  personCard.classList.add("person-container");
  personHeader.classList.add("person-header");
  personDescriptionContainer.classList.add("person-title-container");

  personName.textContent = name;
  personDescription.textContent = title;
  deleteIcon.textContent = "☒";

  personCard.setAttribute("draggable", true);
  personCard.setAttribute("person-id", personId);

  personCard.addEventListener("dragstart", dragStart);
  deleteIcon.addEventListener("click", deletePerson);

  personHeader.append(personName, deleteIcon);
  personDescriptionContainer.append(personDescription);
  personCard.append(personHeader, personDescriptionContainer);
  level1Persons.append(personCard);
}

function addColor(column) {
  let color;
  switch (column) {
    case "level-1":
      color = "rgb(96, 96, 192)";
      break;
    case "level-2":
      color = "rgb(83, 156, 174)";
      break;
    case "level-3":
      color = "rgb(224, 165, 116)";
      break;
    case "level-4":
      color = "rgb(222, 208, 130)";
      break;
    default:
      color = "rgb(232, 232, 232)";
  }
  return color;
}

function addPersons() {
  // advanced: you can pass through the whole person object if you wish
  persons.forEach((person) =>
    createPerson(person.id, person.name, person.title)
  );
}

addPersons();

let elementBeingDragged;

function dragStart() {
  elementBeingDragged = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const columnId = this.parentNode.id;
  elementBeingDragged.firstChild.style.backgroundColor = addColor(columnId);
  this.append(elementBeingDragged);
}

function showError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("error-message");
  errorContainer.append(errorMessage);

  setTimeout(() => {
    errorContainer.textContent = "";
  }, 2000);
}

function addPerson(e) {
  e.preventDefault();
  const filteredNames = persons.filter((person) => {
    return person.name === nameInput.value;
  });

  if (!filteredNames.length) {
    const newId = persons.length;
    persons.push({
      id: newId,
      name: nameInput.value,
      title: titleInput.value
    });
    createPerson(newId, nameInput.value, titleInput.value);
    nameInput.value = "";
    titleInput.value = "";
  } else {
    showError("Name must be unique!");
  }
}
submitButton.addEventListener("click", addPerson);

function deletePerson() {
  const headerName = this.parentNode.firstChild.textContent;

  const filteredPersons = persons.filter((person) => {
    return person.name === headerName;
  });

  persons = persons.filter((person) => {
    return person !== filteredPersons[0];
  });

  this.parentNode.parentNode.remove();
}
