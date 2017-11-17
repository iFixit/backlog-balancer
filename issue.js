var priorityLabelRegex = /^p([0-9]+)$/;
var debug = require('debug')('backlog:issue');

function Issue(number) {
   var createdOn;
   var labels = [];
   var previousLabels = [];
   var priorityLabel;
   var previousPriorityLabel;

   this.hasPriority = function () {
      return !!priorityLabel;
   };

   this.setCreatedOn = (inCreatedOn) => createdOn = inCreatedOn
   this.getCreatedOn = () => createdOn

   this.getPriority = function() {
      return priorityLabel && getNumber(priorityLabel);
   };

   this.getPriorityLabel = function() {
      return priorityLabel && priorityLabel.title;
   };

   this.getPreviousPriority = function() {
      return previousPriorityLabel && getNumber(previousPriorityLabel)
       || this.getPriority();;
   };

   this.getAppliedOn = function() {
      return priorityLabel && priorityLabel.applied_on;
   };

   this.getNumber = function() {
      return number;
   };

   this.addLabel = function(label, applied_on) {
      if (!isPriorityLabel(label)) {
         return;
      }
      labels.push({
         title: label,
         applied_on: applied_on
      });
      priorityLabel = choosePriorityLabel(labels);
      return priorityLabel;
   };

   this.addPreviousLabel = function(label, applied_on) {
      if (!isPriorityLabel(label)) {
         return;
      }
      debug("Issue %s found previous priority label: %s", this.getNumber(), label);
      previousLabels.push({
         title: label,
         applied_on: applied_on
      });
      return previousPriorityLabel = choosePriorityLabel(previousLabels);
   };

   this.getPriorityLabels = function() {
      return labels.map(function(label) {
         return label.title;
      });
   };
}

module.exports = Issue;

/**
 * Returns the label with the most recent applied_on date
 */
function choosePriorityLabel(labels) {
   return labels.reduce(function(a, b) {
      return a.applied_on > b.applied_on ? a : b;
   }, labels[0]);
}

/**
 * Returns an integer priority number from a label like "p3"
 * "p4" -> 4
 */
function getNumber(label) {
   return parseInt(label.title.match(priorityLabelRegex)[1], 10);
}

/**
 * Returns true if this label title is formatted like a priority label
 */
function isPriorityLabel(title) {
   return title.match(priorityLabelRegex);
}
