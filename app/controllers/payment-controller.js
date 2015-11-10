(function(){
	var app = angular.module('UPayApp');
	app.factory("paymentList", ["$firebaseArray",
  		function($firebaseArray) {
    	// create a reference to the database location where we will store our data
    		var ref = new Firebase("https://dazzling-torch-7927.firebaseio.com/rest/project1/payments");

   			 // this uses AngularFire to create the synchronized array
    		return $firebaseArray(ref);
  		}
	]);

	app.controller("PaymentController", ["$scope", "paymentList", "$firebaseArray",
  		// we pass our new chatMessages factory into the controller
  		function($scope, paymentList, $firebaseArray) {

  			var paymentsRef = new Firebase("https://dazzling-torch-7927.firebaseio.com/rest/project1/payments");
	   		// we add chatMessages array to the scope to be used in our ng-repeat
    		$scope.payments = paymentList;
    		this.active = false;
    		this.shares = [];

    		var init = function (){
    			console.log("Hep")
 			   getSaldos();
			}

			//$scope.init();
    		// $scope.payment.description = '';
    		// $scope.payment.shares = [];
    		$scope.updateSum = function(id){
    			$scope.active = true;
    		}

    		$scope.initPayment = function(name, persons){
    			console.log(name);
    			$scope.active = true;
    			$scope.payment.name = name;
    			$scope.persons = persons;
    			getSaldos($scope.payments);
    		}

    		$scope.changeActivity = function(payment, index, value){
    			console.log(index + '   ' + payment + '   ' + value);
    			var sharesRef = paymentsRef.child(''+payment).child('shares/' + index);
    			console.log(sharesRef);
   				sharesRef.update({
   					"active": value
   				});
    			
    		}

    		// a method to create new messages; called by ng-submit
    		$scope.addPayment = function() {
    		// calling $add on a synchronized array is like Array.push(),
			// except that it saves the changes to our database!

      		$scope.payments.$add({
      				createdDate: Firebase.ServerValue.TIMESTAMP,
      				sum: $scope.payment.sum,
      				payer: $scope.payment.name,
      				description: 'Maksettu: ' + new Date(Date.now()).toLocaleString(),//$scope.payment.description,
      				shares: countShares($scope.payment.sum, $scope.payment.name, $scope.persons)
        		}).then(function() {
        alert('Payment saved!');
        
      }).catch(function(error) {
        alert('Error!');
      });
      
      		// reset the message input
      			$scope.payment.name = "";
      			$scope.payment.sum = 0;
      			$scope.active = false;

    		};
   		}]);

	function countShares(sum, payer, persons) {
    	var shares = [];
    	
    	var sharePerPerson = sum / persons.length;
    	$.each(persons, function(index,value){

    		var active = true;
    		if(payer == value.name){
    			active = false;
    		}
    		var key = value.name;
    		var share = 
    			{	id: index,
    				name: value.name,
    				sum: sharePerPerson,
    				active: active
    			}
    		shares.push(share);
    	});
    	return shares;
    }

    function getSaldos(payments){

    	var sharesTotal = {};
    	var debtTo = [];
    	console.log("payments: " + this.payments)
    	$.each(payments, function(index,payment){
    		var shares = payment.shares;
    		var payer = payment.name;
    		debtTo.push(payer);
    		$.each(shares, function(index1,share){
    		if(share.name!=payer){
    			debtTo[payer]+=share.sum;
    		}
    	});
    		console.log(debtTo);
    		return debtTo;
    	});
    }
})();

