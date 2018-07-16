import WebXRPolyfill from 'webxr-polyfill'

import App from 'potassium-es/src/App'
import Component from 'potassium-es/src/Component'
import DataModel from 'potassium-es/src/DataModel'
import DataCollection from 'potassium-es/src/DataCollection'

import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import ImageCardComponent from 'potassium-components/src/molecules/ImageCardComponent.js'

import MastheadComponent from 'potassium-components/src/organisms/MastheadComponent.js'
import MediaGridComponent from 'potassium-components/src/organisms/MediaGridComponent.js'

// Polyfill WebXR so that we can detect and use portal and immersive display modes
new WebXRPolyfill()

const SinglePageApp = class extends App {
	constructor(){
		super()
		this._brand = 'PotassiumES'
		this._titlePrefix = this._brand + ' • '

		this._imageCollection = new ImageCollection()

		this._masthead = new MastheadComponent(null, {
			brand: this._brand,
			menuItems: [
				{ name: 'Front', anchor: './#' },
				{ name: 'About', anchor: './#about' },
				{ name: 'Account', anchor: './#account' }
			]
		})
		this.appendComponent(this._masthead)

		// These are the views that we'll switch among when responding to Router events
		this._viewsComponent = new Component().appendTo(this)
		this._viewsComponent.addClass('views-component')
		this._frontComponent = new FrontComponent(this._imageCollection).appendTo(this._viewsComponent)
		this._aboutComponent = new AboutComponent().appendTo(this._viewsComponent)
		this._accountComponent = new AccountComponent().appendTo(this._viewsComponent)

		// Set up our URL router to handle view switching
		this.router.addRoute(/^$/, 'front')
		this.router.addRoute(/^about$/, 'about')
		this.router.addRoute(/^account$/, 'account')
		this.router.addListener(this._handleRoutes.bind(this))
		this.router.start()

		this._imageCollection.fetch()
	}

	showFront(){
		this._frontComponent.removeClass('hidden')
		this._aboutComponent.addClass('hidden')
		this._accountComponent.addClass('hidden')
		document.title = this._titlePrefix + 'Front'
		this._masthead.navigationMenu.setSelected(0)
	}

	showAbout(){
		this._frontComponent.addClass('hidden')
		this._aboutComponent.removeClass('hidden')
		this._accountComponent.addClass('hidden')
		document.title = this._titlePrefix + 'About'
		this._masthead.navigationMenu.setSelected(1)
	}

	showAccount(){
		this._frontComponent.addClass('hidden')
		this._aboutComponent.addClass('hidden')
		this._accountComponent.removeClass('hidden')
		document.title = this._titlePrefix + 'Account'
		this._masthead.navigationMenu.setSelected(2)
	}

	_handleRoutes(routeName, hash, ...regexMatches){
		switch(routeName){
			case 'about':
				this.showAbout()
				break
			case 'account':
				this.showAccount()
				break
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
	constructor(data=[], options={}){
		super(data, Object.assign({
			dataObject: ImageModel
		}, options))
	}
	get url(){ return '/single-page-app/image-collection.json' }
}

const FrontComponent = class extends Component {
	constructor(dataObject=null, options=null){
		super(dataObject, options)
		this.addClass('front-component')

		this._mediaGridComponent = new MediaGridComponent(this.dataObject, {
			itemComponent: ImageCardComponent
		}).appendTo(this)
	}
}

const AboutComponent = class extends Component {
	constructor(dataObject=null, options=null){
		super(dataObject, options)
		this.addClass('about-component')
		this._headingComponent = new HeadingComponent(null, { text: 'About' }).appendTo(this)
	}
}

const AccountComponent = class extends Component {
	constructor(dataObject=null, options=null){
		super(dataObject, options)
		this.addClass('account-component')
		this._headingComponent = new HeadingComponent(null, { text: 'Account' }).appendTo(this)
	}
}
