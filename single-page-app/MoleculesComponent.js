import DataModel from 'potassium-es/src/DataModel'
import DataCollection from 'potassium-es/src/DataCollection'
import Component from 'potassium-es/src/Component'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import ButtonComponent from 'potassium-components/src/atoms/ButtonComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import AudioPlayerComponent from 'potassium-components/src/molecules/AudioPlayerComponent.js'
import ButtonGroupComponent from 'potassium-components/src/molecules/ButtonGroupComponent.js'
import FormComponent from 'potassium-components/src/molecules/FormComponent.js'
import ImageCardComponent from 'potassium-components/src/molecules/ImageCardComponent.js'
import MenuComponent from 'potassium-components/src/molecules/MenuComponent.js'
import PaginationComponent from 'potassium-components/src/molecules/PaginationComponent.js'
import ToolTipComponent from 'potassium-components/src/molecules/ToolTipComponent.js'
import VideoPlayerComponent from 'potassium-components/src/molecules/VideoPlayerComponent.js'
import WaitComponent from 'potassium-components/src/molecules/WaitComponent.js'

import MediaGridComponent from 'potassium-components/src/organisms/MediaGridComponent.js'

import ComponentCardComponent from './ComponentCardComponent.js'

const MoleculeData = []
MoleculeData.push({
	componentClass: AudioPlayerComponent,
	componentOptions: {
		audio: '/single-page-app/audio/beep.wav'
	},
	tbdOverlay: true,
	tbdSpatial: true
})
MoleculeData.push({
	componentClass: ButtonGroupComponent,
	tbdSpatial: true
})
MoleculeData.push({
	componentClass: MenuComponent,
	tbdOverlay: true,
	tbdSpatial: true
})
MoleculeData.push({
	componentClass: ImageCardComponent,
	componentData: new DataModel({
		image: '/single-page-app/images/three.png',
		title: 'Potassium',
		caption: 'A bit of it'
	}),
	tbdSpatial: true
})
MoleculeData.push({
	componentClass: PaginationComponent,
	componentOptions: {
		totalCount: 12,
		currentIndex: 2
	},
	tbdOverlay: true,
	tbdSpatial: true
})
MoleculeData.push({
	componentClass: ToolTipComponent,
	componentOptions: {
		component: new LabelComponent(null, { text: 'A tip for you' })
	},
	tbdOverlay: true,
	tbdSpatial: true
})
MoleculeData.push({
	componentClass: VideoPlayerComponent,
	componentOptions: {
		video: '/video-player/test16x9video.mov',
		mimeType: 'video/mp4'
	}
})
MoleculeData.push({
	componentClass: WaitComponent,
	tbdOverlay: true,
	tbdSpatial: true
})

const MoleculesComponent = class extends Component {
	constructor(dataObject = new DataCollection(MoleculeData), options = {}, inheritedOptions) {
		super(dataObject, options, inheritedOptions)
		this.addClass('molecules-component')
		this.setName('MoleculesComponent')

		new HeadingComponent(null, {
			text: lt('Molecules')
		}).appendTo(this)

		this._mediaGridComponent = new MediaGridComponent(this.dataObject, {
			itemComponent: ComponentCardComponent,
			usesPortalOverlay: false
		}).appendTo(this)

		// Add buttons to the button group component
		const buttonGroupComponent = this._mediaGridComponent._immersiveSOM.querySelector('.button-group-component')
			.component
		buttonGroupComponent.appendComponent(new ButtonComponent(null, { text: lt('One') }, this.inheritedOptions))
		buttonGroupComponent.appendComponent(new ButtonComponent(null, { text: lt('Two') }, this.inheritedOptions))
		buttonGroupComponent.appendComponent(new ButtonComponent(null, { text: lt('Three') }, this.inheritedOptions))

		// Add menu items to the menu component
		const menuComponent = this._mediaGridComponent._immersiveSOM.querySelector('.menu-component').component
		menuComponent.appendMenuItem(new LabelComponent(null, { text: 'Item 1' }, this.inheritedOptions))
		menuComponent.appendMenuItem(new LabelComponent(null, { text: 'Item 2' }, this.inheritedOptions))
		menuComponent.appendMenuItem(new LabelComponent(null, { text: 'Item 3' }, this.inheritedOptions))

		const waitComponent = this._mediaGridComponent._immersiveSOM.querySelector('.wait-component').component
		waitComponent.state = WaitComponent.PROCESSING
	}
}

export default MoleculesComponent
