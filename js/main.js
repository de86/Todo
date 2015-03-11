$(document).ready(function(){

	var isEditing = false;
	var itemKey = 0;

	if(localStorage.length > 0){
		loadList();
	}


	// create and append list item to list
	function addItem(title, notes){
		var $title = $('<input class="input" type="text" disabled></input>').val(title);
		var $notes = $('<textarea id="item-notes" class="input" cols="20" rows="5" resizeable="false" disabled></textarea>').val(notes).css('display', 'none');		
		var $editButton = $('<div class="todo-edit">Edit</div>');
		var $deleteButton = $('<div class="todo-delete">Delete</div>');
		var $todoDetails = $('<div class="todo-details"></div>').append($title, $editButton, $deleteButton)
		var $todoItem = $('<div class="todo-item clear"></div>').append($todoDetails, $notes);
		$('#todo-list').append($todoItem);
		saveItem(title, notes);
	};


	// Add Todo Item to List
	$('#todo-add').click(function(){

		if($('#item-title').val() === '' || $('#item-title').val() === 'What do you need to do?' || $('#item-title').val() === 'Please enter a Todo Item'){
			$('#item-title').val('Please enter a Todo Item');
			return;
		} else {
			var title = $('#item-title').val();
			var notes = $('#item-notes').val();
			addItem(title, notes);
		};
 
		$('#item-title').val('What do you need to do?');
		$('#item-notes').val('Notes:');
	});


	// Clear text of input on focus
	$('#item-notes').focus(function(){
		$(this).html('');
	});

	$('#item-title').focus(function(){
		$(this).val('');
	});


	// Edit todo Item
	$(document.body).on('click', '.todo-edit', function(){
		if(!isEditing){
			enableInput($(this), true);
		} else {
			enableInput($(this), false);
		};
	});


	// Remove Todo Item
	$(document.body).on('click', '.todo-delete', function(){
		$(this).closest($('.todo-item')).remove();
	});


	// Enables todo item to be cedited
	function enableInput($buttonClicked, isDisabled){
		if(isDisabled){
			$buttonClicked.html('Save');
			$buttonClicked.css({backgroundColor : '#8d8'});
		} else {
			$buttonClicked.html('Edit');
			$buttonClicked.css({backgroundColor : '#ddd'});
		};

		$buttonClicked.closest($('.todo-item')).find('input').prop('disabled', !isDisabled).toggleClass('editing');
		$buttonClicked.closest($('.todo-item')).find('textarea').prop('disabled', !isDisabled).toggleClass('editing');
		isEditing = isDisabled;
	};


	// Loads current list from storage and displays list in the DOM
	function loadList(){

	};


	// Saves current list to local storage
	function saveItem(title, notes){
		itemKey++;
		var item = {
			'title ': title,
			'notes': notes
		};

		localStorage.setItem(itemKey, JSON.stringify(item));
		console.log(localStorage.getItem(itemKey));
	};


	// Clear List from local storage
	function clearList(){
		Storage.clear();
	};


	// Item notes expansion animation
	$(document.body)
		.on('mouseenter', '.todo-item', function(){
			$(this).find('textarea').slideDown(150);
		})
		.on('mouseleave', '.todo-item', function(){
			$(this).find('textarea').slideUp(150);
		})
});
