import Component from 'potassium-es/src/Component'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

const FormsComponent = class extends Component {
	constructor(dataObject = null, options = {}) {
		super(dataObject, options)
		this.addClass('forms-component')
		this.setName('FormsComponent')

		new HeadingComponent(null, {
			text: lt('Forms')
		}).appendTo(this)
	}
}

export default FormsComponent
