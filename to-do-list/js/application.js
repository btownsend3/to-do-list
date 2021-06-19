var displayTasks = function () {
  $.ajax({
  type: 'GET',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=104',
  dataType: 'json',
  success: function (response, textStatus) {
    $('#todo-list').empty();
    response.tasks.forEach(function (task) {
      $('#todo-list').append('<div class="row todo-row"><p class="col-xs-8">' + task.content + '</p><button class="delete btn btn-danger" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div>');
    });
  },
  error: function (response, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

$(document).ready(function () {
displayTasks();
});

var addTask = function () {
$.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=104',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task-content').val()
      }
    }),
    success: function (response, textStatus) {
      $('#new-task-content').val('');
      displayTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });  
}

$('#create-task').click('submit', function (e) {
  e.preventDefault();
  addTask();
});

var deleteTask = function (id) {
$.ajax({
  type: 'DELETE',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=104',
  success: function (response, textStatus) {
    console.log(response);
    displayTasks();
  },
  error: function (response, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

$(document).on('click', '.delete', function () {
deleteTask($(this).data('id'))
});

var markTaskComplete = function (id) {
$.ajax({
  type: 'PUT',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=104',
  contentType: 'application/json',
  dataType: 'json',
  success: function (response, textStatus) {
    displayTasks();
  },
  error: function (response, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

var markTaskActive = function (id) {
$.ajax({
  type: 'PUT',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=104',
  contentType: 'application/json',
  dataType: 'json',
  success: function (response, textStatus) {
    displayTasks();
    console.log(response);
  },
  error: function (response, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

$(document).on('change', '.mark-complete', function () {
if (this.checked) {
  markTaskComplete($(this).data('id'));
} else {
  markTaskActive($(this).data('id'));
}
});