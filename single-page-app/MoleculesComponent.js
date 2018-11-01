import DataModel from 'potassium-es/src/DataModel'
import DataCollection from 'potassium-es/src/DataCollection'
import Component from 'potassium-es/src/Component'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import AudioPlayerComponent from 'potassium-components/src/molecules/AudioPlayerComponent.js'
import ButtonGroupComponent from 'potassium-components/src/molecules/ButtonGroupComponent.js'
import CalendarComponent from 'potassium-components/src/molecules/CalendarComponent.js'
import CardComponent from 'potassium-components/src/molecules/CardComponent.js'
import DateTimePickerComponent from 'potassium-components/src/molecules/DateTimePickerComponent.js'
import FormComponent from 'potassium-components/src/molecules/FormComponent.js'
import ImageCardComponent from 'potassium-components/src/molecules/ImageCardComponent.js'
import MenuComponent from 'potassium-components/src/molecules/MenuComponent.js'
import ModeSwitcherComponent from 'potassium-components/src/molecules/ModeSwitcherComponent.js'
import PaginationComponent from 'potassium-components/src/molecules/PaginationComponent.js'
import SearchComponent from 'potassium-components/src/molecules/SearchComponent.js'
import ToolTipComponent from 'potassium-components/src/molecules/ToolTipComponent.js'
import VideoPlayerComponent from 'potassium-components/src/molecules/VideoPlayerComponent.js'
import WaitComponent from 'potassium-components/src/molecules/WaitComponent.js'

import MediaGridComponent from 'potassium-components/src/organisms/MediaGridComponent.js'

import ComponentCardComponent from './ComponentCardComponent.js'

const MoleculeData = []
MoleculeData.push({
	componentClass: AudioPlayerComponent
})
MoleculeData.push({
	componentClass: ButtonGroupComponent
})
MoleculeData.push({
	componentClass: CalendarComponent
})
MoleculeData.push({
	componentClass: CardComponent,
	componentData: new DataModel({
		title: 'Potassium',
		caption: 'A bit of it'
	})
})
MoleculeData.push({
	componentClass: DateTimePickerComponent
})
MoleculeData.push({
	componentClass: FormComponent
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
	componentClass: ModeSwitcherComponent
})
MoleculeData.push({
	componentClass: PaginationComponent
})
MoleculeData.push({
	componentClass: SearchComponent
})
MoleculeData.push({
	componentClass: ToolTipComponent,
	componentOptions: {
		component: new LabelComponent(null, { text: 'A tip for you' })
	}
})
MoleculeData.push({
	componentClass: VideoPlayerComponent
})
MoleculeData.push({
	componentClass: WaitComponent
})

const MoleculesComponent = class extends Component {
	constructor(dataObject = new DataCollection(MoleculeData), options = {}) {
		super(dataObject, options)
		this.addClass('molecules-component')
		this.setName('MoleculesComponent')

		new HeadingComponent(null, {
			text: lt('Molecules')
		}).appendTo(this)

		this._mediaGridComponent = new MediaGridComponent(this.dataObject, {
			itemComponent: ComponentCardComponent,
			usesPortalOverlay: false
		}).appendTo(this)
	}
}

export default MoleculesComponent
