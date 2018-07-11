module.exports = function countdown(tick) {
    let count = 10;
    let timer = setInterval(_=>{
        tick(count--);
        console.log("Count",count);
        if(count ===0){
            clearInterval(timer);
        }
    },1000)
}