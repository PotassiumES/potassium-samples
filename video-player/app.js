import el from 'potassium-es/src/El'
import App from 'potassium-es/src/App'
import graph from 'potassium-es/src/Graph'
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
	constructor() {
		super()

		const menuItems = []
		for(let i=0; i < videos.length; i++){
			menuItems.push({
				name: videos[i].name,
				anchor: `#${i}`
			})
		}

		this._masthead = new MastheadComponent(null, {
			brand: 'PotassiumES',
			brandAnchor: '/',
			menuItems: menuItems
		}).appendTo(this)
		this._masthead.addListener((eventName, mode) => {
			this.setDisplayMode(mode)
		}, MastheadComponent.MODE_REQUEST_EVENT)

		this._videoPlayerComponent = new VideoPlayerComponent(null, {
			url: videos[0].url,
			mimeType: videos[0].mimeType
		}).appendTo(this)

		// Set up our URL router to handle view switching
		this.router.addRoute(new RegExp('^$'), 0) // special case no hash
		for(let i=0; i < videos.length; i++){
			// Each video gets a number hash
			this.router.addRoute(new RegExp(`^${i}$`), i)
		}
		this.router.addListener(this._handleRoutes.bind(this))
		this.router.start()

		this._setupLights()
	}

	_setVideo(index){
		if(index < 0 || index >= videos.length){
			console.error('unknown video index', index)
			return
		}
		this._videoPlayerComponent.setVideoSource(videos[index].url, videos[index].mimeType)
	}

	_handleRoutes(route, hash, ...regexMatches) {
		if(Number.isNaN(Number.parseInt(route))){
			console.error('Unknown route', route, hash, ...regexMatches)
			return
		}
		this._setVideo(route)
	}

	_setupLights(){
		this._immersiveScene.add(graph.directionalLight([0xffffff, 0.7], {
			name: 'DirectionalLight'
		}).appendTo(this._immersiveScene).target)
		graph.ambientLight([0xffffff, 0.2], {
			name: 'AmbientLight'
		}).appendTo(this._immersiveScene)
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new VideoPlayerApp()
	document.body.appendChild(window.app.el)
})
