module.exports = { 
    isLogedIn: function () {
        console.log(this.viewContext.request.user);
        if(this.viewContext.request.user){
            return true;
        }else{

            return false;
        }

    }
};