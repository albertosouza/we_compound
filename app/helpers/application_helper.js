module.exports = { 
    isLogedIn: function () {
        if(this.viewContext.request.user){
            return true;
        }else{

            return false;
        }

    }
};