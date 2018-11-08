import App from 'potassium-es/src/App'
import som from 'potassium-es/src/SOM'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import MultiComponent from 'potassium-components/src/atoms/MultiComponent.js'

import MastheadComponent from 'potassium-components/src/organisms/MastheadComponent.js'

import FoundationComponent from './FoundationComponent.js'
import AtomsComponent from './AtomsComponent.js'
import MoleculesComponent from './MoleculesComponent.js'
import OrganismsComponent from './OrganismsComponent.js'
import FormsComponent from './FormsComponent.js'

const ViewInfo = []
ViewInfo.push({
	name: 'Foundation',
	anchor: './#',
	route: /^$/,
	component: FoundationComponent
})
ViewInfo.push({
	name: 'Atoms',
	anchor: './#atoms',
	route: /^atoms$/,
	component: AtomsComponent
})
ViewInfo.push({
	name: 'Molecules',
	anchor: './#molecules',
	route: /^molecules$/,
	component: MoleculesComponent
})
ViewInfo.push({
	name: 'Organisms',
	anchor: './#organisms',
	route: /^organisms$/,
	component: OrganismsComponent
})
ViewInfo.push({
	name: 'Forms',
	anchor: './#forms',
	route: /^forms$/,
	component: FormsComponent
})

const SinglePageApp = class extends App {
	constructor() {
		super()
		this._brand = 'PotassiumES'
		this._titlePrefix = this._brand + ' • '

		this._masthead = new MastheadComponent(null, {
			brand: this._brand,
			brandAnchor: '/',
			menuItems: ViewInfo.map(info => {
				return {
					name: lt(info.name),
					anchor: info.anchor
				}
			})
		}).appendTo(this)
		this._masthead.addListener((eventName, mode) => {
			this.setDisplayMode(mode).catch(err => {
				console.error('Could not set display mode', err)
			})
		}, MastheadComponent.MODE_REQUEST_EVENT)

		// MultiComponent holds Components that we'll switch among when responding to Router events
		this._multiComponent = new MultiComponent(null, {
			components: ViewInfo.map(info => {
				return new info.component(undefined, {
					usesPortalOverlay: false
				})
			})
		}).appendTo(this)
		for (let child of this._multiComponent.options.components) {
			child.addClass('view-component')
		}
		this._multiComponent.addClass('views-component')

		// Set up our URL router to handle view switching
		for (let i = 0; i < ViewInfo.length; i++) {
			this.router.addRoute(ViewInfo[i].route, i)
		}
		this.router.addListener(this._handleRoutes.bind(this))
		this.router.start()

		const portalLight = som.directionalLight([0xffffff, 0.7])
		this.portalScene.add(portalLight)
		this.portalScene.add(portalLight.target)
		this.portalScene.add(som.ambientLight([0xffffff, 0.4]))

		const immersiveLight = som.directionalLight([0xffffff, 0.7])
		this.immersiveScene.add(immersiveLight)
		this.immersiveScene.add(immersiveLight.target)
		this.immersiveScene.add(som.ambientLight([0xffffff, 0.4]))

		// Add a spherical environment for immersive mode
		this._immersiveEnvironmentMesh = som
			.mesh(
				som.sphereBufferGeometry(500, 60, 40),
				som.meshBasicMaterial({
					map: som.textureLoader().load('./environment.jpg')
				})
			)
			.appendTo(this.immersiveScene)
		this._immersiveEnvironmentMesh.geometry.scale(-1, 1, 1) // point inward
	}

	_handleRoutes(routeInfo, hash, ...regexMatches) {
		if (typeof routeInfo === 'number') {
			this._multiComponent.showAt(routeInfo)
			this._masthead.navigationMenu.close()
			this._masthead.navigationMenu.selectedIndex = routeInfo
		} else {
			console.error('Unknown route', routeInfo, hash, ...regexMatches)
			this._multiComponent.showAt(0)
		}
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new SinglePageApp()
	document.body.appendChild(window.app.dom)
})
