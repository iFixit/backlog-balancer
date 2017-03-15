var priorityLabelRegex = /^p(\d+)$/;

function Issue(number) {
   var labels = [];
   var number = number;
   var priorityLabel;

   this.hasPriority = function () {
      return !!priorityLabel;
   }

   this.getPriority = function() {
      return priorityLabel && getNumber(priorityLabel);
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
      return priorityLabel = choosePriorityLabel(labels);
   }
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
