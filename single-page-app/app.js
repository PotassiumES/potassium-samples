import WebXRPolyfill from 'webxr-polyfill'

import App from 'potassium-es/src/App'
import Component from 'potassium-es/src/Component'

import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'
import MastheadComponent from 'potassium-components/src/organisms/MastheadComponent.js'

new WebXRPolyfill()

const SinglePageApp = class extends App {
	constructor(){
		super()

		this._masthead = new MastheadComponent(null, {
			brand: 'PotassiumES'
		})
		this.appendComponent(this._masthead)

		// These are the views that we'll switch among when responding to Router events
		this._viewsComponent = new Component().appendTo(this)
		this._viewsComponent.addClass('views-component')
		this._frontComponent = new FrontComponent().appendTo(this._viewsComponent)
		this._aboutComponent = new AboutComponent().appendTo(this._viewsComponent)
		this._accountComponent = new AccountComponent().appendTo(this._viewsComponent)

		// Set up our URL router to handle view switching
		this.router.addRoute(/^$/, 'front')
		this.router.addRoute(/^about$/, 'about')
		this.router.addRoute(/^account$/, 'account')
		this.router.addListener(this._handleRoutes.bind(this))
		this.router.start()
	}

	showFront(){
		this._frontComponent.removeClass('hidden')
		this._aboutComponent.addClass('hidden')
		this._accountComponent.addClass('hidden')
	}

	showAbout(){
		this._frontComponent.addClass('hidden')
		this._aboutComponent.removeClass('hidden')
		this._accountComponent.addClass('hidden')
	}

	showAccount(){
		this._frontComponent.addClass('hidden')
		this._aboutComponent.addClass('hidden')
		this._accountComponent.removeClass('hidden')
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

const FrontComponent = class extends Component {
	constructor(dataObject=null, options=null){
		super(dataObject, options)
		this.addClass('front-component')
		this._headingComponent = new HeadingComponent(null, { text: 'Front' }).appendTo(this)
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
