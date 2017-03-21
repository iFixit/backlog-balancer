module.exports = function(input, numBuckets) {
   var output = [];
   var offset = 0;

   for (var i = 0; i < numBuckets; i++) {
      // Spread the remaining items across the remaining buckets
      var itemsPerBucket = Math.ceil(remaining() / (numBuckets - i));
      output[i] = [];
      for (var j = 0; j < itemsPerBucket; j++) {
         output[i].push(pull());
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
