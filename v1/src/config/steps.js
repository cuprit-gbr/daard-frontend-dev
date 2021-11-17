export default [
	{
		title: 'Disease',
		slug: 'disease',
		desc: `
			This form expects general information about the disease. <br/>
			Once all mandatory fields have been specified, you can click on “Next step”
		`,
		isEnabled: true,
	},
	{
		title: 'Inventory',
		slug: 'inventory',
		desc: `
			This form expects the number of bone material present. <br/>
			Each tab shows a different body region. <br/>
			Bones that are indicated as "Absent" will be ignored during submission.
		`,
		isEnabled: false,
		tabs: [
			{ label: 'Cranial District', },
			{ label: 'Axial sceleton', },
			{ label: 'Right upper limb', },
			{ label: 'Left lower limb', },
			{ label: 'Right lower limb', },
			{ label: 'Left upper limb', },
		]
	},
	{
		title: 'Bone&nbsp;changes',
		slug: 'bone-changes',
		desc: `
			This form expects the examination method per bone. <br/>
			Furthermore, which technique was used for the examination.
		`,
		isEnabled: false,
	},
	{
		title: 'Site',
		slug: 'site',
		desc: `
			This form expects general information like place of discovery or further links.
		`,
		isEnabled: false,
	},
	{
		title: 'Publication',
		slug: 'publication',
		desc: `
			This form expects general information about the publication of the present case. <br/>
			After agreeing to the "Privacy consent" the case can be submitted.
		`,
		isEnabled: false,
	},
]