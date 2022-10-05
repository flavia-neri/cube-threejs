const menu = document.querySelector('.menu')
const li = document.getElementsByTagName('li')
const canvas = document.querySelector('#c')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
camera.position.z = 1

const scene = new THREE.Scene()

const radius = 1
const widthSegments = 1
const heightSegments = 1
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: true })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

const geometry2 = new THREE.BoxGeometry(1,1,1)
const material2 = new THREE.MeshPhongMaterial({ color: 0x00ff00})
const cube = new THREE.Mesh(geometry2, material2)
cube.scale.set(0.09, 0.09, 0.09)

cube.position.x = 0
cube.position.y = 0
scene.add(cube)

const cube2 = new THREE.Mesh(geometry2, material2)
cube2.scale.set(0.09, 0.09, 0.09)

scene.add(cube2)

const color = 0xFFFF
const intensity = 1
const light = new THREE.DirectionalLight(color, intensity)
light.position.set(-1, 2, 4) // x, y e z

scene.add(light)

const domEvents = new THREEx.DomEvents(camera, renderer.domElement)

let clicked = false
domEvents.addEventListener(cube2, 'click', event => {
    clicked = !clicked
    if(clicked){
        menu.style.display = 'flex'
        menu.style.opacity = '1'
        menu.style.animation = 'hover-item-menu 2s'
    } else{
        menu.style.animation = 'hover-item-menu-out 1s' 
        menu.style.opacity = '0'
    }
})

function onDocumentMouseMove(event) {
    
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( cube2 );

    if(intersects.length == 0) {
        canvas.style.cursor = 'pointer'
    } 
}
domEvents.addEventListener(cube2, 'mouseover', onDocumentMouseMove)
domEvents.addEventListener(cube2, 'mouseout', () => {
    canvas.style.cursor = 'default'
})

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}
  
function render(time) {
    renderer.setSize(window.innerWidth, window.innerHeight)
    time *= 0.001;

    // if (resizeRendererToDisplaySize(renderer)) {
    //     const canvas = renderer.domElement;
    //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //     camera.updateProjectionMatrix();
    // }
    sphere.rotation.y = time
    cube.rotation.y = time
    cube2.rotation.x = time
    
    renderer.render(scene, camera)
  
    requestAnimationFrame(render)
  }
  
  requestAnimationFrame(render)