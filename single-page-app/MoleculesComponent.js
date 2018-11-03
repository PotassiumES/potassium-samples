import DataModel from 'potassium-es/src/DataModel'
import DataCollection from 'potassium-es/src/DataCollection'
import Component from 'potassium-es/src/Component'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import ButtonComponent from 'potassium-components/src/atoms/ButtonComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import AudioPlayerComponent from 'potassium-components/src/molecules/AudioPlayerComponent.js'
import ButtonGroupComponent from 'potassium-components/src/molecules/ButtonGroupComponent.js'
import CalendarComponent from 'potassium-components/src/molecules/CalendarComponent.js'
import DateTimePickerComponent from 'potassium-components/src/molecules/DateTimePickerComponent.js'
import FormComponent from 'potassium-components/src/molecules/FormComponent.js'
import ImageCardComponent from 'potassium-components/src/molecules/ImageCardComponent.js'
import MenuComponent from 'potassium-components/src/molecules/MenuComponent.js'
import PaginationComponent from 'potassium-components/src/molecules/PaginationComponent.js'
import SearchComponent from 'potassium-components/src/molecules/SearchComponent.js'
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
	}
})
MoleculeData.push({
	componentClass: ButtonGroupComponent
})
MoleculeData.push({
	componentClass: CalendarComponent,
	tbd: true
})
MoleculeData.push({
	componentClass: DateTimePickerComponent,
	componentData: new DataModel({
		birthday: new Date()
	}),
	componentOptions: {
		dataField: 'birthday'
	}
})
MoleculeData.push({
	componentClass: ImageCardComponent,
	componentData: new DataModel({
		image: '/single-page-app/images/three.png',
		title: 'Potassium',
		caption: 'A bit of it'
	})
})
MoleculeData.push({
	componentClass: MenuComponent
})
MoleculeData.push({
	componentClass: PaginationComponent,
	tbd: true
})
MoleculeData.push({
	componentClass: SearchComponent,
	tbd: true
})
MoleculeData.push({
	componentClass: ToolTipComponent,
	componentOptions: {
		component: new LabelComponent(null, { text: 'A tip for you' })
	}
})
MoleculeData.push({
	componentClass: VideoPlayerComponent,
	componentOptions: {
		mimeType: 'video/mp4',
		url: '/video-player/test16x9video.mov'
	}
})
MoleculeData.push({
	componentClass: WaitComponent,
	tbd: true
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
		menuComponent.layout()
	}
}

export default MoleculesComponent
