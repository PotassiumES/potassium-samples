import dom from 'potassium-es/src/DOM'
import som from 'potassium-es/src/SOM'
import Component from 'potassium-es/src/Component'
import DataCollection from 'potassium-es/src/DataCollection'
import { lt, ld, ldt } from 'potassium-es/src/Localizer'

import CubeComponent from 'potassium-components/src/atoms/CubeComponent.js'
import TextComponent from 'potassium-components/src/atoms/TextComponent.js'
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
				text: lt('Foundation'),
				classes: 'component-title'
			},
			this.inheritedOptions
		)
			.appendTo(this)

		new HeadingComponent(
			null,
			{
				text: lt('Color'),
				classes: 'h2 color-title'
			},
			this.inheritedOptions
		)
			.appendTo(this)

		this._colorsComponent = new CollectionComponent(
			ColorVariables,
			{
				itemComponent: ColorSwatchComponent,
				classes: 'colors-component'
			},
			this.inheritedOptions
		).appendTo(this)

		new HeadingComponent(
			null,
			{
				text: lt('Fonts'),
				classes: 'h2 font-title'
			},
			this.inheritedOptions
		)
			.appendTo(this)

		this._fontComponent = new FontComponent(null, {}, this.inheritedOptions).appendTo(this)

		new HeadingComponent(
			null,
			{
				text: lt('Layout'),
				usesPortalSpatial: false,
				usesImmersive: false,
				classes: 'h2 layout-title'
			},
			this.inheritedOptions
		)
			.appendTo(this)

		this._layoutComponent = new LayoutComponent(
			null,
			{
				usesPortalSpatial: false,
				usesImmersive: false
			},
			this.inheritedOptions
		).appendTo(this)
	}
}

// DOM font info
const PageFontSizes = new DataCollection([
	{ id: '--dom-font-size-5', clazz: 'dom-font-5' },
	{ id: '--dom-font-size-4', clazz: 'dom-font-4' },
	{ id: '--dom-font-size-3', clazz: 'dom-font-3' },
	{ id: '--dom-font-size-2', clazz: 'dom-font-2' },
	{ id: '--dom-font-base', clazz: 'dom-font-base' },
	{ id: '--dom-font-size-0', clazz: 'dom-font-0' }
])

// SOM font info
const SpatialFontSizes = new DataCollection([
	{ id: '--som-font-size-5' },
	{ id: '--som-font-size-4' },
	{ id: '--som-font-size-3' },
	{ id: '--som-font-size-2' },
	{ id: '--som-font-base' },
	{ id: '--som-font-size-0' }
])

const cleanVarName = function(name){
	return name.substring(6).replace(/\-/g, ' ', )
}

/* A helper class for displaying font examples in FontComponent */
const SpatialFontLabel = class extends LabelComponent {
	constructor(dataObject, options, inheritedOptions = null) {
		super(dataObject, options, inheritedOptions)
		this.addClass('spatial-font-label')
		this.setName('SpatialFontLabel')

		this.text = this.dataObject.get('id', '')
		this.portalSOM.assignedStyles.set('font-size', `var(${this.dataObject.get('id', '')})`)
		this.immersiveSOM.assignedStyles.set('font-size', `var(${this.dataObject.get('id', '')})`)
	}
}

const FontComponent = class extends Component {
	constructor(dataObject, options, inheritedOptions = {}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('font-component')
		this.setName('FontComponent')

		this.flatDOM.appendChild(this._createTableDOM())
		this.portalDOM.appendChild(this._createTableDOM())

		this.appendComponent(this._createSpatialFonts())
	}

	_createSpatialFonts() {
		return new CollectionComponent(SpatialFontSizes, {
			itemComponent: SpatialFontLabel,
			usesFlat: false,
			usesPortalOverlay: false
		})
			.addClass('spatial-fonts')
			.setName('SpatialFonts')
	}

	_createTableDOM() {
		const table = dom.table()
		for (const size of PageFontSizes) {
			const tr = dom.tr().appendTo(table)
			const td = dom.td(
				{ class: size.get('clazz') },
				cleanVarName(size.get('id'))
			).appendTo(tr)
		}
		return table
	}
}

const LayoutComponent = class extends Component {
	constructor(dataObject, options, inheritedOptions = {}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('layout-component')
		this.setName('LayoutComponent')

		this._appComponent = new Component(null, {}, this.inheritedOptions).appendTo(this)
		this._appComponent.addClass('app-component')

		this._section1Component = new Component(null, {}, this.inheritedOptions)
			.appendTo(this._appComponent)
			.appendComponent(new LabelComponent(null, { text: lt('Inner content') }))
		this._section1Component.addClass('section-component')
		this._section2Component = new Component(null, {}, this.inheritedOptions)
			.appendTo(this._appComponent)
			.appendComponent(new LabelComponent(null, { text: lt('Inner content') }, this.inheritedOptions))
		this._section2Component.addClass('section-component')
	}
}

const ColorVariables = new DataCollection([
	{ id: '--dom-light-primary-color' },
	{ id: '--dom-primary-color' },
	{ id: '--dom-dark-primary-color' },
	{ id: '--dom-light-secondary-color' },
	{ id: '--dom-secondary-color' },
	{ id: '--dom-dark-secondary-color' },
	{ id: '--dom-light-tertiary-color' },
	{ id: '--dom-tertiary-color' },
	{ id: '--dom-dark-tertiary-color' },
	{ id: '--dom-light-base-color' },
	{ id: '--dom-base-color' },
	{ id: '--dom-dark-base-color' },
	{ id: '--dom-background-color' }
])

const ColorSwatchComponent = class extends Component {
	constructor(dataObject, options, inheritedOptions = {}) {
		super(dataObject, options, inheritedOptions)
		this.addClass('color-swatch-component')
		this.setName('ColorSwatchComponent')

		this._colorComponent = new CubeComponent().appendTo(this)

		this._colorComponent.appendComponent(
			new HeadingComponent(null, {
				text: 'wider',
				usesPortalSpatial: false,
				usesImmersive: false
			})
		)

		this._nameName = new LabelComponent(null, {
			text: cleanVarName(this.dataObject.get('id'))
		}).appendTo(this)

		const cssVar = `var(${this.dataObject.get('id')})`

		this._colorComponent.flatDOM.style['background-color'] = cssVar
		this._colorComponent.portalDOM.style['background-color'] = cssVar
		this._colorComponent.portalSOM.children[0].assignedStyles.set('material-color', cssVar)
		this._colorComponent.immersiveSOM.children[0].assignedStyles.set('material-color', cssVar)
	}
}

export default FoundationComponent
