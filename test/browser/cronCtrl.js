angular.module('app', [])
.filter('prevCronSchedule', function() {
  return function(str) {
    var cron = new Cron();
    try {
      cron.parse(str);
      return cron.prev();
    } catch (e) {
      return '[  Error: ' + e.message + ' ]';
    }
  };
})
.filter('nextCronSchedule', function() {
  return function(str) {
    var cron = new Cron();
    try {
      cron.parse(str);
      return cron.next();
    } catch (e) {
      return '[  Error: ' + e.message + ' ]';
    }
  };
})
.controller('cronCtrl', function($scope) {
  $scope.cronString = '*/5 * * * *';
});
