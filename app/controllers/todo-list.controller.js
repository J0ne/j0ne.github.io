(function(){
  angular.module('UPayApp')
    .controller('TodoListController', ['$scope', TodoListController])

  function TodoListController($scope){
    $scope.todos = ['Learn Angular', 'Learn Node.js', 'Drink beer'];

    $scope.addTodo = function(){
      $scope.todos.push($scope.newTodo);
      $scope.newTodo = '';
    }
  }
})();
