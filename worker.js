class TestClass {
    constructor() {
        this.prop = 'value'
    }
    
    getProp() { return this.prop }
    setProp(newValue) { this.prop = newValue }
}

const myInstance = new TestClass()

let ctx = null
let canvas = null
let x = 0
let y = 0

const animate = () => {
    console.log( 'Inside worker: ', myInstance.getProp() )

    clear()
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 50, 50)
    ctx.commit().then( () => {
        x++
        y++
        animate()
    } )
}

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

this.addEventListener('message', ({ data }) => {
    if(data.offscreenCanvas) {
        canvas = data.offscreenCanvas
        ctx = data.offscreenCanvas.getContext('2d')
        animate()
    } else if(data.setNewProp) {
        myInstance.setProp(data.setNewProp)
    }
})