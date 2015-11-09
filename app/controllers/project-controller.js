//project-controller
(function(){
  angular.module('UPayApp')
    .controller('ProjectController', ['$scope', ProjectController])

  function ProjectController($scope){
  	$scope.project = { name: 'Uusi'};
    $scope.addNewProject = function(){
      $scope.project = { name: $scope.newProject}; 
      $scope.newProject = '';
      console.log(this.project);
    }
  }
})();