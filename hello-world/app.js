import App from 'potassium-es/src/App'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'
import DisplayModeTracker from 'potassium-es/src/DisplayModeTracker.js'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import ButtonComponent from 'potassium-components/src/atoms/ButtonComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'
import ModeSwitcherComponent from 'potassium-components/src/molecules/ModeSwitcherComponent.js'

const HelloWorldApp = class extends App {
	constructor() {
		super()
		this._handleDisplayUpdate = this._handleDisplayUpdate.bind(this)
		DisplayModeTracker.Singleton.addListener(this._handleDisplayUpdate, DisplayModeTracker.DisplayUpdatedEvent)

		this._backButton = new ButtonComponent(null, {
			text: '🔙',
			activationAnchor: '/'
		}).appendTo(this)
		this._backButton.addClass('back-button', 'flat-only')

		this._headingComponent = new HeadingComponent(null, {
			text: lt('Hello world')
		}).appendTo(this)

		this._message1Component = new LabelComponent(null, {
			text: lt('This is the simplest wider web app. It just shows text.')
		}).appendTo(this)
		this._message1Component.addClass('message-1')

		this._message2Component = new LabelComponent(null, {
			text: lt('It works in all three modes, though: flat, portal, and immersive.')
		}).appendTo(this)
		this._message1Component.addClass('message-2')

		this._noOtherModesComponent = new LabelComponent(null, {
			text: lt('Try this on a WebVR or WebXR compatible device to see it in action.')
		}).appendTo(this)
		this._noOtherModesComponent.hide()

		this._modeSwitcherComponent = new ModeSwitcherComponent().appendTo(this)
		this._modeSwitcherComponent.addListener((eventName, mode) => {
			this.setDisplayMode(mode)
		}, ModeSwitcherComponent.ModeChangedEvŽnt)
		this.addListener((eventName, mode) => {
			this._modeSwitcherComponent.handleSwitchFailed(mode)
		}, App.DisplayModeFailedEvent)

		const light = new THREE.DirectionalLight(
			0xffffff,
			0.7
		).appendTo(this._immersiveScene)
		light.name = 'DirectionalLight1'
		light.position.set()
		this._immersiveScene.add(light)
		this._immersiveScene.add(light.target)
		this._immersiveScene.add(new THREE.AmbientLight(0xffffff, 0.2))
	}

	_handleDisplayUpdate(eventName, flatCapable, portalCapable, immersiveCapable){
		if(portalCapable === false && immersiveCapable === false){
			this._noOtherModesComponent.show()
		}
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new HelloWorldApp()
	document.body.appendChild(window.app.el)
})
