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

// print time blocks to screen
const printTimeBlocks = (hourText, hourID, desc) => {
  const hourRowEl = $("<tr>").addClass("row time-block").attr("id", hourID);

  const hourTdEl = $("<td>").addClass("hour").text(hourText);

  const descriptionTdEl = $("<td>").addClass("description").text(desc);

  const buttonTdEl = $("<td>").addClass("saveBtn");

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
  let data = JSON.parse(localStorage.getItem("dailySchedule"));

  for (let h = 9; h <= 17; h++) {
    let rHour = "";
    data.forEach((record) => {
      if (h == record[0]) {
        console.log(record[0]);
        rHour = record[1];
      }
    });
    console.log(rHour);
    if (h < 12) {
      printTimeBlocks(h + "AM", h, rHour);
    } else if (h === 12) {
      printTimeBlocks(h + "PM", h, rHour);
    } else {
      printTimeBlocks(h - 12 + "PM", h, rHour);
    }
  }
};

hourGenerator();
