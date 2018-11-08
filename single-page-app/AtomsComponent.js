import dom from 'potassium-es/src/DOM.js'
import Component from 'potassium-es/src/Component.js'
import DataModel from 'potassium-es/src/DataModel.js'
import { lt, ld, ldt } from 'potassium-es/src/Localizer.js'
import DataCollection from 'potassium-es/src/DataCollection.js'

import AudioComponent from 'potassium-components/src/atoms/AudioComponent.js'
import ButtonComponent from 'potassium-components/src/atoms/ButtonComponent.js'
import CheckboxComponent from 'potassium-components/src/atoms/CheckboxComponent.js'
import CubeComponent from 'potassium-components/src/atoms/CubeComponent.js'
import FileInputComponent from 'potassium-components/src/atoms/FileInputComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'
import ImageComponent from 'potassium-components/src/atoms/ImageComponent.js'
import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import ProgressComponent from 'potassium-components/src/atoms/ProgressComponent.js'
import SelectionComponent from 'potassium-components/src/atoms/SelectionComponent.js'
import SliderComponent from 'potassium-components/src/atoms/SliderComponent.js'
import SwitchComponent from 'potassium-components/src/atoms/SwitchComponent.js'
import TableComponent from 'potassium-components/src/atoms/TableComponent.js'
import TextComponent from 'potassium-components/src/atoms/TextComponent.js'
import TextInputComponent from 'potassium-components/src/atoms/TextInputComponent.js'
import VideoComponent from 'potassium-components/src/atoms/VideoComponent.js'

import MediaGridComponent from 'potassium-components/src/organisms/MediaGridComponent.js'

import ComponentCardComponent from './ComponentCardComponent.js'

const AtomData = []
AtomData.push({
	componentClass: AudioComponent,
	componentOptions: { src: '/static/single-page-app/test-audio.wav' },
	tbdSpatial: true
})
AtomData.push({
	componentClass: ButtonComponent,
	componentOptions: { text: 'Click Me' },
	tbdSpatial: true
})
AtomData.push({
	componentClass: CheckboxComponent,
	tbdSpatial: true
})
AtomData.push({
	componentClass: CubeComponent
})
AtomData.push({
	componentClass: FileInputComponent,
	tbdSpatial: true
})
AtomData.push({
	componentClass: HeadingComponent,
	componentOptions: { text: 'Happy New Year!' },
	tbdSpatial: true
})
AtomData.push({
	componentClass: ImageComponent,
	componentOptions: {
		image: '/single-page-app/images/two.png'
	}
})
AtomData.push({
	componentClass: LabelComponent,
	componentOptions: { text: 'Happy New Year!' },
	tbdSpatial: true
})
AtomData.push({
	componentClass: ProgressComponent,
	componentData: new DataModel({
		value: 0.25
	}),
	componentOptions: {
		dataField: 'value'
	},
	tbdSpatial: true
})
AtomData.push({
	componentClass: SelectionComponent,
	componentOptions: {
		items: [[lt('One'), 1], [lt('Two'), 2], [lt('Three'), 3]]
	},
	tbdSpatial: true
})
AtomData.push({
	componentClass: SliderComponent,
	tbdSpatial: true
})
AtomData.push({
	componentClass: SwitchComponent,
	componentData: new DataModel({ state: false }),
	componentOptions: {
		dataField: 'state'
	},
	tbdSpatial: true
})
AtomData.push({
	componentClass: TableComponent,
	componentData: new DataCollection([
		{ key: 'Foo', value: 'Oof' },
		{ key: 'Boo', value: 'Oob' },
		{ key: 'Goo', value: 'Oog' }
	]),
	tbdSpatial: true
})
AtomData.push({
	componentClass: TextComponent,
	componentOptions: { text: 'Happy New Year!' },
	tbdSpatial: true
})
AtomData.push({
	componentClass: TextInputComponent,
	componentOptions: {
		placeholder: 'Enter text here'
	},
	tbdSpatial: true
})
AtomData.push({
	componentClass: VideoComponent,
	componentOptions: {
		video: '/video-player/test16x9video.mov',
		mimeType: 'video/mp4'
	}
})

const AtomsComponent = class extends Component {
	constructor(dataObject = new DataCollection(AtomData), options = {}, inheritedOptions = {}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('atoms-component')
		this.setName('AtomsComponent')

		this._headingComponent = new HeadingComponent(
			null,
			{
				text: lt('Atoms')
			},
			this.inheritedOptions
		).appendTo(this)

		this._mediaGridComponent = new MediaGridComponent(
			this.dataObject,
			{
				itemComponent: ComponentCardComponent,
				usesPortalOverlay: false
			},
			this.inheritedOptions
		).appendTo(this)

		// Slowly change the value of the progress bar
		const progressComponent = this._mediaGridComponent._immersiveSOM.querySelector('.progress-component').component
		setInterval(() => {
			progressComponent.dataObject.set('value', (progressComponent.dataObject.get('value', 0) + 0.0025) % 1)
		}, 1000)
	}
}

export default AtomsComponent
