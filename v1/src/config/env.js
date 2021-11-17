/**
 *	In dieser Datei können für verschiedene Environments,
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
		restBase: 'https://dai-gn-test.csgis.de/daard',
		tokenUrl: 'https://dai-gn-test.csgis.de/o/token/',
		clientId: 'jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U',
		registerUrl: 'https://dai-gn-test.csgis.de/account/signup/',
		loginUrl: 'https://dai-gn-test.csgis.de/o/authorize/?response_type=code&client_id=jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U&redirect_uri=%redirect_uri%&state=abc=scope=daard-api',
	},
	{
		name: 'stage',
		hostname: 'knochen.in-kombination.de',
		restBase: 'https://dai-gn-test.csgis.de/daard',
		tokenUrl: 'https://dai-gn-test.csgis.de/o/token/',
		clientId: 'jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U',
		registerUrl: 'https://dai-gn-test.csgis.de/account/signup/',
		loginUrl: 'https://dai-gn-test.csgis.de/o/authorize/?response_type=code&client_id=jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U&redirect_uri=%redirect_uri%&state=abc=scope=daard-api',
	},
	{
		name: 'live',
		hostname: 'daard-atlas.cuprit.net',
		restBase: 'https://dai-gn-test.csgis.de/daard',
		tokenUrl: 'https://dai-gn-test.csgis.de/o/token/',
		clientId: 'jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U',
		registerUrl: 'https://dai-gn-test.csgis.de/account/signup/',
		loginUrl: 'https://dai-gn-test.csgis.de/o/authorize/?response_type=code&client_id=jqAODkFHbb54YDouEx7JAT16kJxelPSIeDkU2n5U&redirect_uri=%redirect_uri%&state=abc=scope=daard-api',
	},
	/*
	{
		name     : 'live',
		hostname : '',
		restHost : ''
	},
	*/
]
