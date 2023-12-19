// save reference to important DOM elements
var currentDayEl = $("#currentDay");
var containerEl = $(".container");

// Display the current day at the top of the calendar when a user opens the planner.
const displayTime = () => dayjs().format("DD MMM YYYY");
currentDayEl.text(displayTime());
