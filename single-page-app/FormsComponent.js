import Component from 'potassium-es/src/Component'
import DataModel from 'potassium-es/src/DataModel'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import {
	FormComponent,
	DateFieldComponent,
	SwitchFieldComponent,
	TextInputFieldComponent
} from 'potassium-components/src/molecules/FormComponent.js'

const FormsComponent = class extends Component {
	constructor(dataObject = null, options = {}, inheritedOptions) {
		super(dataObject, options, inheritedOptions)
		this.addClass('forms-component')
		this.setName('FormsComponent')

		new HeadingComponent(
			null,
			{
				text: lt('Forms')
			},
			this.inheritedOptions
		).appendTo(this)

		this._accountFormComponent = new FormComponent(new DataModel(), {}, this.inheritedOptions)
			.appendTo(this)
			.addClass('account-form-component')
			.setName('AccountFormComponent')

		new Component(null, {}, this.inheritedOptions).appendTo(this)
			.addClass('form-group')
			.setName('UserFormGroup')
			.appendComponent(new TextInputFieldComponent(this._accountFormComponent.dataObject, {
				dataField: 'username',
				label: lt('Username'),
				placeholder: lt('sparks12')
			}, this.inheritedOptions))
			.appendComponent(new SwitchFieldComponent(this._accountFormComponent.dataObject, {
				dataField: 'notifications',
				label: lt('Send notifications')
			}, this.inheritedOptions))

		new Component(null, {}, this.inheritedOptions).appendTo(this)
			.addClass('form-group')
			.setName('BirthdayFormGroup')
			.appendComponent(new DateFieldComponent(this._accountFormComponent.dataObject, {
				dataField: 'birthday',
				label: lt('Birthday')
			}, this.inheritedOptions))

	}
}

export default FormsComponent
