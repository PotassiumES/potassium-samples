import WebXRPolyfill from 'webxr-polyfill'

import App from 'potassium-es/src/App'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import ModeSwitcherComponent from 'potassium-components/src/molecules/ModeSwitcherComponent.js'

new WebXRPolyfill()

const HelloWorldApp = class extends App {
	constructor(){
		super()

		this._labelComponent = new LabelComponent(null, {
			text: 'Hello world'
		})
		this.appendComponent(this._labelComponent)

		this._modeSwitcherComponent = new ModeSwitcherComponent()
		this.appendComponent(this._modeSwitcherComponent)
		this._modeSwitcherComponent.immersiveGraph.position.set(-1, 0, -2)
		this._modeSwitcherComponent.immersiveGraph.scale.set(0.5, 0.5, 0.5)
		this.appendComponent(this._modeSwitcherComponent)
		this._modeSwitcherComponent.addListener((eventName, mode) => {
			this.setDisplayMode(mode)
		}, ModeSwitcherComponent.ModeChangedEvent)
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new HelloWorldApp()
	document.body.appendChild(window.app.el)
})
