import WebXRPolyfill from 'webxr-polyfill'

import App from 'potassium-es/src/App'

import LabelComponent from 'potassium-components/src/LabelComponent.js'

new WebXRPolyfill()

const HelloWorldApp = class extends App {
	constructor(){
		super()

		this._labelComponent = new LabelComponent(null, {
			text: 'Hello world'
		})
		this.appendComponent(this._labelComponent)
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new HelloWorldApp()
	document.body.appendChild(window.app.el)
})
