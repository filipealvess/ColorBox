const headerContainer = document.querySelector('.header');
const deleteScreen = document.querySelector('.delete-screen');
const colorsDemoContainer = document.querySelectorAll('[data-code]');
const formAddNewColor = document.querySelector('.add-new-color');
const inputAddNewColor = document.querySelectorAll('.input-block input');
const inputHexCode = document.querySelectorAll('.item [name=hex-code]');
const editButtons = document.querySelectorAll('.buttons .edit');
const deleteButtons = document.querySelectorAll('.buttons .delete');
const closeButton = document.querySelector('.popup .close');
const cancelButton = document.querySelector('.popup .cancel');
const toggleFormVisibilityButton = document.querySelector('.toggle-form-visibility');

function handleInputFocus(event) {
	const input = event.target;
	const inputBlock = input.parentNode;
	const label = input.nextElementSibling;

	inputBlock.classList.add('active');
	label.classList.add('active');
}

function handleInputBlur(event) {
	const input = event.target;
	const inputBlock = input.parentNode;
	const label = input.nextElementSibling;

	inputBlock.classList.remove('active');

	if (input.value.length === 0) {
		label.classList.remove('active');
	}
}

function fillColorDemo(colorDemoElement, index = false) {
	const color = '#' + colorDemoElement.dataset.code;
	const boxShadow = '2px 2px 10px 2px ' + color + '55';

	if (index !== false) {
		inputHexCode[index].value = color;
	}

	colorDemoElement.style.backgroundColor = color;
	colorDemoElement.style.boxShadow = boxShadow;
}

function editColorInfo(button) {
	const editButtonContent = button.firstElementChild;
	const form = button.parentNode.parentNode;
	const inputHexCode = form.querySelector('[name=hex-code]');
	const inputDescription = form.querySelector('[name=color-description]');

	const itemIsEditable = button.dataset.editable === 'true' ? true : false;

	let classToBeRemoved = 'fa-pen';
	let classToBeAdded = 'fa-check';
	let readOnly = false;
	let editable = 'true';

	if (itemIsEditable) {
		classToBeRemoved = 'fa-check';
		classToBeAdded = 'fa-pen';
		readOnly = true;
		editable = 'false';
	}
	
	editButtonContent.classList.remove(classToBeRemoved);
	editButtonContent.classList.add(classToBeAdded);

	inputHexCode.readOnly = readOnly;
	inputDescription.readOnly = readOnly;

	button.dataset.editable = editable;
}

function deleteItem(button) {
	const form = button.parentNode.parentNode;
	const colorCodeToBeDeleted = form.querySelector('[name=hex-code]').value;
	const colorDescriptionToBeDeleted = form.querySelector('[name=color-description]').value;

	const colorDemo = deleteScreen.querySelector('.color');
	const hexCode = deleteScreen.querySelector('[name="hex-code"]');
	const description = deleteScreen.querySelector('[name="description"]');

	colorDemo.dataset.code = colorCodeToBeDeleted.replace(/#/, '');

	fillColorDemo(colorDemo);

	hexCode.value = colorCodeToBeDeleted;
	description.value = colorDescriptionToBeDeleted;

	document.body.style.overflow = 'hidden';
	deleteScreen.classList.add('active');
}

function getButton(event) {
	const tagClicked = event.target.localName;

	const button = tagClicked === 'button'
		? event.target
		: event.target.parentNode;

	return button;
}

function closeDeleteScreen() {
	deleteScreen.classList.remove('active');
	document.body.style.overflow = 'auto';
}

function toggleFormVisibility() {
	const formClasses = [...formAddNewColor.classList];
	const formIsVisible = formClasses.includes('active');
	const timeDelay = 130;

	if (formIsVisible) {
		formAddNewColor.classList.remove('active');
		
		setTimeout(() => {
			toggleFormVisibilityButton.classList.remove('active');
			headerContainer.classList.remove('active');
		}, timeDelay);
	} else {
		toggleFormVisibilityButton.classList.add('active');
		headerContainer.classList.add('active');
		
		setTimeout(() => {
			formAddNewColor.classList.add('active');
		}, timeDelay);
	}
}

closeButton.addEventListener('click', closeDeleteScreen);

cancelButton.addEventListener('click', closeDeleteScreen);

toggleFormVisibilityButton.addEventListener('click', toggleFormVisibility);

colorsDemoContainer.forEach(fillColorDemo);

inputAddNewColor.forEach(input => {
	input.addEventListener('focus', handleInputFocus);
	input.addEventListener('blur', handleInputBlur);
});

editButtons.forEach(editButton => {
	editButton.addEventListener('click', event => {
		event.preventDefault();

		const button = getButton(event);

		editColorInfo(button);
	});
});

deleteButtons.forEach(deleteButton => {
	deleteButton.addEventListener('click', event => {
		event.preventDefault();

		const button = getButton(event);

		deleteItem(button);
	});
});