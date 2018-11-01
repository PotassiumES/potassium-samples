import Component from 'potassium-es/src/Component'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

const AboutComponent = class extends Component {
	constructor(dataObject = null, options = {}) {
		super(dataObject, options)
		this.addClass('about-component')
		this.setName('AboutComponent')

		new HeadingComponent(null, {
			text: lt('About')
		}).appendTo(this)

		this._message1Component = new LabelComponent(null, {
			text: lt('This is a sample of a PotassiumES wider web app.')
		}).appendTo(this)
		this._message1Component.addClass('message1-component')
	}
}

export default AboutComponent
