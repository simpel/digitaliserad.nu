var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function init() {

	container = document.getElementById("container");
	scene = new THREE.Scene();
	


	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light );


	var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
	
	for ( var i = 0; i < 500; i ++ ) {
		var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xFFFFFF, opacity: 0.1 } ) );
		var scale = Math.random() + 0.5;

		object.position.x = Math.random() * container.clientWidth - (container.clientWidth/2);
		object.position.y = Math.random() * container.clientHeight - (container.clientHeight/2);
		object.position.z = Math.random() * 800 - 400;
		object.rotation.x = Math.random() * 2 * Math.PI;
		object.rotation.y = Math.random() * 2 * Math.PI;
		object.rotation.z = Math.random() * 2 * Math.PI;
		object.scale.x = scale;
		object.scale.y = scale;
		object.scale.z = scale;
		scene.add( object );
	}


	camera = new THREE.PerspectiveCamera( 24, container.clientWidth / container.clientHeight, 1, 1000 );
	
	renderer = new THREE.WebGLRenderer( {alpha: true });
	renderer.setSize( container.clientWidth, container.clientHeight );
	
	container.appendChild( renderer.domElement );

};

function reposition() {
	for(i=0; i < scene.children.length; i++){
     	object = scene.children[i];
     	object.position.x = Math.random() * container.clientWidth - (container.clientWidth/2);
		object.position.y = Math.random() * container.clientHeight - (container.clientHeight/2);
  	}

  	camera.aspect = container.clientWidth / container.clientHeight;
  	renderer.setSize( container.clientWidth, container.clientHeight );

};

function animate() {
	requestAnimationFrame( animate );
	render();

};

function render() {
	
	theta += 0.01;
	
	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );

	camera.updateMatrixWorld();

	renderer.render( scene, camera );

};

$(document).foundation();
//$('body').DictIt();


$(document).ready(function(){
  $('.zoom').zoom();
});

if($('.hero').length > 0) {
	var container, scene, camera, renderer;
	var radius = 100, theta = 0;

	init();
	animate();

	$(window).resize(function() {
	    delay(function(){
	      	reposition();
			
	    }, 500);
	});

	console.log('testing');

}