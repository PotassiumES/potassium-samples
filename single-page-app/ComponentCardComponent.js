import Component from 'potassium-es/src/Component.js'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'

import CardComponent from 'potassium-components/src/molecules/CardComponent.js'

const ComponentCardComponent = class extends CardComponent {
	/**
	@param {Object} [options]
	@param {string} [options.titleField]
	@param {string} [options.captionField]
	*/
	constructor(dataObject = null, options = {}, inheritedOptions={}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('component-card-component')
		this.setName('ComponentCardComponent')

		if(this.dataObject.get('tbd', false)){
			new LabelComponent(null, { text: 'to-do' }, this.inheritedOptions)
				.appendTo(this)
				.addClass('tbd')
				.setName('TBD')
		}

		const targetClass = this.dataObject.get('componentClass', Component)
		const targetData = this.dataObject.get('componentData', null)
		const targetOptions = this.dataObject.get('componentOptions', {})
		this._targetComponent = new targetClass(targetData, targetOptions, this.inheritedOptions).appendTo(
			this.mainComponent
		)

		this.titleComponent.text = this._targetComponent.flatDOM.dataset['name']
	}
}

export default ComponentCardComponent
