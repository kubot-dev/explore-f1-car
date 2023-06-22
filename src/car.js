import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  MeshStandardMaterial,
  Mesh,
  Color,
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
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { gsap } from 'gsap'
import { Pane } from 'tweakpane'
import { InteractionManager } from 'three.interactive'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

import { carData } from './assets/carData.js'

import px from '/src/assets/environmentMaps/0/px.jpg'
import nx from '/src/assets/environmentMaps/0/nx.jpg'
import py from '/src/assets/environmentMaps/0/py.jpg'
import ny from '/src/assets/environmentMaps/0/ny.jpg'
import pz from '/src/assets/environmentMaps/0/pz.jpg'
import nz from '/src/assets/environmentMaps/0/nz.jpg'
import gradient from '/src/assets/gradient_img.png'

// Container element
let wrapper = document.querySelector('.exploreCar')
let wrapperWidth = wrapper.clientWidth
let wrapperHeight = wrapper.clientHeight

const loadingBarElement = document.querySelector('.loading-bar')
const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(wrapperWidth, wrapperHeight)
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.pointerEvents = 'none'
labelRenderer.domElement.classList.add('labelWrapper')
wrapper.appendChild(labelRenderer.domElement)

const dataContent = document.querySelector('.dataContainer')
const partLabel = document.querySelector('.partLabel')
const partDescription = document.querySelector('.partDescription')
const closeBtn = document.createElement('div')
closeBtn.classList.add('closeBtn')
closeBtn.textContent = 'x'
// const closeBtn = document.querySelector('.closeBtn')
closeBtn.addEventListener('click', () => {
  console.log('working')
  // dataContent.classList.remove('open')
})
dataContent.appendChild(closeBtn)

const dataContainer = new CSS2DObject(dataContent)

let camera, scene, renderer
let directLightHelper
let controls
let pointer = new Vector2()
let interactionManager

let sceneLoaded = false
let fpsGraph
let effectComposer
let outlinePass

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
  interactionManager = new InteractionManager(renderer, camera, renderer.domElement)
  controls = new OrbitControls(camera, renderer.domElement)
  const pane = new Pane()
  pane.registerPlugin(EssentialsPlugin)
  const cubeTextureLoader = new CubeTextureLoader()

  fpsGraph = pane.addBlade({
    view: 'fpsgraph',
    label: 'fpsgraph',
  })

  scene.add(dataContainer)

  const debugParams = {
    envMapIntensity: 1,
  }

  // Main setup
  scene.background = new Color(0x0f1111)
  camera.position.set(0, 3, 6)
  // camera.lookAt(0, 0, 0)

  const cameraFolder = pane.addFolder({
    title: 'perspective camera',
    expanded: false,
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
  directLightHelper.visible = false

  const lightsFolder = pane.addFolder({
    title: 'Lights',
    expanded: false,
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

  const environmentMap = cubeTextureLoader.load([px, nx, py, ny, pz, nz])

  // scene.background = environmentMap

  lightsFolder.addInput(debugParams, 'envMapIntensity', { min: 0, max: 10 }).on('change', () => {
    updateAllMaterials()
  })

  // Geometry
  const textureLoader = new TextureLoader()
  const alphaCircle = textureLoader.load(gradient)
  const planeMaterial = new MeshStandardMaterial({
    color: 0x1f1f1f,
    alphaMap: alphaCircle,
    transparent: true,
    side: BackSide,
  })

  const plane = new Mesh(new CircleGeometry(10, 24), planeMaterial)
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
  const loader = new DRACOLoader()
  loader.setDecoderPath('public/draco/gltf/')
  gltfLoader.setDRACOLoader(loader)

  // Model
  gltfLoader.load('public/fixedNames/fixedNames.gltf', function (gltf) {
    const model = gltf.scene

    scene.add(model)

    model.traverse((child) => {
      if (child.children.length === 0) {
        // Add only objects widthout children
        if (child.material) {
          child.material = child.material.clone()
          child.userData.initialEmissive = child.material.emissive.clone()
          child.material.emissiveIntensity = 0.5
        }

        interactionManager.add(child)

        child.addEventListener('mouseover', (event) => {
          event.stopPropagation()

          document.body.style.cursor = 'pointer'

          if (child.material) {
            child.userData.materialEmissiveHex = child.material.emissive.getHex()
            child.material.emissive.setHex(0xff0000)
            child.material.emissiveIntensity = 0.5
          }
        })

        child.addEventListener('mouseout', (event) => {
          event.stopPropagation()

          document.body.style.cursor = 'default'

          if (child.material) {
            child.material.emissive.setHex(child.userData.materialEmissiveHex)
          }
        })

        child.addEventListener('click', (event) => {
          event.stopPropagation()
          dataContent.classList.add('open')

          cameraPosition(event)
          handlePartDescription(event)
        })
      }
    })
    updateAllMaterials()
  })

  effectComposer = new EffectComposer(renderer)
  effectComposer.setSize(wrapperWidth, wrapperHeight)
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const renderPass = new RenderPass(scene, camera)
  renderPass.clearColor = true
  effectComposer.addPass(renderPass)

  outlinePass = new OutlinePass(new Vector2(wrapperWidth, wrapperHeight), scene, camera)
  outlinePass.enabled = true
  effectComposer.addPass(outlinePass)

  const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
  gammaCorrectionPass.enabled = false
  effectComposer.addPass(gammaCorrectionPass)

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

  labelRenderer.setSize(wrapperWidth, wrapperHeight)

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

function cameraPosition(event) {
  const camTargetName = event.target.name
  gsap.to(camera.position, carData.cameraPositions[camTargetName])
}

function handlePartDescription(event) {
  const partClicked = event.target.name
  const doStuff = carData.partsDescription[partClicked]
  partLabel.textContent = doStuff.label
  partDescription.textContent = doStuff.description
  dataContainer.position.set(doStuff.labelPosition.x, doStuff.labelPosition.y, doStuff.labelPosition.z)
}

function render() {
  if (sceneLoaded) {
    interactionManager.update()
  }
  fpsGraph.begin()
  effectComposer.render()
  labelRenderer.render(scene, camera)
  fpsGraph.end()
}
