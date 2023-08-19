module.exports.getDay=()=>{
    var d= new Date()
    let day =''
    day = day + d.getMinutes()+':'+ d.getHours()+'/'+d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()
    return day;
}
