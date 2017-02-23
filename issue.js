function Issue() {
   this.labels = [];
}
module.exports = Issue;

/**
 * Returns an integer priority from a collection of labels
 */
Issue.prototype.getPriority = function() {
   // Extract the priority number from each label title
   // "p-4" -> 4
   return this.labels.map(function(label) {
      return parseInt(label.title.match(/^p-(\d+)$/)[1], 10);
   })
   // return the smallest priority number
   .reduce(function(a, b) {
      return Math.min(a, b);
   });
}

Issue.prototype.addLabel = function(label, applied_on) {
   this.labels.push({
      title: label,
      applied_on: applied_on
   });
}
