$(function(){
  $("#user-search-field").on("keyup", function(e){
    e.preventDefault();
    let input_name = $(this).val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: {
        name: input_name
      },
      dataType: "json"
    })
    .done(function(users){

    })
  })
});