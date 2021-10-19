import apolloScene from '../scenes/apollo'
export default function makeScene(sceneName){
    switch(sceneName){
        case 'apollo': {
            return apolloScene
        }
        default: {
            throw new Error('Scene name '+sceneName+' not recognised.')
        }
    }
}