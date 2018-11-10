import App from 'potassium-es/src/App'
import som from 'potassium-es/src/SOM'
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
		this._backButton.addClass('back-button')

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
		}, ModeSwitcherComponent.ModeChangedEvent)
		this.addListener((eventName, mode) => {
			this._modeSwitcherComponent.handleSwitchFailed(mode)
		}, App.DisplayModeFailedEvent)

		const portalLight = som.directionalLight([0xffffff, 0.7])
		this.portalScene.add(portalLight)
		this.portalScene.add(portalLight.target)
		this.portalScene.add(som.ambientLight([0xffffff, 0.4]))

		const immersiveLight = som.directionalLight([0xffffff, 0.7])
		this.immersiveScene.add(immersiveLight)
		this.immersiveScene.add(immersiveLight.target)
		this.immersiveScene.add(som.ambientLight([0xffffff, 0.4]))

		// Add a spherical environment for immersive mode
		this._immersiveEnvironmentMesh = som
			.mesh(
				som.sphereBufferGeometry(500, 60, 40),
				som.meshBasicMaterial({
					map: som.textureLoader().load('./environment.jpg')
				})
			)
			.appendTo(this.immersiveScene)
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
	document.body.appendChild(window.app.dom)
})
