import dom from 'potassium-es/src/DOM'
import App from 'potassium-es/src/App'
import som from 'potassium-es/src/SOM'
import Component from 'potassium-es/src/Component'
import Stylist from 'potassium-es/src/style/Stylist'
import { FlatDisplay } from 'potassium-es/src/Engine'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import ButtonComponent from 'potassium-components/src/atoms/ButtonComponent'

import VideoPlayerComponent from 'potassium-components/src/molecules/VideoPlayerComponent'

import MastheadComponent from 'potassium-components/src/organisms/MastheadComponent'

const videos = [
	{ name: 'Milky Way', url: '/video-player/test16x9video.mov', mimeType: 'video/mp4' },
	{ name: 'Social Life', url: '/video-player/test4x3video.m4v', mimeType: 'video/mp4' }
]

const VideoPlayerApp = class extends App {
	constructor(dataObject=null, options={}, inheritedOptions={}) {
		super(dataObject, options, inheritedOptions)

		const menuItems = []
		for (let i = 0; i < videos.length; i++) {
			menuItems.push({
				name: videos[i].name,
				anchor: `#${i}`
			})
		}

		this._masthead = new MastheadComponent(undefined, {
			brand: 'PotassiumES',
			brandAnchor: '/',
			menuItems: menuItems
		}, this.inheritedOptions).appendTo(this)
		this._masthead.addListener((eventName, mode) => {
			this.setDisplayMode(mode)
		}, MastheadComponent.MODE_REQUEST_EVENT)

		this._videoPlayerComponent = new VideoPlayerComponent(undefined, {
			usesPortalOverlay: false
		}, this.inheritedOptions).appendTo(this)

		// Set up our URL router to handle view switching
		this.router.addRoute(new RegExp('^$'), 0) // special case no hash
		for (let i = 0; i < videos.length; i++) {
			// Each video gets a number hash
			this.router.addRoute(new RegExp(`^${i}$`), i)
		}
		this.router.addListener(this._handleRoutes.bind(this))
		this.router.start()

		// Add a spherical environment for immersive mode
		this._immersiveEnvironmentMesh = som
			.mesh(
				som.sphereBufferGeometry(500, 60, 40),
				som.meshBasicMaterial({
					map: som.textureLoader().load('./environment.jpg')
				})
			)
			.appendTo(this._immersiveScene)
		this._immersiveEnvironmentMesh.geometry.scale(-1, 1, 1) // point inward

		this._setupLights()
	}

	_setVideo(index) {
		if (index < 0 || index >= videos.length) {
			console.error('unknown video index', index)
			return
		}
		this._videoPlayerComponent.setVideoSource(videos[index].url, videos[index].mimeType)
	}

	_handleRoutes(route, hash, ...regexMatches) {
		if (Number.isNaN(Number.parseInt(route))) {
			console.error('Unknown route', route, hash, ...regexMatches)
			return
		}
		this._setVideo(route)
		this._masthead.navigationMenu.selectedIndex = route
	}

	_setupLights() {
		const portalLight = som.directionalLight([0xffffff, 0.7])
		this._portalScene.add(portalLight)
		this._portalScene.add(portalLight.target)
		this._portalScene.add(som.ambientLight([0xffffff, 0.4]))

		const immersiveLight = som.directionalLight([0xffffff, 0.7])
		this._immersiveScene.add(immersiveLight)
		this._immersiveScene.add(immersiveLight.target)
		this._immersiveScene.add(som.ambientLight([0xffffff, 0.4]))
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new VideoPlayerApp()
	document.body.appendChild(window.app.dom)
})
