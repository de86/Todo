$(document).ready(function(){

	var isEditing = false;

	// Add Todo Item to List
	$('#todo-add').click(function(){

		if($('#item-title').val() === ''){
			$('#item-title').val('Please enter a Todo Item');
			return;
		};

		var $title = $('<input class="input" type="text" disabled></input>').val(($('#item-title').val()));
		var $notes = $('<textarea id="item-notes" class="input" cols="20" rows="5" disabled></textarea>').html($('#item-notes').val()).css('display', 'none');		
		var $todoDetails = $('<div class="todo-details"></div>').append($title, $notes)
		var $editButton = $('<div class="todo-edit">Edit</div>');
		var $deleteButton = $('<div class="todo-delete">Delete</div>');
		var $todoItem = $('<div class="todo-item"></div>').append($todoDetails, $editButton, $deleteButton);

		$('#todo-list').append($todoItem);

		$('#item-title').val('What do you need to do?');
		$('#item-notes').html('Notes:');
	});

	// Clear text on focus
	$('#item-notes').focus(function(){
		$(this).html('');
	});

	$('#item-title').focus(function(){
		$(this).val('');
	});

	// Remove Todo Item
	$(document.body).on('click', '.todo-delete', function(){
		$(this).closest($('.todo-item')).remove();
	});

	// Edit todo Item
	$(document.body).on('click', '.todo-edit', function(){
		if(!isEditing){
			enableInput($(this), true);
		} else {
			enableInput($(this), false);
		};
	});

	// Enables todo item to be cedited
	function enableInput($buttonClicked, isDisabled){
		if(isDisabled){
			$buttonClicked.html('Save');
		} else {
			$buttonClicked.html('Edit');
		};
		$buttonClicked.closest($('.todo-item')).find('input').prop('disabled', !isDisabled);
		$buttonClicked.closest($('.todo-item')).find('textarea').prop('disabled', !isDisabled);
		isEditing = isDisabled;
	};

	
	$(document.body)
		.on('mouseenter', '.todo-item', function(){
			$(this).find('textarea').slideDown(150);
		})
		.on('mouseleave', '.todo-item', function(){
			$(this).find('textarea').slideUp(150);
		})
});
