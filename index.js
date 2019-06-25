const open = require("open");
const process = require("process");
const moment = require("moment");
const ora = require("ora");

console.log("Enter the time you'd like to have the alarm go off: ");

let stdin = process.openStdin(),
  date,
  spinner;

stdin.addListener("data", function(d) {
  date = moment(d, "H:mm A");

  console.log("Alarm set for " + date.format("MM/DD/YYYY H:mm A"));
  spinner = ora("Alarm will go off " + date.fromNow()).start();

  const triggerAlarm = setInterval(async () => {
    if (moment().unix() >= date.unix()) {
      clearInterval(triggerAlarm);
      spinner.stop();
      await open("https://www.youtube.com/watch?v=uq-gYOrU8bA");
      process.exit();
    }
  }, 1000);
});
