$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
      var body = message.body ? `${message.body}` : "";
      var image = message.image_url ? `<img src="${message.image_url}">` : ""
      var html = `<li class="message">
                    <ul class="message__info">
                      <li class="message__info message__user_name">
                        ${message.user_name}
                      </li>
                      <li class="message__info message__date">
                        ${message.created_at}
                      </li>
                    </ul>
                    <div class="message__text">
                      ${body}
                      ${image}
                    </div>
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
        $(".chat-form__input__text").val("");
      })
      .fail(function(){
        alert("error");
      })
      .always(function(){
        $(".chat-form__send__submit-btn").removeAttr("disabled");
      });
    });
  });
});

