var events;


// Fill in events from local storage
function renderEvents() {
  // check if events have been already set
  if (localStorage.getItem("events") !== null) {
    events = JSON.parse(localStorage.getItem("events"));
    // iterate over textareas
    $("textarea").each(function (index, element) {
      // assign events with their descriptions
      $(this).val(events[index + 1]);
    });
  } else {
    // if events haven't been set yet, set them to empty strings
    events = {};
    // iterate over keys
    for (let i = 1; i <= 9; i++) {
      events[i] = "";
    }
    // log into localStorage
    localStorage.setItem("events", JSON.stringify(events));
  }
}

// color hour blocks
function renderBlockColors() {
  // obtain current hour of day
  var hour = moment().hour();
  
  $("textarea").each(function (index, element) {
    
    var time = parseInt($(this).attr("id"));

    if (time < hour) {
      
      $(this).addClass("past");
    } else if (time === hour) {
     
      $(this).addClass("present");
    } else {
      
      $(this).addClass("future");
    }
  });
}

// when save button is clicked
$(".saveButton").click(function (event) {
  event.preventDefault();
  var event = $(this).prev().val();
  var index = $(this).attr("id");
  // change event in global events variable
  events[index] = event;
  // update events in localStorage
  localStorage.setItem("events", JSON.stringify(events));
});

function displayDay() {
  // obtain date
  var date = Date().substring(0, 15);
  // display
  $("#currentDay").text(date);
}

$(document).ready(function () {
  displayDay();
  renderEvents();
  renderBlockColors();
});

//display current day & time.
$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));

