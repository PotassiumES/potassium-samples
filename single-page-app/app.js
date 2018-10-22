import App from 'potassium-es/src/App'
import graph from 'potassium-es/src/Graph'
import Component from 'potassium-es/src/Component'
import DataModel from 'potassium-es/src/DataModel'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'
import DataCollection from 'potassium-es/src/DataCollection'

import ImageComponent from 'potassium-components/src/atoms/ImageComponent.js'
import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import ImageCardComponent from 'potassium-components/src/molecules/ImageCardComponent.js'

import MastheadComponent from 'potassium-components/src/organisms/MastheadComponent.js'
import MediaGridComponent from 'potassium-components/src/organisms/MediaGridComponent.js'

/* import AccountComponent from './AccountComponent.js' */

const SinglePageApp = class extends App {
	constructor() {
		super()
		this._brand = 'PotassiumES'
		this._titlePrefix = this._brand + ' • '

		// Usually we'd fetch this from a server, but for the demo just initialize the user DataModel with dummy data
		this._user = new DataModel({
			name: lt('Petula Wong'),
			email: lt('petula.w@example.com'),
			phone: lt('206.555.1212'),
			birthday: new Date('04 Dec 1995 00:12:00 GMT')
		})

		this._imageCollection = new ImageCollection()

		const uiZOffset = -2

		this._masthead = new MastheadComponent(null, {
			brand: this._brand,
			brandAnchor: '/',
			menuItems: [
				{ name: lt('Front'), anchor: './#' },
				{ name: lt('About'), anchor: './#about' }
				/* { name: lt('Account'), anchor: './#account' } */
			]
		}).appendTo(this)
		this._masthead.addListener((eventName, mode) => {
			this.setDisplayMode(mode)
		}, MastheadComponent.MODE_REQUEST_EVENT)

		// These are the views that we'll switch among when responding to Router events
		this._viewsComponent = new Component().appendTo(this)
		this._viewsComponent.addClass('views-component')
		this._viewsComponent.setName('ViewsComponent')

		this._frontComponent = new FrontComponent(this._imageCollection).appendTo(this._viewsComponent)
		this._aboutComponent = new AboutComponent().appendTo(this._viewsComponent)
		//this._accountComponent = new AccountComponent(this._user).appendTo(this._viewsComponent)

		// Set up our URL router to handle view switching
		this.router.addRoute(/^$/, 'front')
		this.router.addRoute(/^about$/, 'about')
		//this.router.addRoute(/^account$/, 'account')
		this.router.addListener(this._handleRoutes.bind(this))
		this.router.start()

		const portalLight = graph.directionalLight([0xffffff, 0.7])
		this._portalScene.add(portalLight)
		this._portalScene.add(portalLight.target)
		this._portalScene.add(new graph.ambientLight([0xffffff, 0.9]))

		const immersiveLight = graph.directionalLight([0xffffff, 0.7])
		this._immersiveScene.add(immersiveLight)
		this._immersiveScene.add(immersiveLight.target)
		this._immersiveScene.add(new graph.ambientLight([0xffffff, 0.9]))

		this._imageCollection.fetch()
	}

	showFront() {
		this._frontComponent.show()
		this._aboutComponent.hide()
		//this._accountComponent.hide()
		document.title = this._titlePrefix + lt('Front')
		this._masthead.navigationMenu.selectedIndex = 0
	}

	showAbout() {
		this._frontComponent.hide()
		this._aboutComponent.show()
		//this._accountComponent.hide()
		document.title = this._titlePrefix + lt('About')
		this._masthead.navigationMenu.selectedIndex = 1
	}

	/*
	showAccount() {
		this._frontComponent.hide()
		this._aboutComponent.hide()
		this._accountComponent.show()
		document.title = this._titlePrefix + lt('Account')
		this._masthead.navigationMenu.selectedIndex = 2
	}
	*/

	_handleRoutes(routeName, hash, ...regexMatches) {
		switch (routeName) {
			case 'about':
				this.showAbout()
				break
			/*
			case 'account':
				this.showAccount()
				break
			*/
			default:
				this.showFront()
		}
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new SinglePageApp()
	document.body.appendChild(window.app.el)
})

/**
A couple of helper DataObjects for the media grid
*/
const ImageModel = class extends DataModel {}
const ImageCollection = class extends DataCollection {
	constructor(data = [], options = {}) {
		super(
			data,
			Object.assign(
				{
					dataObject: ImageModel
				},
				options
			)
		)
	}
	get url() {
		return '/single-page-app/image-collection.json'
	}
}

const FrontComponent = class extends Component {
	constructor(dataObject = null, options = null) {
		super(dataObject, options)
		this.addClass('front-component')
		this.setName('FrontComponent')

		this._mediaGridComponent = new MediaGridComponent(this.dataObject, {
			itemComponent: ImageCardComponent
		}).appendTo(this)
	}
}

const AboutComponent = class extends Component {
	constructor(dataObject = null, options = null) {
		super(dataObject, options)
		this.addClass('about-component')
		this.setName('AboutComponent')

		this._message1Component = new LabelComponent(null, {
			text: lt('This is a sample of a PotassiumES wider web app.')
		}).appendTo(this)
		this._message1Component.addClass('message1-component')

		this._widerWebImageComponent = new ImageComponent(null, {
			image: '/single-page-app/images/Wider-Web-Labels-No-Title.png'
		}).appendTo(this)
	}
}
