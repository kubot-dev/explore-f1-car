import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  MeshStandardMaterial,
  Mesh,
  Color,
  Raycaster,
  Vector2,
  CircleGeometry,
  TextureLoader,
  Vector3,
  DirectionalLight,
  ShaderMaterial,
  PlaneGeometry,
  AxesHelper,
  BackSide,
  LoadingManager,
  PCFSoftShadowMap,
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { gsap } from 'gsap'

// Container element
let wrapper = document.querySelector('.exploreCar')
let wrapperWidth = wrapper.clientWidth
let wrapperHeight = wrapper.clientHeight

const loadingBarElement = document.querySelector('.loading-bar')

let camera, scene, raycaster, renderer
let controls

let INTERSECTED
const pointer = new Vector2()

init()
animate()

function init() {
  // Main
  scene = new Scene()
  camera = new PerspectiveCamera(75, wrapperWidth / wrapperHeight, 0.1, 1000)
  renderer = new WebGLRenderer()
  controls = new OrbitControls(camera, renderer.domElement)
  // const axesHelper = new AxesHelper(5)
  // scene.add(axesHelper)

  // Main setup
  scene.background = new Color(0x0f1111)

  camera.position.set(3, 3, 8)
  camera.lookAt(0, 0, 0)

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(wrapperWidth, wrapperHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  wrapper.appendChild(renderer.domElement)

  const controlsOptions = {
    enableDamping: true,
    // autoRotate: true,
    // autoRotateSpeed: 0.5,
  }
  Object.assign(controls, controlsOptions)

  // Lights
  const ambientLight = new AmbientLight(0xffffff, 1)
  const directLight = new DirectionalLight(0xf1f1f1, 1)
  directLight.castShadow = true
  directLight.position.set(5, 5, 2)
  directLight.lookAt(0, 0, 0)

  // directLight.shadow.mapSize.width = 1024
  // directLight.shadow.mapSize.height = 1024
  // directLight.shadow.camera.near = 0.1
  // directLight.shadow.camera.far = 1000

  // Geometry
  const textureLoader = new TextureLoader()
  const alphaCircle = textureLoader.load('src/assets/gradient_img (2).png')
  const material = new MeshStandardMaterial({
    color: 0x1f1f1f,
    alphaMap: alphaCircle,
    transparent: true,
    side: BackSide,
  })

  const plane = new Mesh(new CircleGeometry(10, 24), material)
  plane.receiveShadow = true
  plane.rotation.x = Math.PI / 2

  scene.add(ambientLight, directLight, plane)

  /**
   * Overlay
   */
  const overlayGeometry = new PlaneGeometry(2, 2, 1, 1)
  const overlayMaterial = new ShaderMaterial({
    transparent: true,
    uniforms: {
      uAlpha: { value: 1 },
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `,
  })
  const overlay = new Mesh(overlayGeometry, overlayMaterial)
  scene.add(overlay)

  // Scene elements
  const loadingManager = new LoadingManager(
    // Loaded
    () => {
      window.setTimeout(() => {
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 0.5, value: 0 })
        loadingBarElement.classList.add('ended')
        loadingBarElement.style.transform = ''
      }, 500)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
      const progressRatio = itemsLoaded / itemsTotal
      loadingBarElement.style.transform = `scaleX(${progressRatio})`
    },
  )
  const gltfLoader = new GLTFLoader(loadingManager)

  // Model
  gltfLoader.load('src/assets/generic-2022-f1-car/f1car.gltf', (gltf) => {
    const model = gltf.scene
    model.castShadow = true
    scene.add(model)
  })

  // Raycaster
  raycaster = new Raycaster()

  // Controls

  document.addEventListener('mousemove', onPointerMove)

  window.addEventListener('resize', onWindowResize)
  window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen()
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  })
}

function onWindowResize() {
  wrapperWidth = wrapper.clientWidth
  wrapperHeight = wrapper.clientHeight

  camera.aspect = wrapperWidth / wrapperHeight
  camera.updateProjectionMatrix()

  renderer.setSize(wrapperWidth, wrapperHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function animate() {
  requestAnimationFrame(animate)

  render()
  controls.update()
}

function render() {
  // raycaster.setFromCamera(pointer, camera)

  // const intersects = raycaster.intersectObjects(scene.children, true)

  // console.log(intersects)

  // if (intersects.length > 0) {
  //   if (INTERSECTED != intersects[0].object) {
  //     if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)

  //     INTERSECTED = intersects[0].object
  //     INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
  //     INTERSECTED.material.emissive.setHex(0xff0000)
  //   }
  // } else {
  //   if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)

  //   INTERSECTED = null
  // }

  renderer.render(scene, camera)
}
