import Component from 'potassium-es/src/Component'
import {lt, ld, ldt} from 'potassium-es/src/Localizer'

import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import ButtonComponent from 'potassium-components/src/atoms/ButtonComponent.js'
import SwitchComponent from 'potassium-components/src/atoms/SwitchComponent.js'
import SliderComponent from 'potassium-components/src/atoms/SliderComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'
import CheckboxComponent from 'potassium-components/src/atoms/CheckboxComponent.js'
import TextInputComponent from 'potassium-components/src/atoms/TextInputComponent.js'
import FileInputComponent from 'potassium-components/src/atoms/FileInputComponent.js'

import * as forms from 'potassium-components/src/molecules/FormComponent.js'

import ButtonGroupComponent from 'potassium-components/src/molecules/ButtonGroupComponent.js'
import DateTimePickerComponent from 'potassium-components/src/molecules/DateTimePickerComponent.js'

const AccountComponent = class extends Component {
	constructor(dataObject=null, options=null){
		super(dataObject, options)
		this.addClass('account-component')

		this._profileFormComponent = new ProfileFormComponent(dataObject).appendTo(this)

		// Password change section
		// password
		// password again

		// Notifications section
		// All notifications switch
		// Email checkbox
		// Text checkbox
		// Social notifications
		// Marketing messages

		// Content section
		// See content from friends-of-friends: checkbox
		// Default post visibility: friends-only, friends-of-friends, public
		// Default volume slider
	}
}

export default AccountComponent

const ProfileFormComponent = class extends forms.FormComponent {
	constructor(dataObject=null, options={}){
		super(dataObject, Object.assign({
			heading: lt('Profile info')
		}, options))
		this.addClass('profile-form-component')

		this._nameInputComponent = new forms.TextInputFieldComponent(dataObject, {
			label: lt('Name'),
			dataField: 'name',
			placeholder: lt('Josie P. Example')
		}).appendTo(this.fieldsComponent)

		this._emailInputComponent = new forms.TextInputFieldComponent(dataObject, {
			label: lt('Email'),
			dataField: 'email',
			placeholder: lt('josie.p@example.com')
		}).appendTo(this.fieldsComponent)

		this._phoneInputComponent = new forms.TextInputFieldComponent(dataObject, {
			label: lt('Phone'),
			dataField: 'phone',
			placeholder: lt('1-206-555-1212')
		}).appendTo(this.fieldsComponent)

		this._birthdayComponent = new forms.DateFieldComponent(dataObject, {
			label: lt('Birthday'),
			dataField: 'birthday'
		}).appendTo(this.fieldsComponent)

		// profile pic
	}
}
