module.exports.salute = function (){
    var today = new Date()

    var curHr = today.getHours()
    var salute;
    if (curHr < 12) {
      salute = "Good Morning! ";
    } else if (curHr < 18) {
      salute = "Good Afternoon! ";
    } else {
      salute = "Good Evening! ";
    }
    return salute
}
