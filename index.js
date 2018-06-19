
const canvas = document.querySelector('canvas')
canvas.width = 800
canvas.height = 600

const offscreenCanvas = canvas.transferControlToOffscreen()

const worker = new Worker('worker.js')

worker.postMessage({ offscreenCanvas }, [offscreenCanvas])

setTimeout(() => {
    worker.postMessage({
        setNewProp: 'new value!!'
    })
}, 3000)