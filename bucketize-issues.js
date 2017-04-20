var debug = require('debug')('backlog:bucketize');

module.exports = function(input, bucketWeights) {
   debug("Putting %s issues into %s buckets", input.length, bucketWeights.length);
   var output = [];
   var offset = 0;

   for (var i = 0; i < bucketWeights.length; i++) {
      // Get the normalized distribution of the remaining buckets
      var normalizedBuckets = normalizeBucketWeights(bucketWeights.slice(i));
      var thisBucketSize = normalizedBuckets[0];

      // Spread the remaining items across the remaining buckets
      // according to their distributions
      var itemsPerBucket = Math.max(1, Math.ceil(remaining() * thisBucketSize));

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

   debug("Bucket sizes: [%s]",
    output.map(function(bucket) {return bucket.length}).join(','));

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
