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
  DirectionalLight,
  DirectionalLightHelper,
  ShaderMaterial,
  PlaneGeometry,
  BackSide,
  LoadingManager,
  PCFSoftShadowMap,
  CubeTextureLoader,
  SRGBColorSpace,
  ColorManagement,
  ACESFilmicToneMapping,
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { gsap } from 'gsap'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

// Container element
let wrapper = document.querySelector('.exploreCar')
let wrapperWidth = wrapper.clientWidth
let wrapperHeight = wrapper.clientHeight

const loadingBarElement = document.querySelector('.loading-bar')

let camera, scene, renderer
let directLightHelper
let controls
let INTERSECTED
let pointer = new Vector2()
const raycaster = new Raycaster()

let sceneLoaded = false
let fpsGraph

ColorManagement.enabled = true

init()
animate()

function init() {
  // Main
  scene = new Scene()
  camera = new PerspectiveCamera(75, wrapperWidth / wrapperHeight, 0.1, 1000)
  renderer = new WebGLRenderer({
    antialias: true,
  })
  controls = new OrbitControls(camera, renderer.domElement)
  const pane = new Pane()
  pane.registerPlugin(EssentialsPlugin)
  const cubeTextureLoader = new CubeTextureLoader()

  fpsGraph = pane.addBlade({
    view: 'fpsgraph',
    label: 'fpsgraph',
  })

  const debugParams = {
    envMapIntensity: 1,
  }
  // const axesHelper = new AxesHelper(5)
  // scene.add(axesHelper)

  // Main setup
  scene.background = new Color(0x0f1111)
  camera.position.set(0, 3, 6)
  camera.lookAt(0, 0, 0)

  const cameraFolder = pane.addFolder({
    title: 'perspective camera',
    expanded: true,
  })
  cameraFolder.addInput(camera.position, 'x', { min: -10, max: 10, step: 0.1, label: 'camera x' })
  cameraFolder.addInput(camera.position, 'y', { min: -10, max: 10, step: 0.1, label: 'camera y' })
  cameraFolder.addInput(camera.position, 'z', { min: -10, max: 10, step: 0.1, label: 'camera z' })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(wrapperWidth, wrapperHeight)
  renderer.physicallyCorrectLights = true
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
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
  const ambientLight = new AmbientLight(0xffffff, 0)
  const directLight = new DirectionalLight(0xf1f1f1, 5)
  directLight.castShadow = true
  directLight.position.set(-5, 5, 0)
  directLight.lookAt(0, 0, 0)
  directLight.shadow.mapSize.set(2048, 2048)
  directLight.shadow.camera.near = 0.1
  directLight.shadow.camera.far = 1000
  directLight.shadow.normalBias = 0.01

  directLightHelper = new DirectionalLightHelper(directLight, 2)

  const lightsFolder = pane.addFolder({
    title: 'Lights',
    expanded: true,
  })
  lightsFolder.addInput(ambientLight, 'intensity', { min: 0, max: 20, label: 'amb intensity' })
  lightsFolder.addInput(directLight, 'intensity', { min: 0, max: 20, label: 'dir intensity' })
  lightsFolder.addInput(directLight.position, 'x', { min: -20, max: 20, label: 'dir posX' })
  lightsFolder.addInput(directLight.position, 'y', { min: 0, max: 20, label: 'dir posY' })
  lightsFolder.addInput(directLight.position, 'z', { min: -20, max: 20, label: 'dir posZ' })

  const updateAllMaterials = () => {
    scene.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material.envMap = environmentMap
        child.material.envMapIntensity = debugParams.envMapIntensity
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }

  const environmentMap = cubeTextureLoader.load([
    'src/assets/environmentMaps/0/px.jpg',
    'src/assets/environmentMaps/0/nx.jpg',
    'src/assets/environmentMaps/0/py.jpg',
    'src/assets/environmentMaps/0/ny.jpg',
    'src/assets/environmentMaps/0/pz.jpg',
    'src/assets/environmentMaps/0/nz.jpg',
  ])

  // scene.background = environmentMap

  lightsFolder.addInput(debugParams, 'envMapIntensity', { min: 0, max: 10 }).on('change', () => {
    updateAllMaterials()
  })

  // Geometry
  const textureLoader = new TextureLoader()
  const alphaCircle = textureLoader.load('src/assets/gradient_img.png')
  const material = new MeshStandardMaterial({
    color: 0x0f1111,
    alphaMap: alphaCircle,
    transparent: true,
    side: BackSide,
  })

  const plane = new Mesh(new CircleGeometry(10, 24), material)
  plane.receiveShadow = true
  plane.rotation.x = Math.PI / 2

  scene.add(ambientLight, directLight, directLightHelper, plane)

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
      sceneLoaded = true
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
      const progressRatio = itemsLoaded / itemsTotal
      loadingBarElement.style.transform = `scaleX(${progressRatio})`
    },
  )
  const gltfLoader = new GLTFLoader(loadingManager)

  // Model
  gltfLoader.load('src/assets/fonecar/fonecaredited.gltf', (gltf) => {
    const model = gltf.scene
    scene.add(model)
    updateAllMaterials()
  })

  // Raycaster
  pointer.set(-1, 1)

  // Controls

  wrapper.addEventListener('mousemove', onPointerMove)

  window.addEventListener('resize', onWindowResize)
  wrapper.addEventListener('dblclick', () => {
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
  pointer.x = (event.offsetX / wrapperWidth) * 2 - 1
  pointer.y = -(event.offsetY / wrapperHeight) * 2 + 1
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()

  directLightHelper.update()
  render()
}

console.log(scene)
function render() {
  if (sceneLoaded) {
    raycaster.setFromCamera(pointer, camera)
    let intersects = null
    intersects = raycaster.intersectObjects(scene.children[5].children[0].children)
    console.log(intersects)
    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].object) {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
        INTERSECTED = intersects[0].object
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
        INTERSECTED.material.emissive.setHex(0xff0000)
      }
    } else {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
      INTERSECTED = null
    }
  }
  fpsGraph.begin()
  renderer.render(scene, camera)
  fpsGraph.end()
}
