import envs from '@/config/env.js'

let currentEnv = {}

envs.forEach( env => {
	if ( env.hostname === window.location.hostname ) currentEnv = env
} )

export default currentEnv;