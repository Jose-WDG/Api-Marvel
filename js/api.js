//cosumindo api e inserindo na index
var marvel = {
  render: function(){
   //url da api
  var url = 'http://gateway.marvel.com/v1/public/comics?ts=1&apikey=74cc9da6a532c3de72f0f0723974b475&hash=73baa5e9f6ba542616792ad6c459d1c0';

$.ajax({
  url: url,
  type: "GET",
    beforeSend: function(){
      $('#messagem').text('Carregando...');
    },
    complete: function(){
      $('#messagem').text('MARVEL');
    },
    success: function(data){
      $('#footer').html(data.attributionHTML);
      var string="";
      
      string+="<div class='row'>";
       
        for(var  i=0; i<data.data.results.length;i++) {
          var element = data.data.results[i];
          string+="<div class = 'card col-lg-3 col-md-3 col-sm-6 col-xs-12'>";
            string+="<a href='"+element.urls[0].url+"' target='_blank'>";
              string+="<img class = 'card-img-top'  src=" +element.thumbnail.path+ "/portrait_uncanny."+element.thumbnail.extension+">";
            string+="</a>";
          
            string+="<div class='card-body'>";
              string+="<h5class='card-title'>"+element.series.name+"</h5>";
              string+="<div class='collapse' id='quadrinho"+element.id+"'>";
              string+="<p class='card-text'>"+element.description+"</p>"
            string+="</div>";
            //if description return description
            if(element.description){
              string+="<button class='btn btn-dark btn-custom-descript' type='button' data-toggle='collapse' data-target='#quadrinho"+
              element.id+"'>Mostrar Descrição</button>";
            }else{
              string+="<p class='alert alert-light'>Não tem descrição</p>" ;
            };
          
          string+="</div>";
          string+="</div>";

          //quebra a linha
         if(( i+1 ) % 4 == 0){
           string+="</div>";
           //inicia uma nova linha
           string+="<div class='row'>";
         }
        }//end for
        //add quadrinhos no container responsável
        $('#quadrinhos-container').html(string);
      },
      error: function(){
        $('#messagem').text('Ocorreu um erro.');
      }

    });
  }
 
};

marvel.render();
