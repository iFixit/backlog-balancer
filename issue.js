function Issue(number) {
   var labels = [];
   var number = number;
   var priorityLabel;

   this.getPriority = function() {
      return getNumber(priorityLabel);
   };

   this.getNumber = function() {
      return number;
   };

   this.addLabel = function(label, applied_on) {
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
 * Returns an integer priority number from a label like "p-3"
 * "p-4" -> 4
 */
function getNumber(label) {
   return parseInt(label.title.match(/^p-(\d+)$/)[1], 10);
}
