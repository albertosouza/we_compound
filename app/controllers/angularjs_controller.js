load('application');

action('templates', function () {
  //console.log( app.compound.structure.views );
  //this.compound.structure.views[view]
  if(!params['name']){
    return send(404);
  }

  layout(false);

  try{
    render(params['name']);
  }catch(err){
    return send(404);
  }


});