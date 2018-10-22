import App from 'potassium-es/src/App'
import graph from 'potassium-es/src/Graph'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'
import DisplayModeTracker from 'potassium-es/src/DisplayModeTracker.js'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import ImageComponent from 'potassium-components/src/atoms/ImageComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'
import ModeSwitcherComponent from 'potassium-components/src/molecules/ModeSwitcherComponent.js'

const HelloWorldApp = class extends App {
	constructor() {
		super()
		this._handleDisplayUpdate = this._handleDisplayUpdate.bind(this)
		DisplayModeTracker.Singleton.addListener(this._handleDisplayUpdate, DisplayModeTracker.DisplayUpdatedEvent)

		this._backButton = new ImageComponent(null, {
			activationAnchor: '/',
			usesImmersive: false,
			usesPortalSpatial: false,
			image: '/hello-world/left-arrow.png'
		}).appendTo(this)
		this._backButton.addClass('back-button', 'flat-only')

		this._headingComponent = new HeadingComponent(null, {
			text: lt('Hello world'),
			usesPortalOverlay: false,
			usesPortalSpatial: true
		}).appendTo(this)

		this._message1Component = new LabelComponent(null, {
			text: lt('This is a terribly simple wider web app.'),
			usesPortalOverlay: false,
			usesPortalSpatial: true
		}).appendTo(this)
		this._message1Component.addClass('message-1')

		this._message2Component = new LabelComponent(null, {
			text: lt('It works in all display modes: flat, portal, and immersive.'),
			usesPortalOverlay: false,
			usesPortalSpatial: true
		}).appendTo(this)
		this._message2Component.addClass('message-2')

		this._noOtherModesComponent = new LabelComponent(null, {
			text: lt('Try this on a WebVR or WebXR compatible device to see it in action.'),
			usesPortalOverlay: false,
			usesPortalSpatial: false,
			usesImmersive: false
		}).appendTo(this)
		this._noOtherModesComponent.hide()

		this._modeSwitcherComponent = new ModeSwitcherComponent().appendTo(this)
		this._modeSwitcherComponent.addListener((eventName, mode) => {
			this.setDisplayMode(mode)
		}, ModeSwitcherComponent.ModeChangedEvŽnt)
		this.addListener((eventName, mode) => {
			this._modeSwitcherComponent.handleSwitchFailed(mode)
		}, App.DisplayModeFailedEvent)

		const portalLight = graph.directionalLight([0xffffff, 0.7])
		this._portalScene.add(portalLight)
		this._portalScene.add(portalLight.target)
		this._portalScene.add(new graph.ambientLight([0xffffff, 0.9]))

		const immersiveLight = graph.directionalLight([0xffffff, 0.7])
		this._immersiveScene.add(immersiveLight)
		this._immersiveScene.add(immersiveLight.target)
		this._immersiveScene.add(new graph.ambientLight([0xffffff, 0.9]))

		// Add a spherical environment for immersive mode
		this._immersiveEnvironmentMesh = graph.mesh(
			graph.sphereBufferGeometry(500, 60, 40),
			graph.meshBasicMaterial({
				map: graph.textureLoader().load('./environment.jpg')
			})
		).appendTo(this._immersiveScene)
		this._immersiveEnvironmentMesh.geometry.scale(-1, 1, 1) // point inward
	}

	_handleDisplayUpdate(eventName, flatCapable, portalCapable, immersiveCapable) {
		if (portalCapable === false && immersiveCapable === false) {
			this._noOtherModesComponent.show()
		}
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new HelloWorldApp()
	document.body.appendChild(window.app.el)
})
