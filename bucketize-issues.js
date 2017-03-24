var debug = require('debug')('backlog:bucketize');

module.exports = function(input, bucketWeights) {
   debug("putting %s issues into %s buckets", input.length, bucketWeights.length);
   var output = [];
   var offset = 0;
   var allWeights = normalizeBucketWeights(bucketWeights);

   for (var i = 0; i < bucketWeights.length; i++) {
      // Get the normalized distribution of the remaining buckets
      var normalizedBuckets = normalizeBucketWeights(bucketWeights.slice(i));
      var thisBucket = normalizedBuckets[0];

      // Spread the remaining items across the remaining buckets
      // This will give us items spread across buckets in a way that
      // max(bucketSizes) - min(bucketSizes) is never greater than 1
      var itemsPerBucket = Math.max(1, Math.ceil(remaining() * thisBucket));

      output[i] = [];
      var j, item;
      for (j = 0; (j < itemsPerBucket) && (item = pull()); j++) {
         output[i].push(item);
      }
   }

   function pull() {
      return input[offset++];
   }

   function remaining() {
      return Math.max(0, input.length - offset);
   }

   return output;
};

function normalizeBucketWeights(bucketWeights) {
   var sum = bucketWeights.reduce(function(sum, weight) {
      return sum + weight;
   }, 0);

   return bucketWeights.map(function(weight) {
      return weight / sum;
   });
}
