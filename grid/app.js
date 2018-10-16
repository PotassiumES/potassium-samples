import el from 'potassium-es/src/El'
import App from 'potassium-es/src/App'
import graph from 'potassium-es/src/Graph'
import Component from 'potassium-es/src/Component'
import Stylist from 'potassium-es/src/style/Stylist'
import { FlatDisplay } from 'potassium-es/src/Engine'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import VideoPlayerComponent from 'potassium-components/src/molecules/VideoPlayerComponent'

const GridApp = class extends App {
	constructor() {
		super()

		this._stylist.addListener((eventName, stylist) => {
			setInterval(() => {
				switch (this.displayMode) {
					case App.FLAT:
						this._stylist.calculateStyles(this._immersiveScene)
						this._stylist.applyStyles(this._immersiveScene)
						break
				}
			}, 500)
		}, Stylist.LINKS_LOADED_EVENT)

		const light = new THREE.DirectionalLight(0xffffff, 0.7)
		light.name = 'DirectionalLight'
		this._immersiveScene.add(light)
		this._immersiveScene.add(light.target)
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
		ambientLight.name = 'AmbientLight'
		this._immersiveScene.add(ambientLight)

		const test16x9video = '/test16x9video.mov'
		const test4x3video = '/test4x3video.m4v'
		this._videoPlayerComponent = new VideoPlayerComponent(null, {
			url: test16x9video,
			mimeType: 'video/mp4'
		}).appendTo(this)

		this._sceneWrapper = el.div({ class: 'scene-wrapper' }).appendTo(this.flatEl)
		this._flatCamera = graph.perspectiveCamera([45, 1, 0.5, 10000])
		this._flatCamera.name = 'flat-camera'
		this._flatCamera.matrixAutoUpdate = true
		this._flatDisplay = new FlatDisplay(this._flatCamera, this._immersiveScene, () => {
			this._orbitControls.update()
		})
		this._orbitControls = new THREE.OrbitControls(this._flatCamera)
		this._sceneWrapper.appendChild(this._flatDisplay.el)
		this._flatDisplay.start()
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new GridApp()
	document.body.appendChild(window.app.el)
})
