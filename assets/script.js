// save reference to important DOM elements
var currentDayEl = $("#currentDay");
var containerEl = $(".container");

// Display the current day at the top of the calendar when a user opens the planner.
const displayTime = () => dayjs().format("dddd, MMMM Do YYYY");
currentDayEl.text(displayTime());

// Handler for set data
let setData = (item) => {
  let data = getData(); // call getdata handler for getting data from localstorage
  let change = 0;

  // Look through existing data
  data.forEach((dHour, i) => {
    // See if there's already an entry for that time slot
    if (dHour[0] == item[0]) {
      // Update the existing entry to the new one
      data[i][1] = item[1];
      change++;
    }
  });

  // If there's no existing entry for that hour then create one
  if (change === 0) {
    data.push(item);
  }

  // Convert to JSON and store data in localstorage
  data = JSON.stringify(data);
  localStorage.setItem("dailySchedule", data);
};

// Handler for getting data data
let getData = (item = null) => {
  // Get data from localstorage
  let data = JSON.parse(localStorage.getItem("dailySchedule"));

  // If there's no data then create an empty array
  if (!data) {
    data = [];
  }

  // Return the data that we've got
  return data;
};

// print time blocks to screen
const printTimeBlocks = (hourText, hourID, desc) => {
  // create elements
  const hourRowEl = $("<tr>").addClass("row time-block").attr("id", hourID);
  const hourTdEl = $("<td>").addClass("hour").text(hourText);
  const descriptionTdEl = $("<textarea>").addClass("description").text(desc);
  const buttonTdEl = $("<button>").addClass("saveBtn");

  // append elements
  hourRowEl.append(hourRowEl, hourTdEl, descriptionTdEl, buttonTdEl);
  containerEl.append(hourRowEl);

  // Color-code each timeblock based on past, present, and future when the timeblock is viewed.
  if (parseInt(dayjs().format("H")) > hourID) {
    descriptionTdEl.addClass("past");
  } else if (parseInt(dayjs().format("H")) === hourID) {
    descriptionTdEl.addClass("present");
  } else {
    descriptionTdEl.addClass("future");
  }
};

// Present timeblocks for standard business hours when the user scrolls down.
const hourGenerator = () => {
  // Use getdata function to get data from localstorage
  let data = getData();

  // Loop through business hours
  for (let h = 9; h <= 17; h++) {
    // create variable to hold matching record from localstorage
    let rHour = "";

    // loop through localstorage data
    data.forEach((record) => {
      // if the localstorage record matches the hour then update the record to match the one from storage
      if (h == record[0]) {
        rHour = record[1];
      }
    });

    // Convert to 12 hour clock, and pass an ID and the description from storage to the printTimeBlocks function
    if (h < 12) {
      printTimeBlocks(h + "AM", h, rHour); // If it's before midday use AM
    } else if (h === 12) {
      printTimeBlocks(h + "PM", h, rHour); // If it's midday use PM
    } else {
      printTimeBlocks(h - 12 + "PM", h, rHour); // If it's after midday use PM and use the 12 hour clock
    }
  }
};

// Start application by calling the hourGenerator function
hourGenerator();

// Save the event in local storage when the save button is clicked in that timeblock.
// Persist events between refreshes of a page.
containerEl.on("click", ".saveBtn", (event) => {
  target = $(event.target).parent();

  // pass event data to setData function
  setData([target.attr("id"), target.find(".description").val()]);
});
