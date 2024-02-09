export default [
	{
		title: 'Disease',
		slug: 'disease',
		desc: `
			Please provide general information about the individual and disease.
		`,
		isEnabled: true,
	},
	{
		title: 'Inventory',
		slug: 'inventory',
		desc: `
			Please, define which bones are present.
		`,
		isEnabled: false,
		tabs: [
			{ label: 'Cranial District', },
			{ label: 'Axial skeleton', },
			{ label: 'Left upper limb', },
			{ label: 'Right upper limb', },
			{ label: 'Left lower limb', },
			{ label: 'Right lower limb', },
		]
	},
	{
		title: 'Bone&nbsp;changes',
		slug: 'bone-changes',
		desc: `
			 Please define the bone changes, by diagnostic methods, for each bone.
		`,
		isEnabled: false,
	},
	{
		title: 'Site',
		slug: 'site',
		desc: `
			Please provide additional information on archaeological context and storage place.
		`,
		isEnabled: false,
	},
	{
		title: 'Genetic analyses and publication',
		slug: 'publication',
		desc: `
			Submit the case after agreeing to the privacy consent.
		`,
		isEnabled: false,
	},
]