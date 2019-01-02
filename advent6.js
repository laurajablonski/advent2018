//Process the raw data
var points = [[77, 279],[216, 187],[72, 301],[183, 82],[57, 170],[46, 335],[55, 89],[71, 114],[313, 358],[82, 88],[78, 136],[339, 314],[156, 281],[260, 288],[125, 249],[150, 130],[210, 271],[190, 258],[73, 287],[187, 332],[283, 353],[66, 158],[108, 97],[237, 278],[243, 160],[61, 52],[353, 107],[260, 184],[234, 321],[181, 270],[104, 84],[290, 109],[193, 342],[43, 294],[134, 211],[50, 129],[92, 112],[309, 130],[291, 170],[89, 204],[186, 177],[286, 302],[188, 145],[40, 52],[254, 292],[270, 287],[238, 216],[299, 184],[141, 264],[117, 129]];
var minX = 1000;
var maxX = 0;
var minY = 1000;
var maxY = 0;
var i;

for (i = 0; i < points.length; i++) {
  if (points[i][0] > maxX) {
    maxX = points[i][0];
  }
  if (points[i][0] < minX) {
    minX = points[i][0];
  }
  if (points[i][1] > maxY) {
    maxY = points[i][1];
  }
  if (points[i][1] < minY) {
    minY = points[i][1];
  }
}
console.log("X: [" + minX + "," + maxX + "]");
console.log("Y: [" + minY + "," + maxY + "]");

//Part 1
//Find the manhattan distance to the points around the coordinates
//Find the largest contained space
//Strategy: (1) Find the manhattan distance for all points around the points.
//(2) Remove from consideration any point that touches an edge. (3) Count for
//all remaining points the frequency within the points.
document.writeln('Part 1');

var j;
var k;
var closestPoint = {};
var distance;
var manhattanArray = {};

//Part (1) Find the manhattan distance for all points around the points.
//Added rows around the points to account for unusual geometries.
//All points that are equidistant from 2 points are set to 100.
for (j = 0; j <= maxX+50; j++) {
  for (k = 0; k <= maxY+50; k++) {
    closestPoint['point'] = 500;
    closestPoint['distance'] = 2000;
    for (i = 0; i < points.length; i++) {
      distance = Math.abs(points[i][0] - j) + Math.abs(points[i][1] - k);
      if (distance < closestPoint['distance']) {
        closestPoint['point'] = i;
        closestPoint['distance'] = distance;
      } else if (distance == closestPoint['distance']) {
        closestPoint['point'] = 100;
        closestPoint['distance'] = distance;
      }
    }
    manhattanArray[[j,k]] = closestPoint['point'];
  }
}

//Part (2) Remove from consideration any point that touches an edge.

var removalList = new Set();

for (j = 0; j <= maxX+50; j++) {
  removalList.add(manhattanArray[[j,0]]);
  removalList.add(manhattanArray[[j,maxY+49]]);
}
for (k = 0; k <= maxY+50; k++) {
  removalList.add(manhattanArray[[0,k]]);
  removalList.add(manhattanArray[[maxX+49,k]]);
}
console.log(removalList);

//Part (3) count all remaining points

var pointCounter = {};
var maxCount = 0;
var maxPoint = 0;

for (testPoint in manhattanArray) {
  if(!pointCounter[manhattanArray[testPoint]]){
    pointCounter[manhattanArray[testPoint]] = 0;
  }
  if(!removalList.has(manhattanArray[testPoint])){
    pointCounter[manhattanArray[testPoint]]++;
  }
  if (pointCounter[manhattanArray[testPoint]] > maxCount) {
    maxCount = pointCounter[manhattanArray[testPoint]];
    maxPoint = manhattanArray[testPoint];
  }
}
console.log(pointCounter);
document.writeln('Largest Area: ' + maxCount);
document.writeln('Point Number: ' + maxPoint);

//Part 2
//Find all points with a total manhattan distance to the given points
//of less than 10,000
var pointsWithin10000 = 0;
var totalDistanceTracker = 0;

for (j = 0; j <= maxX + 50; j++) {
  for (k = 0; k <= maxY + 50; k++) {
    totalDistanceTracker = 0;
    for (i = 0; i < points.length; i++) {
      distance = Math.abs(points[i][0] - j) + Math.abs(points[i][1] - k);
      totalDistanceTracker += distance;
    }
    if (totalDistanceTracker < 10000) {
      pointsWithin10000++;
    }
  }
}

document.writeln('Part 2:');
document.writeln('Points within 10000 of all points: ' + pointsWithin10000);
