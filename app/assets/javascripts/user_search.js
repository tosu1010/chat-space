$(document).on('turbolinks:load', function() {
  function buildHTML(user){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  };

  function add_user_html(user_id, user_name){
    let html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;
  };

  $("#user-search-field").on("keyup", function(e){
    e.preventDefault();
    let input_name = $(this).val();
    let user_ids = []
    $("#chat-member-list input").each(function(i){
      user_ids.push(Number($(this).attr("value")))
    })
    $.ajax({
      type: "GET",
      url: "/users",
      data: {
        name: input_name,
        user_ids: user_ids
      },
      dataType: "json"
    })
    .done(function(users){
      $(".chat-group-user.clearfix").remove();
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

  
  $("#user-search-result").on("click", ".user-search-add", function(){
    let user_id = $(this).attr("data-user-id")
    let user_name = $(this).attr("data-user-name")
    let html = add_user_html(user_id, user_name);
    $(this).parent().remove();
    $("#chat-member-list").append(html);
  });

  $("#chat-member-list").on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});