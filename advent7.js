var rawText = ["Step A must be finished before step I can begin.","Step M must be finished before step Q can begin.","Step B must be finished before step S can begin.","Step G must be finished before step N can begin.","Step Y must be finished before step R can begin.","Step E must be finished before step H can begin.","Step K must be finished before step L can begin.","Step H must be finished before step Z can begin.","Step C must be finished before step P can begin.","Step W must be finished before step U can begin.","Step V must be finished before step L can begin.","Step O must be finished before step N can begin.","Step U must be finished before step I can begin.","Step D must be finished before step P can begin.","Step Q must be finished before step L can begin.","Step F must be finished before step Z can begin.","Step L must be finished before step N can begin.","Step P must be finished before step S can begin.","Step I must be finished before step S can begin.","Step S must be finished before step R can begin.","Step T must be finished before step N can begin.","Step N must be finished before step X can begin.","Step Z must be finished before step J can begin.","Step R must be finished before step J can begin.","Step J must be finished before step X can begin.","Step E must be finished before step I can begin.","Step T must be finished before step R can begin.","Step I must be finished before step N can begin.","Step K must be finished before step C can begin.","Step B must be finished before step D can begin.","Step K must be finished before step T can begin.","Step E must be finished before step P can begin.","Step F must be finished before step I can begin.","Step O must be finished before step U can begin.","Step I must be finished before step J can begin.","Step S must be finished before step Z can begin.","Step L must be finished before step J can begin.","Step F must be finished before step T can begin.","Step F must be finished before step P can begin.","Step I must be finished before step T can begin.","Step G must be finished before step S can begin.","Step V must be finished before step U can begin.","Step F must be finished before step R can begin.","Step L must be finished before step R can begin.","Step Y must be finished before step D can begin.","Step M must be finished before step E can begin.","Step U must be finished before step L can begin.","Step C must be finished before step D can begin.","Step W must be finished before step N can begin.","Step S must be finished before step N can begin.","Step O must be finished before step S can begin.","Step B must be finished before step T can begin.","Step V must be finished before step T can begin.","Step S must be finished before step X can begin.","Step V must be finished before step P can begin.","Step F must be finished before step L can begin.","Step P must be finished before step R can begin.","Step D must be finished before step N can begin.","Step C must be finished before step L can begin.","Step O must be finished before step Q can begin.","Step N must be finished before step Z can begin.","Step Y must be finished before step L can begin.","Step B must be finished before step K can begin.","Step P must be finished before step Z can begin.","Step V must be finished before step Z can begin.","Step U must be finished before step J can begin.","Step Q must be finished before step S can begin.","Step H must be finished before step F can begin.","Step E must be finished before step O can begin.","Step D must be finished before step F can begin.","Step D must be finished before step X can begin.","Step L must be finished before step S can begin.","Step Z must be finished before step R can begin.","Step K must be finished before step X can begin.","Step M must be finished before step V can begin.","Step A must be finished before step M can begin.","Step B must be finished before step W can begin.","Step A must be finished before step P can begin.","Step W must be finished before step Q can begin.","Step R must be finished before step X can begin.","Step M must be finished before step H can begin.","Step F must be finished before step S can begin.","Step K must be finished before step Q can begin.","Step Y must be finished before step Q can begin.","Step W must be finished before step S can begin.","Step Q must be finished before step T can begin.","Step K must be finished before step H can begin.","Step K must be finished before step D can begin.","Step E must be finished before step T can begin.","Step Y must be finished before step E can begin.","Step A must be finished before step O can begin.","Step G must be finished before step E can begin.","Step C must be finished before step O can begin.","Step G must be finished before step H can begin.","Step Y must be finished before step I can begin.","Step V must be finished before step S can begin.","Step B must be finished before step R can begin.","Step B must be finished before step X can begin.","Step V must be finished before step I can begin.","Step N must be finished before step J can begin.","Step H must be finished before step I can begin."];

//Process rawText into useful array
var sequencePairs = [];
var steps = new Set();
var stepsIterator;
var alphabeticalSteps = [];

for (instruction in rawText) {
  sequencePairs.push([rawText[instruction].charAt(5),
                      rawText[instruction].charAt(36)]);
  steps.add(rawText[instruction].charAt(5));
  steps.add(rawText[instruction].charAt(36));
}

