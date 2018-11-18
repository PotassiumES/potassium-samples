import DataCollection from 'potassium-es/src/DataCollection'
import Component from 'potassium-es/src/Component'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import ImageCardComponent from 'potassium-components/src/molecules/ImageCardComponent.js'

import CollectionComponent from 'potassium-components/src/organisms/CollectionComponent.js'
import MastheadComponent from 'potassium-components/src/organisms/MastheadComponent.js'
import MediaGridComponent from 'potassium-components/src/organisms/MediaGridComponent.js'

import ComponentCardComponent from './ComponentCardComponent.js'

const OrganismData = []
OrganismData.push({
	componentClass: CollectionComponent,
	componentOptions: {
		itemComponent: LabelComponent,
		itemOptions: {
			textField: 'text'
		}
	},
	componentData: new DataCollection([{ text: lt('One') }, { text: lt('Two') }, { text: lt('Three') }])
})
OrganismData.push({
	componentClass: MastheadComponent,
	componentOptions: {
		brand: 'K!',
		menuItems: [
			{ name: 'Foo', anchor: 'javascript:alert("Foo!")' },
			{ name: 'Boo', anchor: 'javascript:alert("Boo!")' }
		]
	}
})
OrganismData.push({
	componentClass: MediaGridComponent,
	componentOptions: {
		itemComponent: ImageCardComponent
	},
	componentData: new DataCollection([
		{ title: lt('One'), caption: lt('Info 1'), image: '/single-page-app/images/one.jpg' },
		{ title: lt('Two'), caption: lt('Info 2'), image: '/single-page-app/images/two.png' },
		{ title: lt('Three'), caption: lt('Info 3'), image: '/single-page-app/images/three.png' }
	])
})

const OrganismsComponent = class extends Component {
	constructor(dataObject = new DataCollection(OrganismData), options = {}) {
		super(dataObject, options)
		this.addClass('organisms-component')
		this.setName('OrganismsComponent')

		new HeadingComponent(null, {
			text: lt('Organisms')
		})
			.appendTo(this)
			.addClass('component-title')

		this._mediaGridComponent = new MediaGridComponent(this.dataObject, {
			itemComponent: ComponentCardComponent,
			usesPortalOverlay: false
		}).appendTo(this)
	}
}

export default OrganismsComponent
