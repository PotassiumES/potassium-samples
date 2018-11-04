import Component from 'potassium-es/src/Component'
import DataModel from 'potassium-es/src/DataModel'
import { lt, ld, ldt, Localizer } from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import {
	FormComponent,
	DateFieldComponent,
	SwitchFieldComponent,
	SelectionFieldComponent,
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

		this._accountFormComponent = new FormComponent(new DataModel({
			'sabbatical-month': 3,
			birthday: '1970-01-31T00:00:00.000Z'
		}), {}, this.inheritedOptions)
			.appendTo(this)
			.addClass('account-form-component')
			.setName('AccountFormComponent')

		new Component(null, {}, this.inheritedOptions).appendTo(this._accountFormComponent)
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

		new Component(null, {}, this.inheritedOptions).appendTo(this._accountFormComponent)
			.addClass('form-group')
			.setName('BirthdayFormGroup')
			.appendComponent(new DateFieldComponent(this._accountFormComponent.dataObject, {
				dataField: 'birthday',
				label: lt('Birthday')
			}, this.inheritedOptions))

		new Component(null, {}, this.inheritedOptions).appendTo(this._accountFormComponent)
			.addClass('form-group')
			.setName('SabbaticalFormGroup')
			.appendComponent(new SelectionFieldComponent(this._accountFormComponent.dataObject, {
				dataField: 'sabbatical-month',
				label: lt('Sabbatical month'),
				items: Localizer.Singleton.monthNames.map((name, index) => [name, index])
			}, this.inheritedOptions))


		new LabelComponent(null, { text: 'needs spatial' }, this.inheritedOptions)
			.appendTo(this)
			.addClass('tbdSpatial')
			.setName('TBDSpatial')
	}
}

export default FormsComponent