//create array of all steps in alphabetical order
stepsIterator = steps.values();
for (value of stepsIterator){
  alphabeticalSteps.push(value);
}
alphabeticalSteps.sort(function(a,b){
  if (a < b) {return -1;}
  if (a > b) {return 1;}
  return 0;
});


//Part 1
document.writeln('Part 1');

//Create object to store all blockers for each step
var stepRelationships = {};
var i;

for (i = 0; i < alphabeticalSteps.length; i++) {
  stepRelationships[alphabeticalSteps[i]] = [];
}

for (i = 0; i < sequencePairs.length; i++) {
  stepRelationships[sequencePairs[i][1]].push(sequencePairs[i][0]);
}

//Track order with string
var orderOfSteps = '';
var indexPlaceholder;
var foundNextStep;
var endlessLoopBlocker = 0;

while (Object.keys(stepRelationships).length > 0 && endlessLoopBlocker < 27){
  foundNextStep = false;
  //iterate through the list and find the next step that is unblocked
  for (step in stepRelationships) {
    if (stepRelationships[step].length == 0 && !foundNextStep) {
      foundNextStep = true;
      //Add the step to the order
      orderOfSteps = orderOfSteps.concat(step.toString());
      //Remove it as a blocker from all steps
      for (other in stepRelationships) {
        indexPlaceholder = stepRelationships[other].indexOf(step);
        if (indexPlaceholder > -1) {
          stepRelationships[other].splice(indexPlaceholder, 1);
        }
      }
      //delete it from the step list
      delete stepRelationships[step];
    }
  }
  endlessLoopBlocker++;
}

document.writeln("Order: " + orderOfSteps);

//Part 2

//Reset
stepRelationships = {};
endlessLoopBlocker = 0;
orderOfSteps = '';

for (i = 0; i < alphabeticalSteps.length; i++) {
  stepRelationships[alphabeticalSteps[i]] = [];
}

for (i = 0; i < sequencePairs.length; i++) {
  stepRelationships[sequencePairs[i][1]].push(sequencePairs[i][0]);
}

//Create multitreaded process counting the number of minutes until finished
var currentJobs = [];
var numberOfThreads = 5;
var currentMinute = 0;
var currentWorker = [];

for (i = 0; i < numberOfThreads; i++) {
  currentJobs.push(["none", 0]);
}

while (Object.keys(stepRelationships).length > 0 && currentMinute < 2000){
  for (worker in currentJobs) {
    currentWorker = currentJobs[worker];

    //Check for unoccupied workers and find them a job if available
    if (currentWorker[1] == 0) {
      foundNextStep = false;
      //iterate through the list and find the next step that is unblocked
      for (step in stepRelationships) {
        if (stepRelationships[step].length == 0 && !foundNextStep) {
          foundNextStep = true;
          //Add the step to the order
          orderOfSteps = orderOfSteps.concat(step.toString());
          //Assign the job to the worker with the time remaining
          currentJobs[worker] = [step, (61 + alphabeticalSteps.indexOf(step))];
          //delete it from the step list
          delete stepRelationships[step];
        }
      }
    }
  }

  //Check for jobs that are ending and mark the job as complete by removing
  //it as a blocker
  for (worker in currentJobs) {
    currentWorker = currentJobs[worker];
    if (currentWorker[1] == 1) {
      for (other in stepRelationships) {
        indexPlaceholder = stepRelationships[other].indexOf(currentWorker[0]);
        if (indexPlaceholder > -1) {
          stepRelationships[other].splice(indexPlaceholder, 1);
        }
      }
    }
  }

  //Decrease the minutes remaining on all jobs
  for (worker in currentJobs) {
    currentWorker = currentJobs[worker];
    if (currentWorker[1] > 0) {
      currentJobs[worker][1]--;
    }
  }
  currentMinute++;
}

var maxRemainingMinutes = 0;
for (worker in currentJobs) {
  if (currentJobs[worker][1] > maxRemainingMinutes) {
    maxRemainingMinutes = currentJobs[worker][1];
  }
}

document.writeln(currentMinute + maxRemainingMinutes);
document.writeln("Order: " + orderOfSteps);
