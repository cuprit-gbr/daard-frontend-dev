/**
 *  In dieser Datei können für verschiedene Environments,
 *  basierend auf dem jeweiligen hostname, angelegt werden.
 *  Für die verschiedeneen Environments können Key-Value-Pairs
 *  hinterlegt werden.
 *
 *  Das ist z.B. sinnvoll, wenn die locale Dev-Umgebung
 *  eine andere Rest-API benötigt als die Live-Umgebung.
 */

export default [
	{
		name: 'local',
		hostname: 'localhost',
		appTitle: 'DAARD • dev local',
		showDevOutput: true,
		baseUrl: 'https://geonode-dev.dainst.org/',
		mapUrl: 'https://daard-viewer-staging.cuprit.net/',
		restBase: 'https://geonode-dev.dainst.org/daard',
		loginUrl: 'https://geonode-dev.dainst.org/o/authorize/?response_type=code&client_id=jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U&redirect_uri=%redirect_uri%&state=abc=scope=daard-api',
		tokenUrl: 'https://geonode-dev.dainst.org/o/token/',
		tokenClientId: 'jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U',
		registerUrl: 'https://geonode-dev.dainst.org/account/signup/',
	},
	{
		name: 'local2',
		hostname: 'knochen.local',
		appTitle: 'DAARD • dev local',
		showDevOutput: true,
		baseUrl: 'https://geonode-dev.dainst.org/',
		mapUrl: 'https://daard-viewer-staging.cuprit.net/',
		restBase: 'https://geonode-dev.dainst.org/daard',
		loginUrl: 'https://geonode-dev.dainst.org/o/authorize/?response_type=code&client_id=jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U&redirect_uri=%redirect_uri%&state=abc=scope=daard-api',
		tokenUrl: 'https://geonode-dev.dainst.org/o/token/',
		tokenClientId: 'jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U',
		registerUrl: 'https://geonode-dev.dainst.org/account/signup/',
	},
	{
		name: 'stage',
		hostname: 'daard-atlas-staging.csgis.de',
		appTitle: 'DAARD • dev stage',
		showDevOutput: false,
		baseUrl: 'https://geonode-dev.dainst.org/',
		mapUrl: 'https://daard-viewer-staging.cuprit.net/',
		restBase: 'https://geonode-dev.dainst.org/daard',
		loginUrl: 'https://geonode-dev.dainst.org/o/authorize/?response_type=code&client_id=jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U&redirect_uri=%redirect_uri%&state=abc=scope=daard-api',
		tokenUrl: 'https://geonode-dev.dainst.org/o/token/',
		tokenClientId: 'jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U',
		registerUrl: 'https://geonode-dev.dainst.org/account/signup/',
	},
	{
		name: 'live',
		hostname: 'daard.dainst.org',
		appTitle: 'Digital Atlas Of Ancient Rare Diseases',
		showDevOutput: false,
		baseUrl: 'https://geoserver.dainst.org/',
		mapUrl: 'https://daard-viewer.cuprit.net/',
		restBase: 'https://geoserver.dainst.org/daard',
		loginUrl: 'https://geoserver.dainst.org/o/authorize/?response_type=code&client_id=jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U&redirect_uri=%redirect_uri%&state=abc=scope=daard-api',
		tokenUrl: 'https://geoserver.dainst.org/o/token/',
		tokenClientId: 'jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U',
		registerUrl: 'https://geoserver.dainst.org/account/signup/',
	},
	/*
	{
		name     : 'live',
		hostname : '',
		restHost : ''
	},
	*/
]
