$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var body = message.body ? `${message.body}` : "";
    var image = message.image_url ? `<img src="${message.image_url}">` : ""
    var html = `<li class="message", data-message-id="${message.id}">
                  <ul class="message__info">
                    <li class="message__info message__user-name">
                      ${message.user_name}
                    </li>
                    <li class="message__info message__date">
                      ${message.created_at}
                    </li>
                  </ul>
                  <div class="message__text">
                    ${body}
                  </div>
                    ${image}
                </li>`
    return html;
  };

  $("#chat-form").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $(".messages").append(html);
      $("#chat-form")[0].reset();
      $("html, body").animate({scrollTop: $(document).height()});
    })
    .fail(function(){
      alert("メッセージを入力して下さい");
    })
    .always(function(){
      $(".chat-form__send__submit-btn").removeAttr("disabled");
    });
  });
});

