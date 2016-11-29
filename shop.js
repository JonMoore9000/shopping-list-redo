var state = {
	items: [],
};

var listItemTemplate = (
	'<li>' +
		'<span class= "shopping-item js-shopping-item"></span>' +
			'<div class="shopping-items-controls"></div>' +
				'<button class="js-shopping-item-toggle">' +
				'<span class="button-label">check</span>' +
				'</button>' +
				'<button class="js-shopping-item-delete">' +
				'<span class="button-label">delete</span>' +
				'</button>' +
			'</div>' +
		'</li>'
	);

// State stuff

function addItem(state,  items) {
	state.items.push({
		displayName: items,
		checkedOff: false, 
		});
};

function deleteItem(state,  itemIndex) {
	state.items.splice(itemIndex, 1);
};

function getItem(state, itemIndex) {
	return state.items[itemIndex];
};

function updateItem(state, itemIndex, newItemState) {
	state.items[itemIndex] = newItemState;
	console.log(newItemState);
};

// DOM stuff

function renderItem(item, itemId, itemTemplate, itemDataAttr) {
	//console.log(item);
	var element = $(itemTemplate);
	element.find('.js-shopping-item').text(item.displayName);
	if(item.checkedOff) {
		element.find('.js-shopping-item').addClass('shopping-item__checked');
	};
	element.find('.js-shopping-item-toggle');
	element.attr(itemDataAttr, itemId);
	console.log(itemDataAttr, itemId);
	return element;
};

function renderList(state, listElement, itemTemplate, itemDataAttr) {
	var itemsHTML = state.items.map(
		function(item, index) {
			return renderItem(item, index, itemTemplate, itemDataAttr);
		})
	//console.log(state, itemsHTML);
	listElement.html(itemsHTML);
};

// Event Listeners

function handleItemAdds(state, listElement, formElement, newIdentifier, itemTemplate, itemDataAttr) {
	//console.log(state);
	$('#button').click(function(event){
		event.preventDefault();
		var newItem = $(newIdentifier).val();
		addItem(state, newItem);
		renderList(state, listElement, itemTemplate, itemDataAttr);
	});
};

function handleItemDelete(state, listElement, formElement, removeIdentifier, itemTemplate, itemDataAttr) {
	console.log(state);
		listElement.on('click', removeIdentifier, function(event) {
		var itemIndex = parseInt($(this).closest('li').attr(itemDataAttr));
		console.log(itemIndex);
		deleteItem(state,  itemIndex);
		renderList(state, listElement, itemTemplate, itemDataAttr);
	});
};

function handleItemToggle(listElement, toggleIdentifier, itemDataAttr, state, itemTemplate) {
	listElement.on('click', toggleIdentifier, function(event) {
		var itemId = parseInt($(this).closest('li').attr(itemDataAttr));
		var currentItem = getItem(state, itemId);
		console.log(currentItem);
		updateItem(state, itemId, {
			displayName: currentItem.displayName,
			checkedOff: !currentItem.checkedOff,
		});
		renderList(state, listElement, itemTemplate, itemDataAttr);
	});
};



$(function () {

	var itemTemplate = listItemTemplate;
	var formElement = $('.shopping-list-form');
	var listElement = $('.js-shopping-list');

	var itemDataAttr = 'data-list-item-id';

	var removeIdentifier = '.js-shopping-item-delete';
	var toggleIdentifier = '.js-shopping-item-toggle';
	var newIdentifier = '#js-new-item';

	handleItemAdds(state, listElement, formElement, newIdentifier, itemTemplate, itemDataAttr);
	handleItemDelete(state, listElement, formElement, removeIdentifier, itemTemplate, itemDataAttr);
	handleItemToggle(listElement, toggleIdentifier, itemDataAttr, state, itemTemplate);
});