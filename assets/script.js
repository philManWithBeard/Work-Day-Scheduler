// save reference to important DOM elements
var currentDayEl = $("#currentDay");
var containerEl = $(".container");

// Display the current day at the top of the calendar when a user opens the planner.
const displayTime = () => dayjs().format("DD MMM YYYY");
currentDayEl.text(displayTime());

// Handler for set data
let setData = (item) => {
  let data = getData(); // call getdata handler for getting  data from list
  data = data != false ? data : [];
  data.push(item);
  data = JSON.stringify(data);
  localStorage.setItem("dailySchedule", data);
};

// Handler for get data
let getData = (item = null) => {
  let data = JSON.parse(localStorage.getItem("dailySchedule"));
  return data;
};

getData();
