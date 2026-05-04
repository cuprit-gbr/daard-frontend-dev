import envs from '@/config/env.js'

let currentEnv = {}
const hostname = window.location.hostname

console.log('=== getCurrentEnv.js Debug ===')
console.log('Current hostname:', hostname)
console.log('Available envs:')
envs.forEach(env => {
    const match = env.hostname === hostname ? '✅ MATCH' : '❌'
    console.log(`  ${match} "${env.hostname}" (name: ${env.name})`)
})

envs.forEach( env => {
	if ( env.hostname === hostname ) currentEnv = env
} )

console.log('Selected env:', currentEnv)
console.log('MapUrl:', currentEnv.mapUrl)
console.log('=== End Debug ===')

export default currentEnv;