var vertexLabels = [];
var edgeSums = [];
var permutation = [];
var labelsAvailable= [];
var n;
var graph = [];

///////  HELPER FUNCTIONS  //////////

function checkVLEA() {
	return checkConsecutiveDistinct();

}


function checkConsecutiveDistinct() {
	var answer = true;
	edgeSums.sort();
	for(let i = 0; i < edgeSums.length-1; i++) {
		if(edgeSums[i]+1!=edgeSums[i+1])
			answer = false;
	}
	
	return answer;
}


function computeEdgeSums ()  {
	for(let i = 0; i < n; i++) {
		for(let j = i+1; j < n; j++) {
			if(graph[i][j]==1)
				edgeSums.push(vertexLabels[i]+vertexLabels[j]);
		}
	}

}


function permuteVertexLabels() {
	for(let i = 0; i < n; i++) {
		labelsAvailable[i] = i;
	}
	
	for(let i = 0; i < n; i++) {
		
		
		vertexLabels[i]=labelsAvailable[permutation[i]];
		labelsAvailable.splice(permutation[i], 1);

	}



}

function incrementPermutation() {
	permutation[n-1]++;
	
	for(let i = n-1; i > 0; i=i-1) {
		if(permutation[i]>n-1-i) {
			permutation[i]=0;
			permutation[i-1]++;
		}
	}

}


function factorial(k) {
	val = 1;
	for(let i = 0; i < k; i++) {
		val = val*(i+1);
	}
	return val;
}


function checkEdgeSums() {
	var answer = true;
	var search = false;
	const min = minEdgeSum();
	var current = min;

	for(let i = 0; i < edgeSums.length-1; i++) {
		
		for(let j = 0; j < edgeSums.length; j++) {
			if(edgeSums[j] === (current+1)){
				search = true;
				current++;
				break;
			}
		}
		
	
		if(!search){
			answer = false;
			break;
			}
			
		search = false;
		
	}

	return answer;
}



function minEdgeSum() {
	var min = edgeSums[0];
	
	for(let i = 1; i < edgeSums.length; i++) {
		if(min > edgeSums[i]){
			min = edgeSums[i];
			}
	}
	
	return min;


}


function initializeThings() {


	for(let i = 0; i < n; i++) { // Initializes the permutation
		permutation[i] = 0;
	}

	for(let i = 0; i < n; i++) { // Initializes labelsAvailable
		labelsAvailable[i] = i;
	}

	for(let i = 0; i < n; i++) { // Initializes labels
		vertexLabels[i] = i;
	}
}


/////// WORKER CODE  //////////


onmessage = (e) => {
  console.log("Message received from main script");
  n = e.data[0];
  graph = e.data[1];
  initializeThings();



  for(let i = 0; i < factorial(n); i++) {
			edgeSums = [];
			permuteVertexLabels();
			computeEdgeSums();

			
			if(checkEdgeSums()) {
				postMessage(vertexLabels);
			}
			
			incrementPermutation();
		}

  console.log("Posting message back to main script");
  postMessage(n);

};
