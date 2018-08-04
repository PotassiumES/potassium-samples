import WebXRPolyfill from 'webxr-polyfill'

import App from 'potassium-es/src/App'

import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'
import ModeSwitcherComponent from 'potassium-components/src/molecules/ModeSwitcherComponent.js'

new WebXRPolyfill()

const HelloWorldApp = class extends App {
	constructor(){
		super()

		this._headingComponent = new HeadingComponent(null, {
			text: 'Hello world'
		})
		this.appendComponent(this._headingComponent)

		this._modeSwitcherComponent = new ModeSwitcherComponent()
		this.appendComponent(this._modeSwitcherComponent)
		this._modeSwitcherComponent.immersiveGraph.position.set(-1, 0, -2)
		this._modeSwitcherComponent.immersiveGraph.scale.set(0.5, 0.5, 0.5)
		this.appendComponent(this._modeSwitcherComponent)
		this._modeSwitcherComponent.addListener((eventName, mode) => {
			this.setDisplayMode(mode)
		}, ModeSwitcherComponent.ModeChangedEvent)
		this.addListener((eventName, mode) => {
			this._modeSwitcherComponent.handleSwitchFailed(mode)
		}, App.DisplayModeFailedEvent)
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new HelloWorldApp()
	document.body.appendChild(window.app.el)
})
