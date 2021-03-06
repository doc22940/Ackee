'use strict'

const dateWithOffset = require('./dateWithOffset')

module.exports = (id, property) => [
	{
		$match: {
			domainId: id,
			[property]: {
				$ne: null
			},
			created: {
				$gte: dateWithOffset(-6)
			}
		}
	},
	{
		$sort: {
			created: -1
		}
	},
	{
		$project: {
			_id: `$${ property }`,
			created: '$created'
		}
	},
	{
		$limit: 25
	}
]