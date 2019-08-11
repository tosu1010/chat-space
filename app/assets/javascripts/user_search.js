$(function(){
  function buildHTML(user){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  };
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
      $(".chat-group-user").remove();
      if(input_name.length !== 0){
        $.each(users, function(i, user){
          let html = buildHTML(user)
          $("#user-search-result").append(html);
        });
      };
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });
});