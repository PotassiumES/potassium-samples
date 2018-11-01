import dom from 'potassium-es/src/DOM'
import som from 'potassium-es/src/SOM'
import Component from 'potassium-es/src/Component'
import DataCollection from 'potassium-es/src/DataCollection'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import CubeComponent from 'potassium-components/src/atoms/CubeComponent.js'
import LabelComponent from 'potassium-components/src/atoms/LabelComponent.js'
import HeadingComponent from 'potassium-components/src/atoms/HeadingComponent.js'

import CollectionComponent from 'potassium-components/src/organisms/CollectionComponent.js'

const FoundationComponent = class extends Component {
	constructor(dataObject = null, options = {}, inheritedOptions = {}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('foundation-component')
		this.setName('FoundationComponent')

		new HeadingComponent(
			null,
			{
				text: lt('Foundation')
			},
			this.inheritedOptions
		).appendTo(this)

		new HeadingComponent(
			null,
			{
				text: lt('Color')
			},
			this.inheritedOptions
		)
			.appendTo(this)
			.addClass('h2')
		this._colorsComponent = new CollectionComponent(
			ColorVariables,
			{
				itemComponent: ColorSwatchComponent
			},
			this.inheritedOptions
		).appendTo(this)
		this._colorsComponent.addClass('colors-component')

		new HeadingComponent(
			null,
			{
				text: lt('Fonts')
			},
			this.inheritedOptions
		)
			.appendTo(this)
			.addClass('h2')
		this._fontComponent = new FontComponent().appendTo(this)

		new HeadingComponent(
			null,
			{
				text: lt('Layout')
			},
			this.inheritedOptions
		)
			.appendTo(this)
			.addClass('h2')
		this._layoutComponent = new LayoutComponent().appendTo(this)
	}
}

const FontSizes = new DataCollection([
	{ id: '--page-font-size-5' },
	{ id: '--page-font-size-4' },
	{ id: '--page-font-size-3' },
	{ id: '--page-font-size-2' },
	{ id: '--base-page-font-size' },
	{ id: '--page-font-size-0' }
])

const FontWeights = new DataCollection([{ id: '--base-page-font-weight' }, { id: '--font-weight-2' }])

const FontComponent = class extends Component {
	constructor(dataObject, options, inheritedOptions = {}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('font-component')
		this.setName('FontComponent')

		this.flatDOM.appendChild(this._createTableDOM())
		this.portalDOM.appendChild(this._createTableDOM())
	}

	_createTableDOM() {
		const table = dom.table()
		const headings = dom.tr().appendTo(table)
		for (const weight of FontWeights) {
			const td = dom.td(weight.get('id')).appendTo(headings)
		}

		for (const size of FontSizes) {
			const tr = dom.tr().appendTo(table)
			for (const weight of FontWeights) {
				const td = dom.td(size.get('id')).appendTo(tr)
				td.style['font-size'] = `var(${size.get('id')})`
				td.style['font-weight'] = `var(${weight.get('id')})`
			}
		}
		return table
	}
}

const LayoutComponent = class extends Component {
	constructor(dataObject, options, inheritedOptions = {}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('layout-component')
		this.setName('LayoutComponent')

		this._appComponent = new Component().appendTo(this)
		this._appComponent.addClass('app-component')

		this._section1Component = new Component()
			.appendTo(this._appComponent)
			.appendComponent(new LabelComponent(null, { text: lt('Inner content') }))
		this._section1Component.addClass('section-component')
		this._section2Component = new Component()
			.appendTo(this._appComponent)
			.appendComponent(new LabelComponent(null, { text: lt('Inner content') }))
		this._section2Component.addClass('section-component')
	}
}

const ColorVariables = new DataCollection([
	{ id: '--light-primary-color' },
	{ id: '--primary-color' },
	{ id: '--dark-primary-color' },
	{ id: '--light-secondary-color' },
	{ id: '--secondary-color' },
	{ id: '--dark-secondary-color' },
	{ id: '--light-tertiary-color' },
	{ id: '--tertiary-color' },
	{ id: '--dark-tertiary-color' },
	{ id: '--light-base-color' },
	{ id: '--base-color' },
	{ id: '--dark-base-color' },
	{ id: '--background-color' }
])

const ColorSwatchComponent = class extends Component {
	constructor(dataObject, options, inheritedOptions = {}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('color-swatch-component')
		this.setName('ColorSwatchComponent')

		this._colorComponent = new CubeComponent().appendTo(this)

		this._colorComponent.appendComponent(
			new HeadingComponent(null, {
				text: 'wider'
			})
		)

		this._nameName = new LabelComponent(null, {
			text: this.dataObject.get('id')
		}).appendTo(this)

		const cssVar = `var(${this.dataObject.get('id')})`

		this._colorComponent.flatDOM.style['background-color'] = cssVar
		this._colorComponent.portalDOM.style['background-color'] = cssVar
		this._colorComponent.portalSOM.assignedStyles.set('material-emissive', cssVar)
		this._colorComponent.immersiveSOM.assignedStyles.set('material-emissive', cssVar)
	}
}

export default FoundationComponent
